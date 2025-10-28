# ランダム文字列生成

## 日付
2025-10-29

## 実装目的
ランダムな文字列を生成する。パスワード、トークン、一時的なIDなどの用途に使用できる。文字種と長さをカスタマイズ可能。

## 画面構成・UI
- 文字列長さの入力（スライダーまたは数値入力）
  - デフォルト: 16文字
  - 範囲: 4〜64文字
- 文字種の選択（チェックボックス）
  - 大文字アルファベット（A-Z）
  - 小文字アルファベット（a-z）
  - 数字（0-9）
  - 記号（!@#$%^&*など）
- 生成ボタン
- 生成された文字列の表示エリア
- コピーボタン（クリップボードにコピー）
- 再生成ボタン

## データ構造

### 文字セット定数
```typescript
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*()-_=+[]{}|;:,.<>?'
```

### 生成オプション型
```typescript
interface RandomStringOptions {
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
}
```

### randomStringUtils関数
```typescript
function generateRandomString(options: RandomStringOptions): string
```

## 実装ファイル
- src/utils/randomStringUtils.ts - ランダム文字列生成ロジック
- src/pages/TextTools/RandomString.tsx - UIコンポーネント
- src/pages/TextTools/RandomString.module.css - スタイル
- src/App.tsx - ルーティング追加
- src/pages/Home.tsx - リンク有効化

## 技術的な設計判断

### ランダム性の実装
- **crypto.getRandomValues()** を使用
  - Math.random()より暗号学的に安全
  - ブラウザ標準APIで外部ライブラリ不要
  - パスワード生成にも使用可能な品質

### アルゴリズム
1. 選択された文字種から利用可能な文字セットを構築
2. crypto.getRandomValues()でランダムなバイト配列を生成
3. バイト値を文字セットのインデックスに変換
4. 指定された長さの文字列を構築

### UI/UX設計
- スライダーと数値入力の両方を提供（使いやすさ）
- 少なくとも1つの文字種を選択必須（有効な文字列生成のため）
- デフォルトは全文字種を有効化
- ワンクリックでコピー機能
- 生成された文字列は等幅フォントで表示

### セキュリティ考慮
- crypto.getRandomValues()で暗号学的に安全な乱数を使用
- 生成された文字列をローカルストレージに保存しない
- コピー機能は標準のClipboard APIを使用

## リスク・注意点
- 古いブラウザではcrypto.getRandomValues()が使えない可能性
  - → モダンブラウザのみをターゲットとするため問題なし
- 長すぎる文字列（64文字超）は生成しない
  - → UIで最大64文字に制限

## 完了条件
- [x] memories/features/にランダム文字列の設計を記録
- [ ] randomStringUtilsを実装
- [ ] RandomStringコンポーネントを実装
- [ ] App.tsxにルーティングを追加
- [ ] Home.tsxのリンクを有効化
- [ ] chrome-devtools-mcpで動作確認
- [ ] 各文字種のオン/オフが正しく機能することを確認
- [ ] 文字列長さの変更が正しく反映されることを確認
- [ ] コピーボタンが正しく動作することを確認
- [ ] 再生成ボタンで異なる文字列が生成されることを確認
- [ ] コミット
