import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'
import { RelatedTools } from '@/components/RelatedTools/RelatedTools'

interface DiffLine {
  type: 'add' | 'remove' | 'same'
  content: string
  lineNumber: { left?: number; right?: number }
}

function TextDiffLine() {
  useToolUsageTracking('/text/diff-line', 'テキスト比較（行単位）')
  const [leftText, setLeftText] = useState('')
  const [rightText, setRightText] = useState('')
  const [diff, setDiff] = useState<DiffLine[]>([])
  const [stats, setStats] = useState({ added: 0, removed: 0, unchanged: 0 })

  const computeDiff = (left: string, right: string) => {
    const leftLines = left.split('\n')
    const rightLines = right.split('\n')

    const result: DiffLine[] = []
    let leftIndex = 0
    let rightIndex = 0
    let added = 0
    let removed = 0
    let unchanged = 0

    // Simple LCS-based diff
    while (leftIndex < leftLines.length || rightIndex < rightLines.length) {
      if (leftIndex >= leftLines.length) {
        // Remaining right lines are additions
        result.push({
          type: 'add',
          content: rightLines[rightIndex],
          lineNumber: { right: rightIndex + 1 },
        })
        added++
        rightIndex++
      } else if (rightIndex >= rightLines.length) {
        // Remaining left lines are removals
        result.push({
          type: 'remove',
          content: leftLines[leftIndex],
          lineNumber: { left: leftIndex + 1 },
        })
        removed++
        leftIndex++
      } else if (leftLines[leftIndex] === rightLines[rightIndex]) {
        // Same line
        result.push({
          type: 'same',
          content: leftLines[leftIndex],
          lineNumber: { left: leftIndex + 1, right: rightIndex + 1 },
        })
        unchanged++
        leftIndex++
        rightIndex++
      } else {
        // Check if the line was removed or added
        const leftInRight = rightLines.slice(rightIndex).indexOf(leftLines[leftIndex])
        const rightInLeft = leftLines.slice(leftIndex).indexOf(rightLines[rightIndex])

        if (leftInRight === -1 && rightInLeft === -1) {
          // Both lines are different - show as change
          result.push({
            type: 'remove',
            content: leftLines[leftIndex],
            lineNumber: { left: leftIndex + 1 },
          })
          result.push({
            type: 'add',
            content: rightLines[rightIndex],
            lineNumber: { right: rightIndex + 1 },
          })
          removed++
          added++
          leftIndex++
          rightIndex++
        } else if (leftInRight === -1 || (rightInLeft !== -1 && rightInLeft < leftInRight)) {
          // Right line is new
          result.push({
            type: 'add',
            content: rightLines[rightIndex],
            lineNumber: { right: rightIndex + 1 },
          })
          added++
          rightIndex++
        } else {
          // Left line was removed
          result.push({
            type: 'remove',
            content: leftLines[leftIndex],
            lineNumber: { left: leftIndex + 1 },
          })
          removed++
          leftIndex++
        }
      }
    }

    setDiff(result)
    setStats({ added, removed, unchanged })
  }

  const handleCompare = () => {
    computeDiff(leftText, rightText)
  }

  return (
    <>
      <SEO
        path="/text/diff-line"
        title="テキスト比較（行単位）"
        description="無料のオンラインテキスト比較ツール。2つのテキストを行単位で比較し、追加・削除された行を視覚的に表示。コードレビューに便利。"
      />
      <div className="max-w-[1000px] mx-auto py-8 px-4">
        <ToolHeader title="テキスト比較（行単位）" toolPath="/text/diff-line" shareTitle="テキスト比較（行単位） | Rakit" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              元のテキスト
            </label>
            <textarea
              value={leftText}
              onChange={(e) => setLeftText(e.target.value)}
              placeholder="元のテキストを入力"
              className="w-full h-48 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              比較テキスト
            </label>
            <textarea
              value={rightText}
              onChange={(e) => setRightText(e.target.value)}
              placeholder="比較するテキストを入力"
              className="w-full h-48 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <Button onClick={handleCompare} disabled={!leftText && !rightText}>
            🔍 比較する
          </Button>
        </div>

        {/* 統計 */}
        {diff.length > 0 && (
          <div className="mb-4 p-4 bg-gray-50 rounded-md flex justify-center gap-6">
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">+{stats.added}</div>
              <div className="text-sm text-gray-600">追加</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-red-600">-{stats.removed}</div>
              <div className="text-sm text-gray-600">削除</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-600">{stats.unchanged}</div>
              <div className="text-sm text-gray-600">変更なし</div>
            </div>
          </div>
        )}

        {/* 差分表示 */}
        {diff.length > 0 && (
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 font-semibold text-sm">差分</div>
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-sm">
                <tbody>
                  {diff.map((line, index) => (
                    <tr
                      key={index}
                      className={
                        line.type === 'add'
                          ? 'bg-green-50'
                          : line.type === 'remove'
                          ? 'bg-red-50'
                          : ''
                      }
                    >
                      <td className="px-2 py-1 text-right text-gray-400 border-r border-gray-200 w-12">
                        {line.lineNumber.left || ''}
                      </td>
                      <td className="px-2 py-1 text-right text-gray-400 border-r border-gray-200 w-12">
                        {line.lineNumber.right || ''}
                      </td>
                      <td className="px-2 py-1 w-8 text-center">
                        {line.type === 'add' && <span className="text-green-600">+</span>}
                        {line.type === 'remove' && <span className="text-red-600">-</span>}
                        {line.type === 'same' && <span className="text-gray-300"> </span>}
                      </td>
                      <td className="px-2 py-1 whitespace-pre-wrap break-all">
                        {line.content || ' '}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 2つのテキストを行単位で比較</li>
            <li>• <span className="text-green-600">緑</span>: 追加された行</li>
            <li>• <span className="text-red-600">赤</span>: 削除された行</li>
            <li>• コードの変更確認やドキュメントの比較に便利</li>
          </ul>
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            テキスト比較（行単位）ツールは、2つのテキストを行単位で比較し、追加・削除された行を視覚的に表示する無料のオンラインツールです。コードレビューやドキュメントの変更確認に役立ちます。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 行番号付きで表示</li>
            <li>• 追加・削除・変更なしを色分け</li>
            <li>• 統計情報をリアルタイム表示</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. 文字単位での比較はできますか？</p>
              <p>A. 現在は行単位の比較のみです。</p>
            </div>
            <div>
              <p className="font-medium">Q. 大きなテキストも比較できますか？</p>
              <p>A. はい、数千行程度まで問題なく比較できます。</p>
            </div>
          </div>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        {/* 関連ツール */}
        <RelatedTools currentPath="/text/diff-line" />
        <AdBanner slot="tools-rectangle" format="rectangle" />
      </div>
    </>
  )
}

export default TextDiffLine
