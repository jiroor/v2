import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'

function ProgressConverter() {
  useToolUsageTracking('/other/progress', '進捗変換')
  const [type, setType] = useState<'fraction' | 'percent'>('fraction')
  const [numerator, setNumerator] = useState('')
  const [denominator, setDenominator] = useState('')
  const [percent, setPercent] = useState('')
  const [result, setResult] = useState('')

  const calculateFraction = (num: string, den: string) => {
    const n = parseFloat(num)
    const d = parseFloat(den)

    if (isNaN(n) || isNaN(d) || d === 0) {
      setResult('')
      return
    }

    const p = (n / d) * 100
    setResult(`${p.toFixed(2)}%`)
  }

  const calculatePercent = (p: string) => {
    const percent = parseFloat(p)

    if (isNaN(percent)) {
      setResult('')
      return
    }

    // 分数に変換（簡易版）
    if (percent === 0) {
      setResult('0/1')
      return
    }
    if (percent === 100) {
      setResult('1/1')
      return
    }

    // 最大分母100で近似
    let bestNum = 1
    let bestDen = 1
    let bestDiff = Math.abs(percent - (bestNum / bestDen) * 100)

    for (let den = 1; den <= 100; den++) {
      const num = Math.round((percent / 100) * den)
      const diff = Math.abs(percent - (num / den) * 100)
      if (diff < bestDiff) {
        bestDiff = diff
        bestNum = num
        bestDen = den
      }
    }

    // 簡約化
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
    const g = gcd(bestNum, bestDen)
    setResult(`${bestNum / g}/${bestDen / g}`)
  }

  const handleCalculate = () => {
    if (type === 'fraction') {
      calculateFraction(numerator, denominator)
    } else {
      calculatePercent(percent)
    }
  }

  const handleCopy = async () => {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result)
      alert('コピーしました')
    } catch {
      alert('コピーに失敗しました')
    }
  }

  return (
    <>
      <SEO path="/other/progress" />
      <div className="max-w-[400px] mx-auto py-8 px-4">
        <ToolHeader title="進捗変換" toolPath="/other/progress" shareTitle="進捗変換 | Rakit" />

        {/* タイプ選択 */}
        <div className="flex gap-2 mb-6 justify-center">
          <Button
            variant={type === 'fraction' ? 'default' : 'outline'}
            onClick={() => { setType('fraction'); setResult('') }}
          >
            分数 → パーセント
          </Button>
          <Button
            variant={type === 'percent' ? 'default' : 'outline'}
            onClick={() => { setType('percent'); setResult('') }}
          >
            パーセント → 分数
          </Button>
        </div>

        {/* 入力 */}
        {type === 'fraction' ? (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              分数
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={numerator}
                onChange={(e) => setNumerator(e.target.value)}
                placeholder="分子"
                className="flex-1 p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
              />
              <span className="text-2xl font-bold">/</span>
              <input
                type="number"
                value={denominator}
                onChange={(e) => setDenominator(e.target.value)}
                placeholder="分母"
                className="flex-1 p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
              />
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              パーセント
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={percent}
                onChange={(e) => setPercent(e.target.value)}
                placeholder="例: 75"
                className="flex-1 p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
              />
              <span className="text-xl">%</span>
            </div>
          </div>
        )}

        {/* 計算ボタン */}
        <Button onClick={handleCalculate} size="lg" className="w-full mb-6">
          変換
        </Button>

        {/* 結果 */}
        {result && (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center">
            <p className="text-sm text-gray-500 mb-1">結果</p>
            <p className="text-3xl font-bold text-[#d97706]">{result}</p>
            <Button onClick={handleCopy} size="sm" variant="outline" className="mt-4">
              コピー
            </Button>
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 分数をパーセントに変換</li>
            <li>• パーセントを分数に変換</li>
            <li>• 進捗管理や割合の確認に便利</li>
            <li>• 例: 3/4 → 75%</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default ProgressConverter
