# Plans.md - タスク管理

このファイルは、プロジェクトのタスクと進捗を管理します。

---

## 🚀 現在の優先タスク

### バンドルサイズ最適化（緊急）

**現状**: 207.77 KB (gzip)
**目標**: < 100 KB (gzip)
**期限**: なるべく早く

#### タスク

- [ ] React.lazy() でページコンポーネントを遅延ローディング化
  - [ ] Timer 系ページ（CountdownTimer, Stopwatch, PomodoroTimer, CurrentTime）
  - [ ] TextTools 系ページ（CharCounter, TextDiff, RandomString）
  - [ ] Others 系ページ（QRCodeGenerator, PasswordGenerator, ColorPicker, Roulette）
  - [ ] Camera 系ページ（CameraMode, ViewerMode, CameraSharing）
- [ ] App.tsx でルート定義を更新（React.lazy + Suspense）
- [ ] ビルドして効果を確認
- [ ] 目標達成（< 100KB）を確認
- [ ] コミット

**期待される効果**:
- 初回ロードサイズの削減
- ページ遷移時のみ必要なコードを読み込み
- Core Web Vitals の改善

---

## 📋 バックログ

### パフォーマンス最適化

- [ ] 外部ライブラリの最適化
  - [ ] html5-qrcode の遅延ローディング（カメラページでのみ使用）
  - [ ] qrcode の遅延ローディング（QRコード生成ページでのみ使用）
  - [ ] PeerJS の遅延ローディング（カメラ共有機能でのみ使用）
- [ ] 画像最適化
  - [ ] public/ 内の画像を WebP 形式に変換
  - [ ] 画像の遅延ローディング
- [ ] CSS の最適化
  - [ ] 未使用 Tailwind クラスの削除

### PWA 改善

- [ ] オフラインキャッシュ戦略の最適化
- [ ] アプリアイコンの追加
- [ ] インストールプロンプトの実装

### アクセシビリティ

- [ ] すべてのページで ARIA ラベルを確認
- [ ] キーボードナビゲーションのテスト
- [ ] スクリーンリーダーのテスト
- [ ] カラーコントラスト比の確認

### テスト追加

- [ ] 主要コンポーネントのユニットテスト
- [ ] E2E テストの導入検討
- [ ] CI/CD パイプラインの構築

### 機能追加（検討中）

- [ ] ダークモード対応
- [ ] 多言語対応（英語）
- [ ] ツール使用統計のダッシュボード
- [ ] ツールのお気に入り機能

---

## ✅ 完了したタスク

### Phase 1: 基盤構築（完了）

- [x] プロジェクト設計
- [x] Vite + React セットアップ
- [x] ルーティング設定
- [x] 基本レイアウト作成
- [x] Tailwind CSS v4 + shadcn/ui セットアップ

### Phase 2: コアツール実装（完了）

- [x] カウントダウンタイマー
- [x] ストップウォッチ
- [x] 文字数カウンター
- [x] ポモドーロタイマー
- [x] テキスト差分
- [x] ランダム文字列生成
- [x] QRコード生成
- [x] パスワード生成
- [x] カラーピッカー
- [x] 現在日時表示（世界時計）
- [x] ルーレット

### Phase 3: 高度な機能（完了）

- [x] カメラ映像共有機能
- [x] PWA 対応
- [x] SEO 最適化
- [x] ツール使用状況トラッキング
- [x] キーボードショートカット
- [x] カメラ共有の共有機能強化（Phase 1）

---

## 📝 ノート

### バンドルサイズの推移

| 日付 | サイズ (gzip) | メモ |
|------|--------------|------|
| 2025-01-16 | 207.77 KB | 初回測定（目標超過） |

### 技術的負債

1. **バンドルサイズ超過**: 最優先で対応
2. **テスト不足**: E2E テストが未実装
3. **型定義の不完全性**: 一部で `any` が使用されている可能性

### 参考リンク

- [Vite - Code Splitting](https://vitejs.dev/guide/features.html#code-splitting)
- [React - Lazy Loading](https://react.dev/reference/react/lazy)
- [Web.dev - Bundle Size Optimization](https://web.dev/reduce-javascript-payloads-with-code-splitting/)

---

## 🔄 更新履歴

| 日付 | 変更内容 |
|------|---------|
| 2025-01-16 | Plans.md 初回作成、バンドルサイズ最適化タスクを追加 |
