# Rakit - Utility Tools Collection

軽量でミニマルなデザインのReactベース/iOSネイティブユーティリティツール集

## 🏗️ モノレポ構成

このリポジトリは、Web版とiOS版の両方を含むモノレポです。

```
/
├── apps/
│   ├── web/              # Webアプリ（React + Vite）
│   └── ios/              # iOSアプリ（Swift + SwiftUI）
├── docs/                 # 共通ドキュメント
├── memories/             # 開発ログ・記録
├── Plans.md              # Web版タスク管理
├── Plans-iOS.md          # iOS版タスク管理
├── CLAUDE.md             # プロジェクト設定
└── AGENTS.md             # 開発ワークフロー
```

## 🚀 クイックスタート

### Web版

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev
# または
npm run web:dev

# ビルド
npm run build
# または
npm run web:build

# 型チェック
npm run type-check
```

### iOS版

```bash
cd apps/ios
open CameraSharing.xcodeproj
```

Xcode でビルド・実行してください。

## 📦 提供するツール

### タイマー系
- カウントダウンタイマー
- ストップウォッチ
- ポモドーロタイマー

### テキストツール
- 文字数カウンター
- テキスト差分表示
- ランダム文字列生成

### その他ツール
- QRコード生成
- パスワード生成
- カラーピッカー
- 現在日時表示（世界時計）
- ルーレット
- **カメラ映像共有**（Web版・iOS版）

## 🎯 カメラ映像共有機能

### Web版
- PeerJS経由でリアルタイム映像・音声共有
- QRコードによる簡単接続
- ブラウザで完結

### iOS版（開発中）
- **ローカルデバイス検索**（Bonjour/mDNS）
- **完全オフライン動作**（インターネット不要）
- Web版との互換性

詳細は [Plans-iOS.md](./Plans-iOS.md) を参照

## 🛠️ 技術スタック

### Web版
- **フレームワーク**: Vite + React 18
- **言語**: TypeScript
- **ルーティング**: React Router v6
- **スタイリング**: Tailwind CSS v4 + shadcn/ui
- **WebRTC**: PeerJS
- **デプロイ**: Vercel

### iOS版
- **言語**: Swift 5.9+
- **UI**: SwiftUI
- **カメラ**: AVFoundation
- **デバイス検索**: Network.framework (Bonjour)
- **WebRTC**: GoogleWebRTC.framework

## 📝 開発ガイド

開発フローの詳細は以下を参照：
- [CLAUDE.md](./CLAUDE.md) - プロジェクト概要と設計原則
- [AGENTS.md](./AGENTS.md) - 開発ワークフロー
- [Plans.md](./Plans.md) - Web版タスク管理
- [Plans-iOS.md](./Plans-iOS.md) - iOS版タスク管理

## 📊 バンドルサイズ

Web版の最適化により、**98.57 KB (gzip)** を達成しています。

- React.lazy() による遅延ローディング
- 外部ライブラリの遅延ローディング（qrcode, html5-qrcode, PeerJS）

詳細は [Plans.md](./Plans.md) の「バンドルサイズの推移」を参照

## 🤖 開発環境

このプロジェクトは [Claude Code](https://claude.com/claude-code) で開発されています。

## ライセンス

MIT
