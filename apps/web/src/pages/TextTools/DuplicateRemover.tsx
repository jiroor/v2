import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'
import { RelatedTools } from '@/components/RelatedTools/RelatedTools'

type Mode = 'lines' | 'words' | 'characters'

function DuplicateRemover() {
  useToolUsageTracking('/text/duplicate', '重複削除')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<Mode>('lines')
  const [copySuccess, setCopySuccess] = useState(false)
  const [stats, setStats] = useState({ original: 0, result: 0, removed: 0 })

  const removeDuplicates = (text: string, removeMode: Mode) => {
    if (!text.trim()) {
      setOutput('')
      setStats({ original: 0, result: 0, removed: 0 })
      return
    }

    let result: string
    let originalCount: number
    let resultCount: number

    switch (removeMode) {
      case 'lines':
        const lines = text.split('\n')
        originalCount = lines.length
        const uniqueLines = [...new Set(lines)]
        resultCount = uniqueLines.length
        result = uniqueLines.join('\n')
        break

      case 'words':
        const words = text.split(/\s+/).filter(w => w.length > 0)
        originalCount = words.length
        const uniqueWords = [...new Set(words)]
        resultCount = uniqueWords.length
        result = uniqueWords.join(' ')
        break

      case 'characters':
        const chars = text.split('')
        originalCount = chars.length
        const uniqueChars = [...new Set(chars)]
        resultCount = uniqueChars.length
        result = uniqueChars.join('')
        break
    }

    setOutput(result)
    setStats({
      original: originalCount,
      result: resultCount,
      removed: originalCount - resultCount,
    })
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    setCopySuccess(false)
    removeDuplicates(value, mode)
  }

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode)
    removeDuplicates(input, newMode)
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

  const handleClear = () => {
    setInput('')
    setOutput('')
    setStats({ original: 0, result: 0, removed: 0 })
    setCopySuccess(false)
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

  return (
    <>
      <SEO
        path="/text/duplicate"
        title="重複削除"
        description="無料のオンライン重複削除ツール。テキスト内の重複する行・単語・文字を削除。データクリーニングやリスト整理に便利。"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="重複削除" toolPath="/text/duplicate" shareTitle="重複削除 | Rakit" />

        {/* モード選択 */}
        <div className="flex gap-2 mb-6 justify-center">
          <Button
            variant={mode === 'lines' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleModeChange('lines')}
          >
            行単位
          </Button>
          <Button
            variant={mode === 'words' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleModeChange('words')}
          >
            単語単位
          </Button>
          <Button
            variant={mode === 'characters' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleModeChange('characters')}
          >
            文字単位
          </Button>
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
              placeholder="重複を削除したいテキストを入力"
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

        {/* 統計 */}
        {input && (
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <span className="text-gray-600">
              元: <strong>{stats.original}</strong>
            </span>
            <span className="text-gray-600">
              結果: <strong className="text-[#d97706]">{stats.result}</strong>
            </span>
            <span className="text-gray-600">
              削除: <strong className="text-red-500">{stats.removed}</strong>
            </span>
          </div>
        )}

        {/* アクションボタン */}
        <div className="flex gap-2 mt-4 justify-center">
          <Button onClick={handleCopy} disabled={!output}>
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
            <li>• <strong>行単位</strong>: 重複する行を削除（順序は維持）</li>
            <li>• <strong>単語単位</strong>: 重複する単語を削除</li>
            <li>• <strong>文字単位</strong>: 重複する文字を削除</li>
            <li>• データクリーニングやリスト整理に便利</li>
          </ul>
        </div>

        <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            重複削除ツールは、テキスト内の重複する行・単語・文字を削除する無料のオンラインツールです。データクリーニングやリスト整理、テキスト処理など、様々な場面で活用できます。元の順序を維持したまま重複を除去します。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 行・単語・文字単位で削除可能</li>
            <li>• 元の順序を維持</li>
            <li>• 削除数をリアルタイム表示</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. 大文字と小文字は区別されますか？</p>
              <p>A. はい、区別されます。「ABC」と「abc」は別のものとして扱われます。</p>
            </div>
            <div>
              <p className="font-medium">Q. 順序は変わりますか？</p>
              <p>A. いいえ、最初に出現した順序を維持します。</p>
            </div>
          </div>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        {/* 関連ツール */}
        <RelatedTools currentPath="/text/duplicate" />
        <AdBanner slot="TOOL_BOTTOM" format="rectangle" />
      </div>
    </>
  )
}

export default DuplicateRemover
