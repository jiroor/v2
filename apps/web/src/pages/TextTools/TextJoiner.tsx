import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function TextJoiner() {
  useToolUsageTracking('/text/join', 'テキスト結合')
  const [input, setInput] = useState('')
  const [delimiter, setDelimiter] = useState(', ')
  const [customDelimiter, setCustomDelimiter] = useState('')
  const [output, setOutput] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)

  const joinText = (text: string, delim: string) => {
    if (!text.trim()) {
      setOutput('')
      return
    }

    const lines = text.split('\n').filter(line => line.trim())
    const result = lines.join(delim)
    setOutput(result)
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    setCopySuccess(false)
    const activeDelimiter = delimiter === 'custom' ? customDelimiter : delimiter
    joinText(value, activeDelimiter)
  }

  const handleDelimiterChange = (newDelimiter: string) => {
    setDelimiter(newDelimiter)
    setCopySuccess(false)
    const activeDelimiter = newDelimiter === 'custom' ? customDelimiter : newDelimiter
    joinText(input, activeDelimiter)
  }

  const handleCustomDelimiterChange = (value: string) => {
    setCustomDelimiter(value)
    if (delimiter === 'custom') {
      joinText(input, value)
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
    { value: ', ', label: 'カンマ (,)' },
    { value: ', ', label: 'カンマ+スペース (, )' },
    { value: '\t', label: 'タブ' },
    { value: ' ', label: 'スペース' },
    { value: '|', label: 'パイプ (|)' },
    { value: ';', label: 'セミコロン (;)' },
    { value: '\n', label: '改行' },
    { value: 'custom', label: 'カスタム' },
  ]

  return (
    <>
      <SEO path="/text/join" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="テキスト結合" toolPath="/text/join" shareTitle="テキスト結合 | Rakit" />

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
              入力テキスト（1行1項目）
            </label>
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="結合したいテキストを入力（1行ずつ）"
              className="w-full h-48 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>

          {/* 出力 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              結合結果
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
            <li>• 1行ずつのテキストを指定した区切り文字で結合</li>
            <li>• CSV作成、SQLのIN句作成などに便利</li>
            <li>• カンマ、タブ、スペースなどから選択</li>
            <li>• カスタム区切り文字も指定可能</li>
          </ul>
        </div>

        <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            テキスト結合ツールは、複数行のテキストを指定した区切り文字で1行に結合する無料のオンラインツールです。CSV作成やSQLのIN句作成など、様々なテキスト処理に役立ちます。カンマ、タブ、スペースなど、7種類以上の区切り文字に対応しています。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 7種類以上の区切り文字</li>
            <li>• カスタム区切り文字を指定可能</li>
            <li>• リアルタイムで結合結果を表示</li>
            <li>• 完全無料、インストール不要</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. どのような用途で使えますか？</p>
              <p>A. CSV作成、SQLのIN句作成、タグの結合など、様々な用途で活用できます。</p>
            </div>
            <div>
              <p className="font-medium">Q. 空行はどうなりますか？</p>
              <p>A. 空行も結合されます。事前に削除したい場合は「空行削除」ツールをご利用ください。</p>
            </div>
          </div>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner slot="TOOL_BOTTOM" format="rectangle" />
      </div>
    </>
  )
}

export default TextJoiner
