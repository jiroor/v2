import { useState, useEffect, useRef, useCallback } from 'react'

export interface Lap {
  id: number
  time: number // ラップタイム（ミリ秒）
  total: number // 累計時間（ミリ秒）
}

interface UseStopwatchReturn {
  time: number
  isRunning: boolean
  laps: Lap[]
  start: () => void
  stop: () => void
  reset: () => void
  addLap: () => void
}

export function useStopwatch(): UseStopwatchReturn {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState<Lap[]>([])
  const startTimeRef = useRef<number | null>(null)
  const accumulatedTimeRef = useRef(0)

  useEffect(() => {
    if (!isRunning) return

    startTimeRef.current = Date.now()
    const startAccumulatedTime = accumulatedTimeRef.current

    const intervalId = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current!
      const newTime = startAccumulatedTime + elapsed
      setTime(newTime)
    }, 10) // 10msごとに更新

    return () => clearInterval(intervalId)
  }, [isRunning])

  const start = useCallback(() => {
    setIsRunning(true)
  }, [])

  const stop = useCallback(() => {
    setIsRunning(false)
    accumulatedTimeRef.current = time
  }, [time])

  const reset = useCallback(() => {
    setIsRunning(false)
    setTime(0)
    setLaps([])
    accumulatedTimeRef.current = 0
    startTimeRef.current = null
  }, [])

  const addLap = useCallback(() => {
    const lapTime = laps.length > 0 ? time - laps[0].total : time
    const newLap: Lap = {
      id: Date.now(),
      time: lapTime,
      total: time,
    }
    setLaps((prev) => [newLap, ...prev]) // 最新を先頭に
  }, [time, laps])

  return { time, isRunning, laps, start, stop, reset, addLap }
}
