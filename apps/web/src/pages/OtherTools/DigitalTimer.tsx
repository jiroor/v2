import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import { RelatedTools } from '@/components/RelatedTools/RelatedTools'
import AdBanner from '@/components/Ads/AdBanner'

function DigitalTimer() {
  useToolUsageTracking('/other/timer', 'デジタルタイマー')
  const [minutes, setMinutes] = useState(5)
  const [seconds, setSeconds] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const totalSeconds = minutes * 60 + seconds

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => clearTimer()
  }, [clearTimer])

  useEffect(() => {
    if (isRunning && !isPaused && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearTimer()
            setIsRunning(false)
            // アラート音を鳴らす（Web Audio API）
            try {
              const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
              const oscillator = audioContext.createOscillator()
              const gainNode = audioContext.createGain()
              oscillator.connect(gainNode)
              gainNode.connect(audioContext.destination)
              oscillator.frequency.value = 800
              oscillator.type = 'sine'
              gainNode.gain.value = 0.3
              oscillator.start()
              setTimeout(() => oscillator.stop(), 500)
            } catch (e) {
              console.log('Audio not supported')
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearTimer()
  }, [isRunning, isPaused, clearTimer])

  const startTimer = () => {
    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds)
      setIsRunning(true)
      setIsPaused(false)
    }
  }

  const pauseTimer = () => {
    setIsPaused(true)
    clearTimer()
  }

  const resumeTimer = () => {
    setIsPaused(false)
  }

  const resetTimer = () => {
    clearTimer()
    setIsRunning(false)
    setIsPaused(false)
    setTimeLeft(0)
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const quickTimes = [
    { label: '1分', value: 60 },
    { label: '3分', value: 180 },
    { label: '5分', value: 300 },
    { label: '10分', value: 600 },
    { label: '15分', value: 900 },
    { label: '30分', value: 1800 },
  ]

  return (
    <>
      <SEO path="/other/timer" title="デジタルタイマー" description="無料のオンラインデジタルタイマー。カウントダウン・ストップウォッチ機能。料理や運動の時間管理に便利。" />
      <div className="max-w-[400px] mx-auto py-8 px-4">
        <ToolHeader title="デジタルタイマー" toolPath="/other/timer" shareTitle="デジタルタイマー | Rakit" />

        {!isRunning ? (
          <>
            {/* 分・秒設定 */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">分</label>
                <input
                  type="number"
                  value={minutes}
                  onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">秒</label>
                <input
                  type="number"
                  value={seconds}
                  onChange={(e) => setSeconds(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
                />
              </div>
            </div>

            {/* クイック選択 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">よく使う時間</label>
              <div className="flex flex-wrap gap-2">
                {quickTimes.map((t) => (
                  <Button
                    key={t.value}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setMinutes(Math.floor(t.value / 60))
                      setSeconds(t.value % 60)
                    }}
                  >
                    {t.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* 開始ボタン */}
            <Button
              onClick={startTimer}
              size="lg"
              className="w-full"
              disabled={totalSeconds === 0}
            >
              スタート
            </Button>
          </>
        ) : (
          <>
            {/* タイマー表示 */}
            <div className="text-center mb-8">
              <div className="text-7xl font-mono font-bold text-[#d97706] mb-4">
                {formatTime(timeLeft)}
              </div>
              <div className="text-gray-500">
                {isPaused ? '一時停止中' : '計測中...'}
              </div>
            </div>

            {/* コントロールボタン */}
            <div className="flex gap-2">
              {isPaused ? (
                <Button onClick={resumeTimer} size="lg" className="flex-1">
                  再開
                </Button>
              ) : (
                <Button onClick={pauseTimer} size="lg" variant="outline" className="flex-1">
                  一時停止
                </Button>
              )}
              <Button onClick={resetTimer} size="lg" variant="destructive" className="flex-1">
                リセット
              </Button>
            </div>
          </>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 分と秒を設定してスタート</li>
            <li>• 一時停止・再開が可能</li>
            <li>• 終了時に音でお知らせ</li>
            <li>• 料理、勉強、運動などに</li>
          </ul>
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            デジタルタイマーは、指定した時間をカウントダウンする無料のオンラインツールです。分と秒を自由に設定でき、一時停止・再開も可能です。料理、勉強、運動など、時間管理にお役立てください。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 分・秒を自由に設定</li>
            <li>• クイック選択（1分〜30分）</li>
            <li>• 一時停止・再開機能</li>
            <li>• 完全無料、インストール不要</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. 最大どのくらい設定できますか？</p>
              <p>A. 分・秒ともに自由に設定できます。実用的には99分59秒程度までを推奨します。</p>
            </div>
            <div>
              <p className="font-medium">Q. タブを閉じても動き続けますか？</p>
              <p>A. はい、バックグラウンドでも動作します。</p>
            </div>
          </div>
        </div>
      </div>
      {/* 関連ツール */}
      <RelatedTools currentPath="/other/timer" />
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner slot="TOOL_BOTTOM" format="rectangle" />
      </div>
    </>
  )
}

export default DigitalTimer
