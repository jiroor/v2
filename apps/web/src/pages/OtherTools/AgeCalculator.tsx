import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'

function AgeCalculator() {
  useToolUsageTracking('/other/age', '年齢計算')
  const [birthDate, setBirthDate] = useState('')
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0])
  const [result, setResult] = useState<{
    years: number
    months: number
    days: number
    totalDays: number
    nextBirthday: string
  } | null>(null)

  const calculate = () => {
    if (!birthDate) return

    const birth = new Date(birthDate)
    const target = new Date(targetDate)

    if (birth > target) {
      alert('生年月日が未来の日付です')
      return
    }

    let years = target.getFullYear() - birth.getFullYear()
    let months = target.getMonth() - birth.getMonth()
    let days = target.getDate() - birth.getDate()

    if (days < 0) {
      months--
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0)
      days += prevMonth.getDate()
    }

    if (months < 0) {
      years--
      months += 12
    }

    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))

    // 次の誕生日
    let nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBirthday <= target) {
      nextBirthday = new Date(target.getFullYear() + 1, birth.getMonth(), birth.getDate())
    }
    const nextBirthdayStr = `${nextBirthday.getFullYear()}年${nextBirthday.getMonth() + 1}月${nextBirthday.getDate()}日`

    setResult({ years, months, days, totalDays, nextBirthday: nextBirthdayStr })
  }

  const setToday = () => {
    setTargetDate(new Date().toISOString().split('T')[0])
  }

  return (
    <>
      <SEO path="/other/age" />
      <div className="max-w-[400px] mx-auto py-8 px-4">
        <h2 className="text-2xl font-semibold mb-8 text-center">年齢計算</h2>

        {/* 生年月日 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            生年月日
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {/* 基準日 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            基準日
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="flex-1 p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
            <Button onClick={setToday} variant="outline" size="sm">
              今日
            </Button>
          </div>
        </div>

        {/* 計算ボタン */}
        <Button onClick={calculate} size="lg" className="w-full mb-6">
          計算
        </Button>

        {/* 結果 */}
        {result && (
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center">
              <p className="text-sm text-gray-500 mb-2">満年齢</p>
              <p className="text-3xl font-bold text-[#d97706]">
                {result.years}歳 {result.months}ヶ月 {result.days}日
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">生まれてから</p>
                <p className="text-lg font-bold">{result.totalDays.toLocaleString()}日</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">次の誕生日</p>
                <p className="text-sm font-bold">{result.nextBirthday}</p>
              </div>
            </div>
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 生年月日から満年齢を計算</li>
            <li>• 基準日を指定して過去・未来の年齢も計算可能</li>
            <li>• 生まれてからの日数も表示</li>
            <li>• 次の誕生日も表示</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default AgeCalculator
