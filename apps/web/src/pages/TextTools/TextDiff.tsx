import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'
import { RelatedTools } from '@/components/RelatedTools/RelatedTools'

function TextDiff() {
  useToolUsageTracking('/text/diff', 'テキスト比較')
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')

  const diff = useMemo(() => {
    if (!text1 && !text2) return null

    const lines1 = text1.split('\n')
    const lines2 = text2.split('\n')

    const maxLines = Math.max(lines1.length, lines2.length)
    const result: Array<{
      type: 'same' | 'added' | 'removed' | 'modified'
      line1: string | null
      line2: string | null
      lineNum1: number | null
      lineNum2: number | null
    }> = []

    for (let i = 0; i < maxLines; i++) {
      const line1 = i < lines1.length ? lines1[i] : null
      const line2 = i < lines2.length ? lines2[i] : null

      if (line1 === null && line2 !== null) {
        result.push({
          type: 'added',
          line1: null,
          line2,
          lineNum1: null,
          lineNum2: i + 1,
        })
      } else if (line1 !== null && line2 === null) {
        result.push({
          type: 'removed',
          line1,
          line2: null,
          lineNum1: i + 1,
          lineNum2: null,
        })
      } else if (line1 !== line2) {
        result.push({
          type: 'modified',
          line1: line1!,
          line2: line2!,
          lineNum1: i + 1,
          lineNum2: i + 1,
        })
      } else {
        result.push({
          type: 'same',
          line1: line1!,
          line2: line2!,
          lineNum1: i + 1,
          lineNum2: i + 1,
        })
      }
    }

    return result
  }, [text1, text2])

  const stats = useMemo(() => {
    if (!diff) return null
    const added = diff.filter((d) => d.type === 'added').length
    const removed = diff.filter((d) => d.type === 'removed').length
    const modified = diff.filter((d) => d.type === 'modified').length
    const same = diff.filter((d) => d.type === 'same').length
    return { added, removed, modified, same, total: diff.length }
  }, [diff])

  const handleSwap = () => {
    const temp = text1
    setText1(text2)
    setText2(temp)
  }

  const handleClear = () => {
    setText1('')
    setText2('')
  }

  return (
    <>
      <SEO
        path="/text/diff"
        title="テキスト比較"
        description="無料のオンラインテキスト比較ツール。2つのテキストを行単位で比較し、追加・削除・変更された行を視覚的に表示。コードレビューに便利。"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="テキスト比較" toolPath="/text/diff" shareTitle="テキスト比較 | Rakit" />

        {/* 入力エリア */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              テキストA（元のテキスト）
            </label>
            <textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="元のテキストを入力..."
              className="w-full h-[200px] p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706] resize-y"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              テキストB（比較対象）
            </label>
            <textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="比較対象のテキストを入力..."
              className="w-full h-[200px] p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706] resize-y"
            />
          </div>
        </div>

        {/* ボタン */}
        <div className="flex gap-2 mb-6">
          <Button onClick={handleSwap} variant="outline" className="flex-1">
            入れ替え
          </Button>
          <Button onClick={handleClear} variant="destructive" className="flex-1">
            クリア
          </Button>
        </div>

        {/* 統計 */}
        {stats && (
          <div className="grid grid-cols-4 gap-2 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-md p-2 text-center">
              <p className="text-xs text-green-600">追加</p>
              <p className="text-lg font-bold text-green-700">{stats.added}</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-md p-2 text-center">
              <p className="text-xs text-red-600">削除</p>
              <p className="text-lg font-bold text-red-700">{stats.removed}</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-2 text-center">
              <p className="text-xs text-yellow-600">変更</p>
              <p className="text-lg font-bold text-yellow-700">{stats.modified}</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-2 text-center">
              <p className="text-xs text-gray-600">一致</p>
              <p className="text-lg font-bold text-gray-700">{stats.same}</p>
            </div>
          </div>
        )}

        {/* 差分表示 */}
        {diff && diff.length > 0 && (
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <div className="bg-gray-100 p-2 text-sm font-medium text-gray-700">
              差分結果
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {diff.map((item, index) => {
                let bgColor = 'bg-white'
                let borderColor = 'border-l-transparent'
                let prefix = ' '

                if (item.type === 'added') {
                  bgColor = 'bg-green-50'
                  borderColor = 'border-l-green-500'
                  prefix = '+'
                } else if (item.type === 'removed') {
                  bgColor = 'bg-red-50'
                  borderColor = 'border-l-red-500'
                  prefix = '-'
                } else if (item.type === 'modified') {
                  bgColor = 'bg-yellow-50'
                  borderColor = 'border-l-yellow-500'
                  prefix = '~'
                }

                return (
                  <div
                    key={index}
                    className={`${bgColor} border-l-4 ${borderColor} px-3 py-1 font-mono text-xs border-b border-gray-100`}
                  >
                    <span className="text-gray-400 mr-2">
                      {item.lineNum1 ?? '-'}
                    </span>
                    <span className={item.type === 'added' ? 'text-green-600' : item.type === 'removed' ? 'text-red-600' : ''}>
                      {prefix} {item.line2 ?? item.line1}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 2つのテキストの違いを表示</li>
            <li>• 追加・削除・変更された行を色分け</li>
            <li>• コード比較、ドキュメント校正に便利</li>
          </ul>
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            テキスト比較ツールは、2つのテキストを行単位で比較し、追加・削除・変更された行を視覚的に表示する無料のオンラインツールです。コードレビューやドキュメントの校正などに役立ちます。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 行単位での差分表示</li>
            <li>• 追加・削除・変更を色分け</li>
            <li>• 統計情報をリアルタイム表示</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. 大きなテキストも比較できますか？</p>
              <p>A. はい、数千行程度まで問題なく比較できます。</p>
            </div>
            <div>
              <p className="font-medium">Q. 文字単位での比較はできますか？</p>
              <p>A. 現在は行単位での比較のみです。</p>
            </div>
          </div>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        {/* 関連ツール */}
        <RelatedTools currentPath="/text/diff" />
        <AdBanner slot="TOOL_BOTTOM" format="rectangle" />
      </div>
    </>
  )
}

export default TextDiff
