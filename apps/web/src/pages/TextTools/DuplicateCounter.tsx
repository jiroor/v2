import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function DuplicateCounter() {
  useToolUsageTracking('/text/duplicate-count', '重複行カウンター')
  const [input, setInput] = useState('')
  const [results, setResults] = useState<{ line: string; count: number }[]>([])
  const [totalLines, setTotalLines] = useState(0)
  const [uniqueLines, setUniqueLines] = useState(0)
  const [copySuccess, setCopySuccess] = useState(false)

  const analyzeDuplicates = (text: string) => {
    if (!text) {
      setResults([])
      setTotalLines(0)
      setUniqueLines(0)
      return
    }

    const lines = text.split('\n').filter(line => line.trim() !== '')
    const lineCounts: Record<string, number> = {}

    lines.forEach(line => {
      const trimmed = line.trim()
      lineCounts[trimmed] = (lineCounts[trimmed] || 0) + 1
    })

    // 重複している行のみ抽出し、回数順にソート
    const duplicates = Object.entries(lineCounts)
      .filter(([_, count]) => count > 1)
      .map(([line, count]) => ({ line, count }))
      .sort((a, b) => b.count - a.count)

    setResults(duplicates)
    setTotalLines(lines.length)
    setUniqueLines(Object.keys(lineCounts).length)
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    setCopySuccess(false)
    analyzeDuplicates(value)
  }

  const handleCopy = async () => {
    if (results.length === 0) return

    const text = results.map(r => `${r.line}: ${r.count}回`).join('\n')
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  const shortcuts = [
    {
      key: 'd',
      description: 'コピー',
      action: handleCopy,
      meta: true,
      disabled: results.length === 0,
    },
  ]

  useKeyboardShortcut(shortcuts)

  return (
    <>
      <SEO path="/text/duplicate-count" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="重複行カウンター" toolPath="/text/duplicate-count" shareTitle="重複行カウンター | Rakit" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 入力 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              入力テキスト
            </label>
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="重複をカウントしたいテキストを入力（1行ずつ解析します）"
              className="w-full h-64 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>

          {/* 結果 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              重複行一覧
            </label>
            <div className="h-64 p-4 border border-gray-200 rounded-md bg-gray-50 overflow-y-auto">
              {results.length > 0 ? (
                <div className="space-y-2">
                  {results.map((result, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-white rounded border">
                      <span className="font-mono text-sm truncate flex-1">{result.line}</span>
                      <span className="ml-2 text-sm font-bold text-[#d97706]">{result.count}回</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">
                  重複行がありません
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 統計 */}
        {input && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md flex justify-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{totalLines}</div>
              <div className="text-sm text-gray-600">総行数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{uniqueLines}</div>
              <div className="text-sm text-gray-600">ユニーク行数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#d97706]">{results.length}</div>
              <div className="text-sm text-gray-600">重複行種類</div>
            </div>
          </div>
        )}

        {/* アクションボタン */}
        <div className="flex gap-2 mt-4 justify-center">
          <Button onClick={handleCopy} disabled={results.length === 0}>
            {copySuccess ? 'コピーしました！' : '📋 結果をコピー'}
          </Button>
        </div>

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 入力テキストを行ごとに解析し、重複している行をカウント</li>
            <li>• 重複回数が多い順に表示</li>
            <li>• 空行は除外されます</li>
            <li>• 重複削除ツールと組み合わせて使うと便利</li>
          </ul>
        </div>

        <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner slot="tools-rectangle" format="rectangle" />
      </div>
    </>
  )
}

export default DuplicateCounter
