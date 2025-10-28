# ストップウォッチ

## 日付
2025-10-28

## 実装目的
時間計測とラップタイム記録機能を提供する。
ユーザーがスタート/ストップ操作を行い、ラップタイムを記録できる。

## 画面構成・UI
- 大きなタイマー表示（MM:SS.ms形式）
- スタート/ストップボタン
- ラップボタン（実行中のみ有効）
- リセットボタン
- ラップタイム一覧（最新が上）
- ミニマルなデザイン

## データ構造

### useStopwatch カスタムフック
```typescript
interface Lap {
  id: number;
  time: number;      // ラップタイム（ミリ秒）
  total: number;     // 累計時間（ミリ秒）
}

interface UseStopwatchReturn {
  time: number;           // 経過時間（ミリ秒）
  isRunning: boolean;     // 実行中か
  laps: Lap[];           // ラップタイム配列
  start: () => void;      // スタート
  stop: () => void;       // ストップ
  reset: () => void;      // リセット
  addLap: () => void;     // ラップ追加
}
```

## 実装ファイル
- src/hooks/useStopwatch.ts - ストップウォッチロジック
- src/pages/Timer/Stopwatch.tsx - ストップウォッチUI
- src/pages/Timer/Stopwatch.module.css - スタイル

## 実装方針
1. カウントアップ式（0から増加）
2. ミリ秒単位で表示（00:00.00形式）
3. ラップタイムは配列で管理、最新を上に表示
4. 経過時間ベースで正確に計算
5. LocalStorageへの保存は不要（シンプルさ優先）

## リスク・注意点
- タイマー精度: カウントダウンタイマーと同じく経過時間ベースで計算
- ラップタイムの表示数: 無制限だが、パフォーマンスを考慮して最大100個程度に制限する可能性
- バンドルサイズ: 外部ライブラリは使わず、標準APIのみ使用

## 完了条件
- [ ] useStopwatchフック作成
- [ ] Stopwatchコンポーネント作成
- [ ] スタート/ストップ/リセット動作確認
- [ ] ラップタイム機能動作確認
- [ ] ルーティング追加
- [ ] ホームページからリンク追加
- [ ] chrome-devtools-mcpで動作確認
