import { useState, useMemo } from 'react'
import { useTimer } from '../../hooks/useTimer'
import { Button } from '@/components/ui/button'
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

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>カウントダウンタイマー</h2>

      {!isConfigured ? (
        <div className={styles.configSection}>
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                min="0"
                max="23"
                value={hours}
                onChange={(e) => handleInputChange('hours', e.target.value)}
                className={styles.input}
              />
              <label className={styles.label}>時</label>
            </div>
            <span className={styles.separator}>:</span>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => handleInputChange('minutes', e.target.value)}
                className={styles.input}
              />
              <label className={styles.label}>分</label>
            </div>
            <span className={styles.separator}>:</span>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) => handleInputChange('seconds', e.target.value)}
                className={styles.input}
              />
              <label className={styles.label}>秒</label>
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
    </div>
  )
}

export default CountdownTimer
