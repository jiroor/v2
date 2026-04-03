import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

type SortMode = 'asc' | 'desc' | 'length' | 'random' | 'natural'

function TextSorterAdvanced() {
  useToolUsageTracking('/text/sort-adv', 'テキストソート（詳細）')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<SortMode>('asc')

  const sortText = (text: string, sortMode: SortMode) => {
    if (!text) {
      setOutput('')
      return
    }

    let lines = text.split('\n').filter(line => line.trim())

    switch (sortMode) {
      case 'asc':
        lines = lines.sort((a, b) => a.localeCompare(b, 'ja'))
        break
      case 'desc':
        lines = lines.sort((a, b) => b.localeCompare(a, 'ja'))
        break
      case 'length':
        lines = lines.sort((a, b) => a.length - b.length)
        break
      case 'random':
        for (let i = lines.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [lines[i], lines[j]] = [lines[j], lines[i]]
        }
        break
      case 'natural':
        lines = lines.sort((a, b) => {
          const aMatch = a.match(/\d+/g)
          const bMatch = b.match(/\d+/g)
          if (aMatch && bMatch) {
            const aNum = parseInt(aMatch[0])
            const bNum = parseInt(bMatch[0])
            if (aNum !== bNum) return aNum - bNum
          }
          return a.localeCompare(b, 'ja')
        })
        break
    }

    setOutput(lines.join('\n'))
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    sortText(value, mode)
  }

  const handleModeChange = (newMode: SortMode) => {
    setMode(newMode)
    sortText(input, newMode)
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

  const modeOptions: { value: SortMode; label: string }[] = [
    { value: 'asc', label: '昇順（A-Z）' },
    { value: 'desc', label: '降順（Z-A）' },
    { value: 'length', label: '文字数順' },
    { value: 'natural', label: '自然順' },
    { value: 'random', label: 'ランダム' },
  ]

  return (
    <>
      <SEO
        path="/text/sort-adv"
        title="テキストソート（詳細）"
        description="無料のオンラインテキストソートツール。複数行のテキストを様々な条件で並び替え。辞書順、文字数順、自然順、ランダムに対応。"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="テキストソート（詳細）" toolPath="/text/sort-adv" shareTitle="テキストソート（詳細） | Rakit" />

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
              入力テキスト（1行ずつ）
            </label>
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="ソートしたいテキストを入力（1行ずつ）"
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
            <li>• 複数行のテキストを指定した順序でソート</li>
            <li>• 昇順・降順・文字数順・自然順・ランダムに対応</li>
            <li>• 日本語のソートも正しく処理</li>
            <li>• リストの並び替えに便利</li>
          </ul>
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            テキストソート（詳細版）は、複数行のテキストを様々な条件で並び替える無料のオンラインツールです。辞書順、文字数順、自然順、ランダムなど5種類のソートに対応しています。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 5種類のソートモード</li>
            <li>• 自然順ソート（file1, file2, file10）</li>
            <li>• 日本語の辞書順に対応</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. 自然順とは何ですか？</p>
              <p>A. 数字を数値として扱う並び順です。「file10」が「file2」より後に来ます。</p>
            </div>
            <div>
              <p className="font-medium">Q. 大文字小文字は区別されますか？</p>
              <p>A. デフォルトでは区別しません。</p>
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

export default TextSorterAdvanced
