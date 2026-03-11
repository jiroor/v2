import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

type EscapeMode = 'html' | 'url' | 'json' | 'regex' | 'sql' | 'base64'

function TextEscaper() {
  useToolUsageTracking('/text/escape', 'テキストエスケープ')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<EscapeMode>('html')

  const escapeText = (text: string, escapeMode: EscapeMode) => {
    if (!text) {
      setOutput('')
      return
    }

    let result = text

    switch (escapeMode) {
      case 'html':
        result = text
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;')
        break
      case 'url':
        result = encodeURIComponent(text)
        break
      case 'json':
        result = JSON.stringify(text)
        break
      case 'regex':
        result = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        break
      case 'sql':
        result = text.replace(/'/g, "''")
        break
      case 'base64':
        try {
          result = btoa(unescape(encodeURIComponent(text)))
        } catch {
          result = 'エンコードエラー'
        }
        break
    }

    setOutput(result)
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    escapeText(value, mode)
  }

  const handleModeChange = (newMode: EscapeMode) => {
    setMode(newMode)
    escapeText(input, newMode)
  }

  const handleCopy = async () => {
    if (!output) return

    try {
      await navigator.clipboard.writeText(output)
      alert('コピーしました')
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  const modeOptions: { value: EscapeMode; label: string }[] = [
    { value: 'html', label: 'HTML' },
    { value: 'url', label: 'URL' },
    { value: 'json', label: 'JSON' },
    { value: 'regex', label: '正規表現' },
    { value: 'sql', label: 'SQL' },
    { value: 'base64', label: 'Base64' },
  ]

  return (
    <>
      <SEO path="/text/escape" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="テキストエスケープ" toolPath="/text/escape" shareTitle="テキストエスケープ | Rakit" />

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
              placeholder="エスケープしたいテキストを入力"
              className="w-full h-48 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706]"
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
              className="w-full h-48 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y bg-gray-50"
            />
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex gap-2 mt-4 justify-center">
          <Button onClick={handleCopy} disabled={!output}>
            コピー
          </Button>
        </div>

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• <strong>HTML</strong>: 特殊文字をHTMLエンティティに変換</li>
            <li>• <strong>URL</strong>: URLエンコード</li>
            <li>• <strong>JSON</strong>: JSON文字列形式にエスケープ</li>
            <li>• <strong>正規表現</strong>: 正規表現の特殊文字をエスケープ</li>
            <li>• <strong>SQL</strong>: シングルクォートをエスケープ</li>
            <li>• <strong>Base64</strong>: Base64エンコード</li>
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

export default TextEscaper
