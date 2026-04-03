import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function DateCalculator() {
  useToolUsageTracking('/other/date-calc', '日付計算')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [daysToAdd, setDaysToAdd] = useState('')
  const [result, setResult] = useState<{
    days: number
    weeks: number
    months: number
    years: number
  } | null>(null)
  const [calculatedDate, setCalculatedDate] = useState<string | null>(null)

  const calculateDifference = () => {
    if (!startDate || !endDate) return

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return

    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    const weeks = Math.floor(diffDays / 7)
    const months = Math.floor(diffDays / 30)
    const years = Math.floor(diffDays / 365)

    setResult({
      days: diffDays,
      weeks,
      months,
      years,
    })
  }

  const calculateFutureDate = () => {
    if (!startDate || !daysToAdd) return

    const start = new Date(startDate)
    const days = parseInt(daysToAdd)

    if (isNaN(start.getTime()) || isNaN(days)) return

    const futureDate = new Date(start)
    futureDate.setDate(futureDate.getDate() + days)

    const year = futureDate.getFullYear()
    const month = (futureDate.getMonth() + 1).toString().padStart(2, '0')
    const day = futureDate.getDate().toString().padStart(2, '0')
    const weekdays = ['日', '月', '火', '水', '木', '金', '土']
    const weekday = weekdays[futureDate.getDay()]

    setCalculatedDate(`${year}年${month}月${day}日（${weekday}）`)
  }

  return (
    <>
      <SEO path="/other/date-calc" title="日付計算" description="無料のオンライン日付計算ツール。日数の加減や期間の計算が可能。スケジュール管理に便利。" />
      <div className="max-w-[400px] mx-auto py-8 px-4">
        <ToolHeader title="日付計算" toolPath="/other/date-calc" shareTitle="日付計算 | Rakit" />

        {/* 日数計算 */}
        <div className="mb-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-4">日数計算</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">開始日</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">終了日</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
              />
            </div>
            <Button onClick={calculateDifference} size="lg" className="w-full">
              計算
            </Button>
          </div>

          {result && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">日数</span>
                <span className="font-bold text-[#d97706]">{result.days}日</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">週数</span>
                <span className="font-bold">{result.weeks}週間</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">月数（約）</span>
                <span className="font-bold">{result.months}ヶ月</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">年数（約）</span>
                <span className="font-bold">{result.years}年</span>
              </div>
            </div>
          )}
        </div>

        {/* 日付加算 */}
        <div className="mb-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-4">日付加算</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">基準日</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">加算日数</label>
              <input
                type="number"
                value={daysToAdd}
                onChange={(e) => setDaysToAdd(e.target.value)}
                placeholder="例: 30"
                className="w-full p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
              />
            </div>
            <Button onClick={calculateFutureDate} size="lg" className="w-full">
              計算
            </Button>
          </div>

          {calculatedDate && (
            <div className="mt-4 p-3 bg-[#fef3c7] border border-[#d97706] rounded-md text-center">
              <p className="text-sm text-gray-600 mb-1">結果</p>
              <p className="text-lg font-bold">{calculatedDate}</p>
            </div>
          )}
        </div>

        {/* 使い方 */}
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 2つの日付から日数を計算</li>
            <li>• 基準日からN日後を計算</li>
            <li>• 期間の計算に便利</li>
          </ul>
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            日付計算ツールは、2つの日付間の日数を計算したり、特定日からN日後を計算したりする無料のオンラインツールです。期間の計算や締切日の確認などに役立ちます。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 日数・週数・月数・年数を表示</li>
            <li>• 日付加算機能</li>
            <li>• 過去・未来の計算に対応</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. 祝日は考慮されますか？</p>
              <p>A. いいえ、日付のみの計算です。祝日は含まれません。</p>
            </div>
            <div>
              <p className="font-medium">Q. 負の数で過去の日付を計算できますか？</p>
              <p>A. はい、マイナスの数値で過去の日付を計算できます。</p>
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

export default DateCalculator
