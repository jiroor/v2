import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

type ReverseMode = 'chars' | 'words' | 'lines'

function ReverseText() {
  useToolUsageTracking('/text/reverse', '逆順変換')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<ReverseMode>('chars')
  const [copySuccess, setCopySuccess] = useState(false)

  const reverseText = (text: string, reverseMode: ReverseMode) => {
    if (!text) {
      setOutput('')
      return
    }

    let result = text

    switch (reverseMode) {
      case 'chars':
        result = text.split('').reverse().join('')
        break
      case 'words':
        result = text.split(/\s+/).reverse().join(' ')
        break
      case 'lines':
        result = text.split('\n').reverse().join('\n')
        break
    }

    setOutput(result)
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    setCopySuccess(false)
    reverseText(value, mode)
  }

  const handleModeChange = (newMode: ReverseMode) => {
    setMode(newMode)
    reverseText(input, newMode)
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

  const modeOptions: { value: ReverseMode; label: string; description: string }[] = [
    { value: 'chars', label: '文字単位', description: '1文字ずつ逆順に' },
    { value: 'words', label: '単語単位', description: '単語ごとに逆順に' },
    { value: 'lines', label: '行単位', description: '行ごとに逆順に' },
  ]

  return (
    <>
      <SEO
        path="/text/reverse"
        title="逆順変換"
        description="無料のオンライン逆順変換ツール。テキストを逆順に並び替え。文字単位、単語単位、行単位の3種類のモードに対応。"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="逆順変換" toolPath="/text/reverse" shareTitle="逆順変換 | Rakit" />

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
              placeholder="逆順にしたいテキストを入力"
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
            <li>• <strong>文字単位</strong>: こんにちは → はちにんこ</li>
            <li>• <strong>単語単位</strong>: Hello World → World Hello</li>
            <li>• <strong>行単位</strong>: 行ごとに逆順に並び替え</li>
          </ul>
        </div>

        <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            逆順変換ツールは、テキストを逆順に並び替える無料のオンラインツールです。文字単位、単語単位、行単位の3種類のモードに対応しています。パズルや暗号、テキスト処理などに役立ちます。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 3種類の逆順モード</li>
            <li>• 日本語・英語に対応</li>
            <li>• リアルタイムで結果を表示</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. 日本語も逆順になりますか？</p>
              <p>A. はい、日本語も1文字ずつ逆順になります。</p>
            </div>
            <div>
              <p className="font-medium">Q. 単語単位の区切りは？</p>
              <p>A. スペースで区切られた単語単位で逆順になります。</p>
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

export default ReverseText
