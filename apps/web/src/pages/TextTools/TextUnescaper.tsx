import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

type UnescapeMode = 'html' | 'url' | 'json' | 'base64'

function TextUnescaper() {
  useToolUsageTracking('/text/unescape', 'テキストアンエスケープ')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<UnescapeMode>('html')

  const unescapeText = (text: string, unescapeMode: UnescapeMode) => {
    if (!text) {
      setOutput('')
      return
    }

    let result = text

    try {
      switch (unescapeMode) {
        case 'html':
          const textarea = document.createElement('textarea')
          textarea.innerHTML = text
          result = textarea.value
          break
        case 'url':
          result = decodeURIComponent(text)
          break
        case 'json':
          result = JSON.parse(text)
          break
        case 'base64':
          result = decodeURIComponent(escape(atob(text)))
          break
      }
    } catch (e) {
      result = 'デコードエラー: ' + (e as Error).message
    }

    setOutput(result)
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    unescapeText(value, mode)
  }

  const handleModeChange = (newMode: UnescapeMode) => {
    setMode(newMode)
    unescapeText(input, newMode)
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

  const modeOptions: { value: UnescapeMode; label: string }[] = [
    { value: 'html', label: 'HTML' },
    { value: 'url', label: 'URL' },
    { value: 'json', label: 'JSON' },
    { value: 'base64', label: 'Base64' },
  ]

  return (
    <>
      <SEO path="/text/unescape" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="テキストアンエスケープ" toolPath="/text/unescape" shareTitle="テキストアンエスケープ | Rakit" />

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
              エスケープされたテキスト
            </label>
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="アンエスケープしたいテキストを入力"
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
            <li>• <strong>HTML</strong>: HTMLエンティティを元の文字に変換</li>
            <li>• <strong>URL</strong>: URLデコード</li>
            <li>• <strong>JSON</strong>: JSON文字列をデコード</li>
            <li>• <strong>Base64</strong>: Base64デコード</li>
          </ul>
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            テキストアンエスケープツールは、エスケープされたテキストを元の形式に復元する無料のオンラインツールです。HTML、URL、JSON、Base64の4種類に対応しています。エスケープツールの逆の操作を行います。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 4種類のアンエスケープ形式に対応</li>
            <li>• リアルタイムで結果を表示</li>
            <li>• 開発やデータ処理に便利</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. アンエスケープとは何ですか？</p>
              <p>A. エスケープされた文字列を元の形式に戻すことです。</p>
            </div>
            <div>
              <p className="font-medium">Q. 間違った形式を選ぶとどうなりますか？</p>
              <p>A. 正しく復元されない場合があります。元のエスケープ形式を選択してください。</p>
            </div>
          </div>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner slot="tools-rectangle" format="rectangle" />
      </div>
    </>
  )
}

export default TextUnescaper
