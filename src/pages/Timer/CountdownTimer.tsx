import { useState, useMemo } from 'react'
import { useTimer } from '../../hooks/useTimer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'

function CountdownTimer() {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(5)
  const [seconds, setSeconds] = useState(0)
  const [isConfigured, setIsConfigured] = useState(false)

  const initialTime = useMemo(() => {
    return (hours * 3600 + minutes * 60 + seconds) * 1000
  }, [hours, minutes, seconds])

  const { time, isRunning, start, stop, reset } = useTimer({
    initialTime,
    onComplete: () => {
      // タイマー完了時の処理（将来的に通知など追加可能）
      console.log('Timer completed!')
    },
  })

  const displayTime = useMemo(() => {
    const totalSeconds = Math.floor(time / 1000)
    const h = Math.floor(totalSeconds / 3600)
    const m = Math.floor((totalSeconds % 3600) / 60)
    const s = totalSeconds % 60
    return {
      hours: String(h).padStart(2, '0'),
      minutes: String(m).padStart(2, '0'),
      seconds: String(s).padStart(2, '0'),
    }
  }, [time])

  const handleStart = () => {
    if (!isConfigured) {
      setIsConfigured(true)
    }
    start()
  }

  const handleReset = () => {
    reset()
    setIsConfigured(false)
  }

  const handleInputChange = (
    type: 'hours' | 'minutes' | 'seconds',
    value: string
  ) => {
    const num = parseInt(value, 10) || 0
    if (type === 'hours') setHours(Math.max(0, Math.min(23, num)))
    if (type === 'minutes') setMinutes(Math.max(0, Math.min(59, num)))
    if (type === 'seconds') setSeconds(Math.max(0, Math.min(59, num)))
  }

  const setQuickTime = (mins: number) => {
    setHours(0)
    setMinutes(mins)
    setSeconds(0)
    setIsConfigured(false)
  }

  // キーボードショートカットの設定
  const shortcuts = [
    {
      key: ' ',
      description: isRunning ? '一時停止' : 'スタート',
      action: isRunning ? stop : handleStart,
      disabled: !isRunning && initialTime === 0,
    },
    {
      key: 'r',
      description: 'リセット',
      action: handleReset,
    },
    {
      key: '1',
      description: '1分に設定',
      action: () => setQuickTime(1),
      disabled: isRunning || isConfigured,
    },
    {
      key: '3',
      description: '3分に設定',
      action: () => setQuickTime(3),
      disabled: isRunning || isConfigured,
    },
    {
      key: '5',
      description: '5分に設定',
      action: () => setQuickTime(5),
      disabled: isRunning || isConfigured,
    },
  ]

  useKeyboardShortcut(shortcuts)

  return (
    <div className="max-w-[600px] mx-auto py-8 px-4">
      <h2 className="text-2xl font-semibold mb-8 text-center">カウントダウンタイマー</h2>

      {!isConfigured ? (
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex flex-row items-center gap-2">
              <Input
                type="number"
                min="0"
                max="23"
                value={hours}
                onChange={(e) => handleInputChange('hours', e.target.value)}
                className="w-20 md:w-20 sm:w-[60px] p-3 sm:p-2 text-2xl md:text-2xl sm:text-xl text-center border border-gray-200 rounded-md transition-colors focus:outline-none focus:border-gray-900"
              />
              <Label className="mb-0">時</Label>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => handleInputChange('minutes', e.target.value)}
                className="w-20 md:w-20 sm:w-[60px] p-3 sm:p-2 text-2xl md:text-2xl sm:text-xl text-center border border-gray-200 rounded-md transition-colors focus:outline-none focus:border-gray-900"
              />
              <Label className="mb-0">分</Label>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Input
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) => handleInputChange('seconds', e.target.value)}
                className="w-20 md:w-20 sm:w-[60px] p-3 sm:p-2 text-2xl md:text-2xl sm:text-xl text-center border border-gray-200 rounded-md transition-colors focus:outline-none focus:border-gray-900"
              />
              <Label className="mb-0">秒</Label>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mb-8">
          <div className="text-7xl md:text-7xl sm:text-[56px] font-light tabular-nums tracking-wider text-[#d97706]">
            {displayTime.hours}:{displayTime.minutes}:{displayTime.seconds}
          </div>
        </div>
      )}

      <div className="flex md:flex-row sm:flex-col gap-4 justify-center">
        {!isRunning ? (
          <Button
            onClick={handleStart}
            disabled={initialTime === 0}
          >
            スタート
          </Button>
        ) : (
          <Button onClick={stop} variant="secondary">
            ストップ
          </Button>
        )}
        <Button onClick={handleReset} variant="secondary">
          リセット
        </Button>
      </div>

      {/* ショートカットキー一覧 */}
      <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />
    </div>
  )
}

export default CountdownTimer
