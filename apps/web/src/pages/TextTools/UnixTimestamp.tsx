import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'

function UnixTimestamp() {
  useToolUsageTracking('/text/unix', 'Unix時間変換')
  const [timestamp, setTimestamp] = useState('')
  const [dateString, setDateString] = useState('')
  const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000))
  const [copySuccess, setCopySuccess] = useState<'timestamp' | 'date' | null>(null)
  const [timezone, setTimezone] = useState<string>(Intl.DateTimeFormat().resolvedOptions().timeZone)

  // 現在時刻を更新
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Unix時間から日時に変換
  const timestampToDate = (ts: string): string => {
    if (!ts) return ''
    const num = parseInt(ts, 10)
    if (isNaN(num)) return '無効なUnix時間'

    // ミリ秒か秒か判定
    const ms = num > 9999999999 ? num : num * 1000
    const date = new Date(ms)

    if (isNaN(date.getTime())) return '無効なUnix時間'

    return date.toLocaleString('ja-JP', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  // 日時からUnix時間へ変換
  const dateToTimestamp = (dateStr: string): string => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return '無効な日時'
    return Math.floor(date.getTime() / 1000).toString()
  }

  const handleTimestampChange = (value: string) => {
    setTimestamp(value)
    setCopySuccess(null)
  }

  const handleDateStringChange = (value: string) => {
    setDateString(value)
    setCopySuccess(null)
  }

  const handleCopy = async (text: string, type: 'timestamp' | 'date') => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(type)
      setTimeout(() => setCopySuccess(null), 2000)
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  const setCurrentTimestamp = () => {
    const now = Math.floor(Date.now() / 1000).toString()
    setTimestamp(now)
    setCopySuccess(null)
  }

  // キーボードショートカットの設定
  const shortcuts = [
    {
      key: 'n',
      description: '現在のUnix時間をセット',
      action: setCurrentTimestamp,
    },
  ]

  useKeyboardShortcut(shortcuts)

  return (
    <>
      <SEO path="/text/unix" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="Unix時間変換" toolPath="/text/unix" shareTitle="Unix時間変換 | Rakit" />

        {/* 現在のUnix時間 */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-6 mb-8 text-center">
          <p className="text-sm text-gray-600 mb-2">現在のUnix時間</p>
          <p className="text-3xl font-mono font-bold text-[#d97706]">{currentTime}</p>
          <p className="text-sm text-gray-500 mt-2">
            {new Date().toLocaleString('ja-JP', { timeZone: timezone })}
          </p>
        </div>

        {/* タイムゾーン選択 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            タイムゾーン
          </label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          >
            <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">America/New_York (EST/EDT)</option>
            <option value="America/Los_Angeles">America/Los_Angeles (PST/PDT)</option>
            <option value="Europe/London">Europe/London (GMT/BST)</option>
            <option value="Europe/Paris">Europe/Paris (CET/CEST)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Unix時間から日時 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unix時間（秒またはミリ秒）
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={timestamp}
                onChange={(e) => handleTimestampChange(e.target.value)}
                placeholder="例: 1709673600"
                className="flex-1 p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
              />
              <Button onClick={setCurrentTimestamp} variant="outline">
                現在
              </Button>
            </div>
            <div className="bg-white border border-gray-200 rounded-md p-4 min-h-[80px]">
              <p className="text-sm text-gray-500 mb-1">変換結果:</p>
              <p className="font-mono text-lg">
                {timestamp ? timestampToDate(timestamp) : '---'}
              </p>
            </div>
            {timestamp && timestampToDate(timestamp) !== '無効なUnix時間' && (
              <Button
                onClick={() => handleCopy(timestampToDate(timestamp), 'date')}
                variant="outline"
                size="sm"
                className="mt-2"
              >
                {copySuccess === 'date' ? 'コピーしました！' : '日時をコピー'}
              </Button>
            )}
          </div>

          {/* 日時からUnix時間 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              日時（ローカル時間）
            </label>
            <input
              type="datetime-local"
              value={dateString}
              onChange={(e) => handleDateStringChange(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
            <div className="bg-white border border-gray-200 rounded-md p-4 min-h-[80px] mt-2">
              <p className="text-sm text-gray-500 mb-1">Unix時間:</p>
              <p className="font-mono text-lg">
                {dateString ? dateToTimestamp(dateString) : '---'}
              </p>
            </div>
            {dateString && dateToTimestamp(dateString) !== '無効な日時' && (
              <Button
                onClick={() => handleCopy(dateToTimestamp(dateString), 'timestamp')}
                variant="outline"
                size="sm"
                className="mt-2"
              >
                {copySuccess === 'timestamp' ? 'コピーしました！' : 'Unix時間をコピー'}
              </Button>
            )}
          </div>
        </div>

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• <strong>Unix時間</strong>: 1970年1月1日 00:00:00 UTCからの経過秒数</li>
            <li>• 秒またはミリ秒の両方を自動判定</li>
            <li>• 「現在」ボタンで現在のUnix時間を取得</li>
            <li>• タイムゾーンを変更してローカル時間を調整</li>
          </ul>
        </div>

        {/* ショートカットキー一覧 */}
        <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />
      </div>
    </>
  )
}

export default UnixTimestamp
