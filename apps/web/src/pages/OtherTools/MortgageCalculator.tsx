import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function MortgageCalculator() {
  useToolUsageTracking('/other/mortgage', '住宅ローン計算')
  const [loanAmount, setLoanAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [loanYears, setLoanYears] = useState('')
  const [result, setResult] = useState<{
    monthlyPayment: number
    totalPayment: number
    totalInterest: number
  } | null>(null)

  const calculate = () => {
    const P = parseFloat(loanAmount)
    const annualRate = parseFloat(interestRate) / 100
    const years = parseFloat(loanYears)

    if (isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || annualRate <= 0 || years <= 0) {
      setResult(null)
      return
    }

    const monthlyRate = annualRate / 12
    const totalMonths = years * 12

    // 月次支払額: M = P * [r(1+r)^n] / [(1+r)^n – 1]
    const monthlyPayment = P * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
      (Math.pow(1 + monthlyRate, totalMonths) - 1)

    const totalPayment = monthlyPayment * totalMonths
    const totalInterest = totalPayment - P

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
    })
  }

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('ja-JP', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  }

  return (
    <>
      <SEO path="/other/mortgage" />
      <div className="max-w-[400px] mx-auto py-8 px-4">
        <ToolHeader title="住宅ローン計算" toolPath="/other/mortgage" shareTitle="住宅ローン計算 | Rakit" />

        {/* 借入金額 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            借入金額（円）
          </label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="例: 35000000"
            className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {/* 年利率 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            年利率（%）
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="例: 1.5"
            step="0.1"
            className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {/* 返済期間 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            返済期間（年）
          </label>
          <input
            type="number"
            value={loanYears}
            onChange={(e) => setLoanYears(e.target.value)}
            placeholder="例: 35"
            className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {/* 計算ボタン */}
        <Button onClick={calculate} size="lg" className="w-full mb-6">
          計算
        </Button>

        {/* 結果 */}
        {result && (
          <div className="space-y-3">
            <div className="bg-[#fef3c7] border border-[#d97706] rounded-md p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">月次返済額</p>
              <p className="text-3xl font-bold text-[#d97706]">
                ¥{formatCurrency(result.monthlyPayment)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-center">
                <p className="text-xs text-gray-600 mb-1">総返済額</p>
                <p className="text-lg font-bold">¥{formatCurrency(result.totalPayment)}</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-md p-3 text-center">
                <p className="text-xs text-red-600 mb-1">利息総額</p>
                <p className="text-lg font-bold text-red-700">¥{formatCurrency(result.totalInterest)}</p>
              </div>
            </div>
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 元利均等返済方式で計算</li>
            <li>• 月次返済額、総返済額、利息総額を表示</li>
            <li>• 家購入の計画立案に便利</li>
            <li>• 実際の条件は金融機関にご確認ください</li>
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

export default MortgageCalculator
