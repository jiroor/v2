import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function DateFormatter() {
  useToolUsageTracking('/text/date-format', '日付フォーマット変換')
  const [input, setInput] = useState('')
  const [results, setResults] = useState<{ label: string; value: string }[]>([])
  const [error, setError] = useState('')

  const formatDate = (text: string) => {
    if (!text) {
      setResults([])
      setError('')
      return
    }

    let date: Date | null = null

    // 様々な形式をパース
    const patterns = [
      /^(\d{4})-(\d{1,2})-(\d{1,2})$/, // YYYY-MM-DD
      /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/, // YYYY/MM/DD
      /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, // MM/DD/YYYY
      /^(\d{4})(\d{2})(\d{2})$/, // YYYYMMDD
    ]

    for (const pattern of patterns) {
      const match = text.match(pattern)
      if (match) {
        if (pattern === patterns[2]) {
          // MM/DD/YYYY
          date = new Date(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]))
        } else {
          date = new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]))
        }
        break
      }
    }

    // Unix timestamp
    if (!date && /^\d+$/.test(text)) {
      const timestamp = parseInt(text)
      if (timestamp > 10000000000) {
        date = new Date(timestamp) // ミリ秒
      } else {
        date = new Date(timestamp * 1000) // 秒
      }
    }

    // ISO形式
    if (!date) {
      date = new Date(text)
    }

    if (!date || isNaN(date.getTime())) {
      setError('有効な日付を入力してください')
      setResults([])
      return
    }

    setError('')

    const formats: { label: string; value: string }[] = [
      {
        label: 'YYYY-MM-DD',
        value: date.toISOString().split('T')[0],
      },
      {
        label: 'YYYY/MM/DD',
        value: `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`,
      },
      {
        label: '日本語形式',
        value: `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`,
      },
      {
        label: '曜日付き',
        value: `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日（${['日', '月', '火', '水', '木', '金', '土'][date.getDay()]}）`,
      },
      {
        label: 'Unix時間（秒）',
        value: Math.floor(date.getTime() / 1000).toString(),
      },
      {
        label: 'Unix時間（ミリ秒）',
        value: date.getTime().toString(),
      },
      {
        label: 'ISO 8601',
        value: date.toISOString(),
      },
      {
        label: '時刻付き',
        value: date.toLocaleString('ja-JP'),
      },
    ]

    setResults(formats)
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    formatDate(value)
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
      <SEO
        path="/text/date-format"
        title="日付フォーマット変換"
        description="無料のオンライン日付フォーマット変換ツール。様々な形式の日付を一括で複数のフォーマットに変換。日付入力やISO形式に対応。"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="日付フォーマット変換" toolPath="/text/date-format" shareTitle="日付フォーマット変換 | Rakit" />

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            日付を入力
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="例: 2024-01-15, 2024/01/15, 1705276800"
            className="w-full p-4 border border-gray-200 rounded-md font-mono text-lg focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}

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
            <li>• 様々な形式の日付を入力</li>
            <li>• YYYY-MM-DD, YYYY/MM/DD, Unix時間などに対応</li>
            <li>• 複数のフォーマットに一括変換</li>
            <li>• 日付データの変換や確認に便利</li>
          </ul>
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            日付フォーマット変換ツールは、様々な形式の日付を一括で複数のフォーマットに変換する無料のオンラインツールです。日付入力、Unix時間、ISO形式など、多様な形式に対応しています。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 6種類以上のフォーマットに一括変換</li>
            <li>• Unix時間（秒/ミリ秒）に対応</li>
            <li>• ISO 8601形式出力</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. どのような形式が入力できますか？</p>
              <p>A. YYYY-MM-DD、YYYY/MM/DD、Unix時間など、一般的な日付形式に対応しています。</p>
            </div>
            <div>
              <p className="font-medium">Q. タイムゾーンはどうなりますか？</p>
              <p>A. ブラウザのローカルタイムゾーンで処理されます。</p>
            </div>
          </div>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner slot="tools-rectangle" format="rectangle" />
      </div>
    </>
  )
}

export default DateFormatter
