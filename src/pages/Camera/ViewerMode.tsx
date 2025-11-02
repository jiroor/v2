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
import { VideoOff, Loader2, Maximize2, AlertTriangle, Sun } from 'lucide-react'

function ViewerMode() {
  useToolUsageTracking('/camera/viewer', 'ビューワーモード')

  const [roomIdInput, setRoomIdInput] = useState('')
  const [cameras, setCameras] = useState<CameraStream[]>([])
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [fullscreenCameraId, setFullscreenCameraId] = useState<string | null>(null)
  const [brightnessFilter, setBrightnessFilter] = useState(false)

  const { peer, isReady, error: peerError } = usePeer()
  const { getSavedCameras, saveCamera, removeCamera } = useCameraStorage()

  // URLパラメータからルームIDを読み取り
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const roomParam = params.get('room')
    if (roomParam) {
      const normalized = normalizeRoomId(roomParam)
      if (isValidRoomId(normalized)) {
        setRoomIdInput(normalized)
      }
    }
  }, [])

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

  // カメラに接続する内部関数（再接続にも使用）
  const connectToCamera = async (normalizedRoomId: string, cameraName: string) => {
    if (!peer || !isReady) {
      console.log('[再接続] Peer接続の準備ができていません')
      return
    }

    try {
      // ダミーのvideoトラックを作成（真っ黒な1x1ピクセルのcanvas）
      const canvas = document.createElement('canvas')
      canvas.width = 1
      canvas.height = 1
      const canvasStream = canvas.captureStream()
      const videoTrack = canvasStream.getVideoTracks()[0]

      const dummyStream = new MediaStream([videoTrack])
      console.log('[DEBUG] ダミーvideoトラック付きストリームを作成しました:', {
        audioTracks: dummyStream.getAudioTracks().length,
        videoTracks: dummyStream.getVideoTracks().length,
      })

      // カメラを接続中状態に更新
      setCameras((prev) =>
        prev.map((cam) =>
          cam.id === normalizedRoomId
            ? { ...cam, status: 'connecting', stream: null, connection: null }
            : cam
        )
      )

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
              name: cameraName,
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
          name: cameraName,
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

        // 3秒後に再接続を試みる
        console.log('[再接続] 3秒後に再接続を試みます:', normalizedRoomId)
        setTimeout(() => {
          console.log('[再接続] 再接続を開始:', normalizedRoomId)
          connectToCamera(normalizedRoomId, cameraName)
        }, 3000)
      })

      // LocalStorageに保存
      saveCamera({
        id: normalizedRoomId,
        name: cameraName,
        lastConnected: new Date().toISOString(),
      })
    } catch (err) {
      console.error('接続処理エラー:', err)
      setCameras((prev) =>
        prev.map((cam) =>
          cam.id === normalizedRoomId
            ? { ...cam, status: 'error' }
            : cam
        )
      )
    }
  }

  // カメラに接続（UI経由）
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

    // 新しいカメラを追加
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

    // 接続開始
    await connectToCamera(normalizedRoomId, newCamera.name)

    // 入力をクリア
    setRoomIdInput('')
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

  // 全画面表示を切り替え
  const toggleFullscreen = (cameraId: string) => {
    if (fullscreenCameraId === cameraId) {
      setFullscreenCameraId(null)
      setBrightnessFilter(false) // 全画面終了時にフィルタをリセット
    } else {
      setFullscreenCameraId(cameraId)
    }
  }

  // Escキーで全画面を解除
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && fullscreenCameraId) {
        setFullscreenCameraId(null)
        setBrightnessFilter(false) // フィルタもリセット
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [fullscreenCameraId])

  const displayError = peerError || connectionError

  // 全画面表示のカメラを取得
  const fullscreenCamera = fullscreenCameraId
    ? cameras.find((cam) => cam.id === fullscreenCameraId)
    : null

  return (
    <>
      <SEO path="/camera/viewer" />

      {/* 全画面表示モード */}
      {fullscreenCamera && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          {/* ヘッダー */}
          <div className="bg-gray-900/90 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="font-semibold">{fullscreenCamera.name}</h3>
              <span className="text-sm text-gray-400 font-mono">
                {fullscreenCamera.id}
              </span>
              {fullscreenCamera.status === 'connected' && (
                <span className="text-sm text-green-400">
                  遅延: {calculateLatency(fullscreenCamera)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setBrightnessFilter(!brightnessFilter)}
                variant={brightnessFilter ? 'default' : 'secondary'}
                size="sm"
                className="flex items-center gap-2"
              >
                <Sun className="w-4 h-4" />
                {brightnessFilter ? '暗視モード: ON' : '暗視モード: OFF'}
              </Button>
              <Button
                onClick={() => setFullscreenCameraId(null)}
                variant="secondary"
                size="sm"
              >
                閉じる (Esc)
              </Button>
            </div>
          </div>

          {/* 映像エリア */}
          <div
            className="flex-1 flex items-center justify-center min-h-0 min-w-0"
            style={
              brightnessFilter
                ? { backgroundColor: '#001a00' }
                : { backgroundColor: '#000000' }
            }
          >
            {fullscreenCamera.stream && fullscreenCamera.status === 'connected' ? (
              <div className="w-full h-full relative">
                <video
                  ref={(video) => {
                    if (video && fullscreenCamera.stream) {
                      video.srcObject = fullscreenCamera.stream
                    }
                  }}
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                  style={
                    brightnessFilter
                      ? {
                          filter:
                            'grayscale(100%) brightness(2.5) contrast(1.8) invert(100%) hue-rotate(60deg) saturate(2)',
                        }
                      : undefined
                  }
                />
                {brightnessFilter && (
                  <>
                    {/* 暗視スコープのビネット効果 */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'radial-gradient(ellipse at center, transparent 30%, rgba(0,20,0,0.4) 70%, rgba(0,10,0,0.8) 100%)',
                      }}
                    />
                    {/* グリーンオーバーレイ */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundColor: 'rgba(0, 255, 0, 0.05)',
                        mixBlendMode: 'screen',
                      }}
                    />
                  </>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <div className="mb-2">
                  {fullscreenCamera.status === 'connecting' && <Loader2 className="w-16 h-16 mx-auto animate-spin" />}
                  {fullscreenCamera.status === 'disconnected' && <VideoOff className="w-16 h-16 mx-auto" />}
                  {fullscreenCamera.status === 'error' && <AlertTriangle className="w-16 h-16 mx-auto" />}
                </div>
                <p className="text-sm">
                  {fullscreenCamera.status === 'connecting' && '接続中...'}
                  {fullscreenCamera.status === 'disconnected' && '未接続'}
                  {fullscreenCamera.status === 'error' && '接続エラー'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

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
                  <div className="bg-gray-900 aspect-video relative group">
                    {camera.stream && camera.status === 'connected' ? (
                      <>
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
                        {/* 全画面表示ボタン（ホバー時に表示） */}
                        <button
                          onClick={() => toggleFullscreen(camera.id)}
                          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                          title="全画面表示"
                        >
                          <Maximize2 className="w-16 h-16" />
                        </button>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <div className="text-center">
                          <div className="mb-2">
                            {camera.status === 'connecting' && <Loader2 className="w-12 h-12 mx-auto animate-spin" />}
                            {camera.status === 'disconnected' && <VideoOff className="w-12 h-12 mx-auto" />}
                            {camera.status === 'error' && <AlertTriangle className="w-12 h-12 mx-auto" />}
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
