/**
 * ツール利用状況トラッキングのカスタムフック
 */

import { useEffect, useRef } from 'react'
import { track } from '@vercel/analytics'
import { saveToolUsage } from '../utils/analyticsUtils'

/**
 * ツールページの訪問を記録するカスタムフック
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

    // 記録済みフラグを立てる
    hasTracked.current = true
  }, [toolPath, toolName])
}
