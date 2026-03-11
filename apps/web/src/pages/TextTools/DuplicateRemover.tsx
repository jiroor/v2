import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

type Mode = 'lines' | 'words' | 'characters'

function DuplicateRemover() {
  useToolUsageTracking('/text/duplicate', '重複削除')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<Mode>('lines')
  const [copySuccess, setCopySuccess] = useState(false)
  const [stats, setStats] = useState({ original: 0, result: 0, removed: 0 })

  const removeDuplicates = (text: string, removeMode: Mode) => {
    if (!text.trim()) {
      setOutput('')
      setStats({ original: 0, result: 0, removed: 0 })
      return
    }

    let result: string
    let originalCount: number
    let resultCount: number

    switch (removeMode) {
      case 'lines':
        const lines = text.split('\n')
        originalCount = lines.length
        const uniqueLines = [...new Set(lines)]
        resultCount = uniqueLines.length
        result = uniqueLines.join('\n')
        break

      case 'words':
        const words = text.split(/\s+/).filter(w => w.length > 0)
        originalCount = words.length
        const uniqueWords = [...new Set(words)]
        resultCount = uniqueWords.length
        result = uniqueWords.join(' ')
        break

      case 'characters':
        const chars = text.split('')
        originalCount = chars.length
        const uniqueChars = [...new Set(chars)]
        resultCount = uniqueChars.length
        result = uniqueChars.join('')
        break
    }

    setOutput(result)
    setStats({
      original: originalCount,
      result: resultCount,
      removed: originalCount - resultCount,
    })
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    setCopySuccess(false)
    removeDuplicates(value, mode)
  }

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode)
    removeDuplicates(input, newMode)
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

  const handleClear = () => {
    setInput('')
    setOutput('')
    setStats({ original: 0, result: 0, removed: 0 })
    setCopySuccess(false)
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

  return (
    <>
      <SEO path="/text/duplicate" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="重複削除" toolPath="/text/duplicate" shareTitle="重複削除 | Rakit" />

        {/* モード選択 */}
        <div className="flex gap-2 mb-6 justify-center">
          <Button
            variant={mode === 'lines' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleModeChange('lines')}
          >
            行単位
          </Button>
          <Button
            variant={mode === 'words' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleModeChange('words')}
          >
            単語単位
          </Button>
          <Button
            variant={mode === 'characters' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleModeChange('characters')}
          >
            文字単位
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 入力 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              入力テキスト
            </label>
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="重複を削除したいテキストを入力"
              className="w-full h-64 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>

          {/* 出力 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              結果
            </label>
            <textarea
              value={output}
              readOnly
              className="w-full h-64 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y bg-gray-50"
            />
          </div>
        </div>

        {/* 統計 */}
        {input && (
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <span className="text-gray-600">
              元: <strong>{stats.original}</strong>
            </span>
            <span className="text-gray-600">
              結果: <strong className="text-[#d97706]">{stats.result}</strong>
            </span>
            <span className="text-gray-600">
              削除: <strong className="text-red-500">{stats.removed}</strong>
            </span>
          </div>
        )}

        {/* アクションボタン */}
        <div className="flex gap-2 mt-4 justify-center">
          <Button onClick={handleCopy} disabled={!output}>
            {copySuccess ? 'コピーしました！' : 'コピー'}
          </Button>
          <Button onClick={handleClear} variant="outline">
            クリア
          </Button>
        </div>

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• <strong>行単位</strong>: 重複する行を削除（順序は維持）</li>
            <li>• <strong>単語単位</strong>: 重複する単語を削除</li>
            <li>• <strong>文字単位</strong>: 重複する文字を削除</li>
            <li>• データクリーニングやリスト整理に便利</li>
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

export default DuplicateRemover
