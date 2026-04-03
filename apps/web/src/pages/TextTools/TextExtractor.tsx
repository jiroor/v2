import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function TextExtractor() {
  useToolUsageTracking('/text/extract', 'テキスト抽出')
  const [input, setInput] = useState('')
  const [pattern, setPattern] = useState('')
  const [results, setResults] = useState<string[]>([])
  const [error, setError] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)

  const extractMatches = (text: string, patternStr: string) => {
    if (!text) {
      setResults([])
      setError('')
      return
    }

    if (!patternStr) {
      setResults([])
      setError('パターンを入力してください')
      return
    }

    try {
      const regex = new RegExp(patternStr, 'g')
      const matches = text.match(regex) || []
      setResults(matches)
      setError('')
    } catch (e) {
      setError('正規表現エラー: ' + (e as Error).message)
      setResults([])
    }
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    setCopySuccess(false)
    extractMatches(value, pattern)
  }

  const handlePatternChange = (value: string) => {
    setPattern(value)
    extractMatches(input, value)
  }

  const handleCopy = async () => {
    if (results.length === 0) return

    try {
      await navigator.clipboard.writeText(results.join('\n'))
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  const presets = [
    { label: 'メールアドレス', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,}' },
    { label: 'URL', pattern: 'https?://[^\\s]+' },
    { label: '電話番号', pattern: '\\d{2,4}-\\d{2,4}-\\d{4}' },
    { label: '数字', pattern: '\\d+' },
  ]

  return (
    <>
      <SEO
        path="/text/extract"
        title="テキスト抽出"
        description="無料のオンラインテキスト抽出ツール。正規表現を使って特定のパターンにマッチする文字列を抽出。メールアドレスやURLの抽出に便利。"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="テキスト抽出" toolPath="/text/extract" shareTitle="テキスト抽出 | Rakit" />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            正規表現パターン
          </label>
          <input
            type="text"
            value={pattern}
            onChange={(e) => handlePatternChange(e.target.value)}
            placeholder="正規表現パターンを入力（例: \d+ で数字を抽出）"
            className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {/* プリセット */}
        <div className="mb-4 flex flex-wrap gap-2">
          {presets.map((preset) => (
            <Button
              key={preset.label}
              variant="outline"
              size="sm"
              onClick={() => handlePatternChange(preset.pattern)}
            >
              {preset.label}
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
              placeholder="抽出元のテキストを入力"
              className="w-full h-48 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>

          {/* 結果 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              抽出結果 ({results.length}件)
            </label>
            <div className="h-48 p-4 border border-gray-200 rounded-md bg-gray-50 overflow-y-auto">
              {error ? (
                <p className="text-red-500">{error}</p>
              ) : results.length > 0 ? (
                <ul className="space-y-1">
                  {results.map((result, index) => (
                    <li key={index} className="font-mono text-sm bg-white p-2 rounded border">
                      {result}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-center py-8">マッチなし</p>
              )}
            </div>
          </div>
        </div>

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
            <li>• 正規表現パターンにマッチする文字列を抽出</li>
            <li>• プリセットボタンでよく使うパターンを入力</li>
            <li>• <code className="bg-gray-200 px-1 rounded">\d+</code>: 数字</li>
            <li>• <code className="bg-gray-200 px-1 rounded">[a-z]+</code>: アルファベット小文字</li>
          </ul>
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            テキスト抽出ツールは、正規表現を使ってテキストから特定のパターンにマッチする文字列を抽出する無料のオンラインツールです。メールアドレス、URL、電話番号などを一括で抽出できます。データ分析やテキスト処理に役立ちます。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 正規表現で抽出</li>
            <li>• 4つのプリセット</li>
            <li>• マッチ件数を表示</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. 正規表現がわからない場合は？</p>
              <p>A. プリセットボタンをクリックすると、よく使うパターンが入力されます。</p>
            </div>
            <div>
              <p className="font-medium">Q. 大文字小文字を区別しますか？</p>
              <p>A. デフォルトでは区別します。パターンにフラグを追加で変更可能です。</p>
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

export default TextExtractor
