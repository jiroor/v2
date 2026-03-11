import { useState, useEffect } from 'react'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'

interface CharTypeCount {
  type: string
  count: number
  color: string
}

function CharTypeCounter() {
  useToolUsageTracking('/text/char-type', '文字種カウンター')
  const [input, setInput] = useState('')
  const [results, setResults] = useState<CharTypeCount[]>([])

  const analyzeCharTypes = (text: string) => {
    if (!text) {
      setResults([])
      return
    }

    const counts: Record<string, number> = {
      'ひらがな': 0,
      'カタカナ': 0,
      '漢字': 0,
      '英字（大文字）': 0,
      '英字（小文字）': 0,
      '数字': 0,
      '記号': 0,
      '空白': 0,
      '改行': 0,
      'その他': 0,
    }

    for (const char of text) {
      if (/^[ぁ-んー]$/.test(char)) {
        counts['ひらがな']++
      } else if (/^[ァ-ヶー]$/.test(char)) {
        counts['カタカナ']++
      } else if (/^[一-龥]$/.test(char)) {
        counts['漢字']++
      } else if (/^[A-Z]$/.test(char)) {
        counts['英字（大文字）']++
      } else if (/^[a-z]$/.test(char)) {
        counts['英字（小文字）']++
      } else if (/^[0-9]$/.test(char)) {
        counts['数字']++
      } else if (/^[\s]$/.test(char) && char !== '\n') {
        counts['空白']++
      } else if (char === '\n') {
        counts['改行']++
      } else if (/^[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~。、」「』『【】（）〈〉《》・…！？]$/.test(char)) {
        counts['記号']++
      } else {
        counts['その他']++
      }
    }

    const colors: Record<string, string> = {
      'ひらがな': 'bg-pink-100 text-pink-800',
      'カタカナ': 'bg-purple-100 text-purple-800',
      '漢字': 'bg-red-100 text-red-800',
      '英字（大文字）': 'bg-blue-100 text-blue-800',
      '英字（小文字）': 'bg-cyan-100 text-cyan-800',
      '数字': 'bg-green-100 text-green-800',
      '記号': 'bg-yellow-100 text-yellow-800',
      '空白': 'bg-gray-100 text-gray-800',
      '改行': 'bg-gray-200 text-gray-800',
      'その他': 'bg-orange-100 text-orange-800',
    }

    const results: CharTypeCount[] = Object.entries(counts)
      .filter(([_, count]) => count > 0)
      .map(([type, count]) => ({
        type,
        count,
        color: colors[type],
      }))
      .sort((a, b) => b.count - a.count)

    setResults(results)
  }

  useEffect(() => {
    analyzeCharTypes(input)
  }, [input])

  const total = results.reduce((sum, r) => sum + r.count, 0)

  return (
    <>
      <SEO path="/text/char-type" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="文字種カウンター" toolPath="/text/char-type" shareTitle="文字種カウンター | Rakit" />

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            入力テキスト
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="文字種をカウントしたいテキストを入力"
            className="w-full h-48 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {/* 結果 */}
        {results.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">文字種別カウント</h3>
              <span className="text-sm text-gray-600">合計: {total}文字</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {results.map((result) => (
                <div
                  key={result.type}
                  className={`p-3 rounded-lg text-center ${result.color}`}
                >
                  <div className="text-2xl font-bold">{result.count}</div>
                  <div className="text-xs mt-1">{result.type}</div>
                </div>
              ))}
            </div>

            {/* グラフ */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">割合</h4>
              <div className="h-8 rounded-full overflow-hidden flex bg-gray-100">
                {results.map((result) => {
                  const percentage = (result.count / total) * 100
                  const bgColors: Record<string, string> = {
                    'ひらがな': 'bg-pink-400',
                    'カタカナ': 'bg-purple-400',
                    '漢字': 'bg-red-400',
                    '英字（大文字）': 'bg-blue-400',
                    '英字（小文字）': 'bg-cyan-400',
                    '数字': 'bg-green-400',
                    '記号': 'bg-yellow-400',
                    '空白': 'bg-gray-400',
                    '改行': 'bg-gray-500',
                    'その他': 'bg-orange-400',
                  }
                  return (
                    <div
                      key={result.type}
                      className={`${bgColors[result.type]} transition-all duration-300`}
                      style={{ width: `${percentage}%` }}
                      title={`${result.type}: ${result.count} (${percentage.toFixed(1)}%)`}
                    />
                  )
                })}
              </div>
              <div className="flex flex-wrap gap-2 mt-2 text-xs">
                {results.map((result) => {
                  const percentage = (result.count / total) * 100
                  return (
                    <span key={result.type} className="text-gray-600">
                      {result.type} {percentage.toFixed(1)}%
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• テキスト内の文字種を自動判定してカウント</li>
            <li>• 対応: ひらがな、カタカナ、漢字、英字、数字、記号、空白、改行</li>
            <li>• 日本語文章の分析や原稿の確認に便利</li>
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

export default CharTypeCounter
