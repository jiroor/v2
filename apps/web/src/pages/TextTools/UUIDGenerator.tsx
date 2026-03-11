import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

type UuidVersion = 'v4' | 'v1'

function UUIDGenerator() {
  useToolUsageTracking('/text/uuid', 'UUID生成')
  const [uuids, setUuids] = useState<string[]>([])
  const [version, setVersion] = useState<UuidVersion>('v4')
  const [count, setCount] = useState(1)
  const [copySuccess, setCopySuccess] = useState<number | null>(null)

  // UUID v4を生成
  const generateUUIDv4 = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  // UUID v1風の生成（簡易版）
  const generateUUIDv1 = (): string => {
    const now = Date.now()
    const timestamp = now.toString(16).padStart(12, '0')
    return `${timestamp.substring(0, 8)}-${timestamp.substring(8, 12)}-1xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  // crypto.randomUUIDを使用（利用可能な場合）
  const generateSecureUUID = (): string => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID()
    }
    return generateUUIDv4()
  }

  const generate = () => {
    const newUuids: string[] = []
    for (let i = 0; i < count; i++) {
      if (version === 'v4') {
        newUuids.push(generateSecureUUID())
      } else {
        newUuids.push(generateUUIDv1())
      }
    }
    setUuids(newUuids)
    setCopySuccess(null)
  }

  const handleCopy = async (uuid: string, index: number) => {
    try {
      await navigator.clipboard.writeText(uuid)
      setCopySuccess(index)
      setTimeout(() => setCopySuccess(null), 2000)
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  const copyAll = async () => {
    if (uuids.length === 0) return
    try {
      await navigator.clipboard.writeText(uuids.join('\n'))
      setCopySuccess(-1)
      setTimeout(() => setCopySuccess(null), 2000)
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  const shortcuts = [
    {
      key: 'g',
      description: '生成',
      action: generate,
    },
  ]

  useKeyboardShortcut(shortcuts)

  return (
    <>
      <SEO path="/text/uuid" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="UUID/GUID生成" toolPath="/text/uuid" shareTitle="UUID/GUID生成 | Rakit" />

        {/* オプション */}
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">バージョン:</span>
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
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">個数:</span>
            <select
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="p-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            >
              {[1, 2, 3, 5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>{n}個</option>
              ))}
            </select>
          </div>
        </div>

        {/* 生成ボタン */}
        <div className="flex justify-center mb-6">
          <Button onClick={generate} size="lg">
            生成
          </Button>
        </div>

        {/* 結果 */}
        {uuids.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                生成されたUUID
              </label>
              {uuids.length > 1 && (
                <Button
                  onClick={copyAll}
                  size="sm"
                  variant={copySuccess === -1 ? 'default' : 'outline'}
                >
                  {copySuccess === -1 ? '全てコピーしました！' : '全てコピー'}
                </Button>
              )}
            </div>
            <div className="space-y-2">
              {uuids.map((uuid, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-md p-3"
                >
                  <span className="flex-1 font-mono text-sm break-all">{uuid}</span>
                  <Button
                    onClick={() => handleCopy(uuid, index)}
                    size="sm"
                    variant={copySuccess === index ? 'default' : 'outline'}
                  >
                    {copySuccess === index ? '✓' : 'コピー'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {uuids.length === 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-8 text-center text-gray-400">
            「生成」ボタンをクリックしてください
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• <strong>UUID v4</strong>: ランダム生成（推奨）</li>
            <li>• <strong>UUID v1</strong>: タイムスタンプベース</li>
            <li>• 一度に最大50個まで生成可能</li>
            <li>• データベースの主キーやセッションIDなどに使用</li>
          </ul>
        </div>

        <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />

        {/* 広告 */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <AdBanner slot="TOOL_BOTTOM" format="rectangle" />
        </div>
      </div>
    </>
  )
}

export default UUIDGenerator
