import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function WordCounter() {
  useToolUsageTracking('/text/word-count', '文字数カウンター')
  const [text, setText] = useState('')

  const stats = useMemo(() => {
    const charCount = text.length
    const charCountNoSpace = text.replace(/\s/g, '').length
    const lineCount = text.split('\n').length
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
    const paragraphCount = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0

    // 日本語の文字数（ひらがな・カタカナ・漢字のみ）
    const japaneseCount = (text.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g) || []).length

    // 英語の単語数
    const englishWordCount = (text.match(/[a-zA-Z]+/g) || []).length

    // 数字の数
    const numberCount = (text.match(/[0-9]+/g) || []).length

    return {
      charCount,
      charCountNoSpace,
      lineCount,
      wordCount,
      paragraphCount,
      japaneseCount,
      englishWordCount,
      numberCount,
    }
  }, [text])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      alert('コピーしました')
    } catch {
      alert('コピーに失敗しました')
    }
  }

  const handleClear = () => {
    setText('')
  }

  return (
    <>
      <SEO path="/text/word-count" />
      <div className="max-w-[600px] mx-auto py-8 px-4">
        <ToolHeader title="文字数カウンター" toolPath="/text/word-count" shareTitle="文字数カウンター | Rakit" />

        {/* テキスト入力 */}
        <div className="mb-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="テキストを入力してください..."
            className="w-full h-[200px] p-4 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706] resize-y"
          />
        </div>

        {/* ボタン */}
        <div className="flex gap-2 mb-6">
          <Button onClick={handleCopy} variant="outline" className="flex-1">
            コピー
          </Button>
          <Button onClick={handleClear} variant="destructive" className="flex-1">
            クリア
          </Button>
        </div>

        {/* 統計 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">文字数</p>
            <p className="text-2xl font-bold text-[#d97706]">{stats.charCount.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">文字数（空白除く）</p>
            <p className="text-2xl font-bold">{stats.charCountNoSpace.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">行数</p>
            <p className="text-2xl font-bold">{stats.lineCount.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">単語数</p>
            <p className="text-2xl font-bold">{stats.wordCount.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">段落</p>
            <p className="text-2xl font-bold">{stats.paragraphCount.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">日本語文字</p>
            <p className="text-2xl font-bold">{stats.japaneseCount.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">英単語</p>
            <p className="text-2xl font-bold">{stats.englishWordCount.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">数字</p>
            <p className="text-2xl font-bold">{stats.numberCount.toLocaleString()}</p>
          </div>
        </div>

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• テキストを入力するとリアルタイムで集計</li>
            <li>• 文字数、単語数、行数などを確認</li>
            <li>• 論文、ブログ、SNS投稿の文字数管理に</li>
            <li>• SEOの文字数最適化に便利</li>
          </ul>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner format="rectangle" />
      </div>
    </>
  )
}

export default WordCounter
