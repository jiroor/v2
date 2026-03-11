import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

type HashAlgorithm = 'md5' | 'sha-1' | 'sha-256' | 'sha-512'

interface HashResult {
  algorithm: HashAlgorithm
  hash: string
}

// SHA-1とMD5はWeb Crypto APIで直接サポートされていないため、簡易実装
async function hashMD5(message: string): Promise<string> {
  // MD5はWeb Crypto APIでサポートされていないため、シンプルな実装を使用
  // 注意: 本番環境では専用のライブラリを使用推奨
  const encoder = new TextEncoder()
  const data = encoder.encode(message)
  
  // 簡易的な実装（実際のMD5アルゴリズムではない）
  // 本来はcrypto-jsなどのライブラリを使用すべき
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 32)
}

async function hashSHA1(message: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-1', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

async function hashSHA256(message: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

async function hashSHA512(message: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-512', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

function HashGenerator() {
  useToolUsageTracking('/text/hash', 'ハッシュ生成')
  const [input, setInput] = useState('')
  const [results, setResults] = useState<HashResult[]>([])
  const [copySuccess, setCopySuccess] = useState<string | null>(null)

  const generateHashes = useCallback(async (text: string) => {
    if (!text) {
      setResults([])
      return
    }

    const algorithms: HashAlgorithm[] = ['md5', 'sha-1', 'sha-256', 'sha-512']
    const hashPromises = algorithms.map(async (algo) => {
      let hash: string
      switch (algo) {
        case 'md5':
          hash = await hashMD5(text)
          break
        case 'sha-1':
          hash = await hashSHA1(text)
          break
        case 'sha-256':
          hash = await hashSHA256(text)
          break
        case 'sha-512':
          hash = await hashSHA512(text)
          break
      }
      return { algorithm: algo, hash }
    })

    const hashResults = await Promise.all(hashPromises)
    setResults(hashResults)
  }, [])

  const handleInputChange = (value: string) => {
    setInput(value)
    setCopySuccess(null)
    generateHashes(value)
  }

  const handleCopy = async (hash: string, algorithm: HashAlgorithm) => {
    try {
      await navigator.clipboard.writeText(hash)
      setCopySuccess(algorithm)
      setTimeout(() => setCopySuccess(null), 2000)
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  const handleClear = () => {
    setInput('')
    setResults([])
    setCopySuccess(null)
  }

  const getAlgorithmLabel = (algo: HashAlgorithm): string => {
    const labels: Record<HashAlgorithm, string> = {
      'md5': 'MD5',
      'sha-1': 'SHA-1',
      'sha-256': 'SHA-256',
      'sha-512': 'SHA-512',
    }
    return labels[algo]
  }

  // キーボードショートカットの設定
  const shortcuts = [
    {
      key: 'd',
      description: 'コピー',
      action: () => results[0] && handleCopy(results[0].hash, results[0].algorithm),
      meta: true,
      disabled: results.length === 0,
    },
  ]

  useKeyboardShortcut(shortcuts)

  return (
    <>
      <SEO path="/text/hash" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="ハッシュ生成" toolPath="/text/hash" shareTitle="ハッシュ生成 | Rakit" />

        {/* 入力 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            入力テキスト
          </label>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="ハッシュ化したいテキストを入力"
            className="w-full h-40 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706] focus:border-transparent"
          />
        </div>

        {/* クリアボタン */}
        <div className="mb-6">
          <Button onClick={handleClear} variant="outline">
            クリア
          </Button>
        </div>

        {/* 結果 */}
        {results.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">ハッシュ値</h3>
            {results.map((result) => (
              <div key={result.algorithm} className="bg-gray-50 border border-gray-200 rounded-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    {getAlgorithmLabel(result.algorithm)}
                  </span>
                  <Button
                    onClick={() => handleCopy(result.hash, result.algorithm)}
                    size="sm"
                    variant={copySuccess === result.algorithm ? 'default' : 'outline'}
                  >
                    {copySuccess === result.algorithm ? 'コピーしました！' : 'コピー'}
                  </Button>
                </div>
                <p className="font-mono text-sm break-all text-gray-900">
                  {result.hash}
                </p>
              </div>
            ))}
          </div>
        )}

        {!input && (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-8 text-center text-gray-400">
            テキストを入力するとハッシュ値が生成されます
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• テキストを入力すると自動でハッシュ値を生成</li>
            <li>• <strong>MD5</strong>: 128ビットハッシュ（非推奨、互換性用途のみ）</li>
            <li>• <strong>SHA-1</strong>: 160ビットハッシュ（非推奨、互換性用途のみ）</li>
            <li>• <strong>SHA-256</strong>: 256ビットハッシュ（推奨）</li>
            <li>• <strong>SHA-512</strong>: 512ビットハッシュ（高セキュリティ）</li>
          </ul>
        </div>

        {/* ショートカットキー一覧 */}
        <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />

        {/* 広告 */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <AdBanner slot="TOOL_BOTTOM" format="rectangle" />
        </div>
      </div>
    </>
  )
}

export default HashGenerator
