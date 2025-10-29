# キーボードショートカット設計

## 概要

各ツールで頻繁に使用する操作をキーボードショートカットで実行できるようにし、操作効率を向上させる。

## 設計原則

1. **直感的**: 操作内容と関連するキーを使用（Start → S、Reset → R など）
2. **衝突回避**: ブラウザ標準のショートカットと競合しない
3. **一貫性**: 類似機能には同じキーを割り当てる
4. **表示**: ショートカットキー一覧を常に表示して使いやすさを向上

## ショートカットキー一覧

### タイマー系共通
| キー | 操作 | 説明 |
|-----|------|------|
| `Space` | 開始/一時停止 | タイマーの開始・一時停止を切り替え |
| `R` | リセット | タイマーを初期状態に戻す |
| `Escape` | 停止 | タイマーを停止（ポモドーロのみ） |

### カウントダウンタイマー
| キー | 操作 | 説明 |
|-----|------|------|
| `Space` | 開始/一時停止 | カウントダウンの開始・一時停止 |
| `R` | リセット | 設定時間に戻す |
| `1` | 1分設定 | 素早く1分に設定 |
| `3` | 3分設定 | 素早く3分に設定 |
| `5` | 5分設定 | 素早く5分に設定 |

### ストップウォッチ
| キー | 操作 | 説明 |
|-----|------|------|
| `Space` | 開始/一時停止 | 計測の開始・一時停止 |
| `R` | リセット | 0:00に戻す |
| `L` | ラップ | ラップタイムを記録 |

### ポモドーロタイマー
| キー | 操作 | 説明 |
|-----|------|------|
| `Space` | 開始/一時停止 | タイマーの開始・一時停止 |
| `R` | リセット | 現在のセッションをリセット |
| `N` | 次へ | 次のセッションにスキップ |
| `Escape` | 停止 | タイマーを完全停止 |

### テキストツール（カウンター、差分、ランダム文字列）
| キー | 操作 | 説明 |
|-----|------|------|
| `Ctrl/Cmd + K` | クリア | テキストエリアをクリア |
| `Ctrl/Cmd + D` | コピー | 結果をクリップボードにコピー |

### ルーレット
| キー | 操作 | 説明 |
|-----|------|------|
| `Space` | 回転開始 | ルーレットを回す |
| `R` | もう一度 | 再度回転（当選後のみ） |
| `A` | 項目追加 | 入力欄にフォーカス |

### QRコード生成
| キー | 操作 | 説明 |
|-----|------|------|
| `Ctrl/Cmd + S` | ダウンロード | QRコードを保存 |
| `Ctrl/Cmd + D` | コピー | QRコードをクリップボードにコピー |

### パスワード生成
| キー | 操作 | 説明 |
|-----|------|------|
| `Space` | 生成 | 新しいパスワードを生成 |
| `Ctrl/Cmd + D` | コピー | パスワードをコピー |

### カラーピッカー
| キー | 操作 | 説明 |
|-----|------|------|
| `Ctrl/Cmd + D` | コピー | 現在の色コードをコピー |
| `R` | ランダム | ランダムな色を生成 |

## 技術実装

### 1. カスタムフック: `useKeyboardShortcut`

```typescript
// src/hooks/useKeyboardShortcut.ts
export interface ShortcutConfig {
  key: string
  description: string
  action: () => void
  ctrl?: boolean
  meta?: boolean
  shift?: boolean
  disabled?: boolean
}

export const useKeyboardShortcut = (shortcuts: ShortcutConfig[]) => {
  // ショートカットの登録・解除ロジック
}
```

### 2. ショートカット一覧表示コンポーネント

```typescript
// src/components/KeyboardShortcuts/KeyboardShortcuts.tsx
interface KeyboardShortcutsProps {
  shortcuts: ShortcutConfig[]
  title?: string
  collapsible?: boolean
}

export const KeyboardShortcuts = ({ shortcuts, title, collapsible }: KeyboardShortcutsProps) => {
  // ショートカットキーの一覧を表示
  // デフォルトで展開、折りたたみ可能
}
```

### 3. キー表示コンポーネント

```typescript
// src/components/KeyboardShortcuts/KeyBadge.tsx
interface KeyBadgeProps {
  keyName: string
  ctrl?: boolean
  meta?: boolean
  shift?: boolean
}

export const KeyBadge = ({ keyName, ctrl, meta, shift }: KeyBadgeProps) => {
  // キーボードキーを視覚的に表示（例: ⌘ + D）
}
```

## UI設計

### 配置
- ページ下部に固定配置
- 折りたたみ可能
- 初回訪問時は展開、2回目以降は折りたたみ（LocalStorage）

### デザイン
- ミニマルなテーブル形式
- キーは視覚的なバッジで表示（Mac: ⌘、Windows: Ctrl）
- グレー背景で控えめに

### レスポンシブ
- モバイル: アコーディオン形式
- デスクトップ: テーブル形式

## 実装優先順位

### Phase 1: 基盤構築
1. `useKeyboardShortcut` フックの実装
2. `KeyBadge` コンポーネントの実装
3. `KeyboardShortcuts` 一覧コンポーネントの実装

### Phase 2: 各ツールへの適用
1. タイマー系（カウントダウン、ストップウォッチ、ポモドーロ）
2. ルーレット
3. テキストツール
4. その他ツール

### Phase 3: 改善
1. ショートカットのカスタマイズ機能
2. グローバルショートカット（ツール間の移動）

## 注意点

1. **入力欄でのショートカット**: テキスト入力中は一部ショートカットを無効化
2. **ブラウザ競合**: `Ctrl + S`, `Ctrl + P` などは `preventDefault()` で制御
3. **アクセシビリティ**: ショートカットキーは必須ではなく、マウス操作も可能
4. **国際化**: Mac（⌘）と Windows（Ctrl）の表記を自動判定

## 将来の拡張

- ショートカットキーのカスタマイズUI
- ツール間移動のグローバルショートカット（例: `Ctrl + 1` で最初のツールへ）
- ショートカットの検索機能（`?` キーでヘルプモーダル表示）
