/**
 * カメラストリーム管理のカスタムフック
 */

import { useState, useCallback, useEffect, useRef } from 'react'
import type { CameraConfig } from '@/types/camera'
import { getCameraStream, stopCameraStream, getAvailableCameras } from '@/utils/cameraUtils'

/**
 * カメラストリームを管理するカスタムフック
 * @returns カメラストリームの状態と操作関数
 */
export function useCamera() {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([])

  // クリーンアップ用のストリーム参照
  const streamRef = useRef<MediaStream | null>(null)

  /**
   * 利用可能なカメラデバイスを取得
   */
  const loadAvailableCameras = useCallback(async () => {
    try {
      const cameras = await getAvailableCameras()
      setAvailableCameras(cameras)
    } catch (err) {
      console.error('カメラデバイスの取得に失敗:', err)
    }
  }, [])

  /**
   * カメラを起動
   * @param config - カメラ設定
   * @param deviceId - 使用するカメラのデバイスID（オプション）
   */
  const startCamera = useCallback(async (config: CameraConfig, deviceId?: string) => {
    try {
      setError(null)
      setIsStreaming(true)

      // 既存のストリームがあれば停止
      if (streamRef.current) {
        stopCameraStream(streamRef.current)
        streamRef.current = null
      }

      // 新しいストリームを取得
      const newStream = await getCameraStream(config, deviceId)

      // ストリームの各トラックが終了したときのハンドラー
      newStream.getTracks().forEach((track) => {
        track.onended = () => {
          console.log('トラックが終了しました:', track.kind)
          // すべてのトラックが終了したらストリーミング状態を更新
          if (streamRef.current && streamRef.current.getTracks().every((t) => t.readyState === 'ended')) {
            setIsStreaming(false)
            setStream(null)
            streamRef.current = null
          }
        }
      })

      streamRef.current = newStream
      setStream(newStream)
      setIsStreaming(true)
      setError(null)
    } catch (err) {
      console.error('カメラ起動エラー:', err)

      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('カメラの起動に失敗しました')
      }

      setIsStreaming(false)
      setStream(null)
      streamRef.current = null
    }
  }, [])

  /**
   * カメラを停止
   */
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      stopCameraStream(streamRef.current)
      streamRef.current = null
      setStream(null)
      setIsStreaming(false)
      setError(null)
    }
  }, [])

  /**
   * コンポーネントのアンマウント時にストリームをクリーンアップ
   */
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        console.log('カメラストリームをクリーンアップしています...')
        stopCameraStream(streamRef.current)
        streamRef.current = null
      }
    }
  }, [])

  return {
    stream,
    isStreaming,
    error,
    availableCameras,
    startCamera,
    stopCamera,
    loadAvailableCameras,
  }
}
