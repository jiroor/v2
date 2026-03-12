import { Link } from 'react-router-dom'
import { SEO } from '@/components/SEO/SEO'
import AdBanner from '@/components/Ads/AdBanner'
import { 
  Type, 
  Hash, 
  Code, 
  Link2, 
  FileJson, 
  Regex, 
  Fingerprint, 
  Calendar,
  Random,
  CaseSensitive,
  Binary,
  Copy,
  SortAsc,
  BarChart3,
  FileText,
  Split,
  Merge,
  Trash2,
  Eye
} from 'lucide-react'

const textTools = [
  {
    path: '/text/counter',
    title: '文字数カウンター',
    description: '文字数、単語数、行数をカウント',
    icon: Type,
    color: 'bg-blue-500'
  },
  {
    path: '/text/word-count',
    title: '単語カウンター',
    description: '単語数を詳細にカウント',
    icon: FileText,
    color: 'bg-cyan-500'
  },
  {
    path: '/text/base64',
    title: 'Base64エンコード/デコード',
    description: 'テキストをBase64形式に変換',
    icon: Code,
    color: 'bg-green-500'
  },
  {
    path: '/text/url',
    title: 'URLエンコード/デコード',
    description: 'URLのエンコードとデコード',
    icon: Link2,
    color: 'bg-indigo-500'
  },
  {
    path: '/text/json',
    title: 'JSON整形',
    description: 'JSONを見やすくフォーマット',
    icon: FileJson,
    color: 'bg-yellow-500'
  },
  {
    path: '/text/hash',
    title: 'ハッシュ生成',
    description: 'MD5, SHA1, SHA256などのハッシュ生成',
    icon: Hash,
    color: 'bg-red-500'
  },
  {
    path: '/text/regex',
    title: '正規表現テスト',
    description: '正規表現をリアルタイムでテスト',
    icon: Regex,
    color: 'bg-purple-500'
  },
  {
    path: '/text/uuid',
    title: 'UUID生成',
    description: 'ランダムなUUIDを生成',
    icon: Fingerprint,
    color: 'bg-pink-500'
  },
  {
    path: '/text/unix',
    title: 'Unixタイムスタンプ変換',
    description: 'Unix時間と日時を相互変換',
    icon: Calendar,
    color: 'bg-orange-500'
  },
  {
    path: '/text/random',
    title: 'ランダム文字列生成',
    description: 'ランダムな文字列を生成',
    icon: Random,
    color: 'bg-teal-500'
  },
  {
    path: '/text/case',
    title: '大文字小文字変換',
    description: 'テキストの大文字小文字を変換',
    icon: CaseSensitive,
    color: 'bg-sky-500'
  },
  {
    path: '/text/number',
    title: '基数変換',
    description: '2進数、8進数、16進数などを変換',
    icon: Binary,
    color: 'bg-violet-500'
  },
  {
    path: '/text/duplicate',
    title: '重複行削除',
    description: 'テキストから重複行を削除',
    icon: Copy,
    color: 'bg-rose-500'
  },
  {
    path: '/text/sort',
    title: 'テキストソート',
    description: '行をアルファベット順に並べ替え',
    icon: SortAsc,
    color: 'bg-amber-500'
  },
  {
    path: '/text/statistics',
    title: 'テキスト統計',
    description: 'テキストの詳細な統計情報を表示',
    icon: BarChart3,
    color: 'bg-emerald-500'
  },
  {
    path: '/text/split',
    title: 'テキスト分割',
    description: 'テキストを指定区切りで分割',
    icon: Split,
    color: 'bg-lime-500'
  },
  {
    path: '/text/join',
    title: 'テキスト結合',
    description: '複数行を1行に結合',
    icon: Merge,
    color: 'bg-fuchsia-500'
  },
  {
    path: '/text/whitespace',
    title: '空白削除',
    description: '余分な空白や改行を削除',
    icon: Trash2,
    color: 'bg-slate-500'
  },
  {
    path: '/text/markdown',
    title: 'Markdownプレビュー',
    description: 'Markdownをリアルタイムでプレビュー',
    icon: Eye,
    color: 'bg-gray-500'
  },
  {
    path: '/text/code-formatter',
    title: 'コードフォーマッタ',
    description: 'JSON, HTML, CSS, JSを整形',
    icon: Code,
    color: 'bg-emerald-500'
  },
  {
    path: '/text/lorem-ipsum-advanced',
    title: 'ダミーテキスト生成',
    description: 'Lorem Ipsum形式のダミーテキスト',
    icon: FileText,
    color: 'bg-amber-500'
  },
  {
    path: '/text/diff-checker',
    title: 'テキスト差分チェッカー',
    description: '2つのテキストの差分を確認',
    icon: FileText,
    color: 'bg-rose-500'
  },
]

function TextCategory() {
  return (
    <>
      <SEO
        title="テキストツール"
        description="文字数カウント、Base64エンコード、JSON整形、正規表現テストなど、開発者やライターに便利なテキスト処理ツール集。完全無料でブラウザ完結。"
        path="/text"
        category="UtilitiesApplication"
      />
      <div className="max-w-[1000px] mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">📝 テキストツール</h1>
          <p className="text-gray-600">
            文字数カウント、エンコード、変換、整形など。開発者やライターに便利なツール集。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {textTools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.path}
                to={tool.path}
                className="block p-4 border rounded-lg hover:shadow-lg transition-shadow bg-white"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${tool.color} text-white`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-semibold mb-1">{tool.title}</h2>
                    <p className="text-sm text-gray-600">{tool.description}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* 広告 */}
        <div className="mt-8">
          <AdBanner slot="CATEGORY_BOTTOM" format="horizontal" />
        </div>

        {/* SEO対策テキスト */}
        <div className="mt-8 prose prose-sm max-w-none">
          <h2 className="text-xl font-semibold mb-4">テキストツールの特徴</h2>
          <ul className="space-y-2 text-gray-600">
            <li>✅ 完全無料 - 登録不要で使える</li>
            <li>✅ ブラウザ完結 - ソフトウェアのインストール不要</li>
            <li>✅ プライバシー保護 - データはサーバーに送信されません</li>
            <li>✅ 高速処理 - ローカルで処理してすぐに結果を表示</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default TextCategory
