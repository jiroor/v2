import { useState, useEffect } from 'react'

export function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // 1秒ごとに現在時刻を更新
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return currentTime
}
