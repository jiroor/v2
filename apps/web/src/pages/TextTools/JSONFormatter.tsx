import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ShareButton } from '@/components/Share/ShareButton'
import AdBanner from '@/components/Ads/AdBanner'

type IndentSize = 2 | 4

function JSONFormatter() {
  useToolUsageTracking('/text/json', 'JSON整形')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)
  const [indentSize, setIndentSize] = useState<IndentSize>(2)

  const formatJSON = (jsonString: string, indent: IndentSize) => {
    setError('')
    setCopySuccess(false)

    if (!jsonString.trim()) {
      setOutput('')
      return
    }

    try {
      const parsed = JSON.parse(jsonString)
      const formatted = JSON.stringify(parsed, null, indent)
      setOutput(formatted)
    } catch (e) {
      if (e instanceof SyntaxError) {
        setError('無効なJSON形式です: ' + e.message)
      } else {
        setError('JSONの解析に失敗しました')
      }
      setOutput('')
    }
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    formatJSON(value, indentSize)
  }

  const handleIndentChange = (size: IndentSize) => {
    setIndentSize(size)
    if (input.trim()) {
      formatJSON(input, size)
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

  const handleMinify = () => {
    if (!input.trim()) return

    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError('')
    } catch (e) {
      if (e instanceof SyntaxError) {
        setError('無効なJSON形式です: ' + e.message)
      } else {
        setError('JSONの解析に失敗しました')
      }
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError('')
    setCopySuccess(false)
  }

  // キーボードショートカットの設定
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
      <SEO path="/text/json" />
      <div className="max-w-[1000px] mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">JSON整形・フォーマット</h2>
          <ShareButton title="JSON整形・フォーマット | Rakit" variant="compact" />
        </div>

        {/* オプション */}
        <div className="flex gap-4 mb-6 justify-center flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">インデント:</span>
            <Button
              variant={indentSize === 2 ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleIndentChange(2)}
            >
              2スペース
            </Button>
            <Button
              variant={indentSize === 4 ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleIndentChange(4)}
            >
              4スペース
            </Button>
          </div>
          <Button onClick={handleMinify} variant="outline" disabled={!input}>
            圧縮（Minify）
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 入力 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              入力JSON
            </label>
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="JSONを貼り付けてください"
              className="w-full h-96 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706] focus:border-transparent"
            />
          </div>

          {/* 出力 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              整形結果
            </label>
            <div className={`w-full h-96 p-4 border rounded-md font-mono text-sm bg-gray-50 overflow-auto ${error ? 'border-red-300' : 'border-gray-200'}`}>
              {error ? (
                <span className="text-red-500">{error}</span>
              ) : output ? (
                <pre className="whitespace-pre-wrap break-all text-gray-900">{output}</pre>
              ) : (
                <span className="text-gray-400 italic">整形結果がここに表示されます</span>
              )}
            </div>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex gap-2 mt-4 justify-center">
          <Button onClick={handleCopy} disabled={!output || !!error}>
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
            <li>• JSONを貼り付けると自動で整形されます</li>
            <li>• インデントサイズを2または4スペースから選択可能</li>
            <li>• <strong>圧縮（Minify）</strong>: 余分な空白や改行を削除</li>
            <li>• JSONの構文チェックにも使用できます</li>
          </ul>
        </div>

        {/* 広告 */}
        <div className="mt-6">
          <AdBanner slot="TOOL_BOTTOM" format="horizontal" />
        </div>

        {/* ショートカットキー一覧 */}
        <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />
      </div>
    </>
  )
}

export default JSONFormatter
