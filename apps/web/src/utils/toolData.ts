// ツールデータとカテゴリ定義

export interface Tool {
  path: string
  name: string
  description: string
  category: 'timer' | 'text' | 'image' | 'calculator' | 'security' | 'converter' | 'other'
  tags: string[]
}

export const tools: Tool[] = [
  // タイマー
  { path: '/timer/countdown', name: 'カウントダウンタイマー', description: '指定時間からカウントダウン', category: 'timer', tags: ['時間', 'カウントダウン'] },
  { path: '/timer/stopwatch', name: 'ストップウォッチ', description: '時間計測とラップタイム', category: 'timer', tags: ['時間', '計測'] },
  { path: '/timer/pomodoro', name: 'ポモドーロタイマー', description: '25分作業 + 5分休憩サイクル', category: 'timer', tags: ['時間', 'ポモドーロ', '生産性'] },
  { path: '/timer/current', name: '現在日時', description: 'タイムゾーン選択可能な世界時計', category: 'timer', tags: ['時間', '時計', 'タイムゾーン'] },

  // テキストツール
  { path: '/text/counter', name: '文字数カウンター', description: '文字数、単語数、行数カウント', category: 'text', tags: ['テキスト', 'カウント', '文字数'] },
  { path: '/text/diff', name: 'テキスト差分', description: '2つのテキストの差分表示', category: 'text', tags: ['テキスト', '比較', '差分'] },
  { path: '/text/random', name: 'ランダム文字列', description: 'パスワード等の生成', category: 'text', tags: ['テキスト', 'ランダム', '生成'] },
  { path: '/text/base64', name: 'Base64変換', description: 'Base64エンコード/デコード', category: 'converter', tags: ['エンコード', '変換', 'Base64'] },
  { path: '/text/url', name: 'URL変換', description: 'URLエンコード/デコード', category: 'converter', tags: ['エンコード', '変換', 'URL'] },
  { path: '/text/json', name: 'JSON整形', description: 'JSONフォーマット・圧縮', category: 'text', tags: ['テキスト', 'JSON', 'フォーマット'] },
  { path: '/text/hash', name: 'ハッシュ生成', description: 'MD5, SHA-256, SHA-512', category: 'security', tags: ['ハッシュ', '暗号化', 'セキュリティ'] },
  { path: '/text/unix', name: 'Unix時間変換', description: 'タイムスタンプ変換', category: 'converter', tags: ['変換', 'タイムスタンプ', 'Unix'] },
  { path: '/text/regex', name: '正規表現テスト', description: 'Regexパターンテスト', category: 'text', tags: ['テキスト', '正規表現', 'テスト'] },
  { path: '/text/uuid', name: 'UUID生成', description: 'UUID/GUID生成', category: 'text', tags: ['テキスト', 'UUID', '生成'] },
  { path: '/text/lorem', name: 'Lorem Ipsum', description: 'ダミーテキスト生成', category: 'text', tags: ['テキスト', 'ダミー', '生成'] },
  { path: '/text/case', name: 'ケース変換', description: '大文字・小文字・キャメルケース', category: 'text', tags: ['テキスト', '変換', 'ケース'] },
  { path: '/text/number', name: '数字変換', description: '2進数・8進数・16進数', category: 'converter', tags: ['変換', '数字', '進数'] },
  { path: '/text/duplicate', name: '重複行削除', description: '重複する行を削除', category: 'text', tags: ['テキスト', '重複', '削除'] },
  { path: '/text/sort', name: 'テキストソート', description: '行の並び替え', category: 'text', tags: ['テキスト', 'ソート', '並び替え'] },
  { path: '/text/statistics', name: 'テキスト統計', description: '詳細な文字数・統計', category: 'text', tags: ['テキスト', '統計', '分析'] },
  { path: '/text/markdown', name: 'Markdownプレビュー', description: 'リアルタイムプレビュー', category: 'text', tags: ['テキスト', 'Markdown', 'プレビュー'] },
  { path: '/text/number-format', name: '数値フォーマット変換', description: '数値を各種フォーマットに変換', category: 'text', tags: ['テキスト', '数値', 'フォーマット'] },
  { path: '/text/date-format', name: '日付フォーマット変換', description: '日付を各種フォーマットに変換', category: 'text', tags: ['テキスト', '日付', 'フォーマット'] },
  { path: '/text/escape', name: 'テキストエスケープ', description: 'テキストをエスケープ', category: 'text', tags: ['テキスト', 'エスケープ', '変換'] },
  { path: '/text/unescape', name: 'テキストアンエスケープ', description: 'エスケープを解除', category: 'text', tags: ['テキスト', 'アンエスケープ', 'デコード'] },
  { path: '/text/password-adv', name: 'パスワード生成（詳細）', description: '詳細設定でパスワード生成', category: 'text', tags: ['テキスト', 'パスワード', 'セキュリティ'] },
  { path: '/text/furigana', name: 'ふりがな変換', description: '漢字にふりがな追加', category: 'text', tags: ['テキスト', 'ふりがな', '日本語'] },
  { path: '/text/sort-adv', name: 'テキストソート（詳細）', description: '詳細設定でソート', category: 'text', tags: ['テキスト', 'ソート', '並び替え'] },
  { path: '/text/barcode', name: 'バーコード生成', description: 'バーコード画像生成', category: 'text', tags: ['テキスト', 'バーコード', '画像'] },
  { path: '/text/flip', name: 'フリップテキスト', description: 'テキストを上下逆さまに', category: 'text', tags: ['テキスト', 'フリップ', '変換'] },
  { path: '/text/whitespace', name: '空白削除', description: '空白・スペース削除', category: 'text', tags: ['テキスト', '空白', '削除'] },
  { path: '/text/width', name: '全角半角変換', description: '全角・半角を相互変換', category: 'converter', tags: ['テキスト', '変換', '全角', '半角'] },
  { path: '/text/kana', name: 'ひらがなカタカナ変換', description: 'ひらがな・カタカナを相互変換', category: 'converter', tags: ['テキスト', '変換', 'ひらがな', 'カタカナ'] },
  { path: '/text/romaji', name: 'ローマ字変換', description: 'ローマ字・ひらがなを相互変換', category: 'converter', tags: ['テキスト', '変換', 'ローマ字', 'ひらがな'] },
  { path: '/text/notepad', name: '簡易メモ帳', description: 'ブラウザで動作するシンプルなメモ', category: 'text', tags: ['テキスト', 'メモ', 'ノート'] },
  { path: '/text/timestamp', name: 'タイムスタンプ生成', description: '現在日時のタイムスタンプ生成', category: 'text', tags: ['テキスト', 'タイムスタンプ', '日時'] },
  { path: '/text/reverse', name: '逆順変換', description: 'テキストを逆順に変換', category: 'text', tags: ['テキスト', '逆順', 'リバース'] },
  { path: '/text/line-number', name: '行番号追加', description: 'テキストに行番号を追加', category: 'text', tags: ['テキスト', '行番号', 'ナンバリング'] },
  { path: '/text/duplicate-count', name: '重複行カウンター', description: '重複行をカウント', category: 'text', tags: ['テキスト', '重複', 'カウント'] },
  { path: '/text/char-type', name: '文字種カウンター', description: '文字種をカウント', category: 'text', tags: ['テキスト', '文字種', '分析'] },
  { path: '/text/diff-line', name: 'テキスト比較（行単位）', description: '行単位でテキストを比較', category: 'text', tags: ['テキスト', '比較', '差分'] },
  { path: '/text/url-params', name: 'URLパラメータ解析', description: 'URLのパラメータを解析', category: 'text', tags: ['テキスト', 'URL', 'パラメータ'] },
  { path: '/text/json-path', name: 'JSONパス抽出', description: 'JSONPathで値を抽出', category: 'text', tags: ['テキスト', 'JSON', '抽出'] },
  { path: '/text/csv-preview', name: 'CSVプレビュー', description: 'CSVを表形式で表示', category: 'text', tags: ['テキスト', 'CSV', 'プレビュー'] },
  { path: '/text/indent', name: 'テキストインデント整形', description: 'インデントを追加・削除', category: 'text', tags: ['テキスト', 'インデント', '整形'] },
  { path: '/text/empty-lines', name: '空行削除', description: '空行を削除', category: 'text', tags: ['テキスト', '空行', '削除'] },
  { path: '/text/replace', name: 'テキスト置換', description: 'テキストを置換', category: 'text', tags: ['テキスト', '置換', '検索'] },
  { path: '/text/trim', name: 'テキストトリム', description: '前後の空白を削除', category: 'text', tags: ['テキスト', 'トリム', '空白'] },
  { path: '/text/extract', name: 'テキスト抽出', description: '正規表現で抽出', category: 'text', tags: ['テキスト', '抽出', '正規表現'] },
  { path: '/text/wrap', name: 'テキストラップ', description: 'テキストを折り返し', category: 'text', tags: ['テキスト', 'ラップ', '整形'] },
  { path: '/text/stats', name: 'テキスト統計（詳細）', description: '詳細な統計情報', category: 'text', tags: ['テキスト', '統計', '分析'] },
  { path: '/text/join-adv', name: 'テキスト結合（詳細）', description: '高度な結合オプション', category: 'text', tags: ['テキスト', '結合', 'SQL'] },
  { path: '/text/split-adv', name: 'テキスト分割（詳細）', description: '高度な分割オプション', category: 'text', tags: ['テキスト', '分割', '分析'] },
  { path: '/text/split-adv', name: 'テキスト分割（詳細）', description: '高度な分割オプション', category: 'text', tags: ['テキスト', '分割', 'データ処理'] },
  { path: '/text/split-adv', name: 'テキスト分割（詳細）', description: '高度な分割オプション', category: 'text', tags: ['テキスト', '分割', 'JSON'] },
  { path: '/text/join', name: 'テキスト結合', description: '行を結合', category: 'text', tags: ['テキスト', '結合'] },
  { path: '/text/split', name: 'テキスト分割', description: 'テキストを分割', category: 'text', tags: ['テキスト', '分割'] },
  { path: '/text/word-count', name: '単語カウンター', description: '単語数をカウント', category: 'text', tags: ['テキスト', 'カウント', '単語'] },
  { path: '/text/json-to-csv', name: 'JSON to CSV', description: 'JSONをCSVに変換', category: 'converter', tags: ['変換', 'JSON', 'CSV'] },
  { path: '/text/html-to-markdown', name: 'HTML to Markdown', description: 'HTMLをMarkdownに変換', category: 'converter', tags: ['変換', 'HTML', 'Markdown'] },
  { path: '/text/acronym', name: '頭文字生成', description: 'テキストから頭文字を生成', category: 'text', tags: ['テキスト', '頭文字', '生成'] },

  // その他ツール
  { path: '/other/image-base64', name: '画像Base64変換', description: '画像をBase64に変換', category: 'image', tags: ['画像', '変換', 'Base64'] },
  { path: '/other/cron', name: 'Cron式生成', description: 'スケジュール設定', category: 'other', tags: ['Cron', 'スケジュール', '生成'] },
  { path: '/other/unit', name: '単位変換', description: '長さ・重さ・温度など', category: 'converter', tags: ['変換', '単位'] },
  { path: '/other/percentage', name: 'パーセント計算', description: '割合・増減の計算', category: 'calculator', tags: ['計算', 'パーセント'] },
  { path: '/other/timezone', name: '時差計算', description: '世界の時間変換', category: 'converter', tags: ['変換', 'タイムゾーン', '時間'] },
  { path: '/other/random-num', name: '乱数生成', description: 'ランダムな数字を生成', category: 'other', tags: ['ランダム', '数字', '生成'] },
  { path: '/other/age', name: '年齢計算', description: '満年齢を計算', category: 'calculator', tags: ['計算', '年齢', '日付'] },
  { path: '/other/tax', name: '消費税計算', description: '税抜・税込計算', category: 'calculator', tags: ['計算', '税'] },
  { path: '/other/calculator', name: '計算機', description: 'シンプルな電卓', category: 'calculator', tags: ['計算', '電卓'] },
  { path: '/other/progress', name: '進捗変換', description: '分数↔パーセント', category: 'converter', tags: ['変換', 'パーセント', '進捗'] },
  { path: '/other/qrcode', name: 'QRコード生成', description: 'URL等をQRコードに変換', category: 'other', tags: ['QRコード', '生成'] },
  { path: '/other/password', name: 'パスワード生成', description: 'セキュアなパスワード生成', category: 'security', tags: ['パスワード', 'セキュリティ', '生成'] },
  { path: '/other/colorpicker', name: 'カラーピッカー', description: 'HEX/RGB/HSL変換', category: 'converter', tags: ['変換', '色', 'カラーコード'] },
  { path: '/other/roulette', name: 'ルーレット', description: 'ランダム抽選ツール', category: 'other', tags: ['ランダム', '抽選', 'ゲーム'] },
  { path: '/other/timer', name: 'デジタルタイマー', description: 'シンプルなタイマー', category: 'timer', tags: ['時間', 'タイマー'] },
  { path: '/timer/stopwatch-tool', name: 'ストップウォッチツール', description: '高機能ストップウォッチ', category: 'timer', tags: ['時間', '計測'] },
  { path: '/other/date-calc', name: '日付計算', description: '日付の加減算', category: 'calculator', tags: ['計算', '日付'] },
  { path: '/other/ip-address', name: 'IPアドレス確認', description: '自分のIPアドレスを確認', category: 'other', tags: ['IP', 'ネットワーク'] },
  { path: '/other/image-compress', name: '画像圧縮', description: '画像ファイルを圧縮', category: 'image', tags: ['画像', '圧縮'] },
  { path: '/other/image-resize', name: '画像リサイズ', description: '画像サイズを変更', category: 'image', tags: ['画像', 'リサイズ'] },
  { path: '/other/meta-tag', name: 'メタタグ生成', description: 'OGPタグなどを生成', category: 'other', tags: ['SEO', 'メタタグ', '生成'] },
  { path: '/other/card-check', name: 'クレジットカード確認', description: 'カード番号の検証', category: 'security', tags: ['セキュリティ', 'カード'] },
  { path: '/other/currency', name: '通貨変換', description: '為替レート変換', category: 'converter', tags: ['変換', '通貨', '為替'] },
  { path: '/other/color-palette', name: 'カラーパレット', description: '配色パレット生成', category: 'other', tags: ['色', 'パレット', 'デザイン'] },
  { path: '/other/compound-interest', name: '複利計算', description: '複利で資産計算', category: 'calculator', tags: ['計算', '金融', '資産'] },
  { path: '/other/mortgage', name: '住宅ローン計算', description: 'ローン返済シミュレーション', category: 'calculator', tags: ['計算', '金融', 'ローン'] },
  { path: '/other/image-convert', name: '画像変換', description: '画像フォーマット変換', category: 'image', tags: ['画像', '変換'] },
  { path: '/other/robots-txt', name: 'robots.txt生成', description: 'クローラー設定', category: 'other', tags: ['SEO', 'robots.txt', '生成'] },
  { path: '/other/gpa', name: 'GPA計算', description: '成績平均点計算', category: 'calculator', tags: ['計算', '成績', 'GPA'] },
  { path: '/other/password-check', name: 'パスワード強度チェック', description: 'パスワードの安全性確認', category: 'security', tags: ['パスワード', 'セキュリティ', 'チェック'] },
  { path: '/other/salary', name: '給与計算', description: '手取り額計算', category: 'calculator', tags: ['計算', '給与', '金融'] },
  { path: '/other/image-crop', name: '画像切り抜き', description: '画像をトリミング', category: 'image', tags: ['画像', '切り抜き', 'トリミング'] },
  { path: '/other/goal-tracker', name: '目標トラッカー', description: '目標進捗管理', category: 'other', tags: ['目標', 'トラッキング', '生産性'] },
  { path: '/other/habit-tracker', name: '習慣トラッカー', description: '日々の習慣を管理', category: 'other', tags: ['習慣', 'トラッキング', '生産性'] },
  { path: '/camera', name: 'カメラ映像共有', description: 'ローカルで映像をリアルタイム共有', category: 'other', tags: ['カメラ', '共有', 'ビデオ'] },

  // 追加ツール
  { path: '/other/bmi', name: 'BMI計算', description: '肥満度を計算', category: 'calculator', tags: ['計算', '健康', 'BMI'] },
  { path: '/other/calorie', name: 'カロリー計算', description: '1日の必要カロリー', category: 'calculator', tags: ['計算', '健康', 'カロリー'] },
  { path: '/other/discount', name: '割引計算', description: 'セール価格を計算', category: 'calculator', tags: ['計算', '割引'] },
]

// カテゴリ表示名
export const categoryNames: Record<string, string> = {
  timer: '⏱️ タイマー',
  text: '📝 テキストツール',
  image: '🖼️ 画像ツール',
  calculator: '🧮 計算ツール',
  security: '🔒 セキュリティ',
  converter: '🔄 変換ツール',
  other: '🔧 その他',
}

// 現在のツールに関連するツールを取得
export function getRelatedTools(currentPath: string, limit: number = 4): Tool[] {
  const currentTool = tools.find(t => t.path === currentPath)
  if (!currentTool) return []

  // 同じカテゴリのツールを優先
  const sameCategory = tools.filter(t => 
    t.path !== currentPath && 
    t.category === currentTool.category
  )

  // 共通タグがあるツール
  const relatedByTags = tools.filter(t => 
    t.path !== currentPath && 
    t.category !== currentTool.category &&
    t.tags.some(tag => currentTool.tags.includes(tag))
  )

  // 重複を除いて結合
  const related = [...sameCategory, ...relatedByTags]
  const uniquePaths = new Set<string>()
  const unique: Tool[] = []
  
  for (const tool of related) {
    if (!uniquePaths.has(tool.path) && unique.length < limit) {
      uniquePaths.add(tool.path)
      unique.push(tool)
    }
  }

  return unique
}
