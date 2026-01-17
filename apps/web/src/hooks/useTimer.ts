import { useState, useEffect, useRef, useCallback } from 'react'

interface UseTimerProps {
  initialTime: number // ミリ秒
  onComplete?: () => void
}

interface UseTimerReturn {
  time: number
  isRunning: boolean
  start: () => void
  stop: () => void
  reset: () => void
}

export function useTimer({ initialTime, onComplete }: UseTimerProps): UseTimerReturn {
  const [time, setTime] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)
  const startTimeRef = useRef<number | null>(null)
  const remainingTimeRef = useRef(initialTime)

  useEffect(() => {
    if (!isRunning) return

    startTimeRef.current = Date.now()
    const startRemainingTime = remainingTimeRef.current

    const intervalId = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current!
      const newTime = Math.max(0, startRemainingTime - elapsed)

      setTime(newTime)
      remainingTimeRef.current = newTime

      if (newTime === 0) {
        setIsRunning(false)
        onComplete?.()
      }
    }, 10) // 10msごとに更新（滑らかな表示）

    return () => clearInterval(intervalId)
  }, [isRunning, onComplete])

  const start = useCallback(() => {
    if (remainingTimeRef.current > 0) {
      setIsRunning(true)
    }
  }, [])

  const stop = useCallback(() => {
    setIsRunning(false)
  }, [])

  const reset = useCallback(() => {
    setIsRunning(false)
    setTime(initialTime)
    remainingTimeRef.current = initialTime
    startTimeRef.current = null
  }, [initialTime])

  return { time, isRunning, start, stop, reset }
}
