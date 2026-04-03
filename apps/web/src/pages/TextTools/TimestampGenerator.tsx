import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'
import { RelatedTools } from '@/components/RelatedTools/RelatedTools'

type Format = 'ymdhms' | 'ymd' | 'hms' | 'unix' | 'iso' | 'custom'

function TimestampGenerator() {
  useToolUsageTracking('/text/timestamp', 'タイムスタンプ生成')
  const [timestamp, setTimestamp] = useState('')
  const [copied, setCopied] = useState(false)
  const [format, setFormat] = useState<Format>('ymdhms')
  const [customFormat, setCustomFormat] = useState('YYYY-MM-DD HH:mm:ss')

  const generateTimestamp = (fmt: Format, custom?: string) => {
    const now = new Date()
    
    const pad = (n: number) => n.toString().padStart(2, '0')
    
    const year = now.getFullYear()
    const month = pad(now.getMonth() + 1)
    const day = pad(now.getDate())
    const hours = pad(now.getHours())
    const minutes = pad(now.getMinutes())
    const seconds = pad(now.getSeconds())

    switch (fmt) {
      case 'ymdhms':
        return `${year}${month}${day}${hours}${minutes}${seconds}`
      case 'ymd':
        return `${year}${month}${day}`
      case 'hms':
        return `${hours}${minutes}${seconds}`
      case 'unix':
        return Math.floor(now.getTime() / 1000).toString()
      case 'iso':
        return now.toISOString()
      case 'custom':
        let result = custom || 'YYYY-MM-DD HH:mm:ss'
        result = result.replace(/YYYY/g, year.toString())
        result = result.replace(/YY/g, year.toString().slice(-2))
        result = result.replace(/MM/g, month)
        result = result.replace(/DD/g, day)
        result = result.replace(/HH/g, hours)
        result = result.replace(/mm/g, minutes)
        result = result.replace(/ss/g, seconds)
        return result
      default:
        return `${year}${month}${day}${hours}${minutes}${seconds}`
    }
  }

  // 自動更新
  useEffect(() => {
    const updateTimestamp = () => {
      setTimestamp(generateTimestamp(format, customFormat))
    }
    
    updateTimestamp()
    const interval = setInterval(updateTimestamp, 1000)
    
    return () => clearInterval(interval)
  }, [format, customFormat])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(timestamp)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  const formats: { value: Format; label: string; example: string }[] = [
    { value: 'ymdhms', label: '日時（20260310084530）', example: 'YYYYMMDDHHmmss' },
    { value: 'ymd', label: '日付（20260310）', example: 'YYYYMMDD' },
    { value: 'hms', label: '時刻（084530）', example: 'HHmmss' },
    { value: 'unix', label: 'Unix時間', example: '1710042330' },
    { value: 'iso', label: 'ISO形式', example: '2026-03-10T08:45:30.000Z' },
    { value: 'custom', label: 'カスタム', example: '自由にフォーマット' },
  ]

  return (
    <>
      <SEO
        path="/text/timestamp"
        title="タイムスタンプ生成"
        description="無料のオンラインタイムスタンプ生成ツール。現在の日時を様々な形式のタイムスタンプとして生成。ファイル名作成やログ記録に便利。"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="タイムスタンプ生成" toolPath="/text/timestamp" shareTitle="タイムスタンプ生成 | Rakit" />

        {/* フォーマット選択 */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {formats.map(({ value, label }) => (
            <Button
              key={value}
              variant={format === value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFormat(value)}
            >
              {label}
            </Button>
          ))}
        </div>

        {/* カスタムフォーマット入力 */}
        {format === 'custom' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              カスタムフォーマット
            </label>
            <input
              type="text"
              value={customFormat}
              onChange={(e) => setCustomFormat(e.target.value)}
              placeholder="YYYY-MM-DD HH:mm:ss"
              className="w-full p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
            <p className="text-xs text-gray-500 mt-1">
              使用可能: YYYY, YY, MM, DD, HH, mm, ss
            </p>
          </div>
        )}

        {/* タイムスタンプ表示 */}
        <div className="p-8 bg-gray-50 rounded-lg text-center">
          <div className="text-4xl font-mono font-bold text-gray-900 mb-4 break-all">
            {timestamp}
          </div>
          <p className="text-sm text-gray-500">
            自動更新中（1秒ごと）
          </p>
        </div>

        {/* アクションボタン */}
        <div className="flex gap-2 mt-4 justify-center">
          <Button onClick={handleCopy}>
            {copied ? 'コピーしました！' : '📋 コピー'}
          </Button>
        </div>

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• <strong>日時</strong>: YYYYMMDDHHmmss形式（ファイル名等に便利）</li>
            <li>• <strong>日付</strong>: YYYYMMDD形式</li>
            <li>• <strong>時刻</strong>: HHmmss形式</li>
            <li>• <strong>Unix時間</strong>: 1970年1月1日からの秒数</li>
            <li>• <strong>ISO形式</strong>: ISO 8601形式</li>
            <li>• <strong>カスタム</strong>: 自由にフォーマット指定</li>
          </ul>
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            タイムスタンプ生成ツールは、現在の日時を様々な形式のタイムスタンプとして生成する無料のオンラインツールです。ファイル名の作成、ログ記録、システム連携などに役立ちます。リアルタイムで自動更新されます。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 6種類のフォーマット</li>
            <li>• カスタムフォーマット対応</li>
            <li>• リアルタイム自動更新</li>
            <li>• 完全無料、インストール不要</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. どのフォーマットがおすすめ？</p>
              <p>A. ファイル名にはYYYYMMDDHHmmss形式、システム連携にはUnix時間が一般的です。</p>
            </div>
            <div>
              <p className="font-medium">Q. タイムゾーンは？</p>
              <p>A. ブラウザのローカルタイムゾーンで生成されます。</p>
            </div>
          </div>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        {/* 関連ツール */}
        <RelatedTools currentPath="/text/timestamp" />
        <AdBanner slot="tools-rectangle" format="rectangle" />
      </div>
    </>
  )
}

export default TimestampGenerator
