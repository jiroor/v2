import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

type Gender = 'male' | 'female'
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'

function CalorieCalculator() {
  useToolUsageTracking('/other/calorie', 'カロリー計算')
  const [gender, setGender] = useState<Gender>('male')
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [activity, setActivity] = useState<ActivityLevel>('moderate')
  const [result, setResult] = useState<{
    bmr: number
    tdee: number
  } | null>(null)

  const activityMultipliers: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  }

  const activityLabels: Record<ActivityLevel, string> = {
    sedentary: '座り仕事・運動なし',
    light: '軽い運動（週1-3回）',
    moderate: '中程度の運動（週3-5回）',
    active: '激しい運動（週6-7回）',
    very_active: '非常に激しい運動・肉体労働',
  }

  const calculate = () => {
    const a = parseFloat(age)
    const h = parseFloat(height)
    const w = parseFloat(weight)

    if (isNaN(a) || isNaN(h) || isNaN(w) || a <= 0 || h <= 0 || w <= 0) {
      setResult(null)
      return
    }

    // Mifflin-St Jeor Equation
    let bmr: number
    if (gender === 'male') {
      bmr = 10 * w + 6.25 * h - 5 * a + 5
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161
    }

    const tdee = bmr * activityMultipliers[activity]

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
    })
  }

  return (
    <>
      <SEO path="/other/calorie" />
      <div className="max-w-[400px] mx-auto py-8 px-4">
        <ToolHeader title="カロリー計算" toolPath="/other/calorie" shareTitle="カロリー計算 | Rakit" />

        {/* 性別 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">性別</label>
          <div className="flex gap-2">
            <Button
              variant={gender === 'male' ? 'default' : 'outline'}
              onClick={() => setGender('male')}
              className="flex-1"
            >
              男性
            </Button>
            <Button
              variant={gender === 'female' ? 'default' : 'outline'}
              onClick={() => setGender('female')}
              className="flex-1"
            >
              女性
            </Button>
          </div>
        </div>

        {/* 年齢 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">年齢</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="例: 30"
            className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {/* 身長 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">身長（cm）</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="例: 170"
            className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {/* 体重 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">体重（kg）</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="例: 65"
            className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {/* 活動量 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">活動量</label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value as ActivityLevel)}
            className="w-full p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          >
            {Object.entries(activityLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {/* 計算ボタン */}
        <Button onClick={calculate} size="lg" className="w-full mb-6">
          計算
        </Button>

        {/* 結果 */}
        {result && (
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">基礎代謝（BMR）</p>
              <p className="text-2xl font-bold">{result.bmr.toLocaleString()} kcal/日</p>
            </div>
            <div className="bg-[#fef3c7] border border-[#d97706] rounded-md p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">1日の推定消費カロリー（TDEE）</p>
              <p className="text-3xl font-bold text-[#d97706]">{result.tdee.toLocaleString()} kcal/日</p>
            </div>
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">目標別カロリー目安</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 減量: TDEE - 500kcal</li>
            <li>• 維持: TDEE</li>
            <li>• 増量: TDEE + 300kcal</li>
          </ul>
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            カロリー計算ツールは、基礎代謝（BMR）と1日の推定消費カロリー（TDEE）を計算する無料のオンラインツールです。ダイエットや筋肉をつける際の食事計画に役立ちます。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 基礎代謝（BMR）を計算</li>
            <li>• 活動量を考慮したTDEE</li>
            <li>• 目標別のカロリー目安</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. BMRとTDEEの違いは？</p>
              <p>A. BMRは安静時の消費カロリー、TDEEは活動を含めた1日の総消費カロリーです。</p>
            </div>
            <div>
              <p className="font-medium">Q. どの計算式を使っていますか？</p>
              <p>A. Mifflin-St Jeor式を使用しています。</p>
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

export default CalorieCalculator
