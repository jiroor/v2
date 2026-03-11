import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function NumberFormatter() {
  useToolUsageTracking('/text/number-format', '数値フォーマット変換')
  const [input, setInput] = useState('')
  const [results, setResults] = useState<{ label: string; value: string }[]>([])

  const formatNumber = (text: string) => {
    if (!text) {
      setResults([])
      return
    }

    const num = parseFloat(text.replace(/,/g, ''))
    if (isNaN(num)) {
      setResults([])
      return
    }

    const formats: { label: string; value: string }[] = [
      {
        label: '通貨（¥）',
        value: new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(num),
      },
      {
        label: '通貨（$）',
        value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num),
      },
      {
        label: 'パーセント',
        value: new Intl.NumberFormat('ja-JP', { style: 'percent', minimumFractionDigits: 2 }).format(num / 100),
      },
      {
        label: '3桁区切り',
        value: new Intl.NumberFormat('ja-JP').format(num),
      },
      {
        label: '科学記法',
        value: num.toExponential(4),
      },
      {
        label: 'コンパクト',
        value: new Intl.NumberFormat('ja-JP', { notation: 'compact' }).format(num),
      },
      {
        label: '小数点2桁',
        value: num.toFixed(2),
      },
      {
        label: '整数',
        value: Math.round(num).toLocaleString('ja-JP'),
      },
    ]

    setResults(formats)
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    formatNumber(value)
  }

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      alert('コピーしました')
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  return (
    <>
      <SEO path="/text/number-format" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="数値フォーマット変換" toolPath="/text/number-format" shareTitle="数値フォーマット変換 | Rakit" />

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            数値を入力
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="例: 1234567.89"
            className="w-full p-4 border border-gray-200 rounded-md font-mono text-lg focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {results.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">フォーマット結果</h3>
            <div className="grid gap-3">
              {results.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="text-sm text-gray-600">{label}</div>
                    <div className="font-mono text-lg font-medium">{value}</div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(value)}
                  >
                    コピー
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 数値を入力すると自動で各種フォーマットに変換</li>
            <li>• 通貨（円・ドル）、パーセント、3桁区切りなどに対応</li>
            <li>• 科学記法やコンパクト表記も利用可能</li>
            <li>• 金額表示やレポート作成に便利</li>
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

export default NumberFormatter
