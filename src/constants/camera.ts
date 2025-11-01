/**
 * カメラ映像共有機能の定数
 */

import type { CameraResolution, ResolutionConstraints } from '@/types/camera'

/**
 * LocalStorageのキー
 */
export const STORAGE_KEYS = {
  SAVED_CAMERAS: 'rakit_saved_cameras',
  CAMERA_CONFIG: 'rakit_camera_config',
} as const

/**
 * 解像度設定のマッピング
 */
export const RESOLUTION_CONSTRAINTS: Record<CameraResolution, ResolutionConstraints> = {
  '360p': {
    width: 640,
    height: 360,
    label: '360p (低画質・低遅延)',
  },
  '480p': {
    width: 854,
    height: 480,
    label: '480p (標準)',
  },
  '720p': {
    width: 1280,
    height: 720,
    label: '720p (高画質)',
  },
}

/**
 * デフォルトのカメラ設定
 */
export const DEFAULT_CAMERA_CONFIG = {
  resolution: '480p' as CameraResolution,
  facingMode: 'user' as const,
  audioEnabled: false,
}

/**
 * ルームIDの形式
 */
export const ROOM_ID = {
  /** ルームIDの長さ */
  LENGTH: 12,
  /** セグメント数 */
  SEGMENTS: 4,
  /** 各セグメントの長さ */
  SEGMENT_LENGTH: 3,
  /** セパレーター */
  SEPARATOR: '-',
  /** 使用可能な文字 */
  CHARS: 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', // 紛らわしい文字を除外（I,O,0,1）
} as const

/**
 * PeerJS設定
 */
export const PEER_CONFIG = {
  /** デバッグレベル */
  debug: 0,
  /** 接続タイムアウト（ms） */
  timeout: 10000,
} as const

/**
 * 接続関連の設定
 */
export const CONNECTION_CONFIG = {
  /** 遅延測定の間隔（ms） */
  LATENCY_CHECK_INTERVAL: 5000,
  /** 再接続の試行回数 */
  MAX_RETRY_ATTEMPTS: 3,
  /** 再接続の待機時間（ms） */
  RETRY_DELAY: 2000,
} as const

/**
 * カメラ名称
 */
export const CAMERA_NAMES = {
  DEFAULT_PREFIX: 'カメラ',
  VIEWER_NAME: 'ビューワー',
} as const
