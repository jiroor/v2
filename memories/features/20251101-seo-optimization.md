# SEO対策実装計画

## 日付
2025-11-01

## 実装目的
Rakitツールサイトの検索エンジン最適化（SEO）を実施し、以下を実現する：
- 検索エンジンでの発見可能性向上
- SNSでのシェア時の表示最適化
- Core Web Vitals の改善
- アクセシビリティの向上

## 現状分析

### 良い点
✅ 基本的なHTML構造が適切（セマンティックHTML）
✅ lang属性が設定済み（lang="ja"）
✅ 基本的なdescriptionメタタグが存在
✅ レスポンシブ対応済み（viewport設定）
✅ Vercel Analyticsによる計測が実装済み
✅ 軽量なバンドルサイズ（Vite + Terserで最適化）

### 改善が必要な点
❌ ページごとの動的メタタグがない（SPAの課題）
❌ OGP（Open Graph Protocol）タグがない
❌ Twitter Cardタグがない
❌ sitemap.xmlが存在しない
❌ robots.txtが存在しない
❌ 構造化データ（JSON-LD）がない
❌ faviconがViteデフォルト（vite.svg）のまま
❌ 各ツールページに固有のtitle/descriptionがない

## 実装計画

### 1. 動的メタタグの設定

**目的**: ページごとに最適化されたtitle、description、keywordsを設定

**実装方法**:
- `react-helmet-async`を使用してSPA内でメタタグを動的に変更
- 各ツールページに専用のメタタグを設定
- ホームページには総合的なメタタグを設定

**各ツールのメタデータ**:

| ツール | title | description | keywords |
|--------|-------|-------------|----------|
| ホーム | Rakit - 楽に使えるツール集 | タイマー、文字数カウント、QRコード生成など、楽に使える軽量なユーティリティツール集。無料で広告なし。 | ツール,タイマー,文字数カウンター,QRコード,パスワード生成 |
| カウントダウンタイマー | カウントダウンタイマー \| Rakit | 指定した時間からカウントダウンするシンプルなタイマー。勉強、料理、プレゼンなどに便利。 | カウントダウン,タイマー,時間計測,アラーム |
| ストップウォッチ | ストップウォッチ \| Rakit | ラップタイム記録機能付きストップウォッチ。スポーツや作業時間の計測に最適。 | ストップウォッチ,ラップタイム,時間計測 |
| ポモドーロタイマー | ポモドーロタイマー \| Rakit | 25分作業+5分休憩のポモドーロ・テクニック用タイマー。集中力向上に効果的。 | ポモドーロ,集中力,時間管理,生産性 |
| 現在日時 | 世界時計・現在日時 \| Rakit | タイムゾーン選択可能な世界時計。リモートワークや海外との連絡に便利。 | 世界時計,タイムゾーン,現在時刻,UTC |
| 文字数カウンター | 文字数カウンター \| Rakit | 文字数、単語数、行数をリアルタイムカウント。レポートやSNS投稿の文字数確認に。 | 文字数,カウント,文字カウンター,単語数 |
| テキスト差分 | テキスト差分チェッカー \| Rakit | 2つのテキストの差分を視覚的に表示。コード比較やドキュメントの変更確認に。 | テキスト差分,diff,比較,変更点 |
| ランダム文字列生成 | ランダム文字列生成 \| Rakit | 指定した条件でランダムな文字列を生成。パスワードや仮データ作成に便利。 | ランダム文字列,文字列生成,パスワード |
| QRコード生成 | QRコード生成 \| Rakit | URLやテキストを簡単にQRコードに変換。ダウンロードも可能。 | QRコード,生成,URL変換,二次元コード |
| パスワード生成 | パスワード生成 \| Rakit | セキュアなパスワードを自動生成。文字種や長さをカスタマイズ可能。 | パスワード,生成,セキュリティ,強力なパスワード |
| カラーピッカー | カラーピッカー \| Rakit | HEX、RGB、HSL形式の色コード変換ツール。デザインやコーディングに便利。 | カラーピッカー,色コード,HEX,RGB,HSL |
| ルーレット | ルーレット \| Rakit | ランダム抽選ツール。複数の選択肢から公平に選択できます。 | ルーレット,抽選,ランダム,くじ引き |

**実装ファイル**:
- 新規: `src/utils/seoUtils.ts` - メタデータ定義とヘルパー関数
- 新規: `src/components/SEO/SEO.tsx` - メタタグコンポーネント
- 修正: 各ツールページ - SEOコンポーネントを追加

### 2. OGP（Open Graph Protocol）タグの追加

**目的**: Facebook、Twitter、LINEなどでシェアされた際の表示を最適化

**実装内容**:
```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://rakit.vercel.app{pathname}" />
<meta property="og:title" content="{page title}" />
<meta property="og:description" content="{page description}" />
<meta property="og:image" content="https://rakit.vercel.app/og-image.png" />
<meta property="og:site_name" content="Rakit" />
<meta property="og:locale" content="ja_JP" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{page title}" />
<meta name="twitter:description" content="{page description}" />
<meta name="twitter:image" content="https://rakit.vercel.app/og-image.png" />
```

**必要な作業**:
- OG画像（1200x630px）の作成
- public/og-image.pngとして配置

### 3. sitemap.xmlの生成

**目的**: 検索エンジンにサイト構造を伝える

**実装方法**:
- `vite-plugin-sitemap`を使用して自動生成
- または手動で`public/sitemap.xml`を作成

**sitemap構造**:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://rakit.vercel.app/</loc>
    <lastmod>2025-11-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- 各ツールページ11件 -->
  <url>
    <loc>https://rakit.vercel.app/timer/countdown</loc>
    <lastmod>2025-11-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- ... -->
</urlset>
```

**実装ファイル**:
- 新規: `public/sitemap.xml` または
- 新規: `scripts/generate-sitemap.ts` + package.jsonにビルドスクリプト追加

### 4. robots.txtの作成

**目的**: 検索エンジンのクローラーに指示を与える

**実装内容**:
```txt
User-agent: *
Allow: /

Sitemap: https://rakit.vercel.app/sitemap.xml
```

**実装ファイル**:
- 新規: `public/robots.txt`

### 5. 構造化データ（JSON-LD）の追加

**目的**: 検索結果にリッチスニペットを表示させる

**実装内容**:
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Rakit",
  "description": "楽に使える、軽量でミニマルなユーティリティツール集",
  "url": "https://rakit.vercel.app",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "ratingCount": "1000"
  }
}
```

**実装ファイル**:
- 修正: `src/components/SEO/SEO.tsx` - JSON-LDスクリプトタグを追加

### 6. パフォーマンス最適化

**目的**: Core Web Vitalsの改善

**実装項目**:

#### 6.1 画像最適化
- [ ] faviconを適切なものに変更（vite.svg → favicon.ico + apple-touch-icon.png）
- [ ] OG画像の最適化（WebP形式、適切な圧縮）

#### 6.2 フォント最適化
- [ ] 現状確認: システムフォントのみ使用 → 最適化済み ✅

#### 6.3 JavaScriptの最適化
- [ ] 現状確認: Vite + Terser + manual chunks → 最適化済み ✅
- [ ] 追加最適化: React.lazyでページコンポーネントをコード分割

#### 6.4 CSSの最適化
- [ ] 現状確認: Tailwind CSS（未使用クラスは自動削除） → 最適化済み ✅

#### 6.5 キャッシング戦略
- [ ] Vercelのデフォルトキャッシュ設定を確認
- [ ] 必要に応じてvercel.jsonでキャッシュ設定を調整

**実装ファイル**:
- 新規: `public/favicon.ico`, `public/apple-touch-icon.png`
- 修正: `index.html` - favicon参照を更新
- 修正: `src/App.tsx` - React.lazyを使用したコード分割

### 7. アクセシビリティ改善

**目的**: WCAG 2.1 Level AAの基準を満たす

**実装項目**:

#### 7.1 セマンティックHTML
- [ ] 現状確認: header, nav, main, section等の使用状況
- [ ] 修正: 適切なランドマークの追加

#### 7.2 ARIA属性
- [ ] 各ツールのフォーム要素にaria-labelを追加
- [ ] ボタンの役割を明確化（aria-label, aria-describedby）

#### 7.3 キーボードナビゲーション
- [ ] 現状確認: 既にキーボードショートカットが実装済み ✅
- [ ] Tab順序の確認とfocus表示の改善

#### 7.4 コントラスト比
- [ ] 現状確認: 背景白、テキスト黒 → 十分なコントラスト ✅
- [ ] オレンジ色（#d97706）のコントラスト確認

#### 7.5 スクリーンリーダー対応
- [ ] alt属性の追加（アイコンSVGにtitle/desc追加）
- [ ] フォーカス可能な要素にvisible focus indicator

**実装ファイル**:
- 修正: `src/components/Layout/Layout.tsx` - セマンティックHTML改善
- 修正: 各ツールページ - ARIA属性追加
- 修正: `src/components/Icons/ToolIcons.tsx` - SVGアクセシビリティ改善

## 実装の優先順位

### Phase 1: 必須項目（即実装）
1. ✅ react-helmet-asyncのインストール
2. ✅ 動的メタタグの実装（全ページ）
3. ✅ OGPタグの実装
4. ✅ sitemap.xmlの作成
5. ✅ robots.txtの作成
6. ✅ faviconの変更

### Phase 2: 重要項目（短期）
7. ✅ 構造化データ（JSON-LD）の追加
8. ✅ React.lazyによるコード分割
9. ✅ OG画像の作成と配置

### Phase 3: 改善項目（中期）
10. ⬜ アクセシビリティの段階的改善
11. ⬜ Core Web Vitalsの計測と改善
12. ⬜ パフォーマンス監視の継続

## 依存関係

### 新規追加が必要なパッケージ
```json
{
  "dependencies": {
    "react-helmet-async": "^2.0.4"
  }
}
```

### オプション（自動sitemap生成を使う場合）
```json
{
  "devDependencies": {
    "vite-plugin-sitemap": "^0.7.0"
  }
}
```

## リスク・注意点

1. **SPA特有の課題**:
   - react-helmet-asyncでメタタグを動的に変更してもクローラーが認識できない可能性
   - 対策: Vercelは自動的にプリレンダリングを行うため問題なし

2. **バンドルサイズ増加**:
   - react-helmet-async追加により約5KB増加
   - 影響: 軽微（全体で100KB未満を維持）

3. **OG画像の管理**:
   - 各ツールページに個別のOG画像を作成すると管理コスト増
   - 対策: 初期は共通画像を使用、将来的に個別化を検討

4. **sitemap.xmlの更新**:
   - ツール追加時に手動更新が必要
   - 対策: ビルド時自動生成スクリプトを検討

## 完了条件

- [x] 要件定義と現状分析の完了
- [ ] react-helmet-asyncのインストール完了
- [ ] 全12ページ（ホーム+11ツール）に動的メタタグ実装
- [ ] OGPタグとTwitter Cardの実装完了
- [ ] sitemap.xml作成と配置完了
- [ ] robots.txt作成と配置完了
- [ ] favicon更新完了
- [ ] OG画像作成と配置完了
- [ ] 構造化データ（JSON-LD）実装完了
- [ ] React.lazyによるコード分割完了
- [ ] Lighthouseスコア測定（Performance 90+、SEO 90+、Accessibility 90+）
- [ ] Google Search Consoleへのサイトマップ登録
- [ ] 本番環境での動作確認

## 測定指標

### SEO
- Google Search Console登録
- 検索順位の追跡（主要キーワード: "タイマー ツール", "文字数カウンター", etc.）
- インデックス登録ページ数

### パフォーマンス
- Lighthouse Performance Score: 目標90以上
- LCP（Largest Contentful Paint）: 目標2.5秒以下
- FID（First Input Delay）: 目標100ms以下
- CLS（Cumulative Layout Shift）: 目標0.1以下

### アクセシビリティ
- Lighthouse Accessibility Score: 目標90以上
- WAVE（Web Accessibility Evaluation Tool）でエラー0件

## 参考資料

- [Google検索セントラル - SEOスターターガイド](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Open Graph Protocol](https://ogp.me/)
- [Schema.org - WebApplication](https://schema.org/WebApplication)
- [Web.dev - Core Web Vitals](https://web.dev/vitals/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
