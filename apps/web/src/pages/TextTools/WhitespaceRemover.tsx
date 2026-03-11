import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

type RemoveMode = 'leading' | 'trailing' | 'both' | 'multiple' | 'all'

function WhitespaceRemover() {
  useToolUsageTracking('/text/whitespace', '空白削除')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<RemoveMode>('both')
  const [copySuccess, setCopySuccess] = useState(false)

  const removeWhitespace = (text: string, removeMode: RemoveMode) => {
    if (!text) {
      setOutput('')
      return
    }

    let result = text

    switch (removeMode) {
      case 'leading':
        result = text.replace(/^ +/gm, '')
        break
      case 'trailing':
        result = text.replace(/ +$/gm, '')
        break
      case 'both':
        result = text.replace(/(^ +| +$)/gm, '')
        break
      case 'multiple':
        result = text.replace(/  +/g, ' ')
        break
      case 'all':
        result = text.replace(/\s+/g, '')
        break
    }

    setOutput(result)
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    setCopySuccess(false)
    removeWhitespace(value, mode)
  }

  const handleModeChange = (newMode: RemoveMode) => {
    setMode(newMode)
    removeWhitespace(input, newMode)
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

  const modeOptions: { value: RemoveMode; label: string; description: string }[] = [
    { value: 'leading', label: '先頭の空白', description: '行の先頭にある空白を削除' },
    { value: 'trailing', label: '末尾の空白', description: '行の末尾にある空白を削除' },
    { value: 'both', label: '先頭と末尾', description: '行の先頭と末尾の空白を削除' },
    { value: 'multiple', label: '連続空白', description: '連続する空白を1つに' },
    { value: 'all', label: '全ての空白', description: '全ての空白・改行を削除' },
  ]

  return (
    <>
      <SEO path="/text/whitespace" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="空白削除" toolPath="/text/whitespace" shareTitle="空白削除 | Rakit" />

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
              placeholder="空白を削除したいテキストを入力"
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
            {modeOptions.map(({ label, description }) => (
              <li key={label}>• <strong>{label}</strong>: {description}</li>
            ))}
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

export default WhitespaceRemover
