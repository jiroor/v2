# QRコード生成

## 日付
2025-10-29

## 実装目的
テキストやURLからQRコードを生成する。スマートフォンで読み取ることで簡単に情報を共有できる。名刺、ポスター、Webサイトなどでの利用を想定。

## 画面構成・UI
- テキスト入力エリア
  - URL、テキスト、電話番号、メールアドレスなど
  - プレースホルダー: "URL、テキスト、電話番号などを入力..."
- QRコード表示エリア
  - 生成されたQRコードをcanvasで表示
  - サイズ: 256x256px（デフォルト）
- サイズ選択（オプション）
  - 小（128x128px）
  - 中（256x256px）- デフォルト
  - 大（512x512px）
- ダウンロードボタン（PNG画像として保存）
- クリアボタン

## データ構造

### QRコードオプション型
```typescript
interface QRCodeOptions {
  text: string
  size: number
  margin?: number
}
```

## 実装ファイル
- src/pages/OtherTools/QRCodeGenerator.tsx - UIコンポーネント
- src/pages/OtherTools/QRCodeGenerator.module.css - スタイル
- src/App.tsx - ルーティング追加
- src/pages/Home.tsx - リンク有効化

## 技術的な設計判断

### QRコード生成ライブラリ
- **qrcode** ライブラリを使用
  - 軽量（～10KB gzipped）
  - シンプルなAPI
  - Canvas、SVG、Data URL出力をサポート
  - 依存関係が少ない
  - TypeScript型定義あり

### 実装方法
- canvasベースでQRコードを生成
- useRefでcanvas要素を参照
- useEffectでテキスト変更時にQRコードを再生成
- エラーハンドリング（空文字列、生成失敗など）

### ダウンロード機能
- canvas.toBlob()でPNG画像に変換
- 一時的なaタグを作成してダウンロード
- ファイル名: `qrcode-YYYYMMDD-HHmmss.png`

## リスク・注意点
- 外部ライブラリ（qrcode）を使用するため、バンドルサイズが増加
  - → 約10KB gzippedなので許容範囲内
- 大きなサイズ（512px）のQRコードは生成に時間がかかる可能性
  - → 通常は問題ないが、極端に大きなテキストは避ける
- 長いテキストはQRコードが複雑になり読み取りにくくなる
  - → UIで適切な入力制限やガイドは設けない（自由に入力可能）

## 完了条件
- [x] memories/features/にQRコード生成の設計を記録
- [ ] qrcodeライブラリをインストール
- [ ] QRCodeGeneratorコンポーネントを実装
- [ ] App.tsxにルーティングを追加
- [ ] Home.tsxのリンクを有効化
- [ ] chrome-devtools-mcpで動作確認
- [ ] URLを入力してQRコードが生成されることを確認
- [ ] サイズ変更が正しく機能することを確認
- [ ] ダウンロードボタンが正しく動作することを確認
- [ ] コミット
