import { useState, useMemo } from 'react'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'
import { RelatedTools } from '@/components/RelatedTools/RelatedTools'

function TextStatistics() {
  useToolUsageTracking('/text/statistics', 'テキスト統計')
  const [text, setText] = useState('')

  const stats = useMemo(() => {
    if (!text) {
      return {
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        lines: 0,
        paragraphs: 0,
        sentences: 0,
        bytes: 0,
        readingTime: 0,
        speakingTime: 0,
      }
    }

    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, '').length
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const lines = text.split('\n').length
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length
    const sentences = text.split(/[。.!?！？]+/).filter(s => s.trim()).length
    const bytes = new TextEncoder().encode(text).length
    
    // 読書時間（日本語: 400文字/分、英語: 200単語/分）
    const readingTime = Math.ceil(charactersNoSpaces / 400)
    
    // 発話時間（日本語: 300文字/分）
    const speakingTime = Math.ceil(charactersNoSpaces / 300)

    return {
      characters,
      charactersNoSpaces,
      words,
      lines,
      paragraphs,
      sentences,
      bytes,
      readingTime,
      speakingTime,
    }
  }, [text])

  const statItems = [
    { label: '文字数', value: stats.characters, description: 'スペース含む' },
    { label: '文字数（スペース除く）', value: stats.charactersNoSpaces, description: 'スペースを除く' },
    { label: '単語数', value: stats.words, description: 'スペース区切り' },
    { label: '行数', value: stats.lines, description: '改行で区切る' },
    { label: '段落数', value: stats.paragraphs, description: '空行で区切る' },
    { label: '文数', value: stats.sentences, description: '句点で区切る' },
    { label: 'バイト数', value: stats.bytes, description: 'UTF-8' },
    { label: '読書時間', value: `${stats.readingTime}分`, description: '約400文字/分' },
    { label: '発話時間', value: `${stats.speakingTime}分`, description: '約300文字/分' },
  ]

  return (
    <>
      <SEO
        path="/text/statistics"
        title="テキスト統計"
        description="無料のオンラインテキスト統計ツール。文字数、単語数、行数、読書時間、バイト数などを一括で計算。ブログ記事やドキュメントの管理に便利。"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="テキスト統計" toolPath="/text/statistics" shareTitle="テキスト統計 | Rakit" />

        {/* 入力 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            テキスト
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="分析したいテキストを入力または貼り付け"
            className="w-full h-48 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {/* 統計 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statItems.map(({ label, value, description }) => (
            <div
              key={label}
              className="bg-gray-50 border border-gray-200 rounded-md p-4"
            >
              <p className="text-xs text-gray-500 mb-1">{description}</p>
              <p className="text-2xl font-bold text-[#d97706]">{value}</p>
              <p className="text-sm text-gray-700 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• テキストを入力するとリアルタイムで統計を表示</li>
            <li>• 文字数カウントはブログやSNS投稿の長さ確認に</li>
            <li>• 読書時間は記事の目安時間の計算に</li>
            <li>• バイト数はデータベースやファイルサイズの確認に</li>
          </ul>
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            テキスト統計ツールは、テキストの文字数、単語数、行数、読書時間、バイト数などを一括で計算する無料のオンラインツールです。ブログ記事やドキュメントの文字数管理に役立ちます。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 9種類の統計情報を一括表示</li>
            <li>• リアルタイムで更新</li>
            <li>• 読書時間の目安を計算</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. 読書時間はどう計算されていますか？</p>
              <p>A. 日本語は400文字/分、英語は200単語/分として計算しています。</p>
            </div>
            <div>
              <p className="font-medium">Q. バイト数と文字数の違いは？</p>
              <p>A. バイト数はUTF-8でのデータサイズ、文字数は表示上の文字数です。</p>
            </div>
          </div>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        {/* 関連ツール */}
        <RelatedTools currentPath="/text/statistics" />
        <AdBanner slot="TOOL_BOTTOM" format="rectangle" />
      </div>
    </>
  )
}

export default TextStatistics
