import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'

function DiscountCalculator() {
  useToolUsageTracking('/other/discount', '割引計算')
  const [originalPrice, setOriginalPrice] = useState('')
  const [discountRate, setDiscountRate] = useState('')
  const [result, setResult] = useState<{
    discountAmount: number
    finalPrice: number
  } | null>(null)

  const calculate = () => {
    const price = parseFloat(originalPrice)
    const rate = parseFloat(discountRate)

    if (isNaN(price) || isNaN(rate) || price <= 0 || rate < 0) {
      setResult(null)
      return
    }

    const discountAmount = Math.round(price * (rate / 100))
    const finalPrice = price - discountAmount

    setResult({
      discountAmount,
      finalPrice,
    })
  }

  const quickRates = [5, 10, 15, 20, 25, 30, 50]

  return (
    <>
      <SEO path="/other/discount" />
      <div className="max-w-[400px] mx-auto py-8 px-4">
        <ToolHeader title="割引計算" toolPath="/other/discount" shareTitle="割引計算 | Rakit" />

        {/* 元の価格 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            元の価格（円）
          </label>
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="例: 10000"
            className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {/* 割引率 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            割引率（%）
          </label>
          <input
            type="number"
            value={discountRate}
            onChange={(e) => setDiscountRate(e.target.value)}
            placeholder="例: 20"
            className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {/* クイック選択 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            よく使う割引率
          </label>
          <div className="flex flex-wrap gap-2">
            {quickRates.map((rate) => (
              <Button
                key={rate}
                variant="outline"
                size="sm"
                onClick={() => setDiscountRate(String(rate))}
              >
                {rate}%
              </Button>
            ))}
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
                <p className="text-xs text-gray-500">割引額</p>
                <p className="text-xl font-bold text-red-500">-{result.discountAmount.toLocaleString()}円</p>
              </div>
            </div>
            <div className="bg-[#fef3c7] border border-[#d97706] rounded-md p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">割引後価格</p>
                <p className="text-3xl font-bold">{result.finalPrice.toLocaleString()}円</p>
              </div>
            </div>
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 元の価格と割引率を入力</li>
            <li>• 割引額と割引後価格を表示</li>
            <li>• セール時の買い物に便利</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default DiscountCalculator
