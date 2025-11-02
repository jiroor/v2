import { useState, useEffect, useRef } from 'react'
import QRCode from 'qrcode'
import { Button } from '@/components/ui/button'
import { SEO } from '@/components/SEO/SEO'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { usePeer } from '@/hooks/usePeer'
import { useCamera } from '@/hooks/useCamera'
import { generateRoomId, generateQRCodeData } from '@/utils/roomIdUtils'
import { DEFAULT_CAMERA_CONFIG } from '@/constants/camera'
import type { MediaConnection } from 'peerjs'
import { Video } from 'lucide-react'

function CameraMode() {
  useToolUsageTracking('/camera/mode', 'カメラモード')

  // ルームIDを最初から生成
  const [roomId] = useState<string>(() => generateRoomId())
  const [isBroadcasting, setIsBroadcasting] = useState(false)
  const [viewerCount, setViewerCount] = useState(0)
  const [copiedRoomId, setCopiedRoomId] = useState(false)

  const [selectedCameraId, setSelectedCameraId] = useState<string>('')

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const connectionsRef = useRef<Set<MediaConnection>>(new Set())
  const pendingCallsRef = useRef<MediaConnection[]>([])

  const { peer, isReady, error: peerError } = usePeer(roomId)
  const {
    stream,
    isStreaming,
    error: cameraError,
    availableCameras,
    startCamera,
    stopCamera,
    loadAvailableCameras,
  } = useCamera()

  // 利用可能なカメラを読み込む
  useEffect(() => {
    loadAvailableCameras()
  }, [loadAvailableCameras])

  // QRコード生成
  useEffect(() => {
    if (!roomId || !canvasRef.current) return

    const qrData = generateQRCodeData(roomId)

    QRCode.toCanvas(
      canvasRef.current,
      qrData,
      {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      },
      (error) => {
        if (error) {
          console.error('QRコード生成エラー:', error)
        }
      }
    )
  }, [roomId])

  // ビデオ要素にストリームを設定
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  // Peer接続の監視（ビューワーからの接続を受け付け）
  useEffect(() => {
    if (!peer || !isReady) return

    const handleCall = (call: MediaConnection) => {
      console.log('ビューワーから接続:', call.peer)

      // ストリームがある場合のみ応答
      if (stream) {
        console.log('[DEBUG] ストリームあり - answer()を呼び出します')
        console.log('[DEBUG] ストリーム情報:', {
          id: stream.id,
          active: stream.active,
          videoTracks: stream.getVideoTracks().length,
          audioTracks: stream.getAudioTracks().length,
          videoTrackEnabled: stream.getVideoTracks()[0]?.enabled,
          videoTrackReadyState: stream.getVideoTracks()[0]?.readyState,
        })

        // PeerJSイベントリスナーをanswer()の前に登録
        // 接続が閉じられた時の処理
        call.on('close', () => {
          console.log('ビューワーが切断:', call.peer)
          connectionsRef.current.delete(call)
          setViewerCount(connectionsRef.current.size)
        })

        // エラーハンドリング
        call.on('error', (err) => {
          console.error('接続エラー:', err)
          connectionsRef.current.delete(call)
          setViewerCount(connectionsRef.current.size)
        })

        // ストリームで応答
        call.answer(stream)
        console.log('[DEBUG] answer()完了')

        // WebRTC接続のライフサイクルをログ（answer()後にpeerConnectionが利用可能）
        if (call.peerConnection) {
          // Sendersを確認
          const senders = call.peerConnection.getSenders()
          console.log('[DEBUG] カメラ側 Senders数:', senders.length)
          senders.forEach((sender, index) => {
            console.log(`[DEBUG] Sender ${index}:`, {
              track: sender.track?.kind,
              trackId: sender.track?.id,
              trackEnabled: sender.track?.enabled,
              trackReadyState: sender.track?.readyState,
            })
          })
          call.peerConnection.addEventListener('iceconnectionstatechange', () => {
            console.log('[DEBUG] カメラ側 ICE接続状態:', call.peerConnection.iceConnectionState)
          })

          call.peerConnection.addEventListener('icegatheringstatechange', () => {
            console.log('[DEBUG] カメラ側 ICE収集状態:', call.peerConnection.iceGatheringState)
          })

          call.peerConnection.addEventListener('signalingstatechange', () => {
            console.log('[DEBUG] カメラ側 シグナリング状態:', call.peerConnection.signalingState)
          })

          call.peerConnection.addEventListener('connectionstatechange', () => {
            console.log('[DEBUG] カメラ側 接続状態:', call.peerConnection.connectionState)
          })
        }

        // 接続を追加
        connectionsRef.current.add(call)
        setViewerCount(connectionsRef.current.size)
      } else {
        // ストリームがない場合は待機キューに追加
        console.log('ストリーム待機中のため接続を保留:', call.peer)
        pendingCallsRef.current.push(call)
      }
    }

    peer.on('call', handleCall)

    return () => {
      peer.off('call', handleCall)
    }
  }, [peer, isReady, stream])

  // ストリーム開始時に待機中の接続に応答
  useEffect(() => {
    if (!stream || pendingCallsRef.current.length === 0) return

    console.log('待機中の接続に応答:', pendingCallsRef.current.length)

    // 待機中のすべての接続に応答
    pendingCallsRef.current.forEach((call) => {
      console.log('待機中の接続に応答:', call.peer)
      console.log('[DEBUG] ストリーム情報:', {
        id: stream.id,
        active: stream.active,
        videoTracks: stream.getVideoTracks().length,
        audioTracks: stream.getAudioTracks().length,
        videoTrackEnabled: stream.getVideoTracks()[0]?.enabled,
        videoTrackReadyState: stream.getVideoTracks()[0]?.readyState,
      })

      // PeerJSイベントリスナーをanswer()の前に登録
      call.on('close', () => {
        console.log('ビューワーが切断:', call.peer)
        connectionsRef.current.delete(call)
        setViewerCount(connectionsRef.current.size)
      })

      call.on('error', (err) => {
        console.error('接続エラー:', err)
        connectionsRef.current.delete(call)
        setViewerCount(connectionsRef.current.size)
      })

      // ストリームで応答
      call.answer(stream)
      console.log('[DEBUG] answer()完了')

      // WebRTC接続のライフサイクルをログ（answer()後にpeerConnectionが利用可能）
      if (call.peerConnection) {
        // Sendersを確認
        const senders = call.peerConnection.getSenders()
        console.log('[DEBUG] カメラ側(待機) Senders数:', senders.length)
        senders.forEach((sender, index) => {
          console.log(`[DEBUG] Sender ${index}:`, {
            track: sender.track?.kind,
            trackId: sender.track?.id,
            trackEnabled: sender.track?.enabled,
            trackReadyState: sender.track?.readyState,
          })
        })
        call.peerConnection.addEventListener('iceconnectionstatechange', () => {
          console.log('[DEBUG] カメラ側(待機) ICE接続状態:', call.peerConnection.iceConnectionState)
        })

        call.peerConnection.addEventListener('icegatheringstatechange', () => {
          console.log('[DEBUG] カメラ側(待機) ICE収集状態:', call.peerConnection.iceGatheringState)
        })

        call.peerConnection.addEventListener('signalingstatechange', () => {
          console.log('[DEBUG] カメラ側(待機) シグナリング状態:', call.peerConnection.signalingState)
        })

        call.peerConnection.addEventListener('connectionstatechange', () => {
          console.log('[DEBUG] カメラ側(待機) 接続状態:', call.peerConnection.connectionState)
        })
      }

      // 接続を追加
      connectionsRef.current.add(call)
    })

    setViewerCount(connectionsRef.current.size)

    // 待機キューをクリア
    pendingCallsRef.current = []
  }, [stream])

  // 配信開始
  const handleStartBroadcasting = async () => {
    try {
      await startCamera(
        {
          id: roomId,
          name: 'カメラ',
          ...DEFAULT_CAMERA_CONFIG,
        },
        selectedCameraId || undefined
      )
      setIsBroadcasting(true)
    } catch (err) {
      console.error('カメラ起動エラー:', err)
    }
  }

  // 配信停止
  const handleStopBroadcasting = () => {
    // すべての接続を閉じる
    connectionsRef.current.forEach((conn) => {
      conn.close()
    })
    connectionsRef.current.clear()
    setViewerCount(0)

    stopCamera()
    setIsBroadcasting(false)
  }

  // ルームIDをコピー
  const handleCopyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId)
      setCopiedRoomId(true)
      setTimeout(() => setCopiedRoomId(false), 2000)
    } catch (err) {
      console.error('コピーに失敗:', err)
    }
  }

  const displayError = peerError || cameraError

  return (
    <>
      <SEO path="/camera/mode" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <h2 className="text-2xl font-semibold mb-8 text-center">カメラモード</h2>

        {/* エラー表示 */}
        {displayError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 text-sm">{displayError}</p>
          </div>
        )}

        {/* カメラプレビュー */}
        <div className="bg-gray-900 rounded-lg mb-6 relative overflow-hidden aspect-video">
          {isStreaming ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <Video className="w-20 h-20 mx-auto mb-2" />
                <p>カメラはオフです</p>
              </div>
            </div>
          )}

          {/* ビューワー数表示 */}
          {isBroadcasting && (
            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              配信中 ({viewerCount}人)
            </div>
          )}
        </div>

        {/* ルームID表示 */}
        <div className="mb-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold mb-3">ルームID</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 font-mono text-lg text-center tracking-wider">
                {roomId || '生成中...'}
              </div>
              <Button
                onClick={handleCopyRoomId}
                variant="secondary"
                disabled={!roomId}
              >
                {copiedRoomId ? 'コピー完了!' : 'コピー'}
              </Button>
            </div>

            {/* QRコード */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">
                または、このQRコードをビューワー側で読み取ってください
              </p>
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto mx-auto rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* カメラ選択 */}
        {!isBroadcasting && availableCameras.length > 0 && (
          <div className="mb-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold mb-3">カメラ選択</h3>
              <select
                value={selectedCameraId}
                onChange={(e) => setSelectedCameraId(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706] focus:border-transparent"
              >
                <option value="">デフォルトのカメラ</option>
                {availableCameras.map((camera) => (
                  <option key={camera.deviceId} value={camera.deviceId}>
                    {camera.label || `カメラ ${camera.deviceId.substring(0, 8)}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* 配信コントロール */}
        <div className="flex gap-4 md:flex-row flex-col">
          {!isBroadcasting ? (
            <Button
              onClick={handleStartBroadcasting}
              disabled={!isReady || !roomId}
              className="flex-1"
            >
              {!isReady ? '接続中...' : '配信開始'}
            </Button>
          ) : (
            <Button
              onClick={handleStopBroadcasting}
              variant="destructive"
              className="flex-1"
            >
              配信停止
            </Button>
          )}
        </div>

        {/* 説明 */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong>使い方:</strong> 「配信開始」ボタンを押してカメラを起動し、表示されたルームIDまたはQRコードをビューワー側と共有してください。
          </p>
        </div>
      </div>
    </>
  )
}

export default CameraMode
