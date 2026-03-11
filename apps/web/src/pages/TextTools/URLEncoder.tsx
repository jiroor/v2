import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

type Mode = 'encode' | 'decode'

function URLEncoder() {
  useToolUsageTracking('/text/url', 'URLエンコード')
  const [mode, setMode] = useState<Mode>('encode')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)

  const handleInputChange = (value: string) => {
    setInput(value)
    setError('')
    setCopySuccess(false)

    if (!value.trim()) {
      setOutput('')
      return
    }

    try {
      if (mode === 'encode') {
        const encoded = encodeURIComponent(value)
        setOutput(encoded)
      } else {
        const decoded = decodeURIComponent(value)
        setOutput(decoded)
      }
    } catch (e) {
      setError(mode === 'decode' ? '無効なURLエンコード文字列です' : 'エンコードに失敗しました')
      setOutput('')
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

  const handleSwap = () => {
    if (!output) return
    setInput(output)
    setOutput('')
    setMode(mode === 'encode' ? 'decode' : 'encode')
    setError('')
    setCopySuccess(false)
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
    {
      key: 's',
      description: '入力と出力を入れ替え',
      action: handleSwap,
      meta: true,
      disabled: !output,
    },
  ]

  useKeyboardShortcut(shortcuts)

  return (
    <>
      <SEO path="/text/url" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="URLエンコード/デコード" toolPath="/text/url" shareTitle="URLエンコード/デコード | Rakit" />

        {/* モード切替 */}
        <div className="flex gap-2 mb-6 justify-center">
          <Button
            variant={mode === 'encode' ? 'default' : 'outline'}
            onClick={() => {
              setMode('encode')
              setInput('')
              setOutput('')
              setError('')
            }}
          >
            エンコード
          </Button>
          <Button
            variant={mode === 'decode' ? 'default' : 'outline'}
            onClick={() => {
              setMode('decode')
              setInput('')
              setOutput('')
              setError('')
            }}
          >
            デコード
          </Button>
        </div>

        {/* 入力 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {mode === 'encode' ? '元のテキスト' : 'URLエンコード文字列'}
          </label>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={mode === 'encode' ? 'エンコードしたいテキストを入力' : 'デコードしたいURLエンコード文字列を入力'}
            className="w-full h-40 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706] focus:border-transparent"
          />
        </div>

        {/* アクションボタン */}
        <div className="flex gap-2 mb-4">
          <Button onClick={handleSwap} disabled={!output} variant="outline">
            入力と出力を入れ替え
          </Button>
          <Button onClick={handleClear} variant="outline">
            クリア
          </Button>
        </div>

        {/* 出力 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {mode === 'encode' ? 'URLエンコード文字列' : 'デコード結果'}
          </label>
          <div className={`w-full h-40 p-4 border rounded-md font-mono text-sm bg-gray-50 overflow-auto ${error ? 'border-red-300' : 'border-gray-200'}`}>
            {error ? (
              <span className="text-red-500">{error}</span>
            ) : output ? (
              <span className="break-all">{output}</span>
            ) : (
              <span className="text-gray-400 italic">結果がここに表示されます</span>
            )}
          </div>
        </div>

        {/* コピーボタン */}
        <Button onClick={handleCopy} disabled={!output || !!error}>
          {copySuccess ? 'コピーしました！' : 'コピー'}
        </Button>

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• <strong>エンコード</strong>: テキストをURL安全な形式に変換</li>
            <li>• <strong>デコード</strong>: URLエンコード文字列を元のテキストに戻す</li>
            <li>• 日本語や特殊文字をURLに含める際に使用</li>
            <li>• 入力すると自動的に変換されます</li>
          </ul>
        </div>

        {/* ショートカットキー一覧 */}
        <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />

        {/* 広告 */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <AdBanner slot="TOOL_BOTTOM" format="rectangle" />
        </div>
      </div>
    </>
  )
}

export default URLEncoder
