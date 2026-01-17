/**
 * カメラ映像共有機能の型定義
 */

import type { MediaConnection } from 'peerjs'

/**
 * カメラストリームの状態
 */
export type CameraStatus = 'connecting' | 'connected' | 'disconnected' | 'error'

/**
 * カメラの解像度設定
 */
export type CameraResolution = '360p' | '480p' | '720p' | '1080p' | '4K'

/**
 * カメラの向き（フロント/バック）
 */
export type CameraFacingMode = 'user' | 'environment'

/**
 * カメラストリーム情報
 */
export interface CameraStream {
  /** 一意のID */
  id: string
  /** カメラ名（ユーザー設定可能） */
  name: string
  /** PeerJS接続ID */
  peerId: string
  /** PeerJS MediaConnection */
  connection: MediaConnection | null
  /** MediaStream */
  stream: MediaStream | null
  /** 接続状態 */
  status: CameraStatus
  /** 遅延時間（ms） */
  latency: number
  /** 作成日時 */
  createdAt: Date
}

/**
 * カメラ設定
 */
export interface CameraConfig {
  /** カメラID */
  id: string
  /** カメラ名 */
  name: string
  /** 解像度 */
  resolution: CameraResolution
  /** カメラの向き */
  facingMode: CameraFacingMode
  /** 音声ON/OFF */
  audioEnabled: boolean
}

/**
 * LocalStorage保存用のカメラ情報
 */
export interface SavedCamera {
  /** カメラID（ルームID） */
  id: string
  /** カメラ名 */
  name: string
  /** 最終接続日時 */
  lastConnected: string
}

/**
 * LocalStorage保存用のカメラ一覧
 */
export interface SavedCameras {
  cameras: SavedCamera[]
}

/**
 * 解像度設定の詳細
 */
export interface ResolutionConstraints {
  width: number
  height: number
  label: string
}
