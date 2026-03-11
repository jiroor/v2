import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

type HashAlgorithm = 'md5' | 'sha1' | 'sha256' | 'sha512'

function HashGenerator() {
  useToolUsageTracking('/text/hash', 'ハッシュ生成')
  const [input, setInput] = useState('')
  const [results, setResults] = useState<{ algorithm: string; hash: string }[]>([])
  const [loading, setLoading] = useState(false)

  const generateHashes = async (text: string) => {
    if (!text) {
      setResults([])
      return
    }

    setLoading(true)

    const encoder = new TextEncoder()
    const data = encoder.encode(text)

    try {
      const algorithms: { name: HashAlgorithm; label: string }[] = [
        { name: 'sha256', label: 'SHA-256' },
        { name: 'sha512', label: 'SHA-512' },
        { name: 'sha1', label: 'SHA-1' },
      ]

      const hashes: { algorithm: string; hash: string }[] = []

      for (const { name, label } of algorithms) {
        const hashBuffer = await crypto.subtle.digest(name, data)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
        hashes.push({ algorithm: label, hash: hashHex })
      }

      // MD5はWeb Crypto APIでサポートされていないため、簡易的な代替表示
      hashes.push({ algorithm: 'MD5', hash: '(ブラウザでは非対応)' })

      setResults(hashes)
    } catch (error) {
      console.error('Hash generation error:', error)
    }

    setLoading(false)
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    generateHashes(value)
  }

  const handleCopy = async (hash: string) => {
    if (hash.includes('非対応')) return

    try {
      await navigator.clipboard.writeText(hash)
      alert('コピーしました')
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  return (
    <>
      <SEO path="/text/hash" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="ハッシュ生成" toolPath="/text/hash" shareTitle="ハッシュ生成 | Rakit" />

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            テキストを入力
          </label>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="ハッシュ化したいテキストを入力"
            className="w-full h-32 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {loading && (
          <div className="text-center py-4">
            <span className="text-gray-500">生成中...</span>
          </div>
        )}

        {results.length > 0 && !loading && (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">ハッシュ値</h3>
            {results.map(({ algorithm, hash }) => (
              <div
                key={algorithm}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{algorithm}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(hash)}
                    disabled={hash.includes('非対応')}
                  >
                    コピー
                  </Button>
                </div>
                <div className="font-mono text-xs break-all text-gray-800">
                  {hash}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• テキストからハッシュ値を生成</li>
            <li>• SHA-256、SHA-512、SHA-1に対応</li>
            <li>• パスワード確認やデータ整合性チェックに使用</li>
            <li>• 一方向暗号化（元に戻せません）</li>
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

export default HashGenerator
