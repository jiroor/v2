import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

type SortOrder = 'asc' | 'desc' | 'random' | 'reverse' | 'length-asc' | 'length-desc'

function TextSorter() {
  useToolUsageTracking('/text/sort', 'テキストソート')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [order, setOrder] = useState<SortOrder>('asc')
  const [copySuccess, setCopySuccess] = useState(false)

  const sortLines = (text: string, sortOrder: SortOrder) => {
    if (!text.trim()) {
      setOutput('')
      return
    }

    let lines = text.split('\n')

    switch (sortOrder) {
      case 'asc':
        lines.sort((a, b) => a.localeCompare(b, 'ja'))
        break
      case 'desc':
        lines.sort((a, b) => b.localeCompare(a, 'ja'))
        break
      case 'random':
        // Fisher-Yates shuffle
        for (let i = lines.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[lines[i], lines[j]] = [lines[j], lines[i]]
        }
        break
      case 'reverse':
        lines = lines.reverse()
        break
      case 'length-asc':
        lines.sort((a, b) => a.length - b.length)
        break
      case 'length-desc':
        lines.sort((a, b) => b.length - a.length)
        break
    }

    setOutput(lines.join('\n'))
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    setCopySuccess(false)
    sortLines(value, order)
  }

  const handleOrderChange = (newOrder: SortOrder) => {
    setOrder(newOrder)
    sortLines(input, newOrder)
  }

  const handleCopy = async () => {
    if (!output) return

    try {
      await navigator.clipboard.writeText(output)
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
      disabled: !output,
    },
  ]

  useKeyboardShortcut(shortcuts)

  const sortOptions: { value: SortOrder; label: string }[] = [
    { value: 'asc', label: '昇順 (A→Z)' },
    { value: 'desc', label: '降順 (Z→A)' },
    { value: 'length-asc', label: '短い順' },
    { value: 'length-desc', label: '長い順' },
    { value: 'reverse', label: '逆順' },
    { value: 'random', label: 'ランダム' },
  ]

  return (
    <>
      <SEO path="/text/sort" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="テキストソート" toolPath="/text/sort" shareTitle="テキストソート | Rakit" />

        {/* ソート順選択 */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {sortOptions.map(({ value, label }) => (
            <Button
              key={value}
              variant={order === value ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleOrderChange(value)}
            >
              {label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 入力 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              入力テキスト（1行1項目）
            </label>
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="並び替えたいテキストを入力（1行ずつ）"
              className="w-full h-64 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>

          {/* 出力 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ソート結果
            </label>
            <textarea
              value={output}
              readOnly
              className="w-full h-64 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y bg-gray-50"
            />
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex gap-2 mt-4 justify-center">
          <Button onClick={handleCopy} disabled={!output}>
            {copySuccess ? 'コピーしました！' : 'コピー'}
          </Button>
        </div>

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 1行ずつのテキストを入力</li>
            <li>• <strong>昇順/降順</strong>: 辞書順（日本語対応）</li>
            <li>• <strong>短い順/長い順</strong>: 文字数でソート</li>
            <li>• <strong>逆順</strong>: 入力順を逆に</li>
            <li>• <strong>ランダム</strong>: ランダムに並び替え</li>
          </ul>
        </div>

        <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner format="rectangle" />
      </div>
    </>
  )
}

export default TextSorter
