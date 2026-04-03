import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'
import { RelatedTools } from '@/components/RelatedTools/RelatedTools'

type IndentMode = 'add2' | 'add4' | 'remove' | 'tabToSpace' | 'spaceToTab'

function TextIndentFormatter() {
  useToolUsageTracking('/text/indent', 'テキストインデント整形')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<IndentMode>('add4')
  const [copySuccess, setCopySuccess] = useState(false)

  const formatIndent = (text: string, indentMode: IndentMode) => {
    if (!text) {
      setOutput('')
      return
    }

    const lines = text.split('\n')
    let result: string[]

    switch (indentMode) {
      case 'add2':
        result = lines.map(line => line ? '  ' + line : line)
        break
      case 'add4':
        result = lines.map(line => line ? '    ' + line : line)
        break
      case 'remove':
        result = lines.map(line => line.replace(/^[ \t]+/, ''))
        break
      case 'tabToSpace':
        result = lines.map(line => line.replace(/\t/g, '    '))
        break
      case 'spaceToTab':
        result = lines.map(line => line.replace(/    /g, '\t'))
        break
      default:
        result = lines
    }

    setOutput(result.join('\n'))
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    setCopySuccess(false)
    formatIndent(value, mode)
  }

  const handleModeChange = (newMode: IndentMode) => {
    setMode(newMode)
    formatIndent(input, newMode)
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

  const modeOptions: { value: IndentMode; label: string; description: string }[] = [
    { value: 'add2', label: 'スペース2追加', description: '各行の先頭にスペース2つ追加' },
    { value: 'add4', label: 'スペース4追加', description: '各行の先頭にスペース4つ追加' },
    { value: 'remove', label: 'インデント削除', description: '各行の先頭の空白・タブを削除' },
    { value: 'tabToSpace', label: 'タブ→スペース', description: 'タブをスペース4つに変換' },
    { value: 'spaceToTab', label: 'スペース→タブ', description: 'スペース4つをタブに変換' },
  ]

  return (
    <>
      <SEO
        path="/text/indent"
        title="テキストインデント整形"
        description="無料のオンラインテキストインデント整形ツール。テキストのインデントを調整。スペースの追加・削除、タブとスペースの相互変換に対応。"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="テキストインデント整形" toolPath="/text/indent" shareTitle="テキストインデント整形 | Rakit" />

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
              placeholder="整形したいテキストを入力"
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
            <li>• <strong>スペース追加</strong>: 各行の先頭にスペースを追加</li>
            <li>• <strong>インデント削除</strong>: 先頭の空白・タブを全て削除</li>
            <li>• <strong>タブ→スペース</strong>: タブ文字をスペース4つに変換</li>
            <li>• <strong>スペース→タブ</strong>: スペース4つをタブに変換</li>
          </ul>
          <p className="text-sm text-gray-500 mt-2">
            ※ コードのインデント調整や、テキストの整形に便利
          </p>
        </div>

        <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            テキストインデント整形ツールは、テキストのインデントを調整する無料のオンラインツールです。スペースの追加・削除、タブとスペースの相互変換など、コードのインデント調整に役立ちます。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 5種類のインデント操作</li>
            <li>• タブとスペースの相互変換</li>
            <li>• リアルタイムで結果を表示</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. タブは何文字に変換されますか？</p>
              <p>A. スペース4文字に変換されます。</p>
            </div>
            <div>
              <p className="font-medium">Q. インデント削除はどこまで削除されますか？</p>
              <p>A. 各行の先頭にある全てのスペースとタブが削除されます。</p>
            </div>
          </div>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        {/* 関連ツール */}
        <RelatedTools currentPath="/text/indent" />
        <AdBanner slot="tools-rectangle" format="rectangle" />
      </div>
    </>
  )
}

export default TextIndentFormatter
