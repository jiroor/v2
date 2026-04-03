import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import { RelatedTools } from '@/components/RelatedTools/RelatedTools'
import AdBanner from '@/components/Ads/AdBanner'

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
      <SEO path="/other/discount" title="割引計算" description="無料のオンライン割引計算ツール。セール価格や割引率を素早く計算。買い物や価格設定に便利。" />
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

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            割引計算ツールは、商品の割引後価格を計算する無料のオンラインツールです。セール時の買い物や、複数の割引率を比較する際に役立ちます。よく使う割引率のプリセットも搭載しています。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 割引額と割引後価格を同時計算</li>
            <li>• 5%、10%、20%、30%、50%のプリセット</li>
            <li>• 任意の割引率を入力可能</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. 複数の割引を重ねられますか？</p>
              <p>A. 現在は1回の割引のみ計算できます。複数回割引は手動で計算してください。</p>
            </div>
            <div>
              <p className="font-medium">Q. 消費税は考慮されますか？</p>
              <p>A. いいえ、税抜価格で計算してください。</p>
            </div>
          </div>
        </div>
      </div>
      {/* 関連ツール */}
      <RelatedTools currentPath="/other/discount" />
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner slot="TOOL_BOTTOM" format="rectangle" />
      </div>
    </>
  )
}

export default DiscountCalculator
