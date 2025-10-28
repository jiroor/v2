# ポモドーロタイマー

## 日付
2025-10-29

## 実装目的
集中作業と休憩を繰り返すポモドーロテクニックを実装する。25分の作業時間と5分の休憩時間を自動で切り替えることで、生産性を向上させる。

## 画面構成・UI
- 現在のモード表示（作業中 / 休憩中）
- 残り時間の表示（MM:SS形式）
- セッション回数のカウント表示
- 開始/一時停止/リセットボタン
- モードの自動切り替え通知

## データ構造

### usePomodoroフック
```typescript
interface UsePomodoroReturn {
  time: number              // 残り時間（ミリ秒）
  isRunning: boolean        // タイマー動作中か
  mode: 'work' | 'break'    // 現在のモード
  sessions: number          // 完了した作業セッション数
  start: () => void
  pause: () => void
  reset: () => void
}
```

### 定数
- WORK_TIME: 25分（1500000ミリ秒）
- BREAK_TIME: 5分（300000ミリ秒）
- LONG_BREAK_TIME: 15分（900000ミリ秒）※将来的に実装
- SESSIONS_BEFORE_LONG_BREAK: 4回

## 実装ファイル
- src/hooks/usePomodoro.ts - ポモドーロロジック
- src/pages/Timer/PomodoroTimer.tsx - UIコンポーネント
- src/pages/Timer/PomodoroTimer.module.css - スタイル
- src/App.tsx - ルーティング追加
- src/pages/Home.tsx - リンク有効化

## 技術的な設計判断

### タイマーの実装方法
- カウントダウンタイマーと同じく、経過時間ベースの計算を使用
- setIntervalの累積誤差を避けるため、Date.now()で正確な時間を計測

### モードの自動切り替え
- タイマーが0になったら、自動的に次のモードに切り替え
- 作業完了時はセッションカウントを増やす
- 切り替え時は一時停止状態にする（ユーザーが準備できてから開始）

### 状態管理
- mode: 'work' | 'break' でモードを管理
- sessions: 完了した作業セッション数を記録
- 各モードで異なる初期時間を設定

## リスク・注意点
- ブラウザのタブがバックグラウンドになると、setIntervalの精度が低下する可能性
  - → 経過時間ベースの計算で対応
- モード切り替え時の通知機能は、Phase 1では実装しない（音声/通知APIは後回し）
- 長い休憩時間（4セッション後）は、Phase 1では未実装

## 完了条件
- [x] memories/features/にポモドーロタイマーの設計を記録
- [ ] usePomodoroフックを実装
- [ ] PomodoroTimerコンポーネントを実装
- [ ] App.tsxにルーティングを追加
- [ ] Home.tsxのリンクを有効化
- [ ] chrome-devtools-mcpで動作確認
- [ ] 作業モードから休憩モードへの自動切り替えを確認
- [ ] 休憩モードから作業モードへの自動切り替えを確認
- [ ] セッションカウントが正しく増えることを確認
- [ ] コミット
