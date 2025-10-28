import { useMemo } from 'react'
import { usePomodoro } from '../../hooks/usePomodoro'
import styles from './PomodoroTimer.module.css'

function PomodoroTimer() {
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

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>ポモドーロタイマー</h2>

      <div
        className={`${styles.modeIndicator} ${
          mode === 'work' ? styles.modeWork : styles.modeBreak
        }`}
      >
        {mode === 'work' ? '作業中' : '休憩中'}
      </div>

      <div className={styles.display}>
        <div className={styles.time}>{formattedTime}</div>
        <div className={styles.sessions}>
          完了セッション: <span className={styles.sessionsCount}>{sessions}</span>
        </div>
      </div>

      <div className={styles.controls}>
        <button onClick={handleStartPause} className={styles.button}>
          {isRunning ? '一時停止' : '開始'}
        </button>
        <button onClick={reset} className={`${styles.button} ${styles.buttonSecondary}`}>
          リセット
        </button>
      </div>

      <p className={styles.description}>
        25分の作業時間と5分の休憩時間を繰り返します。
        <br />
        タイマーが終了すると自動的に次のモードに切り替わります。
      </p>
    </div>
  )
}

export default PomodoroTimer
