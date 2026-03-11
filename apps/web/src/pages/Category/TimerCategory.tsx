import { Link } from 'react-router-dom'
import { SEO } from '@/components/SEO/SEO'
import AdBanner from '@/components/Ads/AdBanner'
import { 
  Timer, 
  Clock, 
  TimerOff, 
  Hourglass, 
  Clock3 
} from 'lucide-react'

const timerTools = [
  {
    path: '/timer/countdown',
    title: 'カウントダウンタイマー',
    description: '指定時間のカウントダウン',
    icon: Timer,
    color: 'bg-red-500'
  },
  {
    path: '/timer/stopwatch',
    title: 'ストップウォッチ',
    description: '経過時間を計測',
    icon: Clock,
    color: 'bg-blue-500'
  },
  {
    path: '/timer/pomodoro',
    title: 'ポモドーロタイマー',
    description: '25分作業+5分休憩のタイマー',
    icon: TimerOff,
    color: 'bg-green-500'
  },
  {
    path: '/timer/current',
    title: '現在時刻',
    description: '現在の日時を表示',
    icon: Clock3,
    color: 'bg-purple-500'
  },
  {
    path: '/timer/digital',
    title: 'デジタル時計',
    description: 'デジタル形式で時刻表示',
    icon: Hourglass,
    color: 'bg-orange-500'
  },
]

function TimerCategory() {
  return (
    <>
      <SEO
        title="タイマーツール"
        description='カウントダウンタイマー、ストップウォッチ、ポモドーロタイマーなど、作業や勉強に役立つタイマーツール集。完全無料でブラウザ完結。'
        path="/timer"
        category="UtilitiesApplication"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">⏱️ タイマーツール</h1>
          <p className="text-gray-600">
            カウントダウン、ストップウォッチ、ポモドーロなど。作業や勉強に役立つタイマーツール。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {timerTools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.path}
                to={tool.path}
                className="block p-6 border rounded-lg hover:shadow-lg transition-shadow bg-white"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${tool.color} text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold mb-1">{tool.title}</h2>
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
          <h2 className="text-xl font-semibold mb-4">タイマーツールの特徴</h2>
          <ul className="space-y-2 text-gray-600">
            <li>✅ 完全無料 - 登録不要で使える</li>
            <li>✅ ブラウザ完結 - アプリのインストール不要</li>
            <li>✅ タブを閉じても動作 - バックグラウンドで継続</li>
            <li>✅ 通知機能 - 時間が来たら通知でお知らせ</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-6 mb-3">ポモドーロテクニックとは？</h3>
          <p className="text-gray-600">
            ポモドーロテクニックは、25分間の作業と5分間の休憩を繰り返す時間管理法です。
            集中力を維持しながら効率的に作業を進めることができます。
            当サイトのポモドーロタイマーを使って、ぜひお試しください。
          </p>
        </div>
      </div>
    </>
  )
}

export default TimerCategory
