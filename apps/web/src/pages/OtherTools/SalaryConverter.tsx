import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

type InputType = 'annual' | 'monthly' | 'hourly'

function SalaryConverter() {
  useToolUsageTracking('/other/salary', '年収・月収・時給変換')
  const [inputType, setInputType] = useState<InputType>('annual')
  const [annualSalary, setAnnualSalary] = useState('')
  const [monthlySalary, setMonthlySalary] = useState('')
  const [hourlyWage, setHourlyWage] = useState('')
  const [workingHours, setWorkingHours] = useState('8')
  const [workingDays, setWorkingDays] = useState('20')

  const calculate = () => {
    const hours = parseFloat(workingHours) || 8
    const days = parseFloat(workingDays) || 20

    let annual = 0

    if (inputType === 'annual') {
      annual = parseFloat(annualSalary) || 0
    } else if (inputType === 'monthly') {
      annual = (parseFloat(monthlySalary) || 0) * 12
    } else {
      annual = (parseFloat(hourlyWage) || 0) * hours * days * 12
    }

    const monthly = annual / 12
    const hourly = annual / (hours * days * 12)

    return { annual, monthly, hourly }
  }

  const result = calculate()

  const formatCurrency = (amount: number) => {
    return Math.round(amount).toLocaleString('ja-JP')
  }

  return (
    <>
      <SEO path="/other/salary" />
      <div className="max-w-[400px] mx-auto py-8 px-4">
        <ToolHeader title="年収・月収・時給変換" toolPath="/other/salary" shareTitle="年収・月収・時給変換 | Rakit" />

        {/* 入力タイプ選択 */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={inputType === 'annual' ? 'default' : 'outline'}
            onClick={() => setInputType('annual')}
            className="flex-1"
          >
            年収
          </Button>
          <Button
            variant={inputType === 'monthly' ? 'default' : 'outline'}
            onClick={() => setInputType('monthly')}
            className="flex-1"
          >
            月収
          </Button>
          <Button
            variant={inputType === 'hourly' ? 'default' : 'outline'}
            onClick={() => setInputType('hourly')}
            className="flex-1"
          >
            時給
          </Button>
        </div>

        {/* 入力 */}
        <div className="mb-4">
          {inputType === 'annual' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">年収（円）</label>
              <input
                type="number"
                value={annualSalary}
                onChange={(e) => setAnnualSalary(e.target.value)}
                placeholder="例: 5000000"
                className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
              />
            </div>
          ) : inputType === 'monthly' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">月収（円）</label>
              <input
                type="number"
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(e.target.value)}
                placeholder="例: 400000"
                className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">時給（円）</label>
              <input
                type="number"
                value={hourlyWage}
                onChange={(e) => setHourlyWage(e.target.value)}
                placeholder="例: 1500"
                className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
              />
            </div>
          )}
        </div>

        {/* 労働条件 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">1日の労働時間</label>
            <input
              type="number"
              value={workingHours}
              onChange={(e) => setWorkingHours(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-md text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">月の労働日数</label>
            <input
              type="number"
              value={workingDays}
              onChange={(e) => setWorkingDays(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-md text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>
        </div>

        {/* 結果 */}
        <div className="space-y-3">
          <div className={`p-4 rounded-md border ${inputType === 'annual' ? 'bg-[#fef3c7] border-[#d97706]' : 'bg-gray-50 border-gray-200'}`}>
            <p className="text-xs text-gray-600 mb-1">年収</p>
            <p className="text-2xl font-bold">¥{formatCurrency(result.annual)}</p>
          </div>
          <div className={`p-4 rounded-md border ${inputType === 'monthly' ? 'bg-[#fef3c7] border-[#d97706]' : 'bg-gray-50 border-gray-200'}`}>
            <p className="text-xs text-gray-600 mb-1">月収</p>
            <p className="text-2xl font-bold">¥{formatCurrency(result.monthly)}</p>
          </div>
          <div className={`p-4 rounded-md border ${inputType === 'hourly' ? 'bg-[#fef3c7] border-[#d97706]' : 'bg-gray-50 border-gray-200'}`}>
            <p className="text-xs text-gray-600 mb-1">時給</p>
            <p className="text-2xl font-bold">¥{formatCurrency(result.hourly)}</p>
          </div>
        </div>

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 年収・月収・時給を相互変換</li>
            <li>• 労働条件を調整可能</li>
            <li>• 転職・求人検索の参考に</li>
          </ul>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner slot="TOOL_BOTTOM" format="rectangle" />
      </div>
    </>
  )
}

export default SalaryConverter
