/**
 * ルームID関連のユーティリティ関数
 */

import { ROOM_ID } from '@/constants/camera'

/**
 * ランダムなルームIDを生成
 * @returns ルームID（例: ABC-DEF-GHI-JKL）
 */
export function generateRoomId(): string {
  const { CHARS, SEGMENTS, SEGMENT_LENGTH, SEPARATOR } = ROOM_ID

  const segments: string[] = []

  for (let i = 0; i < SEGMENTS; i++) {
    let segment = ''
    for (let j = 0; j < SEGMENT_LENGTH; j++) {
      const randomIndex = Math.floor(Math.random() * CHARS.length)
      segment += CHARS[randomIndex]
    }
    segments.push(segment)
  }

  return segments.join(SEPARATOR)
}

/**
 * ルームIDの形式が正しいか検証
 * @param roomId - 検証するルームID
 * @returns 有効な場合true
 */
export function isValidRoomId(roomId: string): boolean {
  if (!roomId || typeof roomId !== 'string') {
    return false
  }

  const { SEGMENTS, SEGMENT_LENGTH, SEPARATOR, CHARS } = ROOM_ID

  // セパレーターで分割
  const segments = roomId.split(SEPARATOR)

  // セグメント数の確認
  if (segments.length !== SEGMENTS) {
    return false
  }

  // 各セグメントの検証
  const charsRegex = new RegExp(`^[${CHARS}]{${SEGMENT_LENGTH}}$`)

  for (const segment of segments) {
    if (!charsRegex.test(segment)) {
      return false
    }
  }

  return true
}

/**
 * ルームIDを正規化（大文字化、トリム）
 * @param roomId - 正規化するルームID
 * @returns 正規化されたルームID
 */
export function normalizeRoomId(roomId: string): string {
  return roomId.trim().toUpperCase()
}

/**
 * QRコード用のデータを生成
 * @param roomId - ルームID
 * @returns QRコードにエンコードする文字列
 */
export function generateQRCodeData(roomId: string): string {
  // URL形式でエンコード（将来的にディープリンク対応も可能）
  const baseUrl = window.location.origin
  return `${baseUrl}/camera/viewer?room=${roomId}`
}

/**
 * QRコードデータからルームIDを抽出
 * @param qrData - QRコードから読み取ったデータ
 * @returns ルームID、または null
 */
export function extractRoomIdFromQRCode(qrData: string): string | null {
  try {
    // URL形式の場合
    if (qrData.includes('room=')) {
      const url = new URL(qrData)
      const roomId = url.searchParams.get('room')
      if (roomId && isValidRoomId(normalizeRoomId(roomId))) {
        return normalizeRoomId(roomId)
      }
    }

    // 直接ルームIDの場合
    const normalized = normalizeRoomId(qrData)
    if (isValidRoomId(normalized)) {
      return normalized
    }

    return null
  } catch {
    return null
  }
}
