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
