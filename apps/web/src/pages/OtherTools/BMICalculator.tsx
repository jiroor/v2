import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function BMICalculator() {
  useToolUsageTracking('/other/bmi', 'BMI計算')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [result, setResult] = useState<{
    bmi: number
    category: string
    color: string
  } | null>(null)

  const calculate = () => {
    const h = parseFloat(height) / 100 // cm to m
    const w = parseFloat(weight)

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      setResult(null)
      return
    }

    const bmi = w / (h * h)

    let category: string
    let color: string

    if (bmi < 18.5) {
      category = '低体重（やせ型）'
      color = 'text-blue-600'
    } else if (bmi < 25) {
      category = '普通体重'
      color = 'text-green-600'
    } else if (bmi < 30) {
      category = '肥満（1度）'
      color = 'text-yellow-600'
    } else if (bmi < 35) {
      category = '肥満（2度）'
      color = 'text-orange-600'
    } else if (bmi < 40) {
      category = '肥満（3度）'
      color = 'text-red-500'
    } else {
      category = '肥満（4度）'
      color = 'text-red-700'
    }

    setResult({ bmi, category, color })
  }

  return (
    <>
      <SEO path="/other/bmi" />
      <div className="max-w-[400px] mx-auto py-8 px-4">
        <ToolHeader title="BMI計算" toolPath="/other/bmi" shareTitle="BMI計算 | Rakit" />

        {/* 身長 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            身長（cm）
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="例: 170"
            className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {/* 体重 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            体重（kg）
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="例: 65"
            className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {/* 計算ボタン */}
        <Button onClick={calculate} size="lg" className="w-full mb-6">
          計算
        </Button>

        {/* 結果 */}
        {result && (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center">
            <p className="text-sm text-gray-500 mb-1">BMI</p>
            <p className="text-4xl font-bold text-[#d97706] mb-2">
              {result.bmi.toFixed(1)}
            </p>
            <p className={`text-lg font-semibold ${result.color}`}>
              {result.category}
            </p>
          </div>
        )}

        {/* BMI基準 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">BMI基準（日本肥胖学会）</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 18.5未満: 低体重（やせ型）</li>
            <li>• 18.5〜25未満: 普通体重</li>
            <li>• 25〜30未満: 肥満（1度）</li>
            <li>• 30〜35未満: 肥満（2度）</li>
            <li>• 35〜40未満: 肥満（3度）</li>
            <li>• 40以上: 肥満（4度）</li>
          </ul>
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            BMI計算ツールは、身長と体重からBMI（体格指数）を計算する無料のオンラインツールです。健康診断の結果確認や、ダイエットの目標設定などに役立ちます。日本肥胖学会の基準で判定します。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 日本肥胖学会の基準で判定</li>
            <li>• 肥満度を6段階で表示</li>
            <li>• 身長・体重から即座に計算</li>
            <li>• 完全無料、インストール不要</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. BMIとは何ですか？</p>
              <p>A. 体重を身長の二乗で割った値で、肥満度を判定する指標です。</p>
            </div>
            <div>
              <p className="font-medium">Q. 筋肉量は考慮されますか？</p>
              <p>A. いいえ、BMIは身長と体重のみで計算します。筋肉量が多い方は実際より高く出る場合があります。</p>
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

export default BMICalculator
