# カウントダウンタイマー

## 日付
2025-10-28

## 実装目的
指定した時間からカウントダウンを行うタイマー機能を提供する。
ユーザーが時・分・秒を設定し、スタート/ストップ/リセット操作ができる。

## 画面構成・UI
- 時間設定UI（時・分・秒の入力フィールド）
- 大きなタイマー表示（HH:MM:SS形式）
- スタート/ストップボタン
- リセットボタン
- ミニマルなデザイン、ボタンは視認性高く

## データ構造

### useTimer カスタムフック
```typescript
interface UseTimerReturn {
  time: number;           // 残り時間（ミリ秒）
  isRunning: boolean;     // 実行中か
  start: () => void;      // スタート
  stop: () => void;       // ストップ
  reset: () => void;      // リセット
}
```

### CountdownTimer コンポーネント
```typescript
interface CountdownTimerState {
  hours: number;
  minutes: number;
  seconds: number;
}
```

## 実装ファイル
- src/hooks/useTimer.ts - タイマーロジック
- src/pages/Timer/CountdownTimer.tsx - タイマーUI
- src/pages/Timer/CountdownTimer.module.css - スタイル

## 実装方針
1. `setInterval`ではなく`requestAnimationFrame`または正確な時間計算を使用
2. タイマーが0になったら自動停止
3. バックグラウンドでも正確に動作するよう、経過時間ベースで計算
4. LocalStorageへの保存は不要（シンプルさ優先）

## リスク・注意点
- タイマー精度: `setInterval`は不正確なので、開始時刻と現在時刻の差分で計算
- バンドルサイズ: 外部ライブラリは使わず、標準APIのみ使用
- 通知機能: 初期バージョンでは実装せず、後で追加検討

## 完了条件
- [x] useTimerフック作成
- [x] CountdownTimerコンポーネント作成
- [x] スタート/ストップ/リセット動作確認
- [x] ルーティング追加
- [x] ホームページからリンク追加
