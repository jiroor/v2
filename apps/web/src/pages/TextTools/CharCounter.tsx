import { useState, useMemo } from 'react'
import { countText } from '../../utils/textUtils'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function CharCounter() {
  useToolUsageTracking('/text/counter', '文字数カウンター')
  const [text, setText] = useState('')

  const stats = useMemo(() => countText(text), [text])

  const handleClear = () => {
    setText('')
  }

  // キーボードショートカットの設定
  const shortcuts = [
    {
      key: 'k',
      description: 'クリア',
      action: handleClear,
      meta: true,
      disabled: text.length === 0,
    },
  ]

  useKeyboardShortcut(shortcuts)

  return (
    <>
      <SEO path="/text/counter" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
      <ToolHeader title="文字数カウンター" toolPath="/text/counter" shareTitle="文字数カウンター | Rakit" />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 mb-6 md:grid-cols-2">
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-center">
          <div className="text-[32px] font-semibold text-[#d97706] mb-2 tabular-nums md:text-2xl">{stats.chars.toLocaleString()}</div>
          <div className="text-sm text-gray-600">文字数</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-center">
          <div className="text-[32px] font-semibold text-[#d97706] mb-2 tabular-nums md:text-2xl">{stats.charsNoSpaces.toLocaleString()}</div>
          <div className="text-sm text-gray-600">文字数（スペース除く）</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-center">
          <div className="text-[32px] font-semibold text-[#d97706] mb-2 tabular-nums md:text-2xl">{stats.words.toLocaleString()}</div>
          <div className="text-sm text-gray-600">単語数</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-center">
          <div className="text-[32px] font-semibold text-[#d97706] mb-2 tabular-nums md:text-2xl">{stats.lines.toLocaleString()}</div>
          <div className="text-sm text-gray-600">行数</div>
        </div>
      </div>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="ここにテキストを入力してください..."
        className="w-full min-h-[300px] md:min-h-[200px]"
      />

      <div className="flex justify-end mt-4">
        <Button onClick={handleClear} variant="secondary">
          クリア
        </Button>
      </div>

      {/* ショートカットキー一覧 */}
      <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />

      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner format="rectangle" />
      </div>
      </div>
    </>
  )
}

export default CharCounter
