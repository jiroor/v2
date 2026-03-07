import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function AcronymGenerator() {
  useToolUsageTracking('/text/acronym', '略語ジェネレーター')
  const [phrase, setPhrase] = useState('')
  const [result, setResult] = useState<string | null>(null)

  const generate = () => {
    if (!phrase.trim()) {
      setResult(null)
      return
    }

    const words = phrase.trim().split(/\s+/)
    const acronym = words.map(word => word[0]?.toUpperCase() || '').join('')
    setResult(acronym)
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

  const handleClear = () => {
    setPhrase('')
    setResult(null)
  }

  const examples = [
    { phrase: 'As Soon As Possible', acronym: 'ASAP' },
    { phrase: 'By The Way', acronym: 'BTW' },
    { phrase: 'For Your Information', acronym: 'FYI' },
    { phrase: 'Artificial Intelligence', acronym: 'AI' },
  ]

  return (
    <>
      <SEO path="/text/acronym" />
      <div className="max-w-[400px] mx-auto py-8 px-4">
        <ToolHeader title="略語ジェネレーター" toolPath="/text/acronym" shareTitle="略語ジェネレーター | Rakit" />

        {/* 入力 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            フレーズ（スペース区切り）
          </label>
          <input
            type="text"
            value={phrase}
            onChange={(e) => setPhrase(e.target.value)}
            placeholder="例: As Soon As Possible"
            className="w-full p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {/* ボタン */}
        <div className="flex gap-2 mb-6">
          <Button onClick={generate} size="lg" className="flex-1">
            生成
          </Button>
          <Button onClick={handleClear} variant="outline" size="lg" className="flex-1">
            クリア
          </Button>
        </div>

        {/* 結果 */}
        {result && (
          <div className="bg-[#fef3c7] border border-[#d97706] rounded-md p-6 text-center mb-6">
            <p className="text-sm text-gray-600 mb-1">略語</p>
            <p className="text-4xl font-bold text-[#d97706]">{result}</p>
            <Button onClick={handleCopy} size="sm" variant="outline" className="mt-3">
              コピー
            </Button>
          </div>
        )}

        {/* 例 */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
          <h3 className="font-semibold mb-3 text-sm">例</h3>
          <div className="space-y-2">
            {examples.map((ex, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm cursor-pointer hover:bg-gray-100 p-2 rounded"
                onClick={() => {
                  setPhrase(ex.phrase)
                  setResult(ex.acronym)
                }}
              >
                <span className="text-gray-600">{ex.phrase}</span>
                <span className="font-mono font-bold">{ex.acronym}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 使い方 */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• スペース区切りのフレーズを入力</li>
            <li>• 各単語の頭文字を抽出</li>
            <li>• プロジェクト名、チーム名、製品名などに</li>
            <li>• 覚えやすい略語を作成</li>
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

export default AcronymGenerator
