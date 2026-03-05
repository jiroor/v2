import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  CountdownIcon,
  StopwatchIcon,
  PomodoroIcon,
  CurrentTimeIcon,
  CharCounterIcon,
  TextDiffIcon,
  RandomStringIcon,
  QRCodeIcon,
  PasswordIcon,
  ColorPickerIcon,
  RouletteIcon,
  CameraSharingIcon,
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
  ImageToBase64Icon,
  MarkdownPreviewIcon,
  WhitespaceRemoverIcon,
  TextJoinerIcon,
  TextSplitterIcon,
  CronGeneratorIcon,
  UnitConverterIcon,
  PercentageCalculatorIcon,
  TimezoneConverterIcon,
  RandomNumberGeneratorIcon,
  AgeCalculatorIcon,
  TaxCalculatorIcon,
  CalculatorIcon,
  ProgressConverterIcon,
  BMICalculatorIcon,
} from '../components/Icons/ToolIcons'
import { getTopUsedTools } from '../utils/analyticsUtils'
import type { ToolUsageSummary } from '../types/analytics'
import { SEO } from '@/components/SEO/SEO'

// ツールパスとアイコンのマッピング
const toolIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  '/timer/countdown': CountdownIcon,
  '/timer/stopwatch': StopwatchIcon,
  '/timer/pomodoro': PomodoroIcon,
  '/timer/current': CurrentTimeIcon,
  '/text/counter': CharCounterIcon,
  '/text/diff': TextDiffIcon,
  '/text/random': RandomStringIcon,
  '/text/base64': Base64Icon,
  '/text/url': URLEncoderIcon,
  '/text/json': JSONFormatterIcon,
  '/text/hash': HashGeneratorIcon,
  '/text/unix': UnixTimestampIcon,
  '/text/regex': RegexTesterIcon,
  '/text/uuid': UUIDGeneratorIcon,
  '/text/lorem': LoremIpsumIcon,
  '/text/case': CaseConverterIcon,
  '/text/number': NumberConverterIcon,
  '/text/duplicate': DuplicateRemoverIcon,
  '/text/sort': TextSorterIcon,
  '/text/statistics': TextStatisticsIcon,
  '/other/image-base64': ImageToBase64Icon,
  '/text/markdown': MarkdownPreviewIcon,
  '/text/whitespace': WhitespaceRemoverIcon,
  '/text/join': TextJoinerIcon,
  '/text/split': TextSplitterIcon,
  '/other/cron': CronGeneratorIcon,
  '/other/unit': UnitConverterIcon,
  '/other/percentage': PercentageCalculatorIcon,
  '/other/timezone': TimezoneConverterIcon,
  '/other/random-num': RandomNumberGeneratorIcon,
  '/other/age': AgeCalculatorIcon,
  '/other/tax': TaxCalculatorIcon,
  '/other/calculator': CalculatorIcon,
  '/other/progress': ProgressConverterIcon,
  '/other/bmi': BMICalculatorIcon,
  BMICalculatorIcon,
  '/other/qrcode': QRCodeIcon,
  '/other/password': PasswordIcon,
  '/other/colorpicker': ColorPickerIcon,
  '/other/roulette': RouletteIcon,
  '/camera': CameraSharingIcon,
}

function Home() {
  const [topTools, setTopTools] = useState<ToolUsageSummary[]>([])

  useEffect(() => {
    // よく使うツールを取得（上位3件）
    const tools = getTopUsedTools(3)
    setTopTools(tools)
  }, [])

  return (
    <>
      <SEO path="/" includeJsonLd />
      <div className="py-8 px-6 max-w-[1400px] mx-auto">
      {/* よく使うツールセクション */}
      {topTools.length > 0 && (
        <div className="mb-12">
          <h2 className="text-[26px] font-bold mb-2">よく使うツール</h2>
          <p className="text-gray-600 mb-6">
            あなたがよく使うツールへのクイックアクセス
          </p>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 max-md:grid-cols-1">
            {topTools.map((tool) => {
              const Icon = toolIcons[tool.toolPath]
              if (!Icon) return null

              return (
                <Link
                  key={tool.toolPath}
                  to={tool.toolPath}
                  className="flex flex-col items-center bg-white border-2 border-[#d97706] rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(217,119,6,0.2)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(217,119,6,0.2)] group relative"
                >
                  <div className="absolute top-2 right-2 bg-[#d97706] text-white text-xs px-2 py-1 rounded-full">
                    {tool.count}回
                  </div>
                  <Icon className="w-12 h-12 mb-4 text-[#d97706] transition-all duration-200 group-hover:scale-110" />
                  <h3 className="text-xl font-semibold mb-2 text-center">{tool.toolName}</h3>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* 全ツール一覧 */}
      <h2 className="text-[30px] font-bold mb-2">ツール一覧</h2>
      <p className="text-gray-600 mb-8">
        軽量でミニマルなユーティリティツール集
      </p>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 max-md:grid-cols-1">
        <Link
          to="/timer/countdown"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <CountdownIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">カウントダウンタイマー</h3>
          <p className="text-gray-600 text-sm text-center">指定時間からカウントダウン</p>
        </Link>

        <Link
          to="/timer/stopwatch"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <StopwatchIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">ストップウォッチ</h3>
          <p className="text-gray-600 text-sm text-center">時間計測とラップタイム</p>
        </Link>

        <Link
          to="/timer/pomodoro"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <PomodoroIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">ポモドーロタイマー</h3>
          <p className="text-gray-600 text-sm text-center">25分作業 + 5分休憩サイクル</p>
        </Link>

        <Link
          to="/timer/current"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <CurrentTimeIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">現在日時</h3>
          <p className="text-gray-600 text-sm text-center">タイムゾーン選択可能な世界時計</p>
        </Link>

        <Link
          to="/text/counter"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <CharCounterIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">文字数カウンター</h3>
          <p className="text-gray-600 text-sm text-center">文字数、単語数、行数カウント</p>
        </Link>

        <Link
          to="/text/diff"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <TextDiffIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">テキスト差分</h3>
          <p className="text-gray-600 text-sm text-center">2つのテキストの差分表示</p>
        </Link>

        <Link
          to="/text/random"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <RandomStringIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">ランダム文字列</h3>
          <p className="text-gray-600 text-sm text-center">パスワード等の生成</p>
        </Link>

        <Link
          to="/text/base64"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <Base64Icon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">Base64変換</h3>
          <p className="text-gray-600 text-sm text-center">Base64エンコード/デコード</p>
        </Link>

        <Link
          to="/text/url"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <URLEncoderIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">URL変換</h3>
          <p className="text-gray-600 text-sm text-center">URLエンコード/デコード</p>
        </Link>

        <Link
          to="/text/json"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <JSONFormatterIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">JSON整形</h3>
          <p className="text-gray-600 text-sm text-center">JSONフォーマット・圧縮</p>
        </Link>

        <Link
          to="/text/hash"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <HashGeneratorIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">ハッシュ生成</h3>
          <p className="text-gray-600 text-sm text-center">MD5, SHA-256, SHA-512</p>
        </Link>

        <Link
          to="/text/unix"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <UnixTimestampIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">Unix時間変換</h3>
          <p className="text-gray-600 text-sm text-center">タイムスタンプ変換</p>
        </Link>

        <Link
          to="/text/regex"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <RegexTesterIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">正規表現テスト</h3>
          <p className="text-gray-600 text-sm text-center">Regexパターンテスト</p>
        </Link>

        <Link
          to="/text/uuid"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <UUIDGeneratorIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">UUID生成</h3>
          <p className="text-gray-600 text-sm text-center">UUID/GUID生成</p>
        </Link>

        <Link
          to="/text/lorem"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <LoremIpsumIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">Lorem Ipsum</h3>
          <p className="text-gray-600 text-sm text-center">ダミーテキスト生成</p>
        </Link>

        <Link
          to="/text/case"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <CaseConverterIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">ケース変換</h3>
          <p className="text-gray-600 text-sm text-center">大文字・小文字・キャメルケース</p>
        </Link>

        <Link
          to="/text/number"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <NumberConverterIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">数字変換</h3>
          <p className="text-gray-600 text-sm text-center">2進数・8進数・16進数</p>
        </Link>

        <Link
          to="/text/duplicate"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <DuplicateRemoverIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">重複行削除</h3>
          <p className="text-gray-600 text-sm text-center">重複する行を削除</p>
        </Link>

        <Link
          to="/text/sort"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <TextSorterIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">テキストソート</h3>
          <p className="text-gray-600 text-sm text-center">行の並び替え</p>
        </Link>

        <Link
          to="/text/statistics"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <TextStatisticsIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">テキスト統計</h3>
          <p className="text-gray-600 text-sm text-center">詳細な文字数・統計</p>
        </Link>

        <Link
          to="/other/image-base64"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <ImageToBase64Icon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">画像Base64変換</h3>
          <p className="text-gray-600 text-sm text-center">画像をBase64に変換</p>
        </Link>

        <Link
          to="/text/markdown"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <MarkdownPreviewIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">Markdownプレビュー</h3>
          <p className="text-gray-600 text-sm text-center">リアルタイムプレビュー</p>
        </Link>

        <Link
          to="/text/whitespace"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <WhitespaceRemoverIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">空白削除</h3>
          <p className="text-gray-600 text-sm text-center">空白・スペース削除</p>
        </Link>

        <Link
          to="/text/join"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <TextJoinerIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">テキスト結合</h3>
          <p className="text-gray-600 text-sm text-center">行を結合</p>
        </Link>

        <Link
          to="/text/split"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <TextSplitterIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">テキスト分割</h3>
          <p className="text-gray-600 text-sm text-center">テキストを分割</p>
        </Link>

        <Link
          to="/other/cron"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <CronGeneratorIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">Cron式生成</h3>
          <p className="text-gray-600 text-sm text-center">スケジュール設定</p>
        </Link>

        <Link
          to="/other/unit"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <UnitConverterIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">単位変換</h3>
          <p className="text-gray-600 text-sm text-center">長さ・重さ・温度など</p>
        </Link>

        <Link
          to="/other/percentage"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <PercentageCalculatorIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">パーセント計算</h3>
          <p className="text-gray-600 text-sm text-center">割合・増減の計算</p>
        </Link>

        <Link
          to="/other/timezone"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <TimezoneConverterIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">時差計算</h3>
          <p className="text-gray-600 text-sm text-center">世界の時間変換</p>
        </Link>

        <Link
          to="/other/random-num"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <RandomNumberGeneratorIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">乱数生成</h3>
          <p className="text-gray-600 text-sm text-center">ランダムな数字を生成</p>
        </Link>

        <Link
          to="/other/age"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <AgeCalculatorIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">年齢計算</h3>
          <p className="text-gray-600 text-sm text-center">満年齢を計算</p>
        </Link>

        <Link
          to="/other/tax"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <TaxCalculatorIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">消費税計算</h3>
          <p className="text-gray-600 text-sm text-center">税抜・税込計算</p>
        </Link>

        <Link
          to="/other/calculator"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <CalculatorIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">計算機</h3>
          <p className="text-gray-600 text-sm text-center">シンプルな電卓</p>
        </Link>

        <Link
          to="/other/progress"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <ProgressConverterIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">進捗変換</h3>
          <p className="text-gray-600 text-sm text-center">分数↔パーセント</p>
        </Link>

        <Link
          to="/other/qrcode"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <QRCodeIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">QRコード生成</h3>
          <p className="text-gray-600 text-sm text-center">URL等をQRコードに変換</p>
        </Link>

        <Link
          to="/other/password"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <PasswordIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">パスワード生成</h3>
          <p className="text-gray-600 text-sm text-center">セキュアなパスワード生成</p>
        </Link>

        <Link
          to="/other/colorpicker"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <ColorPickerIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">カラーピッカー</h3>
          <p className="text-gray-600 text-sm text-center">HEX/RGB/HSL変換</p>
        </Link>

        <Link
          to="/other/roulette"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <RouletteIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">ルーレット</h3>
          <p className="text-gray-600 text-sm text-center">ランダム抽選ツール</p>
        </Link>

        <Link
          to="/camera"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
        >
          <CameraSharingIcon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
          <h3 className="text-xl font-semibold mb-2 text-center">カメラ映像共有</h3>
          <p className="text-gray-600 text-sm text-center">ローカルで映像をリアルタイム共有</p>
        </Link>
      </div>
      </div>
    </>
  )
}

export default Home
