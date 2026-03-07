/**
 * ツール利用状況トラッキングのカスタムフック
 */

import { useEffect, useRef } from 'react'
import { track } from '@vercel/analytics'
import { saveToolUsage } from '../utils/analyticsUtils'
import { useHistory } from './useHistory'

/**
 * ツールページの訪問を記録するカスタムフック
 * - LocalStorageに利用履歴を保存
 * - Vercel Analyticsにイベント送信
 * - 履歴機能に追加
 *
 * @param toolPath ツールのパス（例: "/timer/countdown"）
 * @param toolName ツール名（日本語）
 *
 * @example
 * ```tsx
 * function CountdownTimer() {
 *   useToolUsageTracking('/timer/countdown', 'カウントダウンタイマー')
 *   // ...
 * }
 * ```
 */
export function useToolUsageTracking(toolPath: string, toolName: string): void {
  // 同一セッション内での重複記録を防ぐ
  const hasTracked = useRef(false)
  const { addToHistory } = useHistory()

  useEffect(() => {
    // 既に記録済みの場合はスキップ
    if (hasTracked.current) return

    // LocalStorageに保存
    saveToolUsage(toolPath, toolName)

    // Vercel Analyticsにイベント送信
    track('tool_visited', {
      tool: toolPath,
      toolName: toolName,
    })

    // 履歴に追加
    addToHistory(toolPath, toolName)

    // 記録済みフラグを立てる
    hasTracked.current = true
  }, [toolPath, toolName, addToHistory])
}
