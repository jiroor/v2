import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function TaxCalculator() {
  useToolUsageTracking('/other/tax', '消費税計算')
  const [amount, setAmount] = useState('')
  const [taxRate, setTaxRate] = useState('10')
  const [taxType, setTaxType] = useState<'exclude' | 'include'>('exclude')
  const [result, setResult] = useState<{
    baseAmount: number
    tax: number
    total: number
  } | null>(null)

  const calculate = () => {
    const num = parseFloat(amount)
    const rate = parseFloat(taxRate) / 100

    if (isNaN(num) || num <= 0) {
      setResult(null)
      return
    }

    if (taxType === 'exclude') {
      // 税抜価格 → 税込価格
      const tax = Math.round(num * rate)
      const total = num + tax
      setResult({
        baseAmount: num,
        tax,
        total,
      })
    } else {
      // 税込価格 → 税抜価格
      const baseAmount = Math.round(num / (1 + rate))
      const tax = num - baseAmount
      setResult({
        baseAmount,
        tax,
        total: num,
      })
    }
  }

  const copyResult = async (value: number) => {
    try {
      await navigator.clipboard.writeText(value.toLocaleString())
      alert('コピーしました')
    } catch {
      alert('コピーに失敗しました')
    }
  }

  return (
    <>
      <SEO path="/other/tax" />
      <div className="max-w-[400px] mx-auto py-8 px-4">
        <ToolHeader title="消費税計算" toolPath="/other/tax" shareTitle="消費税計算 | Rakit" />

        {/* 金額 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            金額（円）
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="金額を入力"
            className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {/* 税率 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            税率（%）
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              className="flex-1 p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
            <Button variant="outline" size="sm" onClick={() => setTaxRate('10')}>
              10%
            </Button>
            <Button variant="outline" size="sm" onClick={() => setTaxRate('8')}>
              8%
            </Button>
          </div>
        </div>

        {/* 計算タイプ */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            計算方法
          </label>
          <div className="flex gap-2">
            <Button
              variant={taxType === 'exclude' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTaxType('exclude')}
            >
              税抜 → 税込
            </Button>
            <Button
              variant={taxType === 'include' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTaxType('include')}
            >
              税込 → 税抜
            </Button>
          </div>
        </div>

        {/* 計算ボタン */}
        <Button onClick={calculate} size="lg" className="w-full mb-6">
          計算
        </Button>

        {/* 結果 */}
        {result && (
          <div className="space-y-3">
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500">税抜価格</p>
                <p className="text-xl font-bold">{result.baseAmount.toLocaleString()}円</p>
              </div>
              <Button size="sm" variant="outline" onClick={() => copyResult(result.baseAmount)}>
                コピー
              </Button>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500">消費税</p>
                <p className="text-xl font-bold text-[#d97706]">{result.tax.toLocaleString()}円</p>
              </div>
              <Button size="sm" variant="outline" onClick={() => copyResult(result.tax)}>
                コピー
              </Button>
            </div>
            <div className="bg-[#fef3c7] border border-[#d97706] rounded-md p-4 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-600">税込価格</p>
                <p className="text-2xl font-bold">{result.total.toLocaleString()}円</p>
              </div>
              <Button size="sm" onClick={() => copyResult(result.total)}>
                コピー
              </Button>
            </div>
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 標準税率10%、軽減税率8%に対応</li>
            <li>• 税抜価格から税込価格を計算</li>
            <li>• 税込価格から税抜価格を逆算</li>
            <li>• 金額は整数に丸められます</li>
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

export default TaxCalculator
