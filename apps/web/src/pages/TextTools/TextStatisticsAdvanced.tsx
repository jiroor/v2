import { useState, useEffect } from 'react'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'

interface TextStats {
  chars: number
  charsNoSpaces: number
  words: number
  lines: number
  paragraphs: number
  sentences: number
  avgWordLength: number
  avgSentenceLength: number
  readingTime: number
  speakingTime: number
}

function TextStatisticsAdvanced() {
  useToolUsageTracking('/text/stats', 'テキスト統計（詳細）')
  const [input, setInput] = useState('')
  const [stats, setStats] = useState<TextStats | null>(null)

  const calculateStats = (text: string): TextStats => {
    const chars = text.length
    const charsNoSpaces = text.replace(/\s/g, '').length
    const lines = text.split('\n').filter(l => l.trim()).length
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length
    
    // 日本語と英語を考慮した単語カウント
    const japaneseWords = (text.match(/[ぁ-んァ-ヶ一-龥]+/g) || []).length
    const englishWords = (text.match(/[a-zA-Z]+/g) || []).length
    const words = japaneseWords + englishWords
    
    // 文の数（日本語と英語）
    const sentences = (text.match(/[。！？.!?]+/g) || []).length || 1
    
    const avgWordLength = words > 0 ? Math.round(charsNoSpaces / words * 10) / 10 : 0
    const avgSentenceLength = sentences > 0 ? Math.round(chars / sentences * 10) / 10 : 0
    
    // 読書時間（日本語: 400文字/分、英語: 200単語/分）
    const readingTime = Math.max(1, Math.ceil(charsNoSpaces / 400))
    
    // スピーチ時間（日本語: 300文字/分）
    const speakingTime = Math.max(1, Math.ceil(charsNoSpaces / 300))

    return {
      chars,
      charsNoSpaces,
      words,
      lines,
      paragraphs,
      sentences,
      avgWordLength,
      avgSentenceLength,
      readingTime,
      speakingTime,
    }
  }

  useEffect(() => {
    if (input) {
      setStats(calculateStats(input))
    } else {
      setStats(null)
    }
  }, [input])

  return (
    <>
      <SEO path="/text/stats" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="テキスト統計（詳細）" toolPath="/text/stats" shareTitle="テキスト統計（詳細） | Rakit" />

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            入力テキスト
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="統計を取りたいテキストを入力"
            className="w-full h-48 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {stats && (
          <div className="space-y-4">
            {/* 基本統計 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.chars.toLocaleString()}</div>
                <div className="text-sm text-gray-600">文字数</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{stats.charsNoSpaces.toLocaleString()}</div>
                <div className="text-sm text-gray-600">文字数（空白除く）</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.words.toLocaleString()}</div>
                <div className="text-sm text-gray-600">単語数</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600">{stats.lines}</div>
                <div className="text-sm text-gray-600">行数</div>
              </div>
            </div>

            {/* 構造統計 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <div className="text-xl font-bold text-gray-700">{stats.paragraphs}</div>
                <div className="text-sm text-gray-600">段落</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <div className="text-xl font-bold text-gray-700">{stats.sentences}</div>
                <div className="text-sm text-gray-600">文</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <div className="text-xl font-bold text-gray-700">{stats.avgWordLength}</div>
                <div className="text-sm text-gray-600">平均単語長</div>
              </div>
            </div>

            {/* 時間推定 */}
            <div className="p-4 bg-[#fef3c7] rounded-lg">
              <h3 className="font-semibold mb-3">時間推定</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📖</span>
                  <div>
                    <div className="font-bold">{stats.readingTime}分</div>
                    <div className="text-sm text-gray-600">読書時間</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎤</span>
                  <div>
                    <div className="font-bold">{stats.speakingTime}分</div>
                    <div className="text-sm text-gray-600">スピーチ時間</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• テキストを入力すると詳細な統計を表示</li>
            <li>• 日本語と英語の両方に対応</li>
            <li>• 文字数、単語数、行数、段落、文数をカウント</li>
            <li>• 読書時間とスピーチ時間を推定</li>
          </ul>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner slot="tools-rectangle" format="rectangle" />
      </div>
    </>
  )
}

export default TextStatisticsAdvanced
