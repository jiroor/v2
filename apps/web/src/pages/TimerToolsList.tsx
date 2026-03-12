import { Link } from 'react-router-dom'
import { SEO } from '@/components/SEO/SEO'
import {
  CountdownIcon,
  StopwatchIcon,
  PomodoroIcon,
  CurrentTimeIcon,
} from '@/components/Icons/ToolIcons'

const timerTools = [
  { path: '/timer/countdown', name: 'カウントダウンタイマー', desc: '指定時間からカウントダウン', icon: CountdownIcon },
  { path: '/timer/stopwatch', name: 'ストップウォッチ', desc: '時間計測とラップタイム', icon: StopwatchIcon },
  { path: '/timer/pomodoro', name: 'ポモドーロタイマー', desc: '25分作業 + 5分休憩サイクル', icon: PomodoroIcon },
  { path: '/timer/current', name: '現在日時', desc: 'タイムゾーン選択可能な世界時計', icon: CurrentTimeIcon },
]

export default function TimerToolsList() {
  return (
    <>
      <SEO path="/timer" />
      <div className="py-8 px-6 max-w-[1400px] mx-auto">
        <h1 className="text-3xl font-bold mb-2">⏱️ タイマー</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          時間管理・計測に関する便利なツール集
        </p>
        
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 max-md:grid-cols-1">
          {timerTools.map((tool) => {
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
