import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

type Phase = 'work' | 'shortBreak' | 'longBreak'

function PomodoroTimer() {
  const [phase, setPhase] = useState<Phase>('work')
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [sessions, setSessions] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const phases = {
    work: { duration: 25 * 60, label: '作業', color: 'text-red-500' },
    shortBreak: { duration: 5 * 60, label: '短い休憩', color: 'text-green-500' },
    longBreak: { duration: 15 * 60, label: '長い休憩', color: 'text-blue-500' },
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    setTimeLeft(phases[phase].duration)
    setIsRunning(false)
  }, [phase])

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      handlePhaseComplete()
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft])

  const handlePhaseComplete = () => {
    setIsRunning(false)
    
    // Play sound
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
    } catch {}

    if (phase === 'work') {
      const newSessions = sessions + 1
      setSessions(newSessions)
      
      // Every 4 sessions, take a long break
      if (newSessions % 4 === 0) {
        setPhase('longBreak')
      } else {
        setPhase('shortBreak')
      }
    } else {
      setPhase('work')
    }
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setTimeLeft(phases[phase].duration)
    setIsRunning(false)
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const progress = ((phases[phase].duration - timeLeft) / phases[phase].duration) * 100

  return (
    <>
      <SEO path="/other/pomodoro" />
      <div className="max-w-[400px] mx-auto py-8 px-4">
        <ToolHeader title="ポモドーロタイマー" toolPath="/timer/pomodoro" shareTitle="ポモドーロタイマー | Rakit" />

        {/* フェーズ選択 */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={phase === 'work' ? 'default' : 'outline'}
            onClick={() => setPhase('work')}
            className="flex-1"
          >
            作業
          </Button>
          <Button
            variant={phase === 'shortBreak' ? 'default' : 'outline'}
            onClick={() => setPhase('shortBreak')}
            className="flex-1"
          >
            短休憩
          </Button>
          <Button
            variant={phase === 'longBreak' ? 'default' : 'outline'}
            onClick={() => setPhase('longBreak')}
            className="flex-1"
          >
            長休憩
          </Button>
        </div>

        {/* タイマー表示 */}
        <div className="relative mb-8">
          {/* プログレスリング */}
          <svg className="w-64 h-64 mx-auto transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke={phase === 'work' ? '#ef4444' : phase === 'shortBreak' ? '#22c55e' : '#3b82f6'}
              strokeWidth="8"
              fill="none"
              strokeDasharray={2 * Math.PI * 120}
              strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          
          {/* 時間表示 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-5xl font-mono font-bold ${phases[phase].color}`}>
              {formatTime(timeLeft)}
            </span>
            <span className="text-gray-500 text-sm mt-2">{phases[phase].label}</span>
          </div>
        </div>

        {/* セッション数 */}
        <div className="text-center mb-6">
          <span className="text-gray-500 text-sm">完了セッション: </span>
          <span className="font-bold text-lg">{sessions}</span>
        </div>

        {/* コントロール */}
        <div className="flex gap-2">
          <Button onClick={toggleTimer} size="lg" className="flex-1">
            {isRunning ? '一時停止' : 'スタート'}
          </Button>
          <Button onClick={resetTimer} variant="outline" size="lg" className="flex-1">
            リセット
          </Button>
        </div>

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">ポモドーロテクニック</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 25分作業 → 5分休憩を繰り返す</li>
            <li>• 4セット完了で15分の長休憩</li>
            <li>• 集中力向上に効果的</li>
            <li>• 終了時にお知らせ音</li>
          </ul>
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            ポモドーロタイマーは、25分の作業と5分の休憩を繰り返す時間管理テクニックを実践するための無料のオンラインツールです。集中力を高め、効率的に作業を進めることができます。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 作業・短休憩・長休憩を自動切替</li>
            <li>• 完了セッション数をカウント</li>
            <li>• プログレスリングで視覚化</li>
            <li>• 完全無料、インストール不要</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. ポモドーロテクニックとは？</p>
              <p>A. 25分作業＋5分休憩を繰り返す時間管理法です。Francesco Cirillo氏が考案しました。</p>
            </div>
            <div>
              <p className="font-medium">Q. 時間は変更できますか？</p>
              <p>A. 現在は固定ですが、将来的にカスタマイズ機能を追加予定です。</p>
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

export default PomodoroTimer
