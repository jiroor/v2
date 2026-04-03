import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'
import { RelatedTools } from '@/components/RelatedTools/RelatedTools'

const STORAGE_KEY = 'rakit_memo'

function SimpleNotepad() {
  useToolUsageTracking('/text/notepad', '簡易メモ帳')
  const [content, setContent] = useState('')
  const [saved, setSaved] = useState(false)
  const [charCount, setCharCount] = useState(0)

  // ローカルストレージから読み込み
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setContent(saved)
      setCharCount(saved.length)
    }
  }, [])

  // 自動保存
  useEffect(() => {
    const timer = setTimeout(() => {
      if (content) {
        localStorage.setItem(STORAGE_KEY, content)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [content])

  const handleChange = (value: string) => {
    setContent(value)
    setCharCount(value.length)
  }

  const handleClear = () => {
    if (confirm('メモを削除しますか？')) {
      setContent('')
      setCharCount(0)
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const handleCopy = async () => {
    if (!content) return

    try {
      await navigator.clipboard.writeText(content)
      alert('コピーしました')
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  const handleDownload = () => {
    if (!content) return

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `memo_${new Date().toISOString().slice(0, 10)}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <SEO
        path="/text/notepad"
        title="簡易メモ帳"
        description="無料のオンライン簡易メモ帳。ブラウザ上でテキストを保存。入力内容は自動的にローカルストレージに保存され復元可能。"
      />
      <div className="max-w-[900px] mx-auto py-8 px-4">
        <ToolHeader title="簡易メモ帳" toolPath="/text/notepad" shareTitle="簡易メモ帳 | Rakit" />

        {/* ステータス */}
        <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <span>{charCount} 文字</span>
            {saved && <span className="text-green-600">保存しました</span>}
          </div>
          <span className="text-gray-400">自動保存</span>
        </div>

        {/* テキストエリア */}
        <textarea
          value={content}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="ここにメモを入力してください...

• 自動的にブラウザに保存されます
• ページを閉じても残ります
• 同じブラウザで再度アクセスすると復元されます"
          className="w-full h-[60vh] p-4 border border-gray-200 rounded-md text-base resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706] leading-relaxed"
        />

        {/* アクションボタン */}
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          <Button onClick={handleCopy} disabled={!content}>
            📋 コピー
          </Button>
          <Button onClick={handleDownload} disabled={!content} variant="outline">
            💾 ダウンロード
          </Button>
          <Button onClick={handleClear} disabled={!content} variant="destructive">
            🗑️ 削除
          </Button>
        </div>

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 入力内容は自動的にブラウザに保存されます</li>
            <li>• ページを閉じても、同じブラウザで再アクセスすれば復元されます</li>
            <li>• ダウンロードでテキストファイルとして保存できます</li>
            <li>• 異なるデバイス・ブラウザでは同期されません</li>
          </ul>
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            簡易メモ帳は、ブラウザ上でテキストを保存できる無料のオンラインツールです。入力内容は自動的にローカルストレージに保存されるため、ページを閉じても再度アクセスすれば復元されます。一時的なメモやアイデアの記録に最適です。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 自動保存機能</li>
            <li>• テキストファイルでダウンロード</li>
            <li>• 文字数カウント表示</li>
            <li>• 完全無料、インストール不要</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. 他のデバイスでも見られますか？</p>
              <p>A. いいえ、同じブラウザ内でのみ保存されます。異なるデバイスでは同期されません。</p>
            </div>
            <div>
              <p className="font-medium">Q. 保存容量に制限は？</p>
              <p>A. 数KB程度のテキストであれば問題なく保存できます。</p>
            </div>
          </div>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        {/* 関連ツール */}
        <RelatedTools currentPath="/text/notepad" />
        <AdBanner slot="tools-rectangle" format="rectangle" />
      </div>
    </>
  )
}

export default SimpleNotepad
