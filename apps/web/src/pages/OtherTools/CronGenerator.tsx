import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'

function CronGenerator() {
  useToolUsageTracking('/other/cron', 'Cron式生成')
  const [minute, setMinute] = useState('*')
  const [hour, setHour] = useState('*')
  const [dayOfMonth, setDayOfMonth] = useState('*')
  const [month, setMonth] = useState('*')
  const [dayOfWeek, setDayOfWeek] = useState('*')
  const [copySuccess, setCopySuccess] = useState(false)

  const cronExpression = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`

  const presets = [
    { label: '毎分', value: '* * * * *' },
    { label: '毎時', value: '0 * * * *' },
    { label: '毎日0時', value: '0 0 * * *' },
    { label: '毎日9時', value: '0 9 * * *' },
    { label: '毎週月曜9時', value: '0 9 * * 1' },
    { label: '毎月1日0時', value: '0 0 1 * *' },
  ]

  const applyPreset = (value: string) => {
    const [m, h, dom, mon, dow] = value.split(' ')
    setMinute(m)
    setHour(h)
    setDayOfMonth(dom)
    setMonth(mon)
    setDayOfWeek(dow)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cronExpression)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  const getDescription = () => {
    const parts: string[] = []
    
    if (minute === '*' && hour === '*') {
      parts.push('毎分')
    } else if (minute !== '*') {
      parts.push(`${minute}分`)
    }
    
    if (hour !== '*') {
      parts.push(`${hour}時`)
    }
    
    if (dayOfMonth !== '*') {
      parts.push(`${dayOfMonth}日`)
    }
    
    if (month !== '*') {
      parts.push(`${month}月`)
    }
    
    if (dayOfWeek !== '*') {
      const days = ['日', '月', '火', '水', '木', '金', '土']
      parts.push(`毎週${days[parseInt(dayOfWeek)]}曜日`)
    }
    
    return parts.length > 0 ? parts.join(' ') : '毎分実行'
  }

  return (
    <>
      <SEO path="/other/cron" />
      <div className="max-w-[600px] mx-auto py-8 px-4">
        <h2 className="text-2xl font-semibold mb-8 text-center">Cron式生成</h2>

        {/* プリセット */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            よく使うパターン
          </label>
          <div className="flex flex-wrap gap-2">
            {presets.map(({ label, value }) => (
              <Button
                key={value}
                size="sm"
                variant="outline"
                onClick={() => applyPreset(value)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* 入力フィールド */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          <div>
            <label className="block text-xs text-gray-500 mb-1 text-center">分</label>
            <input
              type="text"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-md text-center font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1 text-center">時</label>
            <input
              type="text"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-md text-center font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1 text-center">日</label>
            <input
              type="text"
              value={dayOfMonth}
              onChange={(e) => setDayOfMonth(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-md text-center font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1 text-center">月</label>
            <input
              type="text"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-md text-center font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1 text-center">曜日</label>
            <input
              type="text"
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-md text-center font-mono text-sm"
            />
          </div>
        </div>

        {/* 結果 */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center mb-6">
          <p className="text-sm text-gray-500 mb-2">Cron式</p>
          <p className="text-3xl font-mono font-bold text-[#d97706]">{cronExpression}</p>
          <p className="text-sm text-gray-600 mt-2">{getDescription()}</p>
        </div>

        {/* コピーボタン */}
        <div className="flex justify-center">
          <Button onClick={handleCopy} size="lg">
            {copySuccess ? 'コピーしました！' : 'コピー'}
          </Button>
        </div>

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">Cron式の構文</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><code className="bg-gray-200 px-1 rounded">* * * * *</code></p>
            <p>分(0-59) 時(0-23) 日(1-31) 月(1-12) 曜日(0-6)</p>
            <ul className="mt-2 space-y-1">
              <li>• <code>*</code>: 全ての値</li>
              <li>• <code>,</code>: リスト (例: 1,15)</li>
              <li>• <code>-</code>: 範囲 (例: 1-5)</li>
              <li>• <code>/</code>: 間隔 (例: */15 = 15分ごと)</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default CronGenerator
