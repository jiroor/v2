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
  '/text/uuid': {
    title: 'UUID/GUID生成 | Rakit',
    description:
      'UUID v4、v1を生成。一度に複数生成可能。データベースの主キーやセッションIDなどに。',
    keywords: 'UUID,GUID,生成,一意ID,セッションID',
    path: '/text/uuid',
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
 */
export function getOgImageUrl(metadata: PageMetadata): string {
  return metadata.ogImage
    ? `${SITE_CONFIG.url}${metadata.ogImage}`
    : `${SITE_CONFIG.url}${SITE_CONFIG.defaultOgImage}`
}
