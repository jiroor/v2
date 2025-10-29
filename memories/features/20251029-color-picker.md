# カラーピッカー

## 日付
2025-10-29

## 実装目的
色を選択してHEX、RGB、HSL形式で表示・変換する。デザイン作業やWeb開発で色コードを取得する際に便利。

## 画面構成・UI
- カラーピッカー（HTML5 input type="color"）
  - デフォルト色: #3B82F6（青）
- 選択された色の大きなプレビュー
- 色コード表示セクション
  - HEX形式（例: #3B82F6）
  - RGB形式（例: rgb(59, 130, 246)）
  - HSL形式（例: hsl(217, 91%, 60%)）
- 各形式の入力フィールド
  - HEXを入力すると他の形式も自動更新
  - RGBを入力すると他の形式も自動更新
  - HSLを入力すると他の形式も自動更新
- コピーボタン（各形式ごと）

## データ構造

### カラー型
```typescript
interface ColorFormats {
  hex: string
  rgb: { r: number; g: number; b: number }
  hsl: { h: number; s: number; l: number }
}
```

## 実装ファイル
- src/utils/colorUtils.ts - 色変換ロジック
- src/pages/OtherTools/ColorPicker.tsx - UIコンポーネント
- src/pages/OtherTools/ColorPicker.module.css - スタイル
- src/App.tsx - ルーティング追加
- src/pages/Home.tsx - リンク有効化

## 技術的な設計判断

### 色変換アルゴリズム
- **HEX → RGB**: 16進数を10進数に変換
- **RGB → HEX**: 10進数を16進数に変換
- **RGB → HSL**: 標準的なRGB→HSL変換式を使用
- **HSL → RGB**: 標準的なHSL→RGB変換式を使用
- 外部ライブラリを使わず、純粋なJavaScriptで実装

### カラーピッカーの実装
- HTML5の `<input type="color">` を使用
  - モダンブラウザでネイティブサポート
  - OSのカラーピッカーUIを利用
  - シンプルで軽量

### 入力と相互変換
- useStateで選択中の色を管理
- 各形式の入力フィールドから変更可能
- 入力時にバリデーションを実施
- 不正な値の場合はエラー表示またはデフォルト値

## リスク・注意点
- HSL → RGB → HEX → RGB → HSL の変換で丸め誤差が発生する可能性
  - → 小数点以下の精度を適切に処理
- HEX入力のバリデーション（#RRGGBB形式チェック）
- RGB入力のバリデーション（0-255の範囲チェック）
- HSL入力のバリデーション（H: 0-360, S/L: 0-100）

## 完了条件
- [x] memories/features/にカラーピッカーの設計を記録
- [ ] colorUtilsを実装
- [ ] ColorPickerコンポーネントを実装
- [ ] App.tsxにルーティングを追加
- [ ] Home.tsxのリンクを有効化
- [ ] chrome-devtools-mcpで動作確認
- [ ] カラーピッカーで色を選択してすべての形式が表示されることを確認
- [ ] HEX入力からRGB/HSLへの変換を確認
- [ ] コピーボタンが正しく動作することを確認
- [ ] コミット
