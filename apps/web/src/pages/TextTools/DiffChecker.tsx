import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'
import { RelatedTools } from '@/components/RelatedTools/RelatedTools'

function DiffChecker() {
  useToolUsageTracking('/text/diff-checker', 'テキスト差分チェッカー')
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [diffResult, setDiffResult] = useState<{ type: 'add' | 'remove' | 'same'; text: string }[]>([])

  const computeDiff = () => {
    const lines1 = text1.split('\n')
    const lines2 = text2.split('\n')
    const result: { type: 'add' | 'remove' | 'same'; text: string }[] = []

    // 簡易的な行ベース差分
    const maxLen = Math.max(lines1.length, lines2.length)
    for (let i = 0; i < maxLen; i++) {
      const line1 = lines1[i] || ''
      const line2 = lines2[i] || ''

      if (line1 === line2) {
        result.push({ type: 'same', text: line1 })
      } else {
        if (line1) result.push({ type: 'remove', text: line1 })
        if (line2) result.push({ type: 'add', text: line2 })
      }
    }

    setDiffResult(result)
  }

  const clear = () => {
    setText1('')
    setText2('')
    setDiffResult([])
  }

  return (
    <>
      <SEO
        title="テキスト差分チェッカー"
        description="無料のオンラインテキスト差分チェッカー。2つのテキストを比較して追加・削除された行を表示。コードレビューやドキュメントの変更確認に便利。"
        path="/text/diff-checker"
        category="UtilitiesApplication"
      />
      <div className="max-w-[900px] mx-auto py-8 px-4">
        <ToolHeader
          title="テキスト差分チェッカー"
          toolPath="/text/diff-checker"
          
        />

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium block mb-2">テキスト1（元）</label>
              <Textarea
                value={text1}
                onChange={(e) => setText1(e.target.value)}
                placeholder="元のテキストを入力"
                className="min-h-[200px] font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-2">テキスト2（変更後）</label>
              <Textarea
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                placeholder="変更後のテキストを入力"
                className="min-h-[200px] font-mono text-sm"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={computeDiff} disabled={!text1 && !text2}>
              差分を確認
            </Button>
            <Button variant="secondary" onClick={clear}>
              クリア
            </Button>
          </div>

          {diffResult.length > 0 && (
            <div>
              <label className="text-sm font-medium block mb-2">差分結果</label>
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 font-mono text-sm">
                  {diffResult.map((line, index) => (
                    <div
                      key={index}
                      className={`px-2 py-1 ${
                        line.type === 'add'
                          ? 'bg-green-100 text-green-800'
                          : line.type === 'remove'
                          ? 'bg-red-100 text-red-800'
                          : 'text-gray-600'
                      }`}
                    >
                      <span className="inline-block w-6 text-center">
                        {line.type === 'add' ? '+' : line.type === 'remove' ? '-' : ' '}
                      </span>
                      {line.text || ' '}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <span className="inline-flex items-center gap-1 mr-4">
                  <span className="w-4 h-4 bg-green-100 border border-green-300 rounded"></span>
                  追加
                </span>
                <span className="inline-flex items-center gap-1 mr-4">
                  <span className="w-4 h-4 bg-red-100 border border-red-300 rounded"></span>
                  削除
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></span>
                  変更なし
                </span>
              </div>
            </div>
          )}

          {/* 関連ツール */}
        <RelatedTools currentPath="/text/diff-checker" />
        <AdBanner slot="TOOL_BOTTOM" format="horizontal" />
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            テキスト差分チェッカーは、2つのテキストを比較して追加・削除された行を表示する無料のオンラインツールです。コードレビューやドキュメントの変更確認などに役立ちます。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 追加・削除・変更なしを色分け表示</li>
            <li>• 行単位での差分比較</li>
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
          </div>
        </div>
      </div>
    </>
  )
}

export default DiffChecker
