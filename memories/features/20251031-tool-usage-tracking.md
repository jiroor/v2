# ツール利用状況トラッキング機能

## 日付
2025-10-31

## 実装目的
サイト公開後に、どのツールがよく使われているかを把握するため。ユーザー個人の利用履歴の可視化と、サイト運営者による全体傾向の分析の両方を実現する。

## 設計方針

### 制約条件
- 完全クライアントサイド動作を維持
- ユーザープライバシーを最大限尊重
- バンドルサイズへの影響を最小限に（目標: +1KB以下）
- シンプルで保守しやすい実装

### 採用アプローチ
**ハイブリッド方式**: LocalStorage + Vercel Analytics

#### LocalStorage（ユーザー向け）
- ユーザー個人の利用履歴を保存
- ブラウザ内のみでデータ管理（完全プライベート）
- 「よく使うツール」をホーム画面に表示
- オフライン動作可能

#### Vercel Analytics（運営者向け）
- 全ユーザーの利用傾向を分析
- 軽量（約1KB）でクッキー不要
- リアルタイムダッシュボード
- プライバシー配慮設計

## データ構造

### LocalStorage構造
```typescript
interface ToolUsageData {
  [toolPath: string]: {
    count: number        // 訪問回数
    lastUsed: string     // 最終訪問日時（ISO 8601形式）
    toolName: string     // ツール名（日本語）
  }
}
```

**LocalStorageキー**: `rakit_tool_usage`

**データ例**:
```json
{
  "/timer/countdown": {
    "count": 15,
    "lastUsed": "2025-10-31T10:30:00.000Z",
    "toolName": "カウントダウンタイマー"
  },
  "/text/char-counter": {
    "count": 8,
    "lastUsed": "2025-10-30T14:20:00.000Z",
    "toolName": "文字数カウンター"
  },
  "/other/qrcode": {
    "count": 3,
    "lastUsed": "2025-10-29T09:15:00.000Z",
    "toolName": "QRコード生成"
  }
}
```

### Vercel Analyticsイベント

**イベント名**: `tool_visited`

**プロパティ**:
```typescript
{
  tool: string      // ツールパス（例: "/timer/countdown"）
  toolName: string  // ツール名（日本語）
}
```

**送信タイミング**: ツールページ訪問時（useEffectで1回のみ）

## 実装ファイル

### 1. 型定義
**ファイル**: `src/types/analytics.ts`

```typescript
export interface ToolUsageRecord {
  count: number
  lastUsed: string
  toolName: string
}

export interface ToolUsageData {
  [toolPath: string]: ToolUsageRecord
}

export interface ToolUsageSummary {
  toolPath: string
  toolName: string
  count: number
  lastUsed: Date
}
```

### 2. ユーティリティ関数
**ファイル**: `src/utils/analyticsUtils.ts`

**主要機能**:
- `getToolUsageData()`: LocalStorageからデータ取得
- `saveToolUsage()`: 訪問記録を保存
- `getTopUsedTools()`: 利用回数上位のツールを取得
- `clearToolUsageData()`: データリセット（将来的な設定画面用）

### 3. カスタムフック
**ファイル**: `src/hooks/useToolUsageTracking.ts`

**機能**:
- ツールページのマウント時に自動記録
- LocalStorageへの保存
- Vercel Analyticsへのイベント送信
- 重複記録の防止（同一セッション内での連続訪問）

**使用方法**:
```typescript
// 各ツールページで呼び出す
useToolUsageTracking('/timer/countdown', 'カウントダウンタイマー')
```

### 4. メインエントリーポイント
**ファイル**: `src/main.tsx`

**変更内容**:
```typescript
import { Analytics } from '@vercel/analytics/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <Analytics />
  </React.StrictMode>
)
```

### 5. ホーム画面UI
**ファイル**: `src/pages/Home.tsx`

**追加セクション**: 「よく使うツール」

**表示ロジック**:
- 利用回数上位3-5件を表示
- 未使用の場合は非表示
- クリックで該当ツールへ遷移

**デザイン**:
- 既存のツールカードと同じスタイル
- オレンジのアクセントカラー使用
- レスポンシブ対応

### 6. 各ツールページの修正
**対象ファイル**: 全16ツールページ

**追加コード**:
```typescript
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'

function ToolPage() {
  useToolUsageTracking('/timer/countdown', 'カウントダウンタイマー')
  // 既存のコード...
}
```

**対象ページ一覧**:
- `/timer/countdown` - カウントダウンタイマー
- `/timer/stopwatch` - ストップウォッチ
- `/timer/pomodoro` - ポモドーロタイマー
- `/timer/current-time` - 現在日時
- `/text/char-counter` - 文字数カウンター
- `/text/diff` - テキスト差分表示
- `/text/random-string` - ランダム文字列生成
- `/other/qrcode` - QRコード生成
- `/other/password` - パスワード生成
- `/other/color-picker` - カラーピッカー
- `/other/roulette` - ルーレット

## プライバシー配慮

### 収集しないデータ
- 個人を特定できる情報
- ユーザーの入力内容
- IPアドレス
- デバイス情報の詳細
- クッキー

### 収集するデータ
- ツールの訪問回数（匿名）
- 訪問日時（タイムスタンプのみ）
- ツール名とパス

### ユーザーコントロール
- LocalStorageデータはブラウザのストレージクリアで削除可能
- 将来的に設定画面で個別にオプトアウト可能にする予定

## パフォーマンス考慮

### バンドルサイズ
- Vercel Analytics: 約1KB (gzip圧縮後)
- 自作コード: 約0.5KB未満
- **合計増加**: 1.5KB以下

### 実行コスト
- LocalStorage読み書き: O(1)、非同期不要
- Vercel Analyticsイベント送信: 非同期、バックグラウンド実行
- ページ表示速度への影響: ほぼなし

## 実装手順

### Phase 1: 基盤構築
1. Vercel Analyticsパッケージのインストール
2. 型定義ファイルの作成
3. ユーティリティ関数の実装
4. カスタムフックの実装
5. main.tsxへのAnalyticsコンポーネント追加

### Phase 2: 統合
6. 各ツールページへのフック追加
7. Home.tsxに「よく使うツール」セクション追加

### Phase 3: テスト
8. LocalStorageの動作確認
9. Vercel Analyticsのイベント送信確認
10. UI表示の確認

## 将来的な拡張

### 考えられる機能追加
- ユーザー設定画面でトラッキングのオン/オフ切り替え
- 利用統計の詳細表示（個人の利用履歴グラフなど）
- ツール内アクションのトラッキング（例: ボタンクリック、コピー実行）
- 利用時間の計測

### 非推奨な機能
- サーバーサイドでのデータ保存（クライアントサイド原則に反する）
- サードパーティクッキーの使用
- ユーザー識別子の生成

## リスク・注意点

### 技術的リスク
- LocalStorageの容量制限（通常5-10MB、本機能は数KBなので問題なし）
- ブラウザのプライベートモードでの動作（LocalStorageが無効化される）
- 複数デバイス間での同期不可（設計上の制約）

### プライバシーリスク
- Vercel Analyticsの利用規約変更
- GDPR等のプライバシー規制への対応（現状は問題なし）

### 軽減策
- LocalStorageアクセスをtry-catchで囲む
- プライベートモード時は静かに失敗（エラー表示なし）
- Vercel Analyticsが読み込めない場合も正常動作を保証

## 完了条件

- [ ] 全ツールページで訪問がLocalStorageに記録される
- [ ] Vercel AnalyticsダッシュボードでイベントがTrackされる
- [ ] Home画面に「よく使うツール」が正しく表示される
- [ ] 利用回数が正確にカウントされる
- [ ] プライベートモードでもエラーが発生しない
- [ ] バンドルサイズの増加が2KB以下

## 参考資料

- [Vercel Analytics Documentation](https://vercel.com/docs/analytics)
- [Web Storage API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- プロジェクトの設計原則: `docs/architecture.md`
