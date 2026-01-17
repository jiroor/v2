/**
 * ツール利用状況トラッキングのユーティリティ関数
 */

import type { ToolUsageData, ToolUsageSummary } from '../types/analytics'

/** LocalStorageのキー名 */
const STORAGE_KEY = 'rakit_tool_usage'

/**
 * LocalStorageからツール利用データを取得
 */
export function getToolUsageData(): ToolUsageData {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : {}
  } catch (error) {
    console.error('Failed to load tool usage data:', error)
    return {}
  }
}

/**
 * ツールの訪問記録をLocalStorageに保存
 * @param toolPath ツールのパス（例: "/timer/countdown"）
 * @param toolName ツール名（日本語）
 */
export function saveToolUsage(toolPath: string, toolName: string): void {
  try {
    const data = getToolUsageData()
    const now = new Date().toISOString()

    if (data[toolPath]) {
      // 既存の記録を更新
      data[toolPath].count += 1
      data[toolPath].lastUsed = now
    } else {
      // 新規記録を作成
      data[toolPath] = {
        count: 1,
        lastUsed: now,
        toolName,
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Failed to save tool usage:', error)
  }
}

/**
 * 利用回数の多い順にツールを取得
 * @param limit 取得する件数（デフォルト: 5）
 * @returns ツール利用状況のサマリー配列
 */
export function getTopUsedTools(limit = 5): ToolUsageSummary[] {
  try {
    const data = getToolUsageData()
    const summaries: ToolUsageSummary[] = Object.entries(data).map(
      ([toolPath, record]) => ({
        toolPath,
        toolName: record.toolName,
        count: record.count,
        lastUsed: new Date(record.lastUsed),
      })
    )

    // 利用回数の多い順にソート
    summaries.sort((a, b) => b.count - a.count)

    // 指定件数だけ返す
    return summaries.slice(0, limit)
  } catch (error) {
    console.error('Failed to get top used tools:', error)
    return []
  }
}

/**
 * ツール利用データをクリア（将来的な設定画面用）
 */
export function clearToolUsageData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear tool usage data:', error)
  }
}
