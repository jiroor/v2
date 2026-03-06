# Rakit - 無料オンラインユーティリティツール集

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Rakit**は、開発者、デザイナー、学生向けの55以上の無料オンラインツールを提供するWebアプリケーションです。

## 🚀 特徴

- **完全無料** - すべてのツールが無料で利用可能
- **PWA対応** - オフラインでも動作
- **高速** - クライアントサイド処理で即座に結果表示
- **プライバシー重視** - データはサーバーに送信されません
- **日本語対応** - すべて日本語で利用可能

## 🛠️ ツール一覧

### テキストツール（23個）
| ツール | 説明 |
|--------|------|
| [Base64エンコード/デコード](/text/base64) | Base64形式のエンコード・デコード |
| [URLエンコード/デコード](/text/url) | URLエンコード・デコード |
| [JSON整形](/text/json) | JSONの整形・バリデーション |
| [ハッシュ生成](/text/hash) | MD5, SHA-1, SHA-256等のハッシュ生成 |
| [正規表現テスト](/text/regex) | 正規表現のリアルタイムテスト |
| [UUID生成](/text/uuid) | UUID/GUID生成 |
| [文字数カウンター](/text/word-count) | 文字数・単語数カウント |
| [テキスト比較](/text/diff) | 2つのテキストの差分表示 |
| [Markdownプレビュー](/text/markdown) | Markdownのリアルタイムプレビュー |
| [ケース変換](/text/case) | 大文字・小文字・キャメルケース変換 |
| [JSON to CSV](/text/json-to-csv) | JSONをCSVに変換 |
| [HTML to Markdown](/text/html-to-markdown) | HTMLをMarkdownに変換 |

### 計算ツール（18個）
| ツール | 説明 |
|--------|------|
| [BMI計算](/other/bmi) | BMIと肥満度判定 |
| [カロリー計算](/other/calorie) | 基礎代謝・TDEE計算 |
| [複利計算](/other/compound-interest) | 複利シミュレーション |
| [住宅ローン計算](/other/mortgage) | 月次返済額計算 |
| [為替計算](/other/currency) | 主要通貨の為替計算 |
| [割引計算](/other/discount) | 割引額・割引後価格計算 |
| [GPA計算](/other/gpa) | 大学のGPA計算 |
| [年収・月収・時給変換](/other/salary) | 給与の相互変換 |

### 画像ツール（6個）
| ツール | 説明 |
|--------|------|
| [画像圧縮](/other/image-compress) | 画像のファイルサイズ削減 |
| [画像リサイズ](/other/image-resize) | 画像サイズ変更 |
| [画像形式変換](/other/image-convert) | PNG/JPEG/WebP変換 |
| [画像トリミング](/other/image-crop) | 画像の切り抜き |

### 時間管理ツール（3個）
| ツール | 説明 |
|--------|------|
| [デジタルタイマー](/timer/digital) | カウントダウンタイマー |
| [ストップウォッチ](/timer/stopwatch-tool) | 高精度ストップウォッチ |
| [ポモドーロタイマー](/timer/pomodoro) | 25分作業+5分休憩 |

### 習慣・目標管理（2個）
| ツール | 説明 |
|--------|------|
| [目標達成トラッカー](/other/goal-tracker) | 目標の進捗管理 |
| [習慣トラッカー](/other/habit-tracker) | 毎日の習慣記録 |

### SEO/開発ツール（5個）
| ツール | 説明 |
|--------|------|
| [メタタグ生成](/other/meta-tag) | SEO用メタタグ生成 |
| [Robots.txt生成](/other/robots-txt) | クローラー制御ファイル生成 |
| [IPアドレス確認](/other/ip-address) | 自分のIPアドレス確認 |
| [パスワード強度チェック](/other/password-check) | パスワードの強度分析 |

## 📦 技術スタック

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Build**: Vite
- **PWA**: Workbox
- **Analytics**: Vercel Analytics

## 🚀 クイックスタート

```bash
# リポジトリをクローン
git clone https://github.com/jiroor/v2.git
cd v2

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev

# ビルド
npm run build
```

## 📈 SEO機能

- 自動sitemap.xml生成
- robots.txt生成
- 各ツール専用のメタデータ
- OGP/Twitter Card対応

## 📱 PWA機能

- オフライン対応
- ホーム画面に追加可能
- キャッシュによる高速化

## 🤝 コントリビュート

バグ報告、機能要望、プルリクエストを歓迎します！

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 📧 お問い合わせ

ビジネスのご相談、広告掲載、ご意見・ご要望は[お問い合わせフォーム](/contact)まで。

---

**Rakit** - 便利なツールを無料で。Made with ❤️ in Japan
