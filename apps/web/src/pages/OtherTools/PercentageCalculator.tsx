import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

type CalculationType = 'percentage' | 'percentOf' | 'increase' | 'decrease' | 'ratio'

function PercentageCalculator() {
  useToolUsageTracking('/other/percentage', 'パーセント計算')
  const [type, setType] = useState<CalculationType>('percentage')
  const [values, setValues] = useState({ a: '', b: '' })
  const [result, setResult] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)

  const calculate = (a: string, b: string, calcType: CalculationType) => {
    const numA = parseFloat(a)
    const numB = parseFloat(b)

    if (isNaN(numA) || isNaN(numB)) {
      setResult('')
      return
    }

    let res: number
    switch (calcType) {
      case 'percentage':
        // AはBの何%？
        res = (numA / numB) * 100
        break
      case 'percentOf':
        // BのA%は？
        res = (numA / 100) * numB
        break
      case 'increase':
        // BからA%増やすと？
        res = numB * (1 + numA / 100)
        break
      case 'decrease':
        // BからA%減らすと？
        res = numB * (1 - numA / 100)
        break
      case 'ratio':
        // A/Bの比率
        res = numA / numB
        break
      default:
        res = 0
    }

    setResult(res.toPrecision(10).replace(/\.?0+$/, ''))
  }

  const handleValueChange = (key: 'a' | 'b', value: string) => {
    const newValues = { ...values, [key]: value }
    setValues(newValues)
    setCopySuccess(false)
    calculate(newValues.a, newValues.b, type)
  }

  const handleTypeChange = (newType: CalculationType) => {
    setType(newType)
    setValues({ a: '', b: '' })
    setResult('')
    setCopySuccess(false)
  }

  const handleCopy = async () => {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch {
      alert('コピーに失敗しました')
    }
  }

  const typeInfo: Record<CalculationType, { label: string; inputA: string; inputB: string; formula: string }> = {
    percentage: {
      label: 'AはBの何%？',
      inputA: 'A（値）',
      inputB: 'B（全体）',
      formula: 'A ÷ B × 100',
    },
    percentOf: {
      label: 'BのA%は？',
      inputA: 'A（パーセント）',
      inputB: 'B（値）',
      formula: 'A ÷ 100 × B',
    },
    increase: {
      label: 'A%増やすと？',
      inputA: 'A（パーセント）',
      inputB: 'B（元の値）',
      formula: 'B × (1 + A/100)',
    },
    decrease: {
      label: 'A%減らすと？',
      inputA: 'A（パーセント）',
      inputB: 'B（元の値）',
      formula: 'B × (1 - A/100)',
    },
    ratio: {
      label: '比率',
      inputA: 'A',
      inputB: 'B',
      formula: 'A ÷ B',
    },
  }

  return (
    <>
      <SEO path="/other/percentage" title="パーセント計算" description="無料のオンラインパーセント計算ツール。割合、増減、比率を素早く計算。ビジネスや日常計算に便利。" />
      <div className="max-w-[500px] mx-auto py-8 px-4">
        <ToolHeader title="パーセント計算" toolPath="/other/percentage" shareTitle="パーセント計算 | Rakit" />

        {/* タイプ選択 */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {Object.entries(typeInfo).map(([key, info]) => (
            <Button
              key={key}
              variant={type === key ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTypeChange(key as CalculationType)}
            >
              {info.label}
            </Button>
          ))}
        </div>

        {/* 入力 */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {typeInfo[type].inputA}
            </label>
            <input
              type="number"
              value={values.a}
              onChange={(e) => handleValueChange('a', e.target.value)}
              placeholder="値を入力"
              className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {typeInfo[type].inputB}
            </label>
            <input
              type="number"
              value={values.b}
              onChange={(e) => handleValueChange('b', e.target.value)}
              placeholder="値を入力"
              className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>
        </div>

        {/* 結果 */}
        {result && (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center mb-6">
            <p className="text-sm text-gray-500 mb-1">{typeInfo[type].formula}</p>
            <p className="text-3xl font-bold text-[#d97706]">{result}{type === 'percentage' || type === 'percentOf' ? '%' : ''}</p>
          </div>
        )}

        {/* コピー */}
        {result && (
          <div className="text-center">
            <Button onClick={handleCopy} size="sm">
              {copySuccess ? 'コピーしました！' : '結果をコピー'}
            </Button>
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">計算例</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 50は200の何%？ → 25%</li>
            <li>• 200の15%は？ → 30</li>
            <li>• 100から20%増やすと？ → 120</li>
            <li>• 100から20%減らすと？ → 80</li>
          </ul>
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            パーセント計算ツールは、様々なパーセント計算を行う無料のオンラインツールです。割合の計算、増減の計算、比率の計算など、5種類の計算モードに対応しています。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 5種類の計算モード</li>
            <li>• 計算式を表示</li>
            <li>• リアルタイムで計算</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. 小数点以下はどうなりますか？</p>
              <p>A. 必要に応じて小数点以下も表示されます。</p>
            </div>
            <div>
              <p className="font-medium">Q. マイナスの値も使えますか？</p>
              <p>A. はい、マイナスの値も入力可能です。</p>
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

export default PercentageCalculator
