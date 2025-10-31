import { useMemo } from 'react'
import { usePomodoro } from '../../hooks/usePomodoro'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'

function PomodoroTimer() {
  useToolUsageTracking('/timer/pomodoro', 'ポモドーロタイマー')
  const { time, isRunning, mode, sessions, start, pause, reset } = usePomodoro()

  const formattedTime = useMemo(() => {
    const totalSeconds = Math.floor(time / 1000)
    const m = Math.floor(totalSeconds / 60)
    const s = totalSeconds % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }, [time])

  const handleStartPause = () => {
    if (isRunning) {
      pause()
    } else {
      start()
    }
  }

  // キーボードショートカットの設定
  const shortcuts = [
    {
      key: ' ',
      description: isRunning ? '一時停止' : '開始',
      action: handleStartPause,
    },
    {
      key: 'r',
      description: 'リセット',
      action: reset,
    },
  ]

  useKeyboardShortcut(shortcuts)

  return (
    <div className="max-w-[600px] mx-auto py-8 px-4 text-center">
      <h2 className="text-2xl font-semibold mb-8">ポモドーロタイマー</h2>

      <div
        className={`inline-block py-2 px-6 mb-6 text-lg font-semibold rounded-full transition-all duration-200 ${
          mode === 'work' ? 'bg-[#d97706] text-white' : 'bg-[#ea580c] text-white'
        }`}
      >
        {mode === 'work' ? '作業中' : '休憩中'}
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mb-6">
        <div className="text-7xl md:text-[72px] sm:text-[56px] font-semibold tabular-nums tracking-wider mb-4 text-[#d97706]">
          {formattedTime}
        </div>
        <div className="text-base text-gray-600">
          完了セッション: <span className="font-semibold text-[#d97706] text-xl">{sessions}</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center mb-6 md:items-center">
        <Button onClick={handleStartPause}>
          {isRunning ? '一時停止' : '開始'}
        </Button>
        <Button onClick={reset} variant="secondary">
          リセット
        </Button>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">
        25分の作業時間と5分の休憩時間を繰り返します。
        <br />
        タイマーが終了すると自動的に次のモードに切り替わります。
      </p>

      {/* ショートカットキー一覧 */}
      <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />
    </div>
  )
}

export default PomodoroTimer
