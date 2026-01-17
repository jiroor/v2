import { useState, useEffect, useRef, useCallback } from 'react'

export type PomodoroMode = 'work' | 'break'

export interface UsePomodoroReturn {
  time: number // 残り時間（ミリ秒）
  isRunning: boolean
  mode: PomodoroMode
  sessions: number // 完了した作業セッション数
  start: () => void
  pause: () => void
  reset: () => void
}

// ポモドーロタイマーの設定
const WORK_TIME = 25 * 60 * 1000 // 25分
const BREAK_TIME = 5 * 60 * 1000 // 5分

export function usePomodoro(): UsePomodoroReturn {
  const [mode, setMode] = useState<PomodoroMode>('work')
  const [time, setTime] = useState(WORK_TIME)
  const [isRunning, setIsRunning] = useState(false)
  const [sessions, setSessions] = useState(0)

  const startTimeRef = useRef<number | null>(null)
  const remainingTimeRef = useRef(WORK_TIME)

  // モードが切り替わったときに時間をリセット
  useEffect(() => {
    const initialTime = mode === 'work' ? WORK_TIME : BREAK_TIME
    setTime(initialTime)
    remainingTimeRef.current = initialTime
  }, [mode])

  useEffect(() => {
    if (!isRunning) return

    startTimeRef.current = Date.now()
    const startRemainingTime = remainingTimeRef.current

    const intervalId = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current!
      const newTime = Math.max(0, startRemainingTime - elapsed)

      setTime(newTime)
      remainingTimeRef.current = newTime

      // タイマーが0になったら次のモードに切り替え
      if (newTime === 0) {
        setIsRunning(false)

        if (mode === 'work') {
          // 作業完了 → セッションカウントを増やして休憩モードへ
          setSessions((prev) => prev + 1)
          setMode('break')
        } else {
          // 休憩完了 → 作業モードへ
          setMode('work')
        }
      }
    }, 10)

    return () => clearInterval(intervalId)
  }, [isRunning, mode])

  const start = useCallback(() => {
    setIsRunning(true)
  }, [])

  const pause = useCallback(() => {
    setIsRunning(false)
  }, [])

  const reset = useCallback(() => {
    setIsRunning(false)
    setMode('work')
    setSessions(0)
    const initialTime = WORK_TIME
    setTime(initialTime)
    remainingTimeRef.current = initialTime
    startTimeRef.current = null
  }, [])

  return {
    time,
    isRunning,
    mode,
    sessions,
    start,
    pause,
    reset,
  }
}
