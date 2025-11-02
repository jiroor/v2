import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SEO } from '@/components/SEO/SEO'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { usePeer } from '@/hooks/usePeer'
import { useCameraStorage } from '@/hooks/useCameraStorage'
import { normalizeRoomId, isValidRoomId } from '@/utils/roomIdUtils'
import type { CameraStream } from '@/types/camera'

function ViewerMode() {
  useToolUsageTracking('/camera/viewer', 'ビューワーモード')

  const [roomIdInput, setRoomIdInput] = useState('')
  const [cameras, setCameras] = useState<CameraStream[]>([])
  const [connectionError, setConnectionError] = useState<string | null>(null)

  const { peer, isReady, error: peerError } = usePeer()
  const { getSavedCameras, saveCamera, removeCamera } = useCameraStorage()

  // 保存されたカメラを読み込み
  useEffect(() => {
    const savedCameras = getSavedCameras()
    // 保存されたカメラ情報をCameraStream形式に変換
    const cameraStreams: CameraStream[] = savedCameras.cameras.map((saved) => ({
      id: saved.id,
      name: saved.name,
      peerId: saved.id,
      connection: null,
      stream: null,
      status: 'disconnected',
      latency: 0,
      createdAt: new Date(saved.lastConnected),
    }))
    setCameras(cameraStreams)
  }, [getSavedCameras])

  // カメラに接続
  const handleConnect = async () => {
    if (!peer || !isReady) {
      setConnectionError('Peer接続の準備ができていません')
      return
    }

    const normalizedRoomId = normalizeRoomId(roomIdInput)

    if (!isValidRoomId(normalizedRoomId)) {
      setConnectionError('ルームIDの形式が正しくありません（例: ABC-DEF-GHI-JKL）')
      return
    }

    // 既に接続済みかチェック
    const existingCamera = cameras.find((cam) => cam.id === normalizedRoomId)
    if (existingCamera && existingCamera.status === 'connected') {
      setConnectionError('このカメラは既に接続されています')
      return
    }

    setConnectionError(null)

    try {
      // 無音の音声トラックを持つダミーストリームを作成
      const audioContext = new AudioContext()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      gainNode.gain.value = 0 // 無音
      oscillator.connect(gainNode)
      const destination = audioContext.createMediaStreamDestination()
      gainNode.connect(destination)
      oscillator.start()

      const dummyStream = destination.stream
      console.log('[DEBUG] ダミーストリームを作成しました（無音の音声トラック）:', {
        audioTracks: dummyStream.getAudioTracks().length,
        videoTracks: dummyStream.getVideoTracks().length,
      })

      // 新しいカメラストリームを追加
      const newCamera: CameraStream = {
        id: normalizedRoomId,
        name: `カメラ ${normalizedRoomId.substring(0, 7)}`,
        peerId: normalizedRoomId,
        connection: null,
        stream: null,
        status: 'connecting',
        latency: 0,
        createdAt: new Date(),
      }

      setCameras((prev) => {
        // 既存のカメラがあれば更新、なければ追加
        const filtered = prev.filter((cam) => cam.id !== normalizedRoomId)
        return [...filtered, newCamera]
      })

      // カメラに接続（ダミーストリームを渡す）
      console.log('[DEBUG] peer.call()を呼び出します（ダミーストリーム）')
      const call = peer.call(normalizedRoomId, dummyStream)

      if (!call) {
        throw new Error('接続の確立に失敗しました')
      }

      console.log('[DEBUG] peer.call()完了:', {
        callPeer: call.peer,
        callOpen: call.open,
      })

      // WebRTC接続のライフサイクルをログ（call後にpeerConnectionが利用可能）
      if (call.peerConnection) {
        const receivedTracks: MediaStreamTrack[] = []

        // Receiversを確認
        const receivers = call.peerConnection.getReceivers()
        console.log('[DEBUG] ビューワー側 Receivers数:', receivers.length)
        receivers.forEach((receiver, index) => {
          console.log(`[DEBUG] Receiver ${index}:`, {
            track: receiver.track?.kind,
            trackId: receiver.track?.id,
            trackEnabled: receiver.track?.enabled,
            trackReadyState: receiver.track?.readyState,
          })
        })

        call.peerConnection.addEventListener('iceconnectionstatechange', () => {
          console.log('[DEBUG] ICE接続状態変更:', call.peerConnection.iceConnectionState)
        })

        call.peerConnection.addEventListener('icegatheringstatechange', () => {
          console.log('[DEBUG] ICE収集状態変更:', call.peerConnection.iceGatheringState)
        })

        call.peerConnection.addEventListener('signalingstatechange', () => {
          console.log('[DEBUG] シグナリング状態変更:', call.peerConnection.signalingState)
        })

        call.peerConnection.addEventListener('connectionstatechange', () => {
          console.log('[DEBUG] 接続状態変更:', call.peerConnection.connectionState)
        })

        call.peerConnection.addEventListener('track', (event) => {
          console.log('[DEBUG] トラック受信:', {
            kind: event.track.kind,
            streams: event.streams.length,
            streamId: event.streams[0]?.id,
          })

          // トラックを収集
          receivedTracks.push(event.track)

          // PeerJSのstreamイベントが発火しない場合のフォールバック
          // trackイベントでストリームを手動で構築
          if (event.streams && event.streams.length > 0) {
            const remoteStream = event.streams[0]
            console.log('[DEBUG] trackイベントからストリームを取得')
            console.log('[DEBUG] 受信ストリーム情報:', {
              id: remoteStream.id,
              active: remoteStream.active,
              videoTracks: remoteStream.getVideoTracks().length,
              audioTracks: remoteStream.getAudioTracks().length,
            })

            setCameras((prev) =>
              prev.map((cam) =>
                cam.id === normalizedRoomId
                  ? {
                      ...cam,
                      connection: call,
                      stream: remoteStream,
                      status: 'connected',
                    }
                  : cam
              )
            )

            // LocalStorageに保存
            saveCamera({
              id: normalizedRoomId,
              name: newCamera.name,
              lastConnected: new Date().toISOString(),
            })
          }
        })
      }

      // ストリーム受信
      call.on('stream', (remoteStream) => {
        console.log('ストリーム受信:', normalizedRoomId)
        console.log('[DEBUG] 受信ストリーム情報:', {
          id: remoteStream.id,
          active: remoteStream.active,
          videoTracks: remoteStream.getVideoTracks().length,
          audioTracks: remoteStream.getAudioTracks().length,
        })

        setCameras((prev) =>
          prev.map((cam) =>
            cam.id === normalizedRoomId
              ? {
                  ...cam,
                  connection: call,
                  stream: remoteStream,
                  status: 'connected',
                }
              : cam
          )
        )

        // LocalStorageに保存
        saveCamera({
          id: normalizedRoomId,
          name: newCamera.name,
          lastConnected: new Date().toISOString(),
        })
      })

      // 接続エラー
      call.on('error', (err) => {
        console.error('[DEBUG] ビューワー側でerrorイベント:', err)
        setCameras((prev) =>
          prev.map((cam) =>
            cam.id === normalizedRoomId
              ? { ...cam, status: 'error' }
              : cam
          )
        )
        setConnectionError('カメラへの接続に失敗しました')
      })

      // 接続終了
      call.on('close', () => {
        console.log('[DEBUG] ビューワー側でcloseイベント:', normalizedRoomId)
        setCameras((prev) =>
          prev.map((cam) =>
            cam.id === normalizedRoomId
              ? { ...cam, status: 'disconnected', stream: null, connection: null }
              : cam
          )
        )
      })

      // 入力をクリア
      setRoomIdInput('')
    } catch (err) {
      console.error('接続処理エラー:', err)
      setConnectionError(
        err instanceof Error ? err.message : 'カメラへの接続に失敗しました'
      )
      setCameras((prev) =>
        prev.filter((cam) => cam.id !== normalizedRoomId)
      )
    }
  }

  // カメラ削除
  const handleRemoveCamera = (cameraId: string) => {
    const camera = cameras.find((cam) => cam.id === cameraId)

    // 接続を閉じる
    if (camera?.connection) {
      camera.connection.close()
    }

    // ストリームを停止
    if (camera?.stream) {
      camera.stream.getTracks().forEach((track) => track.stop())
    }

    // リストから削除
    setCameras((prev) => prev.filter((cam) => cam.id !== cameraId))

    // LocalStorageから削除
    removeCamera(cameraId)
  }

  // 遅延時間を計算（仮実装）
  const calculateLatency = (camera: CameraStream): string => {
    if (camera.status !== 'connected') return '-'
    // 実際の遅延測定は複雑なので、仮の値を表示
    return '~100ms'
  }

  const displayError = peerError || connectionError

  return (
    <>
      <SEO path="/camera/viewer" />
      <div className="max-w-[1200px] mx-auto py-8 px-4">
        <h2 className="text-2xl font-semibold mb-8 text-center">ビューワーモード</h2>

        {/* エラー表示 */}
        {displayError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 text-sm">{displayError}</p>
          </div>
        )}

        {/* ルームID入力 */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold mb-4">カメラに接続</h3>
          <div className="flex gap-3 md:flex-row flex-col">
            <div className="flex-1">
              <Label htmlFor="roomId" className="mb-2">
                ルームID
              </Label>
              <Input
                id="roomId"
                type="text"
                placeholder="ABC-DEF-GHI-JKL"
                value={roomIdInput}
                onChange={(e) => setRoomIdInput(e.target.value.toUpperCase())}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleConnect()
                  }
                }}
                className="font-mono"
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleConnect}
                disabled={!isReady || !roomIdInput.trim()}
                className="w-full md:w-auto"
              >
                {!isReady ? '準備中...' : '接続'}
              </Button>
            </div>
          </div>
        </div>

        {/* カメラ一覧 */}
        <div>
          <h3 className="font-semibold mb-4">
            接続中のカメラ ({cameras.length})
          </h3>

          {cameras.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center text-gray-500">
              カメラに接続していません
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {cameras.map((camera) => (
                <div
                  key={camera.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                >
                  {/* カメラ映像 */}
                  <div className="bg-gray-900 aspect-video relative">
                    {camera.stream && camera.status === 'connected' ? (
                      <video
                        ref={(video) => {
                          if (video && camera.stream) {
                            video.srcObject = camera.stream
                          }
                        }}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <div className="text-center">
                          <div className="text-4xl mb-2">
                            {camera.status === 'connecting' && '⏳'}
                            {camera.status === 'disconnected' && '📵'}
                            {camera.status === 'error' && '⚠️'}
                          </div>
                          <p className="text-sm">
                            {camera.status === 'connecting' && '接続中...'}
                            {camera.status === 'disconnected' && '未接続'}
                            {camera.status === 'error' && '接続エラー'}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* ステータス表示 */}
                    <div className="absolute top-2 right-2 flex gap-2">
                      {camera.status === 'connected' && (
                        <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                          接続中
                        </div>
                      )}
                      {camera.status === 'connecting' && (
                        <div className="bg-yellow-600 text-white px-2 py-1 rounded text-xs font-semibold">
                          接続中...
                        </div>
                      )}
                    </div>
                  </div>

                  {/* カメラ情報 */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{camera.name}</h4>
                        <p className="text-xs text-gray-500 font-mono">
                          {camera.id}
                        </p>
                      </div>
                      <Button
                        onClick={() => handleRemoveCamera(camera.id)}
                        variant="destructive"
                        size="sm"
                      >
                        削除
                      </Button>
                    </div>

                    <div className="flex justify-between text-sm text-gray-600">
                      <span>遅延:</span>
                      <span className="font-mono">{calculateLatency(camera)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ViewerMode
