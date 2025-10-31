/**
 * ツール利用状況トラッキングの型定義
 */

/**
 * ツールの利用記録（LocalStorage保存用）
 */
export interface ToolUsageRecord {
  /** 訪問回数 */
  count: number
  /** 最終訪問日時（ISO 8601形式） */
  lastUsed: string
  /** ツール名（日本語） */
  toolName: string
}

/**
 * すべてのツール利用データ（LocalStorage構造）
 */
export interface ToolUsageData {
  [toolPath: string]: ToolUsageRecord
}

/**
 * ツール利用状況のサマリー（UI表示用）
 */
export interface ToolUsageSummary {
  /** ツールのパス（例: "/timer/countdown"） */
  toolPath: string
  /** ツール名（日本語） */
  toolName: string
  /** 訪問回数 */
  count: number
  /** 最終訪問日時（Dateオブジェクト） */
  lastUsed: Date
}
