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
      <SEO
        path="/text/json"
        title="JSON整形・フォーマット"
        description="無料のオンラインJSON整形ツール。JSONデータを読みやすくフォーマット、または圧縮（Minify）。API開発やデータ分析に便利。"
      />
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

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            JSON整形ツールは、JSONデータを読みやすくフォーマットする無料のオンラインツールです。圧縮されたJSONを展開したり、逆にJSONを圧縮（Minify）してデータサイズを削減したりできます。API開発やデータ分析に役立ちます。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• リアルタイムでJSONを整形・フォーマット</li>
            <li>• インデントサイズを2/4スペースで切り替え</li>
            <li>• JSON圧縮（Minify）機能</li>
            <li>• 構文エラーを即座に検出</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. JSONの構文エラーが表示されます</p>
              <p>A. 括弧の閉じ忘れやカンマの過不足がないか確認してください。</p>
            </div>
            <div>
              <p className="font-medium">Q. 大きなJSONファイルも処理できますか？</p>
              <p>A. はい、数MB程度のJSONまで問題なく処理できます。</p>
            </div>
          </div>
        </div>

        {/* 広告 */}
        <div className="mt-6">
          <AdBanner slot="TOOL_BOTTOM" format="horizontal" />
        </div>

        {/* ショートカットキー一覧 */}
        <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            JSON整形ツールは、JSONデータを読みやすい形式に整形・フォーマットする無料のオンラインツールです。圧縮されたJSONの展開、インデント調整、構文チェックなど、開発者に便利な機能を提供します。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• JSONを自動で整形・インデント</li>
            <li>• 圧縮（Minify）機能でデータサイズを削減</li>
            <li>• 構文エラーをリアルタイムで検出</li>
            <li>• 完全無料、サーバーにデータを送信しません</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. JSONとは何ですか？</p>
              <p>A. JavaScript Object Notationの略で、データ交換形式の一つです。Web APIや設定ファイルで広く使われています。</p>
            </div>
            <div>
              <p className="font-medium">Q. 入力したJSONデータは保存されますか？</p>
              <p>A. いいえ、すべてブラウザ上で処理されるため、サーバーには送信・保存されません。</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JSONFormatter
