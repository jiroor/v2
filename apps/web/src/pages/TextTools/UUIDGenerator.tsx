import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

type UUIDVersion = 'v4' | 'v1'

function UUIDGenerator() {
  useToolUsageTracking('/text/uuid', 'UUID生成')
  const [uuids, setUuids] = useState<string[]>([])
  const [count, setCount] = useState(5)
  const [version, setVersion] = useState<UUIDVersion>('v4')
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  // UUID v4生成
  const generateUUIDv4 = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  // UUID v1生成（簡易版）
  const generateUUIDv1 = (): string => {
    const now = Date.now()
    const timeHex = now.toString(16).padStart(12, '0')
    return `${timeHex.slice(0, 8)}-${timeHex.slice(8, 12)}-1xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  const generateUUIDs = () => {
    const newUUIDs: string[] = []
    const generator = version === 'v4' ? generateUUIDv4 : generateUUIDv1

    for (let i = 0; i < count; i++) {
      newUUIDs.push(generator())
    }

    setUuids(newUUIDs)
  }

  const handleCopy = async (uuid: string, index: number) => {
    try {
      await navigator.clipboard.writeText(uuid)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  const handleCopyAll = async () => {
    if (uuids.length === 0) return

    try {
      await navigator.clipboard.writeText(uuids.join('\n'))
      alert('全てコピーしました')
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  return (
    <>
      <SEO path="/text/uuid" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="UUID生成" toolPath="/text/uuid" shareTitle="UUID生成 | Rakit" />

        {/* オプション */}
        <div className="mb-6 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">バージョン:</span>
            <div className="flex gap-2">
              <Button
                variant={version === 'v4' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setVersion('v4')}
              >
                UUID v4
              </Button>
              <Button
                variant={version === 'v1' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setVersion('v1')}
              >
                UUID v1
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">生成数:</span>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 5)))}
              min={1}
              max={50}
              className="w-16 p-2 border border-gray-200 rounded-md text-center"
            />
          </div>
        </div>

        <div className="flex gap-2 mb-6 justify-center">
          <Button onClick={generateUUIDs}>
            🔑 UUID生成
          </Button>
          {uuids.length > 0 && (
            <Button onClick={handleCopyAll} variant="outline">
              📋 全てコピー
            </Button>
          )}
        </div>

        {/* 結果 */}
        {uuids.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">生成されたUUID</h3>
            {uuids.map((uuid, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="font-mono text-sm break-all">{uuid}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(uuid, index)}
                >
                  {copiedIndex === index ? '✓' : 'コピー'}
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• UUID v4: ランダムベース（推奨）</li>
            <li>• UUID v1: タイムスタンプベース</li>
            <li>• データベースID、セッショントークン等に使用</li>
            <li>• 一意識別子が必要な場面で活用</li>
          </ul>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner format="rectangle" />
      </div>
    </>
  )
}

export default UUIDGenerator
