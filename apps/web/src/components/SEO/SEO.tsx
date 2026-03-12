import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  path: string;
  category?: string;
}

const SITE_URL = 'https://rakit-five.vercel.app';
const SITE_NAME = 'Rakit';

// デフォルトのメタデータ
const DEFAULT_METADATA: Record<string, { title: string; description: string }> = {
  '/': { title: 'Rakit - 楽に使えるツール集', description: 'タイマー、文字数カウント、QRコード生成など、楽に使える軽量なユーティリティツール集。無料で広告なし。' },
  '/contact': { title: 'お問い合わせ', description: 'Rakitへのお問い合わせページです。' },
  '/privacy': { title: 'プライバシーポリシー', description: 'Rakitのプライバシーポリシーです。' },
  '/stats': { title: '利用統計', description: 'Rakitの利用統計情報です。' },
  '/text': { title: 'テキストツール一覧', description: '文字数カウント、テキスト変換、JSON整形など、テキスト処理に便利なツール集。' },
  '/timer': { title: 'タイマーツール一覧', description: 'カウントダウン、ストップウォッチ、ポモドーロタイマーなど、時間管理に便利なツール集。' },
  '/other': { title: 'その他ツール一覧', description: 'QRコード生成、パスワード生成、計算ツールなど、便利なユーティリティツール集。' },
  '/camera': { title: 'カメラ映像共有', description: 'ローカルネットワーク内でカメラ映像をリアルタイム共有。' },
  // テキストツール
  '/text/counter': { title: '文字数カウンター', description: '文字数、単語数、行数をリアルタイムカウント。' },
  '/text/diff': { title: 'テキスト差分チェッカー', description: '2つのテキストの差分を視覚的に表示。' },
  '/text/random': { title: 'ランダム文字列生成', description: '指定した条件でランダムな文字列を生成。' },
  '/text/base64': { title: 'Base64エンコード/デコード', description: 'テキストをBase64形式にエンコード/デコード。' },
  '/text/url': { title: 'URLエンコード/デコード', description: 'テキストをURL安全な形式にエンコード/デコード。' },
  '/text/json': { title: 'JSON整形・フォーマット', description: 'JSONを自動で整形・フォーマット。' },
  '/text/hash': { title: 'ハッシュ生成', description: 'MD5, SHA-1, SHA-256, SHA-512のハッシュ値を生成。' },
  '/text/unix': { title: 'Unix時間変換', description: 'Unix時間と日時を相互変換。' },
  '/text/regex': { title: '正規表現テスト', description: '正規表現パターンをリアルタイムでテスト。' },
  '/text/uuid': { title: 'UUID生成', description: 'UUIDを一括生成。' },
  '/text/lorem': { title: 'Lorem Ipsum生成', description: 'Lorem Ipsumダミーテキストを生成。' },
  '/text/case': { title: 'ケース変換', description: '大文字・小文字・キャメルケースなどに一括変換。' },
  '/text/number': { title: '数字変換', description: '2進数、8進数、10進数、16進数を相互変換。' },
  '/text/duplicate': { title: '重複削除', description: 'テキストから重複する行・単語を削除。' },
  '/text/sort': { title: 'テキストソート', description: 'テキスト行を昇順・降順などで並び替え。' },
  '/text/statistics': { title: 'テキスト統計', description: '文字数、単語数、行数、読書時間などの統計。' },
  '/text/markdown': { title: 'Markdownプレビュー', description: 'Markdownをリアルタイムでプレビュー。' },
  '/text/whitespace': { title: '空白削除', description: 'テキストから空白を削除。' },
  '/text/join': { title: 'テキスト結合', description: '複数行のテキストを指定した区切り文字で結合。' },
  '/text/split': { title: 'テキスト分割', description: 'テキストを指定した区切り文字で分割。' },
  '/text/width': { title: '全角半角変換', description: '全角・半角の相互変換。' },
  '/text/kana': { title: 'ひらがなカタカナ変換', description: 'ひらがな・カタカナの相互変換。' },
  '/text/romaji': { title: 'ローマ字変換', description: '日本語をローマ字に変換。' },
  '/text/furigana': { title: 'ふりがな変換', description: '漢字にふりがなを追加。' },
  '/text/reverse': { title: 'テキスト反転', description: 'テキストを逆順に。' },
  '/text/escape': { title: 'エスケープ', description: 'テキストのエスケープ処理。' },
  '/text/unescape': { title: 'アンエスケープ', description: 'エスケープの解除。' },
  '/text/password-adv': { title: 'パスワード生成（詳細）', description: '詳細設定可能なパスワード生成。' },
  '/text/barcode': { title: 'バーコード生成', description: '各種バーコード生成。' },
  '/text/flip': { title: 'フリップテキスト', description: 'テキストを上下逆に。' },
  '/text/timestamp': { title: 'タイムスタンプ変換', description: 'タイムスタンプ変換。' },
  '/text/line-number': { title: '行番号追加', description: 'テキストに行番号を追加。' },
  '/text/replace': { title: '一括置換', description: 'テキストの一括置換。' },
  '/text/trim': { title: 'トリム', description: '前後の空白削除。' },
  '/text/extract': { title: 'テキスト抽出', description: 'パターンでテキスト抽出。' },
  '/text/wrap': { title: 'テキスト折り返し', description: '指定幅で折り返し。' },
  '/text/indent': { title: 'インデント調整', description: 'インデントの追加・削除。' },
  '/text/empty-lines': { title: '空行削除', description: '空行の一括削除。' },
  '/text/url-params': { title: 'URLパラメータ解析', description: 'URLパラメータの解析・編集。' },
  '/text/json-path': { title: 'JSONパス抽出', description: 'JSONからパスで値を抽出。' },
  '/text/csv-preview': { title: 'CSVプレビュー', description: 'CSVをテーブル表示。' },
  '/text/json-to-csv': { title: 'JSON to CSV', description: 'JSONをCSVに変換。' },
  '/text/html-to-markdown': { title: 'HTML to Markdown', description: 'HTMLをMarkdownに変換。' },
  '/text/acronym': { title: '略語ジェネレーター', description: 'フレーズから略語を生成。' },
  '/text/sort-adv': { title: 'テキストソート（詳細）', description: '詳細設定可能なソート。' },
  '/text/duplicate-count': { title: '重複カウント', description: '重複の出現回数をカウント。' },
  '/text/char-type': { title: '文字種判定', description: '文字の種類を判定。' },
  '/text/diff-line': { title: '行差分', description: '行単位の差分比較。' },
  '/text/date-format': { title: '日付フォーマット', description: '日付のフォーマット変換。' },
  '/text/number-format': { title: '数値フォーマット', description: '数値のフォーマット変換。' },
  '/text/stats': { title: 'テキスト統計（詳細）', description: '詳細なテキスト統計。' },
  '/text/join-adv': { title: 'テキスト結合（詳細）', description: '詳細設定可能な結合。' },
  '/text/split-adv': { title: 'テキスト分割（詳細）', description: '詳細設定可能な分割。' },
  '/text/word-count': { title: '単語数カウント', description: '単語数をカウント。' },
  '/text/notepad': { title: 'メモ帳', description: 'シンプルなメモ帳。' },
  // タイマーツール
  '/timer/countdown': { title: 'カウントダウンタイマー', description: '指定した時間からカウントダウンするシンプルなタイマー。' },
  '/timer/stopwatch': { title: 'ストップウォッチ', description: 'ラップタイム記録機能付きストップウォッチ。' },
  '/timer/pomodoro': { title: 'ポモドーロタイマー', description: '25分作業+5分休憩のポモドーロ・テクニック用タイマー。' },
  '/timer/current': { title: '世界時計・現在日時', description: 'タイムゾーン選択可能な世界時計。' },
  '/timer/digital': { title: 'デジタルタイマー', description: 'シンプルなデジタルタイマー。' },
  '/timer/stopwatch-tool': { title: 'ストップウォッチツール', description: '高精度ストップウォッチ。' },
  // その他ツール
  '/other/qrcode': { title: 'QRコード生成', description: 'URLやテキストをQRコードに変換。' },
  '/other/password': { title: 'パスワード生成', description: 'セキュアなパスワードを自動生成。' },
  '/other/colorpicker': { title: 'カラーピッカー', description: 'HEX、RGB、HSL形式の色コード変換。' },
  '/other/roulette': { title: 'ルーレット', description: 'ランダム抽選ツール。' },
  '/other/cron': { title: 'Cron式生成', description: 'Cron式を簡単に生成。' },
  '/other/unit': { title: '単位変換', description: '長さ・重さ・温度等の変換。' },
  '/other/percentage': { title: 'パーセント計算', description: 'パーセント計算を簡単に。' },
  '/other/timezone': { title: '時差計算', description: '世界の主要都市の時差を計算。' },
  '/other/random-num': { title: '乱数生成', description: '指定した範囲で乱数を生成。' },
  '/other/age': { title: '年齢計算', description: '生年月日から満年齢を計算。' },
  '/other/tax': { title: '消費税計算', description: '消費税を自動計算。' },
  '/other/calculator': { title: '計算機', description: 'シンプルな電卓。' },
  '/other/progress': { title: '進捗変換', description: '分数をパーセントに変換。' },
  '/other/bmi': { title: 'BMI計算', description: '身長と体重からBMIを計算。' },
  '/other/calorie': { title: 'カロリー計算', description: '基礎代謝と1日の推定消費カロリーを計算。' },
  '/other/discount': { title: '割引計算', description: '割引額と割引後価格を計算。' },
  '/other/date-calc': { title: '日付計算', description: '2つの日付から日数を計算。' },
  '/other/ip-address': { title: 'IPアドレス確認', description: '自分のパブリックIPアドレスを確認。' },
  '/other/image-compress': { title: '画像圧縮', description: '画像ファイルを圧縮してファイルサイズを削減。' },
  '/other/image-resize': { title: '画像リサイズ', description: '画像のサイズを変更。' },
  '/other/meta-tag': { title: 'メタタグ生成', description: 'SEO対策用メタタグを自動生成。' },
  '/other/card-check': { title: 'カード番号チェック', description: 'クレジットカード番号の形式チェック。' },
  '/other/currency': { title: '為替計算', description: '主要通貨の為替計算。' },
  '/other/color-palette': { title: 'カラーパレット生成', description: 'ランダムなカラーパレットを生成。' },
  '/other/compound-interest': { title: '複利計算', description: '複利の効果を計算。' },
  '/other/mortgage': { title: '住宅ローン計算', description: '住宅ローンの月次返済額を計算。' },
  '/other/image-convert': { title: '画像形式変換', description: 'PNG, JPEG, WebP間の変換。' },
  '/other/robots-txt': { title: 'Robots.txt生成', description: 'SEO対策用のrobots.txtを自動生成。' },
  '/other/gpa': { title: 'GPA計算', description: '大学のGPAを計算。' },
  '/other/password-check': { title: 'パスワード強度チェック', description: 'パスワードの強度をリアルタイムで分析。' },
  '/other/salary': { title: '年収・時給変換', description: '年収、月収、時給を相互変換。' },
  '/other/image-crop': { title: '画像トリミング', description: '画像をトリミング・切り抜き。' },
  '/other/goal-tracker': { title: '目標達成トラッカー', description: '目標を設定して進捗を管理。' },
  '/other/habit-tracker': { title: '習慣トラッカー', description: '毎日の習慣を記録・管理。' },
  '/other/image-base64': { title: '画像Base64変換', description: '画像をBase64形式に変換。' },
  '/other/timer': { title: 'デジタルタイマー', description: 'シンプルなデジタルタイマー。' },
  '/other/random': { title: '乱数生成', description: '指定範囲の乱数生成。' },
  '/camera/mode': { title: 'カメラモード', description: 'カメラとして映像を配信。' },
  '/camera/viewer': { title: 'ビューワーモード', description: 'カメラ映像をリアルタイムで視聴。' },
};

export function SEO({ title, description, path, category }: SEOProps) {
  // デフォルト値を取得
  const defaults = DEFAULT_METADATA[path] || { title: SITE_NAME, description: '便利なオンラインツールを無料で提供。' };
  
  const finalTitle = title || defaults.title;
  const finalDescription = description || defaults.description;
  
  const ogImageUrl = `${SITE_URL}/api/og?tool=${encodeURIComponent(path)}`;
  const pageUrl = `${SITE_URL}${path}`;
  const fullTitle = path === '/' ? finalTitle : `${finalTitle} | ${SITE_NAME}`;

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="ja_JP" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImageUrl} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": finalTitle,
          "description": finalDescription,
          "url": pageUrl,
          "applicationCategory": category || "UtilitiesApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "JPY"
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": pageUrl
          }
        })}
      </script>
    </Helmet>
  );
}
