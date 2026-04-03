import { useState, useMemo } from 'react'
import { useTimer } from '../../hooks/useTimer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import { RelatedTools } from '@/components/RelatedTools/RelatedTools'
import AdBanner from '@/components/Ads/AdBanner'

function CountdownTimer() {
  useToolUsageTracking('/timer/countdown', 'カウントダウンタイマー')
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

  const setQuickTime = (mins: number) => {
    setHours(0)
    setMinutes(mins)
    setSeconds(0)
    setIsConfigured(false)
  }

  // キーボードショートカットの設定
  const shortcuts = [
    {
      key: ' ',
      description: isRunning ? '一時停止' : 'スタート',
      action: isRunning ? stop : handleStart,
      disabled: !isRunning && initialTime === 0,
    },
    {
      key: 'r',
      description: 'リセット',
      action: handleReset,
    },
    {
      key: '1',
      description: '1分に設定',
      action: () => setQuickTime(1),
      disabled: isRunning || isConfigured,
    },
    {
      key: '3',
      description: '3分に設定',
      action: () => setQuickTime(3),
      disabled: isRunning || isConfigured,
    },
    {
      key: '5',
      description: '5分に設定',
      action: () => setQuickTime(5),
      disabled: isRunning || isConfigured,
    },
  ]

  useKeyboardShortcut(shortcuts)

  return (
    <>
      <ToolHeader toolPath="/timer/countdown" title="カウントダウンタイマー" />
      <SEO
        path="/timer/countdown"
        title="カウントダウンタイマー"
        description="無料のオンラインカウントダウンタイマー。時間・分・秒を自由に設定でき、料理、運動、勉強など様々な場面で活用できます。キーボードショートカット対応。"
      />
      <div className="max-w-[600px] mx-auto py-8 px-4">
      <h2 className="text-2xl font-semibold mb-8 text-center">カウントダウンタイマー</h2>

      {!isConfigured ? (
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex flex-row items-center gap-2">
              <Input
                type="number"
                min="0"
                max="23"
                value={hours}
                onChange={(e) => handleInputChange('hours', e.target.value)}
                className="w-20 md:w-20 sm:w-[60px] p-3 sm:p-2 text-2xl md:text-2xl sm:text-xl text-center border border-gray-200 rounded-md transition-colors focus:outline-none focus:border-gray-900"
              />
              <Label className="mb-0">時</Label>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => handleInputChange('minutes', e.target.value)}
                className="w-20 md:w-20 sm:w-[60px] p-3 sm:p-2 text-2xl md:text-2xl sm:text-xl text-center border border-gray-200 rounded-md transition-colors focus:outline-none focus:border-gray-900"
              />
              <Label className="mb-0">分</Label>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Input
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) => handleInputChange('seconds', e.target.value)}
                className="w-20 md:w-20 sm:w-[60px] p-3 sm:p-2 text-2xl md:text-2xl sm:text-xl text-center border border-gray-200 rounded-md transition-colors focus:outline-none focus:border-gray-900"
              />
              <Label className="mb-0">秒</Label>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mb-8">
          <div className="text-7xl md:text-7xl sm:text-[56px] font-light tabular-nums tracking-wider text-[#d97706]">
            {displayTime.hours}:{displayTime.minutes}:{displayTime.seconds}
          </div>
        </div>
      )}

      <div className="flex md:flex-row sm:flex-col gap-4 justify-center">
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

      {/* ショートカットキー一覧 */}
      <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />

      {/* このツールについて */}
      <div className="mt-8 p-4 bg-gray-50 rounded-md">
        <h3 className="font-semibold mb-2">このツールについて</h3>
        <p className="text-sm text-gray-600 mb-4">
          カウントダウンタイマーは、指定した時間を逆算してカウントダウンする無料のオンラインツールです。料理、運動、勉強、プレゼンテーションなど、様々な場面で時間管理にお役立てください。時間・分・秒を自由に設定でき、キーボードショートカットにも対応しています。
        </p>
      </div>

      {/* 特徴 */}
      <div className="mt-4 p-4 bg-blue-50 rounded-md">
        <h3 className="font-semibold mb-2">特徴</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• 時間・分・秒を自由に設定可能</li>
          <li>• キーボードショートカット対応（スペースで開始/停止）</li>
          <li>• 大きな数字で見やすい表示</li>
          <li>• 完全無料、インストール不要</li>
        </ul>
      </div>

      {/* よくある質問 */}
      <div className="mt-4 p-4 bg-gray-50 rounded-md">
        <h3 className="font-semibold mb-2">よくある質問</h3>
        <div className="text-sm text-gray-600 space-y-3">
          <div>
            <p className="font-medium">Q. 最大どのくらいの時間を設定できますか？</p>
            <p>A. 23時間59分59秒まで設定可能です。</p>
          </div>
          <div>
            <p className="font-medium">Q. タイマー完了時に通知は来ますか？</p>
            <p>A. 現在は画面上での表示のみですが、将来的に通知機能を追加予定です。</p>
          </div>
        </div>
      </div>

      {/* 関連ツール */}
      <RelatedTools currentPath="/timer/countdown" />

      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner slot="TOOL_BOTTOM" format="rectangle" />
      </div>
      </div>
    </>
  )
}

export default CountdownTimer
