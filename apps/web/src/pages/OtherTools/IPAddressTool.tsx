import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'

interface IPInfo {
  ip: string
  city?: string
  region?: string
  country?: string
  loc?: string
  org?: string
  timezone?: string
}

function IPAddressTool() {
  useToolUsageTracking('/other/ip-address', 'IPアドレス確認')
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchIPInfo = async () => {
    setLoading(true)
    setError('')
    try {
      // ipinfo.io APIを使用（無料プラン）
      const response = await fetch('https://ipinfo.io/json')
      if (!response.ok) throw new Error('Failed to fetch IP info')
      const data = await response.json()
      setIpInfo(data)
    } catch (e) {
      setError('IPアドレスの取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIPInfo()
  }, [])

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('コピーしました')
    } catch {
      alert('コピーに失敗しました')
    }
  }

  const handleRefresh = () => {
    fetchIPInfo()
  }

  return (
    <>
      <SEO path="/other/ip-address" />
      <div className="max-w-[400px] mx-auto py-8 px-4">
        <h2 className="text-2xl font-semibold mb-8 text-center">IPアドレス確認</h2>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">取得中...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
            <Button onClick={handleRefresh} className="mt-4">
              再取得
            </Button>
          </div>
        ) : ipInfo ? (
          <>
            {/* IPアドレス */}
            <div className="bg-[#fef3c7] border border-[#d97706] rounded-md p-6 text-center mb-4">
              <p className="text-sm text-gray-600 mb-1">あなたのIPアドレス</p>
              <p className="text-3xl font-mono font-bold text-[#d97706]">{ipInfo.ip}</p>
              <Button
                onClick={() => handleCopy(ipInfo.ip)}
                size="sm"
                variant="outline"
                className="mt-3"
              >
                コピー
              </Button>
            </div>

            {/* 詳細情報 */}
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 space-y-3">
              {ipInfo.city && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">都市</span>
                  <span className="font-medium">{ipInfo.city}</span>
                </div>
              )}
              {ipInfo.region && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">地域</span>
                  <span className="font-medium">{ipInfo.region}</span>
                </div>
              )}
              {ipInfo.country && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">国</span>
                  <span className="font-medium">{ipInfo.country}</span>
                </div>
              )}
              {ipInfo.loc && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">位置情報</span>
                  <span className="font-medium font-mono text-xs">{ipInfo.loc}</span>
                </div>
              )}
              {ipInfo.org && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">ISP</span>
                  <span className="font-medium text-right max-w-[200px]">{ipInfo.org}</span>
                </div>
              )}
              {ipInfo.timezone && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">タイムゾーン</span>
                  <span className="font-medium">{ipInfo.timezone}</span>
                </div>
              )}
            </div>

            {/* 更新ボタン */}
            <Button onClick={handleRefresh} variant="outline" className="w-full mt-4">
              再取得
            </Button>
          </>
        ) : null}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 自分のパブリックIPアドレスを確認</li>
            <li>• 位置情報やISP情報を表示</li>
            <li>• ネットワーク設定・トラブル解決に</li>
            <li>• VPNの接続確認にも便利</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default IPAddressTool
