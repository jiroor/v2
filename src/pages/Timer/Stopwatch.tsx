import { useMemo } from 'react'
import { useStopwatch } from '../../hooks/useStopwatch'
import styles from './Stopwatch.module.css'

function Stopwatch() {
  const { time, isRunning, laps, start, stop, reset, addLap } = useStopwatch()

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
    <div className={styles.container}>
      <h2 className={styles.title}>ストップウォッチ</h2>

      <div className={styles.timerDisplay}>
        <div className={styles.time}>
          {displayTime.minutes}:{displayTime.seconds}
          <span className={styles.milliseconds}>.{displayTime.milliseconds}</span>
        </div>
      </div>

      <div className={styles.controls}>
        {!isRunning ? (
          <button onClick={start} className={styles.buttonPrimary}>
            スタート
          </button>
        ) : (
          <button onClick={stop} className={styles.buttonSecondary}>
            ストップ
          </button>
        )}
        <button
          onClick={addLap}
          className={styles.buttonSecondary}
          disabled={!isRunning}
        >
          ラップ
        </button>
        <button onClick={reset} className={styles.buttonSecondary}>
          リセット
        </button>
      </div>

      {laps.length > 0 && (
        <div className={styles.lapsSection}>
          <h3 className={styles.lapsTitle}>ラップタイム</h3>
          <div className={styles.lapsList}>
            {laps.map((lap, index) => (
              <div key={lap.id} className={styles.lapItem}>
                <span className={styles.lapNumber}>#{laps.length - index}</span>
                <span className={styles.lapTime}>{formatLapTime(lap.time)}</span>
                <span className={styles.lapTotal}>{formatLapTime(lap.total)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Stopwatch
