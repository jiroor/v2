# アーキテクチャ設計

## システム構成

```
┌─────────────────────────────────────┐
│         ユーザー (ブラウザ)          │
└─────────────────┬───────────────────┘
                  │
                  │ HTTPS
                  │
┌─────────────────▼───────────────────┐
│       Vercel (静的ホスティング)      │
│            SPA配信                   │
└─────────────────────────────────────┘
```

**特徴**: 完全クライアントサイド、バックエンド不要

## ディレクトリ構造

```
/
├── index.html                 # エントリーポイント
├── package.json               # 依存関係定義
├── vite.config.ts            # Vite設定
├── tsconfig.json             # TypeScript設定
├── vercel.json               # Vercel設定
├── .gitignore
├── README.md
│
├── docs/                      # 設計ドキュメント
│   ├── README.md
│   ├── architecture.md
│   └── design-system.md
│
├── public/                    # 静的アセット
│   ├── favicon.ico
│   └── manifest.json
│
└── src/
    ├── main.tsx              # アプリケーションエントリー
    ├── App.tsx               # ルートコンポーネント
    ├── App.module.css        # グローバルスタイル
    │
    ├── components/           # 共通コンポーネント
    │   ├── Layout/
    │   │   ├── Header.tsx
    │   │   ├── Header.module.css
    │   │   ├── Sidebar.tsx
    │   │   ├── Sidebar.module.css
    │   │   ├── ToolCard.tsx
    │   │   └── ToolCard.module.css
    │   │
    │   └── common/
    │       ├── Button.tsx
    │       ├── Button.module.css
    │       ├── Input.tsx
    │       └── Input.module.css
    │
    ├── pages/                # ページコンポーネント
    │   ├── Home.tsx
    │   ├── Home.module.css
    │   │
    │   ├── Timer/
    │   │   ├── CountdownTimer.tsx
    │   │   ├── CountdownTimer.module.css
    │   │   ├── Stopwatch.tsx
    │   │   ├── Stopwatch.module.css
    │   │   ├── PomodoroTimer.tsx
    │   │   └── PomodoroTimer.module.css
    │   │
    │   ├── TextTools/
    │   │   ├── CharCounter.tsx
    │   │   ├── CharCounter.module.css
    │   │   ├── TextDiff.tsx
    │   │   ├── TextDiff.module.css
    │   │   ├── RandomString.tsx
    │   │   └── RandomString.module.css
    │   │
    │   └── Others/
    │       ├── QRCodeGenerator.tsx
    │       ├── QRCodeGenerator.module.css
    │       ├── PasswordGenerator.tsx
    │       ├── PasswordGenerator.module.css
    │       ├── ColorPicker.tsx
    │       └── ColorPicker.module.css
    │
    ├── hooks/                # カスタムフック
    │   ├── useTimer.ts       # タイマー共通ロジック
    │   ├── useLocalStorage.ts # 設定永続化
    │   └── useNotification.ts # ブラウザ通知
    │
    ├── utils/                # ユーティリティ関数
    │   ├── converter.ts      # 単位変換ロジック
    │   ├── textUtils.ts      # テキスト処理
    │   └── validation.ts     # バリデーション
    │
    ├── types/                # 型定義
    │   └── index.ts
    │
    └── constants/            # 定数定義
        └── index.ts
```

## コンポーネント設計

### レイアウト階層

```
App (ルート)
├── Header (ナビゲーション)
├── Sidebar (ツール一覧)
└── Main (メインコンテンツ)
    └── Router
        ├── Home (ツールカード一覧)
        ├── Timer (タイマー系ツール)
        ├── TextTools (テキストツール)
        └── Others (その他ツール)
```

### コンポーネント責務

| コンポーネント | 責務 | 状態管理 |
|--------------|------|---------|
| App | ルーティング、全体レイアウト | なし |
| Header | ナビゲーション、タイトル表示 | なし |
| Sidebar | ツール一覧、リンク | なし |
| ToolCard | ツール情報カード表示 | なし |
| 各ツールページ | ツール固有ロジック | ローカル状態 |

## 状態管理戦略

### ローカル状態 (useState)
各ツールの内部状態
- タイマーの残り時間
- テキストエリアの内容
- 生成されたQRコード

### 永続化状態 (LocalStorage)
- ユーザー設定
- ツールの履歴
- お気に入りツール

### グローバル状態
**不要** - 小規模アプリのため、Context API も使用しない

## ルーティング設計

```typescript
/                          # ホーム (ツール一覧)

/timer/countdown           # カウントダウンタイマー
/timer/stopwatch           # ストップウォッチ
/timer/pomodoro            # ポモドーロタイマー

/text/counter              # 文字数カウンター
/text/diff                 # テキスト差分
/text/random               # ランダム文字列

/tools/qrcode              # QRコード生成
/tools/password            # パスワード生成
/tools/color               # カラーピッカー
```

## データフロー

```
┌──────────────┐
│  ユーザー入力 │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ コンポーネント │ ───┐
│  (useState)   │    │
└──────┬───────┘    │
       │            │
       │            │ 必要に応じて
       ▼            │
┌──────────────┐    │
│ utils/hooks  │    │
│  (ロジック)   │    │
└──────┬───────┘    │
       │            │
       ▼            ▼
┌──────────────────────┐
│   LocalStorage       │
│  (設定・履歴保存)     │
└──────────────────────┘
```

## パフォーマンス最適化

### コード分割
```typescript
// 遅延ローディング
const CountdownTimer = lazy(() => import('./pages/Timer/CountdownTimer'))
const CharCounter = lazy(() => import('./pages/TextTools/CharCounter'))
```

### メモ化
```typescript
// 重い計算結果のキャッシュ
const result = useMemo(() => expensiveCalculation(input), [input])

// コンポーネントの再レンダリング抑制
const MemoizedComponent = memo(Component)
```

### バンドル最適化
- Tree shaking (使用しないコードの削除)
- Minification (コード圧縮)
- Gzip圧縮

## セキュリティ考慮事項

1. **XSS対策**
   - Reactのデフォルトエスケープを利用
   - `dangerouslySetInnerHTML` は使用しない

2. **HTTPS必須**
   - Vercelは自動的にHTTPS提供

3. **パスワード生成**
   - クライアントサイドで暗号学的に安全な乱数を使用

## 開発環境

```bash
# 開発サーバー起動
npm run dev         # http://localhost:5173

# ビルド
npm run build       # dist/に出力

# プレビュー
npm run preview     # ビルド結果確認

# 型チェック
npm run type-check
```

## Vercelへのデプロイ

### 設定

**ビルドコマンド**: `npm run build`
**出力ディレクトリ**: `dist`
**フレームワーク**: Vite

### vercel.json

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 自動デプロイ

- mainブランチへのpush → 本番環境自動デプロイ
- プルリクエスト → プレビュー環境自動生成

### 環境変数

現時点では不要（すべてクライアントサイド処理）

## 依存関係

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "qrcode": "^1.5.3"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/qrcode": "^1.5.5",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  }
}
```

**ポリシー**: 必要最小限のライブラリのみ使用し、バンドルサイズを最小化
