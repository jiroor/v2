import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

interface BreadcrumbItem {
  label: string
  path?: string
}

// パスからパンくずリストを生成
const getBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'ホーム', path: '/' },
  ]

  // パスを解析
  const segments = pathname.split('/').filter(Boolean)
  
  const categoryLabels: Record<string, string> = {
    timer: 'タイマー',
    text: 'テキストツール',
    other: 'その他',
    camera: 'カメラ',
  }

  const toolLabels: Record<string, string> = {
    // タイマー
    countdown: 'カウントダウンタイマー',
    stopwatch: 'ストップウォッチ',
    pomodoro: 'ポモドーロタイマー',
    current: '現在日時',
    'stopwatch-tool': 'ストップウォッチツール',
    digital: 'デジタルタイマー',
    // テキスト
    counter: '文字数カウンター',
    diff: 'テキスト差分',
    random: 'ランダム文字列',
    base64: 'Base64変換',
    url: 'URL変換',
    json: 'JSON整形',
    hash: 'ハッシュ生成',
    unix: 'Unix時間変換',
    regex: '正規表現テスト',
    uuid: 'UUID生成',
    lorem: 'Lorem Ipsum',
    case: 'ケース変換',
    number: '数字変換',
    duplicate: '重複行削除',
    sort: 'テキストソート',
    statistics: 'テキスト統計',
    markdown: 'Markdownプレビュー',
    whitespace: '空白削除',
    width: '全角半角変換',
    kana: 'ひらがなカタカナ変換',
    romaji: 'ローマ字変換',
    notepad: '簡易メモ帳',
    timestamp: 'タイムスタンプ生成',
    reverse: '逆順変換',
    'line-number': '行番号追加',
    'duplicate-count': '重複行カウンター',
    'char-type': '文字種カウンター',
    'diff-line': 'テキスト比較（行単位）',
    'url-params': 'URLパラメータ解析',
    'json-path': 'JSONパス抽出',
    'csv-preview': 'CSVプレビュー',
    indent: 'テキストインデント整形',
    'empty-lines': '空行削除',
    join: 'テキスト結合',
    split: 'テキスト分割',
    'word-count': '単語カウンター',
    'json-to-csv': 'JSON to CSV',
    'html-to-markdown': 'HTML to Markdown',
    acronym: '頭文字生成',
    // その他
    'image-base64': '画像Base64変換',
    cron: 'Cron式生成',
    unit: '単位変換',
    percentage: 'パーセント計算',
    timezone: '時差計算',
    'random-num': '乱数生成',
    age: '年齢計算',
    tax: '消費税計算',
    calculator: '計算機',
    progress: '進捗変換',
    qrcode: 'QRコード生成',
    password: 'パスワード生成',
    colorpicker: 'カラーピッカー',
    roulette: 'ルーレット',
    timer: 'デジタルタイマー',
    'date-calc': '日付計算',
    'ip-address': 'IPアドレス確認',
    'image-compress': '画像圧縮',
    'image-resize': '画像リサイズ',
    'meta-tag': 'メタタグ生成',
    'card-check': 'カード番号チェック',
    currency: '為替計算',
    'color-palette': 'カラーパレット',
    'compound-interest': '複利計算',
    mortgage: '住宅ローン計算',
    'image-convert': '画像変換',
    'robots-txt': 'robots.txt生成',
    gpa: 'GPA計算',
    'password-check': 'パスワード強度チェック',
    salary: '給与計算',
    'image-crop': '画像切り抜き',
    'goal-tracker': '目標トラッカー',
    'habit-tracker': '習慣トラッカー',
    bmi: 'BMI計算',
    calorie: 'カロリー計算',
    discount: '割引計算',
    // カメラ
    mode: 'カメラモード',
    viewer: 'ビューワーモード',
  }

  if (segments.length === 0) {
    return breadcrumbs
  }

  // カテゴリがある場合
  if (segments[0] && categoryLabels[segments[0]]) {
    breadcrumbs.push({
      label: categoryLabels[segments[0]],
      path: `/${segments[0]}` === pathname ? undefined : `/${segments[0]}`,
    })
  }

  // ツールがある場合
  if (segments[1] && toolLabels[segments[1]]) {
    breadcrumbs.push({
      label: toolLabels[segments[1]],
    })
  } else if (segments[0] && toolLabels[segments[0]]) {
    // カテゴリなしのツール（camera等）
    breadcrumbs.push({
      label: toolLabels[segments[0]],
    })
  }

  return breadcrumbs
}

export function Breadcrumbs() {
  const location = useLocation()
  const breadcrumbs = getBreadcrumbs(location.pathname)

  // ホームのみの場合は表示しない
  if (breadcrumbs.length <= 1) {
    return null
  }

  // BreadcrumbList構造化データ
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.path ? `https://rakit-five.vercel.app${item.path}` : undefined,
    })),
  }

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <nav aria-label="パンくずリスト" className="text-sm mb-4">
        <ol className="flex items-center flex-wrap gap-1">
          {breadcrumbs.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="text-gray-400 mx-2">/</span>
              )}
              {item.path ? (
                <Link
                  to={item.path}
                  className="text-gray-600 hover:text-[#d97706] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
