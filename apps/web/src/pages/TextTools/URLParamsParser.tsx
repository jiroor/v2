import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

interface Param {
  key: string
  value: string
  decoded: string
}

function URLParamsParser() {
  useToolUsageTracking('/text/url-params', 'URLパラメータ解析')
  const [input, setInput] = useState('')
  const [params, setParams] = useState<Param[]>([])
  const [baseUrl, setBaseUrl] = useState('')
  const [error, setError] = useState('')

  const parseUrl = (url: string) => {
    if (!url) {
      setParams([])
      setBaseUrl('')
      setError('')
      return
    }

    try {
      const urlObj = new URL(url)
      setBaseUrl(`${urlObj.origin}${urlObj.pathname}`)
      
      const searchParams = urlObj.searchParams
      const paramList: Param[] = []
      
      searchParams.forEach((value, key) => {
        paramList.push({
          key,
          value,
          decoded: decodeURIComponent(value),
        })
      })
      
      setParams(paramList)
      setError('')
    } catch (e) {
      setError('有効なURLを入力してください')
      setParams([])
      setBaseUrl('')
    }
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    parseUrl(value)
  }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('コピーしました')
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  const handleCopyAll = async () => {
    if (params.length === 0) return
    
    const text = params.map(p => `${p.key}: ${p.value}`).join('\n')
    await handleCopy(text)
  }

  return (
    <>
      <SEO path="/text/url-params" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="URLパラメータ解析" toolPath="/text/url-params" shareTitle="URLパラメータ解析 | Rakit" />

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URLを入力
          </label>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="https://example.com?param1=value1&param2=value2"
            className="w-full h-24 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}

        {baseUrl && (
          <div className="mb-4 p-3 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-600">ベースURL: </span>
            <span className="font-mono text-sm break-all">{baseUrl}</span>
          </div>
        )}

        {params.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">パラメータ一覧 ({params.length}件)</h3>
              <Button onClick={handleCopyAll} size="sm" variant="outline">
                📋 全てコピー
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm">キー</th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm">値</th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm">デコード済み</th>
                    <th className="border border-gray-200 px-4 py-2 text-center text-sm w-20">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {params.map((param, index) => (
                    <tr key={index}>
                      <td className="border border-gray-200 px-4 py-2 font-mono text-sm text-blue-600">
                        {param.key}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 font-mono text-sm break-all">
                        {param.value}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 font-mono text-sm break-all text-gray-600">
                        {param.decoded !== param.value ? param.decoded : '-'}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        <button
                          onClick={() => handleCopy(`${param.key}=${param.value}`)}
                          className="text-[#d97706] hover:text-[#b45309] text-sm"
                        >
                          コピー
                        </button>
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
            <li>• URLを入力するとパラメータを自動解析</li>
            <li>• クエリパラメータ（?key=value）を抽出</li>
            <li>• URLエンコードされた値をデコードして表示</li>
            <li>• マーケティングURLの解析やデバッグに便利</li>
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

export default URLParamsParser
