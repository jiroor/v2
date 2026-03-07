import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function RandomNumberGenerator() {
  useToolUsageTracking('/other/random', '乱数生成')
  const [min, setMin] = useState('1')
  const [max, setMax] = useState('100')
  const [count, setCount] = useState('1')
  const [results, setResults] = useState<number[]>([])
  const [copySuccess, setCopySuccess] = useState(false)

  const generate = () => {
    const minNum = parseInt(min) || 0
    const maxNum = parseInt(max) || 100
    const countNum = Math.min(parseInt(count) || 1, 100)

    const newResults: number[] = []
    for (let i = 0; i < countNum; i++) {
      const random = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
      newResults.push(random)
    }
    setResults(newResults)
    setCopySuccess(false)
  }

  const handleCopy = async () => {
    if (results.length === 0) return
    try {
      await navigator.clipboard.writeText(results.join('\n'))
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch {
      alert('コピーに失敗しました')
    }
  }

  return (
    <>
      <SEO path="/other/random" />
      <div className="max-w-[400px] mx-auto py-8 px-4">
        <ToolHeader title="乱数生成" toolPath="/other/random-num" shareTitle="乱数生成 | Rakit" />

        {/* 設定 */}
        <div className="space-y-4 mb-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                最小値
              </label>
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                最大値
              </label>
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              生成個数（最大100）
            </label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              min="1"
              max="100"
              className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>
        </div>

        {/* 生成ボタン */}
        <Button onClick={generate} size="lg" className="w-full mb-6">
          生成
        </Button>

        {/* 結果 */}
        {results.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">{results.length}件</span>
              <Button onClick={handleCopy} size="sm" variant="outline">
                {copySuccess ? 'コピーしました！' : 'コピー'}
              </Button>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 max-h-64 overflow-auto">
              <div className="grid grid-cols-5 gap-2">
                {results.map((num, i) => (
                  <div
                    key={i}
                    className="text-center font-mono text-sm p-2 bg-white rounded border border-gray-100"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 最小値〜最大値の範囲で乱数を生成</li>
            <li>• 負の数も指定可能</li>
            <li>• 複数個まとめて生成可能</li>
            <li>• くじ引き、ゲーム、抽選に便利</li>
          </ul>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner format="rectangle" />
      </div>
    </>
  )
}

export default RandomNumberGenerator
