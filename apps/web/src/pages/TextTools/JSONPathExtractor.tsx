import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'
import { RelatedTools } from '@/components/RelatedTools/RelatedTools'

function JSONPathExtractor() {
  useToolUsageTracking('/text/json-path', 'JSONパス抽出')
  const [jsonInput, setJsonInput] = useState('')
  const [path, setPath] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const extractValue = (obj: unknown, pathParts: string[]): unknown => {
    let current: unknown = obj
    
    for (const part of pathParts) {
      if (current === null || current === undefined) {
        return undefined
      }
      
      // 配列インデックス (例: [0], [1])
      const arrayMatch = part.match(/^\[(\d+)\]$/)
      if (arrayMatch) {
        const index = parseInt(arrayMatch[1])
        if (Array.isArray(current)) {
          current = current[index]
        } else {
          return undefined
        }
      } else if (typeof current === 'object' && current !== null) {
        current = (current as Record<string, unknown>)[part]
      } else {
        return undefined
      }
    }
    
    return current
  }

  const handleExtract = () => {
    setError('')
    setResult('')
    
    if (!jsonInput.trim()) {
      setError('JSONを入力してください')
      return
    }
    
    try {
      const parsed = JSON.parse(jsonInput)
      
      if (!path.trim()) {
        setResult(JSON.stringify(parsed, null, 2))
        return
      }
      
      // パスを解析 (例: data.items[0].name)
      const pathParts = path.split('.').flatMap(part => {
        const match = part.match(/^([^\[\]]+)|\[(\d+)\]/g)
        if (!match) return [part]
        return match.map(m => m.startsWith('[') ? m : m)
      }).filter(Boolean)
      
      const value = extractValue(parsed, pathParts)
      
      if (value === undefined) {
        setError('指定されたパスに値が見つかりません')
      } else {
        setResult(JSON.stringify(value, null, 2))
      }
    } catch (e) {
      setError('無効なJSON形式です')
    }
  }

  const handleCopy = async () => {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result)
      alert('コピーしました')
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  const examples = [
    { path: 'name', desc: 'トップレベルのname' },
    { path: 'items[0]', desc: 'items配列の最初の要素' },
    { path: 'items[0].name', desc: 'items配列の最初の要素のname' },
    { path: 'data.users[1].email', desc: 'ネストした配列の要素' },
  ]

  return (
    <>
      <SEO
        path="/text/json-path"
        title="JSONパス抽出"
        description="無料のオンラインJSONパス抽出ツール。JSONデータから特定のパスを指定して値を抽出。APIレスポンスの解析やデータ分析に便利。"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="JSONパス抽出" toolPath="/text/json-path" shareTitle="JSONパス抽出 | Rakit" />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            JSON入力
          </label>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{"name": "太郎", "items": [{"id": 1, "name": "商品A"}]}'
            className="w-full h-48 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            パス (例: data.items[0].name)
          </label>
          <input
            type="text"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder="data.items[0].name"
            className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        <div className="flex gap-2 mb-4">
          <Button onClick={handleExtract}>
            🔍 抽出
          </Button>
          {result && (
            <Button onClick={handleCopy} variant="outline">
              📋 コピー
            </Button>
          )}
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}

        {result && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              結果
            </label>
            <pre className="w-full p-4 border border-gray-200 rounded-md bg-gray-50 font-mono text-sm overflow-x-auto whitespace-pre-wrap">
              {result}
            </pre>
          </div>
        )}

        {/* パス例 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">パスの書き方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            {examples.map((ex, i) => (
              <li key={i}>
                • <code className="bg-gray-200 px-1 rounded">{ex.path}</code>: {ex.desc}
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-500 mt-3">
            ※ ドット(.)でプロパティにアクセス、[数字]で配列のインデックスにアクセス
          </p>
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            JSONパス抽出ツールは、JSONデータから特定のパスを指定して値を抽出する無料のオンラインツールです。APIレスポンスの解析やデータ分析に役立ちます。ドット記法と配列インデックスに対応しています。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• JSONPath形式で値を抽出</li>
            <li>• ネストしたオブジェクトと配列に対応</li>
            <li>• パス例をクリックで挿入</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. パスが間違っているとどうなりますか？</p>
              <p>A. 「指定されたパスに値が見つかりません」というエラーが表示されます。</p>
            </div>
            <div>
              <p className="font-medium">Q. 配列の全要素を取得できますか？</p>
              <p>A. 現在は特定のインデックスのみ対応しています。</p>
            </div>
          </div>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        {/* 関連ツール */}
        <RelatedTools currentPath="/text/json-path" />
        <AdBanner slot="tools-rectangle" format="rectangle" />
      </div>
    </>
  )
}

export default JSONPathExtractor
