# キーボードショートカット機能

## 日付
2025-10-29

## 実装目的
各ツールで頻繁に使用する操作をキーボードショートカットで実行できるようにし、操作効率を向上させる。

## 機能概要
- 各ツールに直感的なショートカットキーを割り当て
- ショートカットキー一覧を表示するコンポーネント
- 入力欄での誤動作防止
- Mac/Windows対応

## 主要なショートカット
- **タイマー系**: Space（開始/停止）、R（リセット）
- **ルーレット**: Space（回転）、R（もう一度）
- **テキストツール**: Ctrl/Cmd + K（クリア）、Ctrl/Cmd + D（コピー）

## 実装ファイル
- src/hooks/useKeyboardShortcut.ts - カスタムフック
- src/components/KeyboardShortcuts/KeyBadge.tsx - キー表示コンポーネント
- src/components/KeyboardShortcuts/KeyboardShortcuts.tsx - 一覧表示コンポーネント
- src/components/KeyboardShortcuts/KeyboardShortcuts.module.css - スタイル
- 各ツールページ - ショートカットの適用

## 実装優先順位
1. Phase 1: 基盤構築（フック、コンポーネント）
2. Phase 2: ルーレットへの適用（最初の適用例）
3. Phase 3: 他のツールへの展開

## リスク・注意点
- 入力欄でのショートカット無効化が必要
- ブラウザ標準のショートカットとの競合を回避
- アクセシビリティ: ショートカットは補助機能、マウス操作も必須

## 完了条件
- [ ] useKeyboardShortcut フックの実装
- [ ] KeyBadge コンポーネントの実装
- [ ] KeyboardShortcuts コンポーネントの実装
- [ ] ルーレットへの適用
- [ ] 動作確認
