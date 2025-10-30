import { Link } from 'react-router-dom'
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
} from '../components/Icons/ToolIcons'

function Home() {
  return (
    <div className="py-8 px-6 max-w-[1400px] mx-auto">
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
      </div>
    </div>
  )
}

export default Home
