import { useState, useMemo } from 'react'
import { useTimer } from '../../hooks/useTimer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import styles from './CountdownTimer.module.css'

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
    <div className={styles.container}>
      <h2 className={styles.title}>カウントダウンタイマー</h2>

      {!isConfigured ? (
        <div className={styles.configSection}>
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <Input
                type="number"
                min="0"
                max="23"
                value={hours}
                onChange={(e) => handleInputChange('hours', e.target.value)}
                className={styles.input}
              />
              <Label className={styles.label}>時</Label>
            </div>
            <div className={styles.inputWrapper}>
              <Input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => handleInputChange('minutes', e.target.value)}
                className={styles.input}
              />
              <Label className={styles.label}>分</Label>
            </div>
            <div className={styles.inputWrapper}>
              <Input
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) => handleInputChange('seconds', e.target.value)}
                className={styles.input}
              />
              <Label className={styles.label}>秒</Label>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.timerDisplay}>
          <div className={styles.time}>
            {displayTime.hours}:{displayTime.minutes}:{displayTime.seconds}
          </div>
        </div>
      )}

      <div className={styles.controls}>
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
