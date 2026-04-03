import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'
import { RelatedTools } from '@/components/RelatedTools/RelatedTools'

type TrimMode = 'both' | 'start' | 'end' | 'allLines'

function TextTrimmer() {
  useToolUsageTracking('/text/trim', 'テキストトリム')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<TrimMode>('both')
  const [copySuccess, setCopySuccess] = useState(false)

  const trimText = (text: string, trimMode: TrimMode) => {
    if (!text) {
      setOutput('')
      return
    }

    let result = text

    switch (trimMode) {
      case 'both':
        result = text.trim()
        break
      case 'start':
        result = text.trimStart()
        break
      case 'end':
        result = text.trimEnd()
        break
      case 'allLines':
        result = text.split('\n').map(line => line.trim()).join('\n')
        break
    }

    setOutput(result)
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    setCopySuccess(false)
    trimText(value, mode)
  }

  const handleModeChange = (newMode: TrimMode) => {
    setMode(newMode)
    trimText(input, newMode)
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

  const modeOptions: { value: TrimMode; label: string; description: string }[] = [
    { value: 'both', label: '前後の空白削除', description: 'テキスト全体の前後の空白を削除' },
    { value: 'start', label: '先頭の空白削除', description: 'テキストの先頭の空白を削除' },
    { value: 'end', label: '末尾の空白削除', description: 'テキストの末尾の空白を削除' },
    { value: 'allLines', label: '各行をトリム', description: 'すべての行の前後の空白を削除' },
  ]

  return (
    <>
      <SEO
        path="/text/trim"
        title="テキストトリム"
        description="無料のオンラインテキストトリムツール。テキストの前後にある余分な空白や改行を削除。4種類のトリムモードを搭載。"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="テキストトリム" toolPath="/text/trim" shareTitle="テキストトリム | Rakit" />

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
              placeholder="トリムしたいテキストを入力"
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
            <li>• <strong>前後の空白削除</strong>: テキスト全体の前後の空白・改行を削除</li>
            <li>• <strong>先頭の空白削除</strong>: テキストの先頭の空白のみ削除</li>
            <li>• <strong>末尾の空白削除</strong>: テキストの末尾の空白のみ削除</li>
            <li>• <strong>各行をトリム</strong>: 各行ごとに前後の空白を削除</li>
          </ul>
          <p className="text-sm text-gray-500 mt-2">
            ※ スペース、タブ、改行などの空白文字を削除します
          </p>
        </div>

        <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            テキストトリムツールは、テキストの前後にある余分な空白や改行を削除する無料のオンラインツールです。コードやデータの整形、フォーム入力値の処理など、様々な場面で活用できます。4種類のトリムモードを搭載しています。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 4種類のトリムモード</li>
            <li>• スペース・タブ・改行に対応</li>
            <li>• 各行を一括トリム可能</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. 空白削除ツールとの違いは？</p>
              <p>A. トリムは前後の空白のみ削除します。空白削除は連続空白や全空白も対象です。</p>
            </div>
          </div>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        {/* 関連ツール */}
        <RelatedTools currentPath="/text/trim" />
        <AdBanner slot="tools-rectangle" format="rectangle" />
      </div>
    </>
  )
}

export default TextTrimmer
