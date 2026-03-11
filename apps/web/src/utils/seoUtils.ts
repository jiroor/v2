/**
 * SEO関連のユーティリティ関数とメタデータ定義
 */

export interface PageMetadata {
  title: string
  description: string
  keywords: string
  path: string
  ogImage?: string
}

/**
 * サイトの基本情報
 */
export const SITE_CONFIG = {
  name: 'Rakit',
  url: 'https://rakit.vercel.app',
  defaultOgImage: '/og-image.png',
  locale: 'ja_JP',
  twitterCard: 'summary_large_image' as const,
}

/**
 * 各ページのメタデータ定義
 */
export const PAGE_METADATA: Record<string, PageMetadata> = {
  '/': {
    title: 'Rakit - 楽に使えるツール集',
    description:
      'タイマー、文字数カウント、QRコード生成など、楽に使える軽量なユーティリティツール集。無料で広告なし。',
    keywords: 'ツール,タイマー,文字数カウンター,QRコード,パスワード生成',
    path: '/',
  },
  '/contact': {
    title: 'お問い合わせ | Rakit',
    description:
      'Rakitへのお問い合わせ。ご意見・ご要望、バグ報告、ビジネスのご相談、広告掲載について。',
    keywords: 'お問い合わせ,連絡先,サポート',
    path: '/contact',
  },
  '/timer/countdown': {
    title: 'カウントダウンタイマー | Rakit',
    description:
      '指定した時間からカウントダウンするシンプルなタイマー。勉強、料理、プレゼンなどに便利。',
    keywords: 'カウントダウン,タイマー,時間計測,アラーム',
    path: '/timer/countdown',
  },
  '/timer/stopwatch': {
    title: 'ストップウォッチ | Rakit',
    description:
      'ラップタイム記録機能付きストップウォッチ。スポーツや作業時間の計測に最適。',
    keywords: 'ストップウォッチ,ラップタイム,時間計測',
    path: '/timer/stopwatch',
  },
  '/timer/pomodoro': {
    title: 'ポモドーロタイマー | Rakit',
    description:
      '25分作業+5分休憩のポモドーロ・テクニック用タイマー。集中力向上に効果的。',
    keywords: 'ポモドーロ,集中力,時間管理,生産性',
    path: '/timer/pomodoro',
  },
  '/timer/current': {
    title: '世界時計・現在日時 | Rakit',
    description:
      'タイムゾーン選択可能な世界時計。リモートワークや海外との連絡に便利。',
    keywords: '世界時計,タイムゾーン,現在時刻,UTC',
    path: '/timer/current',
  },
  '/text/counter': {
    title: '文字数カウンター | Rakit',
    description:
      '文字数、単語数、行数をリアルタイムカウント。レポートやSNS投稿の文字数確認に。',
    keywords: '文字数,カウント,文字カウンター,単語数',
    path: '/text/counter',
  },
  '/text/diff': {
    title: 'テキスト差分チェッカー | Rakit',
    description:
      '2つのテキストの差分を視覚的に表示。コード比較やドキュメントの変更確認に。',
    keywords: 'テキスト差分,diff,比較,変更点',
    path: '/text/diff',
  },
  '/text/random': {
    title: 'ランダム文字列生成 | Rakit',
    description:
      '指定した条件でランダムな文字列を生成。パスワードや仮データ作成に便利。',
    keywords: 'ランダム文字列,文字列生成,パスワード',
    path: '/text/random',
  },
  '/text/base64': {
    title: 'Base64エンコード/デコード | Rakit',
    description:
      'テキストをBase64形式にエンコード/デコード。日本語対応、リアルタイム変換。',
    keywords: 'Base64,エンコード,デコード,変換,テキスト',
    path: '/text/base64',
  },
  '/text/url': {
    title: 'URLエンコード/デコード | Rakit',
    description:
      'テキストをURL安全な形式にエンコード/デコード。日本語や特殊文字をURLに含める際に便利。',
    keywords: 'URLエンコード,URLデコード,パーセントエンコーディング,変換',
    path: '/text/url',
  },
  '/text/json': {
    title: 'JSON整形・フォーマット | Rakit',
    description:
      'JSONを自動で整形・フォーマット。インデント調整、圧縮（Minify）、構文チェック機能付き。',
    keywords: 'JSON,整形,フォーマット,Minify,圧縮,バリデーション',
    path: '/text/json',
  },
  '/text/hash': {
    title: 'ハッシュ生成 | Rakit',
    description:
      'MD5, SHA-1, SHA-256, SHA-512のハッシュ値を生成。パスワードやデータのハッシュ化に便利。',
    keywords: 'ハッシュ,MD5,SHA-256,SHA-512,暗号化,セキュリティ',
    path: '/text/hash',
  },
  '/text/unix': {
    title: 'Unix時間変換 | Rakit',
    description:
      'Unix時間（タイムスタンプ）と日時を相互変換。現在のUnix時間のリアルタイム表示付き。',
    keywords: 'Unix時間,タイムスタンプ,変換,エポック,日時',
    path: '/text/unix',
  },
  '/text/regex': {
    title: '正規表現テスト | Rakit',
    description:
      '正規表現パターンをリアルタイムでテスト。マッチ結果のハイライト表示、フラグ切替対応。',
    keywords: '正規表現,Regex,テスト,パターンマッチ,JavaScript',
    path: '/text/regex',
  },
  '/text/lorem': {
    title: 'Lorem Ipsum生成 | Rakit',
    description:
      'Lorem Ipsumダミーテキストを生成。段落、文、単語単位で生成可能。デザインやモックアップに。',
    keywords: 'Lorem Ipsum,ダミーテキスト,生成,デザイン,モックアップ',
    path: '/text/lorem',
  },
  '/text/case': {
    title: 'ケース変換 | Rakit',
    description:
      '大文字・小文字・キャメルケース・スネークケースなど9種類のケース形式に一括変換。',
    keywords: 'ケース変換,大文字,小文字,キャメルケース,スネークケース,kebab-case',
    path: '/text/case',
  },
  '/text/number': {
    title: '数字変換（基数変換） | Rakit',
    description:
      '2進数、8進数、10進数、16進数を相互変換。プログラミングや電子工作に便利。',
    keywords: '数字変換,基数変換,2進数,8進数,16進数,進数変換',
    path: '/text/number',
  },
  '/text/duplicate': {
    title: '重複削除 | Rakit',
    description:
      'テキストから重複する行・単語・文字を削除。データクリーニングやリスト整理に便利。',
    keywords: '重複削除,重複行削除,ユニーク,データクリーニング',
    path: '/text/duplicate',
  },
  '/text/sort': {
    title: 'テキストソート | Rakit',
    description:
      'テキスト行を昇順・降順・ランダムなど6種類の方法で並び替え。日本語対応。',
    keywords: 'ソート,並び替え,昇順,降順,ランダム,テキスト処理',
    path: '/text/sort',
  },
  '/text/statistics': {
    title: 'テキスト統計 | Rakit',
    description:
      '文字数、単語数、行数、段落数、読書時間など9種類の統計をリアルタイム表示。',
    keywords: '文字数,統計,読書時間,バイト数,文字カウント',
    path: '/text/statistics',
  },
  '/other/image-base64': {
    title: '画像Base64変換 | Rakit',
    description:
      '画像をBase64形式に変換。ドラッグ＆ドロップ対応。HTML/CSSへの埋め込みに便利。',
    keywords: '画像,Base64,変換,エンコード,Data URI',
    path: '/other/image-base64',
  },
  '/text/markdown': {
    title: 'Markdownプレビュー | Rakit',
    description:
      'Markdownをリアルタイムでプレビュー。HTMLへの変換も対応。ブログ記事やドキュメント作成に便利。',
    keywords: 'Markdown,プレビュー,HTML,変換,ドキュメント',
    path: '/text/markdown',
  },
  '/text/number-format': {
    title: '数値フォーマット変換 | Rakit',
    description:
      '数値を通貨、パーセント、3桁区切り、科学記法などに変換。レポート作成に便利。',
    keywords: '数値,フォーマット,通貨,パーセント,変換',
    path: '/text/number-format',
  },
  '/text/date-format': {
    title: '日付フォーマット変換 | Rakit',
    description:
      '日付を様々なフォーマットに変換。ISO形式、日本語形式、Unix時間などに対応。',
    keywords: '日付,フォーマット,変換,Unix時間,ISO',
    path: '/text/date-format',
  },
  '/text/escape': {
    title: 'テキストエスケープ | Rakit',
    description:
      'テキストをエスケープ。HTML、URL、JSON、正規表現、SQL、Base64に対応。',
    keywords: 'エスケープ,HTML,URL,JSON,正規表現,SQL,Base64',
    path: '/text/escape',
  },
  '/text/unescape': {
    title: 'テキストアンエスケープ | Rakit',
    description:
      'エスケープされたテキストを元に戻す。HTML、URL、JSON、Base64デコードに対応。',
    keywords: 'アンエスケープ,デコード,HTML,URL,JSON,Base64',
    path: '/text/unescape',
  },
  '/text/password-adv': {
    title: 'パスワード生成（詳細） | Rakit',
    description:
      'カスタマイズ可能なパスワード生成。文字種、長さ、除外文字を設定。複数同時生成対応。',
    keywords: 'パスワード,生成,ランダム,セキュリティ,パスワード作成',
    path: '/text/password-adv',
  },
  '/text/uuid': {
    title: 'UUID生成 | Rakit',
    description:
      'UUID（一意識別子）を生成。UUID v4（ランダム）、v1（タイムスタンプ）対応。複数同時生成。',
    keywords: 'UUID,生成,一意識別子,ID,ランダム',
    path: '/text/uuid',
  },
  '/text/furigana': {
    title: 'ふりがな変換 | Rakit',
    description:
      '漢字にふりがなを追加。HTML rubyタグ、括弧形式、Markdownに対応。教育教材作成に便利。',
    keywords: 'ふりがな,ルビ,漢字,読み方,HTML,ruby',
    path: '/text/furigana',
  },
  '/text/sort-adv': {
    title: 'テキストソート（詳細） | Rakit',
    description:
      'テキスト行をソート。昇順・降順・文字数順・自然順・ランダムに対応。日本語対応。',
    keywords: 'ソート,並び替え,テキスト,行,ランダム',
    path: '/text/sort-adv',
  },
  '/text/barcode': {
    title: 'バーコード生成 | Rakit',
    description:
      'バーコードを生成。CODE 128、EAN-13、CODE 39対応。PNGでダウンロード可能。',
    keywords: 'バーコード,生成,CODE128,EAN,CODE39,画像',
    path: '/text/barcode',
  },
  '/text/flip': {
    title: 'フリップテキスト | Rakit',
    description:
      'テキストを上下逆さまに変換。ユニークな表現でSNSやメッセージに。',
    keywords: 'フリップ,逆さま,テキスト,変換,ユニーク',
    path: '/text/flip',
  },
  '/text/whitespace': {
    title: '空白削除 | Rakit',
    description:
      'テキストから空白を削除。先頭・末尾・連続空白・全空白など5種類の削除モード。',
    keywords: '空白削除,スペース,トリム,テキスト処理',
    path: '/text/whitespace',
  },
  '/text/join': {
    title: 'テキスト結合 | Rakit',
    description:
      '複数行のテキストを指定した区切り文字で結合。CSV作成、SQLのIN句作成などに便利。',
    keywords: 'テキスト結合,結合,CSV,区切り文字',
    path: '/text/join',
  },
  '/text/split': {
    title: 'テキスト分割 | Rakit',
    description:
      'テキストを指定した区切り文字で分割し、1行ずつ表示。CSVやデータの展開に便利。',
    keywords: 'テキスト分割,分割,CSV,区切り文字',
    path: '/text/split',
  },
  '/other/cron': {
    title: 'Cron式生成 | Rakit',
    description:
      'Cron式を簡単に生成。プリセット付きで分・時・日・月・曜日を指定可能。',
    keywords: 'Cron,スケジュール,定期実行,crontab',
    path: '/other/cron',
  },
  '/other/unit': {
    title: '単位変換 | Rakit',
    description:
      '長さ・重さ・温度・面積・体積を変換。メートル、キロ、ポンド、インチなどに対応。',
    keywords: '単位変換,メートル,キログラム,インチ,ポンド',
    path: '/other/unit',
  },
  '/other/percentage': {
    title: 'パーセント計算 | Rakit',
    description:
      'パーセント計算を簡単に。増減・割合・何%かなど5種類の計算モードに対応。',
    keywords: 'パーセント,計算,割合,増減,何パーセント',
    path: '/other/percentage',
  },
  '/other/timezone': {
    title: '時差計算 | Rakit',
    description:
      '世界の主要都市の時差を計算。東京、ニューヨーク、ロンドンなど10都市に対応。',
    keywords: '時差,タイムゾーン,時間変換,海外',
    path: '/other/timezone',
  },
  '/other/random-num': {
    title: '乱数生成 | Rakit',
    description:
      '指定した範囲で乱数を生成。複数個まとめて生成可能。くじ引きや抽選に便利。',
    keywords: '乱数,ランダム,抽選,くじ引き',
    path: '/other/random-num',
  },
  '/other/age': {
    title: '年齢計算 | Rakit',
    description:
      '生年月日から満年齢を計算。生まれてからの日数や次の誕生日も表示。',
    keywords: '年齢計算,満年齢,生年月日,年数',
    path: '/other/age',
  },
  '/other/tax': {
    title: '消費税計算 | Rakit',
    description:
      '消費税を自動計算。税抜→税込、税込→税抜の両方に対応。10%・8%税率切り替え可。',
    keywords: '消費税,計算,税抜,税込,10%,8%',
    path: '/other/tax',
  },
  '/other/calculator': {
    title: '計算機 | Rakit',
    description:
      'シンプルな電卓。四則演算、パーセント計算に対応。基本的な計算に便利。',
    keywords: '計算機,電卓,計算,四則演算',
    path: '/other/calculator',
  },
  '/other/progress': {
    title: '進捗変換 | Rakit',
    description:
      '分数をパーセントに、パーセントを分数に変換。進捗管理や割合の確認に便利。',
    keywords: '進捗,パーセント,分数,変換,割合',
    path: '/other/progress',
  },
  '/other/bmi': {
    title: 'BMI計算 | Rakit',
    description:
      '身長と体重からBMIを計算。肥満度判定も表示。健康管理に便利。',
    keywords: 'BMI,計算,肥満度,健康,体重',
    path: '/other/bmi',
  },
  '/other/calorie': {
    title: 'カロリー計算 | Rakit',
    description:
      '基礎代謝と1日の推定消費カロリー（TDEE）を計算。ダイエットや健康管理に便利。',
    keywords: 'カロリー,計算,基礎代謝,TDEE,ダイエット',
    path: '/other/calorie',
  },
  '/other/discount': {
    title: '割引計算 | Rakit',
    description:
      '割引額と割引後価格を計算。セール時の買い物に便利。よく使う割引率のクイック選択付き。',
    keywords: '割引,計算,セール,値引き,ショッピング',
    path: '/other/discount',
  },
  '/timer/digital': {
    title: 'デジタルタイマー | Rakit',
    description:
      'シンプルなカウントダウンタイマー。料理、勉強、運動などに便利。終了時にお知らせ音。',
    keywords: 'タイマー,カウントダウン,時間管理,料理,勉強',
    path: '/timer/digital',
  },
  '/timer/stopwatch-tool': {
    title: 'ストップウォッチ | Rakit',
    description:
      '高精度ストップウォッチ。ラップタイム記録機能付き。スポーツ、勉強、調理などに便利。',
    keywords: 'ストップウォッチ,タイマー,ラップタイム,スポーツ,勉強',
    path: '/timer/stopwatch-tool',
  },
  '/other/date-calc': {
    title: '日付計算 | Rakit',
    description:
      '2つの日付から日数を計算。基準日からN日後を計算。期間計算に便利。',
    keywords: '日付,計算,日数,期間,カレンダー',
    path: '/other/date-calc',
  },
  '/text/word-count': {
    title: '文字数カウンター | Rakit',
    description:
      'テキストの文字数、単語数、行数をカウント。論文、ブログ、SNS投稿の文字数管理に便利。',
    keywords: '文字数,カウント,単語数,文字カウント,SEO',
    path: '/text/word-count',
  },
  '/other/ip-address': {
    title: 'IPアドレス確認 | Rakit',
    description:
      '自分のパブリックIPアドレスを確認。位置情報やISP情報も表示。ネットワーク設定・トラブル解決に便利。',
    keywords: 'IPアドレス,確認,自分のIP,グローバルIP,ネットワーク',
    path: '/other/ip-address',
  },
  '/other/image-compress': {
    title: '画像圧縮 | Rakit',
    description:
      '画像ファイルを圧縮してファイルサイズを削減。Web公開用の画像軽量化に便利。品質調整可能。',
    keywords: '画像圧縮,ファイルサイズ,軽量化,画像最適化,Web',
    path: '/other/image-compress',
  },
  '/other/image-resize': {
    title: '画像リサイズ | Rakit',
    description:
      '画像のサイズを変更。縦横比維持、プリセットサイズ対応。SNS投稿、アイコン、サムネイル作成に便利。',
    keywords: '画像リサイズ,画像縮小,画像拡大,サイズ変更,アイコン作成',
    path: '/other/image-resize',
  },
  '/other/meta-tag': {
    title: 'メタタグ生成 | Rakit',
    description:
      'SEO対策用メタタグを自動生成。OGP、Twitter Card対応。タイトル、説明文、キーワードを入力するだけで簡単生成。',
    keywords: 'メタタグ,SEO,OGP,Twitter Card,メタデータ生成',
    path: '/other/meta-tag',
  },
  '/other/card-check': {
    title: 'カード番号チェック | Rakit',
    description:
      'クレジットカード番号の形式チェック。Luhnアルゴリズムによる検証。カード種類の自動判別。',
    keywords: 'カード番号,チェック,Luhn,クレジットカード,検証',
    path: '/other/card-check',
  },
  '/other/currency': {
    title: '為替計算 | Rakit',
    description:
      '主要通貨の為替計算。ドル円、ユーロ円など。海外旅行、ネットショッピングに便利。',
    keywords: '為替,計算,ドル円,ユーロ円,外貨両替',
    path: '/other/currency',
  },
  '/other/color-palette': {
    title: 'カラーパレット生成 | Rakit',
    description:
      'ランダムなカラーパレットを生成。色の固定、追加、削除が可能。Webデザイン、グラフィック制作に便利。',
    keywords: 'カラーパレット,配色,色,デザイン,Webデザイン',
    path: '/other/color-palette',
  },
  '/other/compound-interest': {
    title: '複利計算 | Rakit',
    description:
      '複利の効果を計算。毎月の積立投資にも対応。投資・貯金計画のシミュレーションに便利。',
    keywords: '複利,計算,投資,貯金,シミュレーション,積立',
    path: '/other/compound-interest',
  },
  '/other/mortgage': {
    title: '住宅ローン計算 | Rakit',
    description:
      '住宅ローンの月次返済額を計算。総返済額、利息総額も表示。家購入の計画立案に便利。',
    keywords: '住宅ローン,計算,月次返済,シミュレーション,家購入',
    path: '/other/mortgage',
  },
  '/other/image-convert': {
    title: '画像形式変換 | Rakit',
    description:
      'PNG, JPEG, WebP間の変換。品質調整可能。Web公開用画像の形式変換に便利。',
    keywords: '画像変換,PNG,JPEG,WebP,形式変換',
    path: '/other/image-convert',
  },
  '/other/robots-txt': {
    title: 'Robots.txt生成 | Rakit',
    description:
      'SEO対策用のrobots.txtを自動生成。Allow/Disallow設定、Sitemap URL指定に対応。',
    keywords: 'robots.txt,SEO,クローラー,検索エンジン,アクセス制御',
    path: '/other/robots-txt',
  },
  '/text/json-to-csv': {
    title: 'JSON to CSV変換 | Rakit',
    description:
      'JSON配列をCSVに変換。Excel/スプレッドシートで開ける形式でダウンロード。データ移行・加工に便利。',
    keywords: 'JSON,CSV,変換,データ変換,Excel',
    path: '/text/json-to-csv',
  },
  '/other/gpa': {
    title: 'GPA計算 | Rakit',
    description:
      '大学のGPAを計算。科目ごとの単位と成績を入力。留学、進学の目安に。',
    keywords: 'GPA,計算,大学,成績,単位',
    path: '/other/gpa',
  },
  '/other/password-check': {
    title: 'パスワード強度チェック | Rakit',
    description:
      'パスワードの強度をリアルタイムで分析。文字種、長さ、パターンをチェック。安全なパスワード作成の参考に。',
    keywords: 'パスワード,強度,チェック,セキュリティ,パスワード強度',
    path: '/other/password-check',
  },
  '/other/salary': {
    title: '年収・月収・時給変換 | Rakit',
    description:
      '年収、月収、時給を相互変換。労働条件を調整可能。転職・求人検索の参考に。',
    keywords: '年収,月収,時給,変換,給与',
    path: '/other/salary',
  },
  '/text/html-to-markdown': {
    title: 'HTML to Markdown | Rakit',
    description:
      'HTMLをMarkdownに変換。見出し、リンク、リスト、コードなど主要な要素に対応。コンテンツ制作に便利。',
    keywords: 'HTML,Markdown,変換,コンテンツ,ブログ',
    path: '/text/html-to-markdown',
  },
  '/other/image-crop': {
    title: '画像トリミング | Rakit',
    description:
      '画像をトリミング・切り抜き。アスペクト比固定可能。SNS投稿、サムネイル作成に便利。',
    keywords: '画像,トリミング,切り抜き,アスペクト比,クロップ',
    path: '/other/image-crop',
  },
  '/text/acronym': {
    title: '略語ジェネレーター | Rakit',
    description:
      'スペース区切りのフレーズから略語・頭字語を生成。プロジェクト名、チーム名、製品名などに便利。',
    keywords: '略語,頭字語,アクロニウム,ジェネレーター,名前生成',
    path: '/text/acronym',
  },
  '/other/goal-tracker': {
    title: '目標達成トラッカー | Rakit',
    description:
      '目標を設定して進捗を管理。視覚的なプログレスバーで達成状況を確認。習慣化、目標達成に便利。',
    keywords: '目標,トラッカー,進捗管理,習慣化,目標達成',
    path: '/other/goal-tracker',
  },
  '/other/habit-tracker': {
    title: '習慣トラッカー | Rakit',
    description:
      '毎日の習慣を記録・管理。連続達成日数（ストリーク）を追跡。習）を追跡。習慣化の継続に便利。',
    keywords: '習慣,トラッカー,ストリーク,習慣化,毎日の習慣',
    path: '/other/habit-tracker',
  },
  '/other/qrcode': {
    title: 'QRコード生成 | Rakit',
    description: 'URLやテキストを簡単にQRコードに変換。ダウンロードも可能。',
    keywords: 'QRコード,生成,URL変換,二次元コード',
    path: '/other/qrcode',
  },
  '/other/password': {
    title: 'パスワード生成 | Rakit',
    description: 'セキュアなパスワードを自動生成。文字種や長さをカスタマイズ可能。',
    keywords: 'パスワード,生成,セキュリティ,強力なパスワード',
    path: '/other/password',
  },
  '/other/colorpicker': {
    title: 'カラーピッカー | Rakit',
    description: 'HEX、RGB、HSL形式の色コード変換ツール。デザインやコーディングに便利。',
    keywords: 'カラーピッカー,色コード,HEX,RGB,HSL',
    path: '/other/colorpicker',
  },
  '/other/roulette': {
    title: 'ルーレット | Rakit',
    description: 'ランダム抽選ツール。複数の選択肢から公平に選択できます。',
    keywords: 'ルーレット,抽選,ランダム,くじ引き',
    path: '/other/roulette',
  },
  '/camera': {
    title: 'カメラ映像共有 | Rakit',
    description:
      'ローカルネットワーク内で複数のiPhone間でカメラ映像をリアルタイム共有。監視カメラ・見守りに最適。',
    keywords: 'カメラ,映像共有,監視カメラ,見守り,WebRTC,リアルタイム',
    path: '/camera',
  },
  '/camera/mode': {
    title: 'カメラモード | Rakit',
    description: 'カメラとして映像を配信。QRコードで簡単に接続できます。',
    keywords: 'カメラ配信,ストリーミング,QRコード,監視カメラ',
    path: '/camera/mode',
  },
  '/camera/viewer': {
    title: 'ビューワーモード | Rakit',
    description: 'カメラ映像をリアルタイムで視聴。複数カメラの同時接続が可能。',
    keywords: 'カメラ視聴,映像視聴,監視,見守り',
    path: '/camera/viewer',
  },
}

/**
 * パスからメタデータを取得
 */
export function getPageMetadata(path: string): PageMetadata {
  return (
    PAGE_METADATA[path] || {
      title: SITE_CONFIG.name,
      description: PAGE_METADATA['/'].description,
      keywords: PAGE_METADATA['/'].keywords,
      path: path,
    }
  )
}

/**
 * 完全なURLを生成
 */
export function getFullUrl(path: string): string {
  return `${SITE_CONFIG.url}${path}`
}

/**
 * OG画像のURLを取得
 * 動的OGP画像生成を使用
 */
export function getOgImageUrl(metadata: PageMetadata): string {
  // 動的OGP画像生成APIを使用
  return `${SITE_CONFIG.url}/api/og?tool=${encodeURIComponent(metadata.path)}`
}
