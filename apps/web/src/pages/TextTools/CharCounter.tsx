import { useState, useMemo } from 'react'
import { countText } from '../../utils/textUtils'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ShareButton } from '@/components/Share/ShareButton'
import AdBanner from '@/components/Ads/AdBanner'
import { RelatedTools } from '@/components/RelatedTools/RelatedTools'

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
      <SEO
        path="/text/counter"
        title="文字数カウンター"
        description="無料のオンライン文字カウンター。文字数、単語数、行数をリアルタイムでカウント。原稿作成やSNS投稿の文字数確認に。"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold">文字数カウンター</h2>
        <ShareButton title="文字数カウンター | Rakit" variant="compact" />
      </div>

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

      {/* 広告 */}
      <div className="mt-6">
        {/* 関連ツール */}
        <RelatedTools currentPath="/text/counter" />
        <AdBanner slot="TOOL_BOTTOM" format="horizontal" />
      </div>

      {/* ショートカットキー一覧 */}
      <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />

      {/* このツールについて */}
      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h3 className="font-semibold mb-2">このツールについて</h3>
        <p className="text-sm text-gray-600 mb-4">
          文字数カウンターは、テキストの文字数、単語数、行数をリアルタイムでカウントする無料のオンラインツールです。論文、ブログ、SNS投稿などの文字数管理に最適です。
        </p>
      </div>

      {/* 特徴 */}
      <div className="mt-4 p-4 bg-blue-50 rounded-md">
        <h3 className="font-semibold mb-2">特徴</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• リアルタイムで文字数をカウント</li>
          <li>• スペースを除いた文字数も表示</li>
          <li>• 日本語・英語の両方に対応</li>
          <li>• 完全無料、インストール不要</li>
        </ul>
      </div>

      {/* よくある質問 */}
      <div className="mt-4 p-4 bg-gray-50 rounded-md">
        <h3 className="font-semibold mb-2">よくある質問</h3>
        <div className="text-sm text-gray-600 space-y-3">
          <div>
            <p className="font-medium">Q. 日本語の文字数はどうカウントされますか？</p>
            <p>A. ひらがな、カタカナ、漢字を1文字としてカウントします。</p>
          </div>
          <div>
            <p className="font-medium">Q. 入力したテキストは保存されますか？</p>
            <p>A. いいえ、ブラウザ内で処理され、サーバーには送信されません。</p>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default CharCounter
