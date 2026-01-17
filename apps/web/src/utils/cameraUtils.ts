/**
 * カメラストリーム関連のユーティリティ関数
 */

import type { CameraConfig } from '@/types/camera'
import { RESOLUTION_CONSTRAINTS } from '@/constants/camera'

/**
 * MediaStreamの制約を生成
 * @param config - カメラ設定
 * @param deviceId - 使用するカメラのデバイスID（オプション）
 * @returns MediaStreamの制約オブジェクト
 */
export function getMediaConstraints(
  config: CameraConfig,
  deviceId?: string
): MediaStreamConstraints {
  const resolution = RESOLUTION_CONSTRAINTS[config.resolution]

  return {
    video: deviceId
      ? {
          deviceId: { exact: deviceId },
          width: { ideal: resolution.width },
          height: { ideal: resolution.height },
        }
      : {
          width: { ideal: resolution.width },
          height: { ideal: resolution.height },
          facingMode: config.facingMode,
        },
    audio: config.audioEnabled,
  }
}

/**
 * カメラストリームを取得
 * @param config - カメラ設定
 * @param deviceId - 使用するカメラのデバイスID（オプション）
 * @returns MediaStreamのPromise
 * @throws カメラアクセスに失敗した場合にエラーをスロー
 */
export async function getCameraStream(
  config: CameraConfig,
  deviceId?: string
): Promise<MediaStream> {
  try {
    const constraints = getMediaConstraints(config, deviceId)
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    return stream
  } catch (error) {
    if (error instanceof Error) {
      // エラーの種類に応じて適切なメッセージを生成
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        throw new Error('カメラへのアクセスが拒否されました。ブラウザの設定を確認してください。')
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        throw new Error('カメラが見つかりませんでした。デバイスが接続されているか確認してください。')
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        throw new Error('カメラが使用できません。他のアプリケーションで使用中の可能性があります。')
      } else if (error.name === 'OverconstrainedError') {
        throw new Error('指定された設定がカメラでサポートされていません。')
      } else {
        throw new Error(`カメラの起動に失敗しました: ${error.message}`)
      }
    }
    throw new Error('カメラの起動に失敗しました。')
  }
}

/**
 * カメラストリームを停止
 * @param stream - 停止するMediaStream
 */
export function stopCameraStream(stream: MediaStream | null): void {
  if (!stream) return

  // すべてのトラックを停止
  stream.getTracks().forEach((track) => {
    track.stop()
  })
}

/**
 * 利用可能なカメラデバイスを取得
 * @returns カメラデバイスの配列
 * @throws デバイス情報の取得に失敗した場合にエラーをスロー
 */
export async function getAvailableCameras(): Promise<MediaDeviceInfo[]> {
  try {
    // デバイス一覧を取得
    const devices = await navigator.mediaDevices.enumerateDevices()

    // ビデオ入力デバイスのみをフィルタリング
    const cameras = devices.filter((device) => device.kind === 'videoinput')

    return cameras
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`カメラデバイスの取得に失敗しました: ${error.message}`)
    }
    throw new Error('カメラデバイスの取得に失敗しました。')
  }
}
