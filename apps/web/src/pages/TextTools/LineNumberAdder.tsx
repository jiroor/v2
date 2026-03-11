import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

type NumberMode = 'standard' | 'zero' | 'dot' | 'paren'

function LineNumberAdder() {
  useToolUsageTracking('/text/line-number', '行番号追加')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<NumberMode>('standard')
  const [startNum, setStartNum] = useState(1)
  const [copySuccess, setCopySuccess] = useState(false)

  const addLineNumbers = (text: string, numMode: NumberMode, start: number) => {
    if (!text) {
      setOutput('')
      return
    }

    const lines = text.split('\n')
    const maxDigits = (start + lines.length - 1).toString().length

    const numberedLines = lines.map((line, index) => {
      const num = start + index
      const paddedNum = num.toString().padStart(maxDigits, ' ')

      switch (numMode) {
        case 'standard':
          return `${paddedNum}  ${line}`
        case 'zero':
          return `${paddedNum}| ${line}`
        case 'dot':
          return `${num}. ${line}`
        case 'paren':
          return `(${num}) ${line}`
        default:
          return `${paddedNum}  ${line}`
      }
    })

    setOutput(numberedLines.join('\n'))
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    setCopySuccess(false)
    addLineNumbers(value, mode, startNum)
  }

  const handleModeChange = (newMode: NumberMode) => {
    setMode(newMode)
    addLineNumbers(input, newMode, startNum)
  }

  const handleStartNumChange = (value: number) => {
    setStartNum(value)
    addLineNumbers(input, mode, value)
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

  const modeOptions: { value: NumberMode; label: string; example: string }[] = [
    { value: 'standard', label: '標準', example: '1  テキスト' },
    { value: 'zero', label: 'パイプ', example: '1| テキスト' },
    { value: 'dot', label: 'ドット', example: '1. テキスト' },
    { value: 'paren', label: 'カッコ', example: '(1) テキスト' },
  ]

  return (
    <>
      <SEO path="/text/line-number" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="行番号追加" toolPath="/text/line-number" shareTitle="行番号追加 | Rakit" />

        {/* 開始番号 */}
        <div className="flex items-center gap-4 mb-4 justify-center">
          <label className="text-sm font-medium text-gray-700">開始番号:</label>
          <input
            type="number"
            value={startNum}
            onChange={(e) => handleStartNumChange(parseInt(e.target.value) || 1)}
            min="0"
            className="w-20 p-2 border border-gray-200 rounded-md text-center"
          />
        </div>

        {/* モード選択 */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {modeOptions.map(({ value, label }) => (
            <Button
              key={value}
              variant={mode === value ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleModeChange(value)}
            >
              {label}
            </Button>
          ))}
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
              placeholder="行番号を追加したいテキストを入力"
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
            <li>• <strong>標準</strong>: 行番号の後にスペース2つ</li>
            <li>• <strong>パイプ</strong>: 行番号| テキスト</li>
            <li>• <strong>ドット</strong>: 行番号. テキスト</li>
            <li>• <strong>カッコ</strong>: (行番号) テキスト</li>
            <li>• 開始番号を変更できます</li>
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

export default LineNumberAdder
