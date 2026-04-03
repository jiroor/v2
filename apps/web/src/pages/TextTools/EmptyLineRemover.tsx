import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

type RemoveMode = 'empty' | 'blank' | 'multiple' | 'all'

function EmptyLineRemover() {
  useToolUsageTracking('/text/empty-lines', '空行削除')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<RemoveMode>('empty')
  const [copySuccess, setCopySuccess] = useState(false)
  const [removedCount, setRemovedCount] = useState(0)

  const removeLines = (text: string, removeMode: RemoveMode) => {
    if (!text) {
      setOutput('')
      setRemovedCount(0)
      return
    }

    const lines = text.split('\n')
    let result: string[]
    let removed = 0

    switch (removeMode) {
      case 'empty':
        // 完全に空の行のみ削除
        result = lines.filter(line => {
          if (line === '') {
            removed++
            return false
          }
          return true
        })
        break
      case 'blank':
        // 空白のみの行も削除
        result = lines.filter(line => {
          if (line.trim() === '') {
            removed++
            return false
          }
          return true
        })
        break
      case 'multiple':
        // 連続する空行を1つに
        result = lines.filter((line, index) => {
          if (line.trim() === '' && index > 0 && lines[index - 1].trim() === '') {
            removed++
            return false
          }
          return true
        })
        break
      case 'all':
        // すべての空行を削除して1行に
        result = [lines.filter(line => {
          if (line.trim() === '') {
            removed++
            return false
          }
          return true
        }).join('')]
        break
      default:
        result = lines
    }

    setOutput(result.join('\n'))
    setRemovedCount(removed)
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    setCopySuccess(false)
    removeLines(value, mode)
  }

  const handleModeChange = (newMode: RemoveMode) => {
    setMode(newMode)
    removeLines(input, newMode)
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

  const modeOptions: { value: RemoveMode; label: string; description: string }[] = [
    { value: 'empty', label: '空行のみ削除', description: '完全に空の行を削除' },
    { value: 'blank', label: '空白行も削除', description: '空白のみの行も削除' },
    { value: 'multiple', label: '連続空行を1つに', description: '空行を1行だけ残す' },
    { value: 'all', label: '全ての空行削除', description: '空行を削除して1行に結合' },
  ]

  return (
    <>
      <SEO
        path="/text/empty-lines"
        title="空行削除"
        description="無料のオンライン空行削除ツール。テキスト内の余分な空行を削除。コードやテキストの整形、ログファイルの処理に便利。"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="空行削除" toolPath="/text/empty-lines" shareTitle="空行削除 | Rakit" />

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
              placeholder="空行を削除したいテキストを入力"
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
        {removedCount > 0 && (
          <div className="mt-4 text-center text-sm text-gray-600">
            <span className="font-medium text-[#d97706]">{removedCount}行</span> 削除しました
          </div>
        )}

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
            <li>• <strong>空行のみ削除</strong>: 完全に空の行（改行のみ）を削除</li>
            <li>• <strong>空白行も削除</strong>: スペースやタブのみの行も削除</li>
            <li>• <strong>連続空行を1つに</strong>: 複数の空行を1つにまとめる</li>
            <li>• <strong>全ての空行削除</strong>: 空行を削除してテキストを1行に結合</li>
          </ul>
        </div>

        <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            空行削除ツールは、テキスト内の余分な空行を削除する無料のオンラインツールです。コードやテキストの整形、ログファイルの処理などに役立ちます。4種類の削除モードを搭載しています。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 4種類の削除モード</li>
            <li>• 削除行数をリアルタイム表示</li>
            <li>• 連続空行の処理に対応</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. 空白行と空行の違いは？</p>
              <p>A. 空行は改行のみの行、空白行はスペースやタブのみの行です。</p>
            </div>
            <div>
              <p className="font-medium">Q. コードの整形に使えますか？</p>
              <p>A. はい、プログラミングコードの空行調整にもご利用いただけます。</p>
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

export default EmptyLineRemover
