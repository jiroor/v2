import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function CompoundInterestCalculator() {
  useToolUsageTracking('/other/compound-interest', '複利計算')
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('')
  const [compoundFreq, setCompoundFreq] = useState('12')
  const [monthlyContribution, setMonthlyContribution] = useState('')
  const [result, setResult] = useState<{
    finalAmount: number
    totalContributions: number
    totalInterest: number
  } | null>(null)

  const calculate = () => {
    const P = parseFloat(principal)
    const r = parseFloat(rate) / 100
    const n = parseInt(compoundFreq)
    const t = parseFloat(years)
    const PMT = parseFloat(monthlyContribution) || 0

    if (isNaN(P) || isNaN(r) || isNaN(t) || P <= 0 || r <= 0 || t <= 0) {
      setResult(null)
      return
    }

    // 複利計算式: A = P(1 + r/n)^(nt)
    const baseAmount = P * Math.pow(1 + r / n, n * t)

    // 毎月の積立を含む計算
    // FV = PMT * ((1 + r/n)^(nt) - 1) / (r/n)
    const contributionAmount = PMT > 0
      ? PMT * ((Math.pow(1 + r / n, n * t) - 1) / (r / n))
      : 0

    const finalAmount = baseAmount + contributionAmount
    const totalContributions = P + PMT * 12 * t
    const totalInterest = finalAmount - totalContributions

    setResult({
      finalAmount,
      totalContributions,
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
      <SEO path="/other/compound-interest" />
      <div className="max-w-[400px] mx-auto py-8 px-4">
        <ToolHeader title="複利計算" toolPath="/other/compound-interest" shareTitle="複利計算 | Rakit" />

        {/* 元本 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            元本（円）
          </label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="例: 1000000"
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
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="例: 5"
            step="0.1"
            className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {/* 期間 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            期間（年）
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="例: 10"
            className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {/* 複利頻度 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            複利頻度
          </label>
          <select
            value={compoundFreq}
            onChange={(e) => setCompoundFreq(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          >
            <option value="1">年1回</option>
            <option value="2">半年1回</option>
            <option value="4">四半期ごと</option>
            <option value="12">毎月</option>
            <option value="365">毎日</option>
          </select>
        </div>

        {/* 毎月の積立 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            毎月の積立額（円）※任意
          </label>
          <input
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(e.target.value)}
            placeholder="例: 10000"
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
              <p className="text-sm text-gray-600 mb-1">最終金額</p>
              <p className="text-3xl font-bold text-[#d97706]">
                ¥{formatCurrency(result.finalAmount)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-center">
                <p className="text-xs text-gray-600 mb-1">元本+積立</p>
                <p className="text-lg font-bold">¥{formatCurrency(result.totalContributions)}</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-md p-3 text-center">
                <p className="text-xs text-green-600 mb-1">利息収入</p>
                <p className="text-lg font-bold text-green-700">¥{formatCurrency(result.totalInterest)}</p>
              </div>
            </div>
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 複利の効果をシミュレーション</li>
            <li>• 毎月の積立投資の計算も可能</li>
            <li>• 投資・貯金計画の参考に</li>
          </ul>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner slot="tools-rectangle" format="rectangle" />
      </div>
    </>
  )
}

export default CompoundInterestCalculator
