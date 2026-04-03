import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function StopwatchTool() {
  useToolUsageTracking('/timer/stopwatch-tool', 'ストップウォッチ')
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState<number[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10)
      }, 10)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isRunning])

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const centiseconds = Math.floor((ms % 1000) / 10)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`
  }

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)

  const handleLap = () => {
    setLaps((prev) => [...prev, time])
  }

  const handleReset = () => {
    setIsRunning(false)
    setTime(0)
    setLaps([])
  }

  return (
    <>
      <SEO path="/timer/stopwatch-tool" />
      <div className="max-w-[400px] mx-auto py-8 px-4">
        <ToolHeader title="ストップウォッチ" toolPath="/timer/stopwatch-tool" shareTitle="ストップウォッチ | Rakit" />

        {/* 時間表示 */}
        <div className="text-center mb-8">
          <div className="text-5xl font-mono font-bold text-[#d97706]">
            {formatTime(time)}
          </div>
        </div>

        {/* コントロールボタン */}
        <div className="flex gap-2 mb-6">
          {!isRunning ? (
            <Button onClick={handleStart} size="lg" className="flex-1">
              スタート
            </Button>
          ) : (
            <Button onClick={handlePause} size="lg" variant="outline" className="flex-1">
              一時停止
            </Button>
          )}
          {isRunning && (
            <Button onClick={handleLap} size="lg" variant="secondary" className="flex-1">
              ラップ
            </Button>
          )}
          {!isRunning && time > 0 && (
            <Button onClick={handleReset} size="lg" variant="destructive" className="flex-1">
              リセット
            </Button>
          )}
        </div>

        {/* ラップタイム */}
        {laps.length > 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4 max-h-[200px] overflow-y-auto">
            <h3 className="font-semibold mb-2 text-sm text-gray-600">ラップタイム</h3>
            <div className="space-y-1">
              {laps.map((lap, index) => (
                <div key={index} className="flex justify-between text-sm font-mono">
                  <span className="text-gray-500">ラップ {index + 1}</span>
                  <span className="font-semibold">{formatTime(lap)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• スタートで計測開始</li>
            <li>• 一時停止で計測停止</li>
            <li>• ラップで途中経過を記録</li>
            <li>• リセットで最初から</li>
            <li>• スポーツ、勉強、調理などに</li>
          </ul>
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            ストップウォッチは、経過時間を計測する無料のオンラインツールです。ラップタイム機能付きで、スポーツ、勉強、料理など様々な場面で役立ちます。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• ミリ秒単位で計測</li>
            <li>• ラップタイム機能</li>
            <li>• 一時停止・再開可能</li>
            <li>• 完全無料、インストール不要</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. タブを閉じても計測は続きますか？</p>
              <p>A. いいえ、ページを閉じるとリセットされます。</p>
            </div>
            <div>
              <p className="font-medium">Q. ラップタイムは何件まで保存できますか？</p>
              <p>A. 制限なく保存できます。</p>
            </div>
          </div>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner slot="TOOL_BOTTOM" format="rectangle" />
      </div>
    </>
  )
}

export default StopwatchTool
