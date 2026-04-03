import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

const timezones = [
  { id: 'Asia/Tokyo', name: '東京 (JST)', offset: 9 },
  { id: 'UTC', name: 'UTC', offset: 0 },
  { id: 'America/New_York', name: 'ニューヨーク (EST/EDT)', offset: -5 },
  { id: 'America/Los_Angeles', name: 'ロサンゼルス (PST/PDT)', offset: -8 },
  { id: 'Europe/London', name: 'ロンドン (GMT/BST)', offset: 0 },
  { id: 'Europe/Paris', name: 'パリ (CET/CEST)', offset: 1 },
  { id: 'Asia/Shanghai', name: '上海 (CST)', offset: 8 },
  { id: 'Asia/Seoul', name: 'ソウル (KST)', offset: 9 },
  { id: 'Asia/Singapore', name: 'シンガポール (SGT)', offset: 8 },
  { id: 'Australia/Sydney', name: 'シドニー (AEST/AEDT)', offset: 10 },
]

function TimezoneConverter() {
  useToolUsageTracking('/other/timezone', '時差計算')
  const [sourceTimezone, setSourceTimezone] = useState('Asia/Tokyo')
  const [targetTimezone, setTargetTimezone] = useState('America/New_York')
  const [time, setTime] = useState('12:00')

  const convertTime = useMemo(() => {
    if (!time) return ''

    const [hours, minutes] = time.split(':').map(Number)
    const sourceOffset = timezones.find(tz => tz.id === sourceTimezone)?.offset ?? 0
    const targetOffset = timezones.find(tz => tz.id === targetTimezone)?.offset ?? 0

    let totalMinutes = hours * 60 + minutes
    totalMinutes += (targetOffset - sourceOffset) * 60

    // Normalize to 0-1439 range
    while (totalMinutes < 0) totalMinutes += 1440
    totalMinutes %= 1440

    const newHours = Math.floor(totalMinutes / 60)
    const newMinutes = totalMinutes % 60

    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`
  }, [time, sourceTimezone, targetTimezone])

  const timeDifference = useMemo(() => {
    const sourceOffset = timezones.find(tz => tz.id === sourceTimezone)?.offset ?? 0
    const targetOffset = timezones.find(tz => tz.id === targetTimezone)?.offset ?? 0
    const diff = targetOffset - sourceOffset
    return diff >= 0 ? `+${diff}時間` : `${diff}時間`
  }, [sourceTimezone, targetTimezone])

  const swapTimezones = () => {
    setSourceTimezone(targetTimezone)
    setTargetTimezone(sourceTimezone)
  }

  return (
    <>
      <SEO path="/other/timezone" />
      <div className="max-w-[500px] mx-auto py-8 px-4">
        <ToolHeader title="時差計算" toolPath="/other/timezone" shareTitle="時差計算 | Rakit" />

        {/* 入力時間 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            時間
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-md font-mono text-lg text-center focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {/* タイムゾーン選択 */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              変換元
            </label>
            <select
              value={sourceTimezone}
              onChange={(e) => setSourceTimezone(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            >
              {timezones.map((tz) => (
                <option key={tz.id} value={tz.id}>
                  {tz.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center">
            <Button onClick={swapTimezones} variant="outline" size="sm">
              ↑↓ 入れ替え
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              変換先
            </label>
            <select
              value={targetTimezone}
              onChange={(e) => setTargetTimezone(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            >
              {timezones.map((tz) => (
                <option key={tz.id} value={tz.id}>
                  {tz.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 結果 */}
        {convertTime && (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center">
            <p className="text-sm text-gray-500 mb-2">
              時差: {timeDifference}
            </p>
            <p className="text-3xl font-bold text-[#d97706]">{convertTime}</p>
            <p className="text-sm text-gray-600 mt-2">
              {timezones.find(tz => tz.id === targetTimezone)?.name}
            </p>
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 時間とタイムゾーンを選択</li>
            <li>• 夏時間(DST)は考慮されていません</li>
            <li>• 海外との会議や連絡に便利</li>
            <li>• 入れ替えボタンで逆変換</li>
          </ul>
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            タイムゾーン変換ツールは、世界中のタイムゾーンを相互変換する無料のオンラインツールです。海外とのWeb会議や、旅行の計画などに役立ちます。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 世界の主要タイムゾーンに対応</li>
            <li>• 時差を表示</li>
            <li>• 双方向の変換</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. 夏時間は考慮されますか？</p>
              <p>A. いいえ、標準時間での計算です。夏時間の期間は手動で調整してください。</p>
            </div>
            <div>
              <p className="font-medium">Q. どのタイムゾーンに対応していますか？</p>
              <p>A. 世界の主要都市のタイムゾーンに対応しています。</p>
            </div>
          </div>
        </div>

        {/* 広告 */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <AdBanner slot="TOOL_BOTTOM" format="rectangle" />
        </div>
      </div>
    </>
  )
}

export default TimezoneConverter
