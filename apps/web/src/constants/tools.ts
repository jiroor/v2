// ツールデータ定義
// 検索・フィルタ機能のためにツール情報を一元管理

export interface Tool {
  path: string
  name: string
  description: string
  category: 'timer' | 'text' | 'other' | 'camera'
  keywords: string[]
}

export const TOOLS: Tool[] = [
  // タイマーツール
  { path: '/timer/countdown', name: 'カウントダウンタイマー', description: '指定時間からカウントダウン', category: 'timer', keywords: ['タイマー', 'カウントダウン', '時間'] },
  { path: '/timer/stopwatch', name: 'ストップウォッチ', description: '時間計測とラップタイム', category: 'timer', keywords: ['ストップウォッチ', 'ラップ', '計測'] },
  { path: '/timer/pomodoro', name: 'ポモドーロタイマー', description: '25分作業 + 5分休憩サイクル', category: 'timer', keywords: ['ポモドーロ', '集中', '作業'] },
  { path: '/timer/current', name: '現在日時', description: 'タイムゾーン選択可能な世界時計', category: 'timer', keywords: ['時計', '時刻', 'タイムゾーン'] },
  { path: '/timer/digital', name: 'デジタルタイマー', description: 'シンプルなデジタルタイマー', category: 'timer', keywords: ['タイマー', 'デジタル'] },
  { path: '/timer/stopwatch-tool', name: 'ストップウォッチツール', description: '高精度ストップウォッチ', category: 'timer', keywords: ['ストップウォッチ', '高精度'] },
  
  // テキストツール
  { path: '/text/counter', name: '文字数カウンター', description: '文字数、単語数、行数カウント', category: 'text', keywords: ['文字数', 'カウント', '文字'] },
  { path: '/text/diff', name: 'テキスト差分', description: '2つのテキストの差分表示', category: 'text', keywords: ['差分', 'diff', '比較'] },
  { path: '/text/random', name: 'ランダム文字列', description: 'パスワード等の生成', category: 'text', keywords: ['ランダム', 'パスワード', '文字列'] },
  { path: '/text/base64', name: 'Base64変換', description: 'Base64エンコード/デコード', category: 'text', keywords: ['base64', 'エンコード', 'デコード'] },
  { path: '/text/url', name: 'URL変換', description: 'URLエンコード/デコード', category: 'text', keywords: ['url', 'エンコード'] },
  { path: '/text/json', name: 'JSON整形', description: 'JSONの整形・フォーマット', category: 'text', keywords: ['json', '整形', 'フォーマット'] },
  { path: '/text/hash', name: 'ハッシュ生成', description: 'MD5, SHA等のハッシュ生成', category: 'text', keywords: ['ハッシュ', 'md5', 'sha', '暗号化'] },
  { path: '/text/unix', name: 'Unix時間変換', description: 'Unix時間と日時の相互変換', category: 'text', keywords: ['unix', 'タイムスタンプ', '日時'] },
  { path: '/text/regex', name: '正規表現テスト', description: '正規表現のテスト・検証', category: 'text', keywords: ['正規表現', 'regex', 'パターン'] },
  { path: '/text/uuid', name: 'UUID生成', description: 'UUIDの一括生成', category: 'text', keywords: ['uuid', 'id', '一意'] },
  { path: '/text/lorem', name: 'Lorem Ipsum生成', description: 'ダミーテキスト生成', category: 'text', keywords: ['lorem', 'ダミー', 'テキスト'] },
  { path: '/text/case', name: 'ケース変換', description: '大文字・小文字・キャメルケース変換', category: 'text', keywords: ['ケース', '大文字', '小文字', 'キャメル'] },
  { path: '/text/number', name: '数字変換', description: '2進数・8進数・16進数変換', category: 'text', keywords: ['進数', '変換', '16進数'] },
  { path: '/text/duplicate', name: '重複削除', description: '重複行・単語の削除', category: 'text', keywords: ['重複', '削除', 'ユニーク'] },
  { path: '/text/sort', name: 'テキストソート', description: '行の並び替え', category: 'text', keywords: ['ソート', '並び替え'] },
  { path: '/text/statistics', name: 'テキスト統計', description: '文字数・読書時間等の統計', category: 'text', keywords: ['統計', '読書時間'] },
  { path: '/text/markdown', name: 'Markdownプレビュー', description: 'Markdownのリアルタイムプレビュー', category: 'text', keywords: ['markdown', 'プレビュー'] },
  { path: '/text/whitespace', name: '空白削除', description: '空白・スペースの削除', category: 'text', keywords: ['空白', 'スペース', '削除'] },
  { path: '/text/join', name: 'テキスト結合', description: '複数行を結合', category: 'text', keywords: ['結合', 'join'] },
  { path: '/text/split', name: 'テキスト分割', description: 'テキストを分割', category: 'text', keywords: ['分割', 'split'] },
  { path: '/text/width', name: '全角半角変換', description: '全角・半角の相互変換', category: 'text', keywords: ['全角', '半角', '変換'] },
  { path: '/text/kana', name: 'ひらがなカタカナ変換', description: 'ひらがな・カタカナ変換', category: 'text', keywords: ['ひらがな', 'カタカナ'] },
  { path: '/text/romaji', name: 'ローマ字変換', description: '日本語をローマ字に変換', category: 'text', keywords: ['ローマ字', '変換'] },
  { path: '/text/furigana', name: 'ふりがな変換', description: '漢字にふりがなを追加', category: 'text', keywords: ['ふりがな', 'ルビ'] },
  { path: '/text/reverse', name: 'テキスト反転', description: 'テキストを逆順に', category: 'text', keywords: ['反転', '逆順'] },
  { path: '/text/escape', name: 'エスケープ', description: 'テキストのエスケープ処理', category: 'text', keywords: ['エスケープ', 'html'] },
  { path: '/text/unescape', name: 'アンエスケープ', description: 'エスケープの解除', category: 'text', keywords: ['アンエスケープ', 'デコード'] },
  { path: '/text/password-adv', name: 'パスワード生成（詳細）', description: '詳細設定可能なパスワード生成', category: 'text', keywords: ['パスワード', '生成'] },
  { path: '/text/barcode', name: 'バーコード生成', description: '各種バーコード生成', category: 'text', keywords: ['バーコード', '生成'] },
  { path: '/text/flip', name: 'フリップテキスト', description: 'テキストを上下逆に', category: 'text', keywords: ['フリップ', '逆さま'] },
  { path: '/text/timestamp', name: 'タイムスタンプ変換', description: 'タイムスタンプ変換', category: 'text', keywords: ['タイムスタンプ', '日時'] },
  { path: '/text/line-number', name: '行番号追加', description: 'テキストに行番号を追加', category: 'text', keywords: ['行番号', '追加'] },
  { path: '/text/replace', name: '一括置換', description: 'テキストの一括置換', category: 'text', keywords: ['置換', 'replace'] },
  { path: '/text/trim', name: 'トリム', description: '前後の空白削除', category: 'text', keywords: ['トリム', 'trim'] },
  { path: '/text/extract', name: 'テキスト抽出', description: 'パターンでテキスト抽出', category: 'text', keywords: ['抽出', 'extract'] },
  { path: '/text/wrap', name: 'テキスト折り返し', description: '指定幅で折り返し', category: 'text', keywords: ['折り返し', 'wrap'] },
  { path: '/text/indent', name: 'インデント調整', description: 'インデントの追加・削除', category: 'text', keywords: ['インデント', 'indent'] },
  { path: '/text/empty-lines', name: '空行削除', description: '空行の一括削除', category: 'text', keywords: ['空行', '削除'] },
  { path: '/text/url-params', name: 'URLパラメータ解析', description: 'URLパラメータの解析・編集', category: 'text', keywords: ['url', 'パラメータ'] },
  { path: '/text/json-path', name: 'JSONパス抽出', description: 'JSONからパスで値を抽出', category: 'text', keywords: ['json', 'パス'] },
  { path: '/text/csv-preview', name: 'CSVプレビュー', description: 'CSVをテーブル表示', category: 'text', keywords: ['csv', 'プレビュー'] },
  { path: '/text/json-to-csv', name: 'JSON to CSV', description: 'JSONをCSVに変換', category: 'text', keywords: ['json', 'csv', '変換'] },
  { path: '/text/html-to-markdown', name: 'HTML to Markdown', description: 'HTMLをMarkdownに変換', category: 'text', keywords: ['html', 'markdown'] },
  { path: '/text/code-formatter', name: 'コードフォーマッタ', description: 'コードの整形', category: 'text', keywords: ['コード', 'フォーマット'] },
  { path: '/text/lorem-ipsum-advanced', name: 'ダミーテキスト生成（詳細）', description: '詳細設定可能なダミーテキスト', category: 'text', keywords: ['ダミー', 'lorem'] },
  { path: '/text/diff-checker', name: 'テキスト差分チェッカー', description: '行単位の差分表示', category: 'text', keywords: ['差分', 'diff'] },
  { path: '/text/notepad', name: 'メモ帳', description: 'シンプルなメモ帳', category: 'text', keywords: ['メモ', 'notepad'] },
  { path: '/text/word-count', name: '単語数カウント', description: '単語数をカウント', category: 'text', keywords: ['単語', 'カウント'] },
  { path: '/text/acronym', name: '略語ジェネレーター', description: 'フレーズから略語を生成', category: 'text', keywords: ['略語', 'アクロニウム'] },
  { path: '/text/sort-adv', name: 'テキストソート（詳細）', description: '詳細設定可能なソート', category: 'text', keywords: ['ソート', '並び替え'] },
  { path: '/text/duplicate-count', name: '重複カウント', description: '重複の出現回数をカウント', category: 'text', keywords: ['重複', 'カウント'] },
  { path: '/text/char-type', name: '文字種判定', description: '文字の種類を判定', category: 'text', keywords: ['文字', '種類'] },
  { path: '/text/diff-line', name: '行差分', description: '行単位の差分比較', category: 'text', keywords: ['差分', '行'] },
  { path: '/text/date-format', name: '日付フォーマット', description: '日付のフォーマット変換', category: 'text', keywords: ['日付', 'フォーマット'] },
  { path: '/text/number-format', name: '数値フォーマット', description: '数値のフォーマット変換', category: 'text', keywords: ['数値', 'フォーマット'] },
  { path: '/text/stats', name: 'テキスト統計（詳細）', description: '詳細なテキスト統計', category: 'text', keywords: ['統計', '分析'] },
  { path: '/text/join-adv', name: 'テキスト結合（詳細）', description: '詳細設定可能な結合', category: 'text', keywords: ['結合', 'join'] },
  { path: '/text/split-adv', name: 'テキスト分割（詳細）', description: '詳細設定可能な分割', category: 'text', keywords: ['分割', 'split'] },
  
  // その他ツール
  { path: '/other/qrcode', name: 'QRコード生成', description: 'URLやテキストをQRコード化', category: 'other', keywords: ['qr', 'qrコード', '生成'] },
  { path: '/other/password', name: 'パスワード生成', description: 'セキュアなパスワード生成', category: 'other', keywords: ['パスワード', '生成'] },
  { path: '/other/colorpicker', name: 'カラーピッカー', description: 'HEX, RGB, HSL変換', category: 'other', keywords: ['色', 'カラー', 'hex', 'rgb'] },
  { path: '/other/roulette', name: 'ルーレット', description: 'ランダム抽選ツール', category: 'other', keywords: ['ルーレット', '抽選', 'ランダム'] },
  { path: '/other/cron', name: 'Cron式生成', description: 'Cron式の作成', category: 'other', keywords: ['cron', 'スケジュール'] },
  { path: '/other/unit', name: '単位変換', description: '長さ・重さ・温度等の変換', category: 'other', keywords: ['単位', '変換', 'メートル'] },
  { path: '/other/percentage', name: 'パーセント計算', description: 'パーセント計算', category: 'other', keywords: ['パーセント', '計算', '割合'] },
  { path: '/other/timezone', name: '時差計算', description: '世界の都市の時差', category: 'other', keywords: ['時差', 'タイムゾーン'] },
  { path: '/other/random-num', name: '乱数生成', description: '指定範囲の乱数生成', category: 'other', keywords: ['乱数', 'ランダム', '抽選'] },
  { path: '/other/age', name: '年齢計算', description: '生年月日から年齢計算', category: 'other', keywords: ['年齢', '計算', '誕生日'] },
  { path: '/other/tax', name: '消費税計算', description: '消費税の計算', category: 'other', keywords: ['消費税', '税', '計算'] },
  { path: '/other/calculator', name: '計算機', description: 'シンプルな電卓', category: 'other', keywords: ['計算機', '電卓'] },
  { path: '/other/progress', name: '進捗変換', description: 'パーセントと分数の変換', category: 'other', keywords: ['進捗', 'パーセント'] },
  { path: '/other/bmi', name: 'BMI計算', description: 'BMIと肥満度判定', category: 'other', keywords: ['bmi', '肥満', '健康'] },
  { path: '/other/calorie', name: 'カロリー計算', description: '基礎代謝・消費カロリー', category: 'other', keywords: ['カロリー', '基礎代謝'] },
  { path: '/other/discount', name: '割引計算', description: '割引額・割引後価格', category: 'other', keywords: ['割引', 'セール', '計算'] },
  { path: '/other/date-calc', name: '日付計算', description: '日数・期間の計算', category: 'other', keywords: ['日付', '日数', '期間'] },
  { path: '/other/ip-address', name: 'IPアドレス確認', description: '自分のIPアドレス確認', category: 'other', keywords: ['ip', 'アドレス'] },
  { path: '/other/image-compress', name: '画像圧縮', description: '画像の圧縮・軽量化', category: 'other', keywords: ['画像', '圧縮', '軽量化'] },
  { path: '/other/image-resize', name: '画像リサイズ', description: '画像サイズの変更', category: 'other', keywords: ['画像', 'リサイズ', 'サイズ'] },
  { path: '/other/meta-tag', name: 'メタタグ生成', description: 'SEO用メタタグ生成', category: 'other', keywords: ['メタタグ', 'seo', 'ogp'] },
  { path: '/other/card-check', name: 'カード番号チェック', description: 'カード番号の検証', category: 'other', keywords: ['カード', 'チェック', '検証'] },
  { path: '/other/currency', name: '為替計算', description: '通貨の換算', category: 'other', keywords: ['為替', '通貨', 'ドル'] },
  { path: '/other/color-palette', name: 'カラーパレット生成', description: '配色パレット生成', category: 'other', keywords: ['カラー', 'パレット', '配色'] },
  { path: '/other/compound-interest', name: '複利計算', description: '複利のシミュレーション', category: 'other', keywords: ['複利', '投資', '利息'] },
  { path: '/other/mortgage', name: '住宅ローン計算', description: '住宅ローンシミュレーション', category: 'other', keywords: ['住宅ローン', '返済'] },
  { path: '/other/image-convert', name: '画像形式変換', description: 'PNG/JPEG/WebP変換', category: 'other', keywords: ['画像', '変換', 'png', 'jpeg'] },
  { path: '/other/robots-txt', name: 'Robots.txt生成', description: 'robots.txt作成', category: 'other', keywords: ['robots', 'seo'] },
  { path: '/other/gpa', name: 'GPA計算', description: '大学のGPA計算', category: 'other', keywords: ['gpa', '大学', '成績'] },
  { path: '/other/password-check', name: 'パスワード強度チェック', description: 'パスワード強度判定', category: 'other', keywords: ['パスワード', '強度', 'セキュリティ'] },
  { path: '/other/salary', name: '年収・時給変換', description: '年収・月収・時給換算', category: 'other', keywords: ['年収', '時給', '給与'] },
  { path: '/other/image-crop', name: '画像トリミング', description: '画像の切り抜き', category: 'other', keywords: ['画像', 'トリミング', 'クロップ'] },
  { path: '/other/goal-tracker', name: '目標達成トラッカー', description: '目標進捗管理', category: 'other', keywords: ['目標', 'トラッカー'] },
  { path: '/other/habit-tracker', name: '習慣トラッカー', description: '毎日の習慣管理', category: 'other', keywords: ['習慣', 'トラッカー'] },
  { path: '/other/image-base64', name: '画像Base64変換', description: '画像をBase64に変換', category: 'other', keywords: ['画像', 'base64'] },
  { path: '/other/image-glitch', name: '画像グリッチ', description: 'グリッチエフェクト追加', category: 'other', keywords: ['画像', 'グリッチ', 'エフェクト'] },
  { path: '/other/image-rotate', name: '画像回転', description: '画像を回転', category: 'other', keywords: ['画像', '回転'] },
  { path: '/other/image-flip', name: '画像反転', description: '画像を反転', category: 'other', keywords: ['画像', '反転'] },
  { path: '/other/watermark', name: '透かし追加', description: '画像に透かしを追加', category: 'other', keywords: ['透かし', 'ウォーターマーク'] },
  { path: '/other/image-merge', name: '画像結合', description: '複数画像を結合', category: 'other', keywords: ['画像', '結合'] },
  { path: '/other/exif-remover', name: 'EXIF削除', description: '画像のEXIF情報削除', category: 'other', keywords: ['exif', 'プライバシー', '削除'] },
  { path: '/other/color-converter', name: '色変換', description: 'HEX/RGB/HSL/CMYK変換', category: 'other', keywords: ['色', '変換', 'カラー'] },
  { path: '/other/image-crop-circle', name: '画像トリミング（円形）', description: '円形・正方形にトリミング', category: 'other', keywords: ['画像', '円形', 'トリミング'] },
  { path: '/other/image-blur', name: '画像ぼかし', description: '画像にぼかし効果', category: 'other', keywords: ['画像', 'ぼかし', 'ブラー'] },
  
  // カメラツール
  { path: '/camera', name: 'カメラ映像共有', description: 'ローカルネットワークでカメラ共有', category: 'camera', keywords: ['カメラ', '映像', '共有'] },
]

// カテゴリ別フィルタ
export function filterByCategory(category: string): Tool[] {
  if (category === 'all') return TOOLS
  return TOOLS.filter(tool => tool.category === category)
}

// 検索機能
export function searchTools(query: string): Tool[] {
  const lowerQuery = query.toLowerCase().trim()
  if (!lowerQuery) return TOOLS
  
  return TOOLS.filter(tool => {
    const nameMatch = tool.name.toLowerCase().includes(lowerQuery)
    const descMatch = tool.description.toLowerCase().includes(lowerQuery)
    const keywordMatch = tool.keywords.some(k => k.toLowerCase().includes(lowerQuery))
    const pathMatch = tool.path.toLowerCase().includes(lowerQuery)
    
    return nameMatch || descMatch || keywordMatch || pathMatch
  })
}

// カテゴリ名
export const CATEGORY_NAMES: Record<string, string> = {
  timer: 'タイマー',
  text: 'テキスト',
  other: 'その他',
  camera: 'カメラ',
}
