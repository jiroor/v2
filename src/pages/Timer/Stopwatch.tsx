import { useMemo } from 'react'
import { useStopwatch } from '../../hooks/useStopwatch'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'

function Stopwatch() {
  const { time, isRunning, laps, start, stop, reset, addLap } = useStopwatch()

  // キーボードショートカットの設定
  const shortcuts = [
    {
      key: ' ',
      description: isRunning ? '一時停止' : 'スタート',
      action: isRunning ? stop : start,
    },
    {
      key: 'l',
      description: 'ラップ',
      action: addLap,
      disabled: !isRunning,
    },
    {
      key: 'r',
      description: 'リセット',
      action: reset,
    },
  ]

  useKeyboardShortcut(shortcuts)

  const displayTime = useMemo(() => {
    const totalSeconds = Math.floor(time / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const milliseconds = Math.floor((time % 1000) / 10)
    return {
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
      milliseconds: String(milliseconds).padStart(2, '0'),
    }
  }, [time])

  const formatLapTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const milliseconds = Math.floor((ms % 1000) / 10)
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`
  }

  return (
    <div className="max-w-[600px] mx-auto py-8 px-4">
      <h2 className="text-2xl font-semibold mb-8 text-center">ストップウォッチ</h2>

      <div className="flex justify-center mb-8">
        <div className="text-7xl font-light tracking-wider text-[#d97706] tabular-nums">
          {displayTime.minutes}:{displayTime.seconds}
          <span className="text-5xl text-[#d97706] opacity-80">.{displayTime.milliseconds}</span>
        </div>
      </div>

      <div className="flex gap-4 justify-center mb-8 max-md:flex-wrap">
        {!isRunning ? (
          <Button onClick={start}>
            スタート
          </Button>
        ) : (
          <Button onClick={stop} variant="secondary">
            ストップ
          </Button>
        )}
        <Button
          onClick={addLap}
          variant="secondary"
          disabled={!isRunning}
        >
          ラップ
        </Button>
        <Button onClick={reset} variant="secondary">
          リセット
        </Button>
      </div>

      {laps.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-center">ラップタイム</h3>
          <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
            {laps.map((lap, index) => (
              <div key={lap.id} className="flex justify-between items-center p-3 px-4 bg-gray-50 rounded-md tabular-nums max-md:flex-col max-md:gap-2 max-md:items-start">
                <span className="font-semibold text-gray-600 min-w-[40px] max-md:min-w-0 max-md:text-left">#{laps.length - index}</span>
                <span className="text-lg font-medium flex-1 text-center max-md:min-w-0 max-md:text-left">{formatLapTime(lap.time)}</span>
                <span className="text-sm text-gray-600 min-w-[80px] text-right max-md:min-w-0 max-md:text-left">{formatLapTime(lap.total)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ショートカットキー一覧 */}
      <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />
    </div>
  )
}

export default Stopwatch
