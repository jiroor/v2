import { Link } from 'react-router-dom'
import { SEO } from '@/components/SEO/SEO'
import {
  CharCounterIcon,
  TextDiffIcon,
  RandomStringIcon,
  Base64Icon,
  URLEncoderIcon,
  JSONFormatterIcon,
  HashGeneratorIcon,
  UnixTimestampIcon,
  RegexTesterIcon,
  UUIDGeneratorIcon,
  LoremIpsumIcon,
  CaseConverterIcon,
  NumberConverterIcon,
  DuplicateRemoverIcon,
  TextSorterIcon,
  TextStatisticsIcon,
  MarkdownPreviewIcon,
  WhitespaceRemoverIcon,
  TextJoinerIcon,
  TextSplitterIcon,
  WidthConverterIcon,
} from '@/components/Icons/ToolIcons'

const textTools = [
  { path: '/text/counter', name: '文字数カウンター', desc: '文字数、単語数、行数カウント', icon: CharCounterIcon },
  { path: '/text/diff', name: 'テキスト差分', desc: '2つのテキストの差分表示', icon: TextDiffIcon },
  { path: '/text/base64', name: 'Base64変換', desc: 'Base64エンコード/デコード', icon: Base64Icon },
  { path: '/text/url', name: 'URL変換', desc: 'URLエンコード/デコード', icon: URLEncoderIcon },
  { path: '/text/json', name: 'JSON整形', desc: 'JSONフォーマット・圧縮', icon: JSONFormatterIcon },
  { path: '/text/hash', name: 'ハッシュ生成', desc: 'MD5, SHA-256, SHA-512', icon: HashGeneratorIcon },
  { path: '/text/regex', name: '正規表現テスト', desc: 'Regexパターンテスト', icon: RegexTesterIcon },
  { path: '/text/uuid', name: 'UUID生成', desc: 'UUID/GUID生成', icon: UUIDGeneratorIcon },
  { path: '/text/width', name: '全角半角変換', desc: '全角⇔半角変換', icon: WidthConverterIcon },
  { path: '/text/kana', name: 'ひらがなカタカナ変換', desc: 'ひらがな⇔カタカナ', icon: CaseConverterIcon },
  { path: '/text/romaji', name: 'ローマ字変換', desc: 'ローマ字⇔ひらがな', icon: CaseConverterIcon },
  { path: '/text/markdown', name: 'Markdownプレビュー', desc: 'リアルタイムプレビュー', icon: MarkdownPreviewIcon },
  { path: '/text/whitespace', name: '空白削除', desc: '空白・スペース削除', icon: WhitespaceRemoverIcon },
  { path: '/text/join', name: 'テキスト結合', desc: '行を結合', icon: TextJoinerIcon },
  { path: '/text/split', name: 'テキスト分割', desc: 'テキストを分割', icon: TextSplitterIcon },
  { path: '/text/sort', name: 'テキストソート', desc: '行の並び替え', icon: TextSorterIcon },
  { path: '/text/duplicate', name: '重複行削除', desc: '重複する行を削除', icon: DuplicateRemoverIcon },
  { path: '/text/statistics', name: 'テキスト統計', desc: '詳細な文字数・統計', icon: TextStatisticsIcon },
  { path: '/text/random', name: 'ランダム文字列', desc: 'パスワード等の生成', icon: RandomStringIcon },
  { path: '/text/number', name: '数字変換', desc: '2進数・8進数・16進数', icon: NumberConverterIcon },
  { path: '/text/case', name: 'ケース変換', desc: '大文字・小文字・キャメルケース', icon: CaseConverterIcon },
  { path: '/text/lorem', name: 'Lorem Ipsum', desc: 'ダミーテキスト生成', icon: LoremIpsumIcon },
  { path: '/text/unix', name: 'Unix時間変換', desc: 'タイムスタンプ変換', icon: UnixTimestampIcon },
]

export default function TextToolsList() {
  return (
    <>
      <SEO path="/text" includeJsonLd />
      <div className="py-8 px-6 max-w-[1400px] mx-auto">
        <h1 className="text-3xl font-bold mb-2">📝 テキストツール</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          テキスト処理・変換に関する便利なツール集
        </p>
        
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 max-md:grid-cols-1">
          {textTools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.path}
                to={tool.path}
                className="flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] dark:hover:bg-gray-700 group"
              >
                <Icon className="w-12 h-12 mb-4 text-gray-900 dark:text-gray-100 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
                <h3 className="text-xl font-semibold mb-2 text-center">{tool.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm text-center">{tool.desc}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
