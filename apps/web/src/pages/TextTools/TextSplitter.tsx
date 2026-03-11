import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function TextSplitter() {
  useToolUsageTracking('/text/split', 'テキスト分割')
  const [input, setInput] = useState('')
  const [delimiter, setDelimiter] = useState(',')
  const [customDelimiter, setCustomDelimiter] = useState('')
  const [output, setOutput] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)

  const splitText = (text: string, delim: string) => {
    if (!text.trim()) {
      setOutput('')
      return
    }

    const parts = text.split(delim)
    const result = parts.map(p => p.trim()).filter(p => p).join('\n')
    setOutput(result)
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    setCopySuccess(false)
    const activeDelimiter = delimiter === 'custom' ? customDelimiter : delimiter
    splitText(value, activeDelimiter)
  }

  const handleDelimiterChange = (newDelimiter: string) => {
    setDelimiter(newDelimiter)
    setCopySuccess(false)
    const activeDelimiter = newDelimiter === 'custom' ? customDelimiter : newDelimiter
    splitText(input, activeDelimiter)
  }

  const handleCustomDelimiterChange = (value: string) => {
    setCustomDelimiter(value)
    if (delimiter === 'custom') {
      splitText(input, value)
    }
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

  const delimiterOptions = [
    { value: ',', label: 'カンマ (,)' },
    { value: '\t', label: 'タブ' },
    { value: ' ', label: 'スペース' },
    { value: '|', label: 'パイプ (|)' },
    { value: ';', label: 'セミコロン (;)' },
    { value: '\n', label: '改行' },
    { value: 'custom', label: 'カスタム' },
  ]

  return (
    <>
      <SEO path="/text/split" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="テキスト分割" toolPath="/text/split" shareTitle="テキスト分割 | Rakit" />

        {/* 区切り文字選択 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            区切り文字
          </label>
          <div className="flex flex-wrap gap-2">
            {delimiterOptions.map(({ value, label }) => (
              <Button
                key={value}
                variant={delimiter === value ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleDelimiterChange(value)}
              >
                {label}
              </Button>
            ))}
          </div>
          {delimiter === 'custom' && (
            <input
              type="text"
              value={customDelimiter}
              onChange={(e) => handleCustomDelimiterChange(e.target.value)}
              placeholder="カスタム区切り文字を入力"
              className="mt-2 w-full p-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          )}
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
              placeholder="分割したいテキストを入力"
              className="w-full h-48 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>

          {/* 出力 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              分割結果（1行1項目）
            </label>
            <textarea
              value={output}
              readOnly
              className="w-full h-48 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y bg-gray-50"
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
            <li>• テキストを指定した区切り文字で分割</li>
            <li>• CSVやデータの展開に便利</li>
            <li>• 空白は自動的に削除されます</li>
            <li>• カスタム区切り文字も指定可能</li>
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

export default TextSplitter
