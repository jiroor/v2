# PWA対応実装

## 日付
2025-11-06

## 実装目的
スマホでアプリケーション全体を使いやすくするため、PWA（Progressive Web App）対応を実装する。
ホーム画面に追加でき、オフラインでも動作し、ネイティブアプリのような体験を提供する。

## 機能要件

### 必須機能
- ホーム画面への追加（Add to Home Screen）
- オフライン対応（基本的なページ表示）
- アプリアイコンとスプラッシュスクリーン
- スタンドアローン表示（ブラウザUIなし）
- 自動更新通知（新しいバージョンが利用可能な場合）

### 対応範囲
- 完全オフライン動作（すべての静的リソース）
- キャッシュ戦略: StaleWhileRevalidate
- 更新方式: prompt（ユーザーに通知）

### 対応外
- プッシュ通知（Phase 4で検討）
- バックグラウンド同期（不要）
- 外部API連携（存在しない）

## 画面構成・UI

### 更新通知トースト
- 位置: 画面下部中央
- 内容: 「新しいバージョンが利用可能です」
- ボタン: 「更新」「後で」
- スタイル: ミニマルデザイン、黒背景、白文字

### PWAインストール時の表示
- アプリ名: Rakit
- 説明: 楽に使えるツール集
- テーマカラー: 黒（#000000）
- 背景色: 白（#ffffff）

## データ構造

### manifest.json
```json
{
  "name": "Rakit",
  "short_name": "Rakit",
  "description": "楽に使える、軽量でミニマルなユーティリティツール集",
  "theme_color": "#000000",
  "background_color": "#ffffff",
  "display": "standalone",
  "start_url": "/",
  "scope": "/",
  "icons": [...]
}
```

### Service Worker設定（vite-plugin-pwa）
```typescript
{
  registerType: 'prompt',
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
    runtimeCaching: [{
      urlPattern: /^https:\/\/.*/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'external-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 30 // 30日
        }
      }
    }]
  }
}
```

## 実装ファイル

### 新規作成
- `public/manifest.json` - Web App Manifest
- `public/icon-192.png` - PWAアイコン（192x192）
- `public/icon-512.png` - PWAアイコン（512x512）
- `public/apple-touch-icon.png` - Apple Touch Icon（180x180）
- `src/components/UpdatePrompt.tsx` - 更新通知コンポーネント
- `src/components/UpdatePrompt.module.css` - 更新通知スタイル

### 変更
- `vite.config.ts` - vite-plugin-pwa追加
- `index.html` - メタタグ追加（manifest、theme-color、apple-mobile-web-app-capable）
- `src/App.tsx` - UpdatePromptコンポーネント追加
- `package.json` - vite-plugin-pwa依存関係追加

## 技術選定

- **vite-plugin-pwa**: Service Worker自動生成、Workbox統合
- **Workbox**: 実績のあるキャッシュ戦略ライブラリ
- **キャッシュ戦略**: StaleWhileRevalidate（高速 + 最新性）
- **更新方式**: prompt（ユーザーに通知して更新）

## リスク・注意点

1. **バンドルサイズ増加**
   - Service Worker追加で約50KB増加予想
   - 対策: gzip圧縮後も100KB以内に収める
   - モニタリング: ビルド時にサイズチェック

2. **開発時のキャッシュ問題**
   - 開発中にキャッシュが邪魔になる可能性
   - 対策: 開発モードではService Worker無効化

3. **iOS Safariの制限**
   - PWAの一部機能に制限あり
   - 対策: 基本機能（オフライン、ホーム画面追加）に限定

4. **更新タイミング**
   - ユーザーが更新を拒否し続ける可能性
   - 対策: 次回起動時に再度通知を表示

## パフォーマンス目標

- gzip圧縮後のバンドルサイズ: < 100KB
- Lighthouse PWAスコア: 100点
- オフライン時のページ表示: < 1秒
- Service Workerの登録時間: < 500ms

## 完了条件

- [x] PWA設計判断をmemoriesに記録
- [ ] vite-plugin-pwaをインストール
- [ ] PWAアイコンファイルを準備（192x192, 512x512, 180x180）
- [ ] manifest.jsonを作成
- [ ] Vite設定を更新（PWA plugin追加）
- [ ] index.htmlのメタタグを更新
- [ ] 更新通知コンポーネントを実装
- [ ] ビルドしてPWAとして動作確認
- [ ] Lighthouseで検証（PWAスコア緑）
- [ ] 変更をコミット

## テスト観点

- [ ] Chrome DevToolsでPWAとして認識されるか
- [ ] ホーム画面に追加できるか
- [ ] オフラインでページが表示されるか
- [ ] 新しいバージョンデプロイ後、更新通知が表示されるか
- [ ] 更新ボタンクリックで即座に新バージョンに切り替わるか
- [ ] iOS Safariでも基本機能が動作するか

## 参考資料

- [vite-plugin-pwa Documentation](https://vite-pwa-org.netlify.app/)
- [Workbox Strategies](https://developer.chrome.com/docs/workbox/modules/workbox-strategies/)
- [Web App Manifest](https://developer.mozilla.org/ja/docs/Web/Manifest)
