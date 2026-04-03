import { useState } from 'react'
import { SEO } from '@/components/SEO/SEO'
import { getToolUsageData, clearToolUsageData } from '../utils/analyticsUtils'

function UsageStats() {
  const [data] = useState(() => getToolUsageData())
  
  const tools = Object.entries(data)
    .map(([path, record]) => ({
      path,
      name: record.toolName,
      count: record.count,
      lastUsed: new Date(record.lastUsed),
    }))
    .sort((a, b) => b.count - a.count)

  const totalVisits = tools.reduce((sum, t) => sum + t.count, 0)
  const uniqueTools = tools.length

  const handleClear = () => {
    if (confirm('統計データをクリアしますか？')) {
      clearToolUsageData()
      window.location.reload()
    }
  }

  return (
    <>
      <SEO
        path="/stats"
        title="利用統計"
        description="Rakitのツール利用統計を確認できます。"
      />
      <div className="max-w-[600px] mx-auto py-8 px-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">利用統計</h2>

        {/* サマリー */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[#fef3c7] border border-[#d97706] rounded-md p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">総アクセス数</p>
            <p className="text-3xl font-bold text-[#d97706]">{totalVisits}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">利用ツール数</p>
            <p className="text-3xl font-bold">{uniqueTools}</p>
          </div>
        </div>

        {/* ツールランキング */}
        {tools.length > 0 && (
          <div className="mb-8">
            <h3 className="font-semibold mb-4">利用回数ランキング</h3>
            <div className="space-y-2">
              {tools.slice(0, 20).map((tool, index) => (
                <div
                  key={tool.path}
                  className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-md"
                >
                  <span className="text-lg font-bold text-gray-400 w-6">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium">{tool.name}</p>
                    <p className="text-xs text-gray-500">{tool.path}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#d97706]">{tool.count}回</p>
                    <p className="text-xs text-gray-500">
                      {tool.lastUsed.toLocaleDateString('ja-JP')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* クリアボタン */}
        {tools.length > 0 && (
          <button
            onClick={handleClear}
            className="text-sm text-red-500 hover:text-red-700"
          >
            統計データをクリア
          </button>
        )}

        {/* 説明 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このページについて</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• あなたの利用状況をローカルで記録</li>
            <li>• データはブラウザにのみ保存</li>
            <li>• サーバーには送信されません</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default UsageStats
