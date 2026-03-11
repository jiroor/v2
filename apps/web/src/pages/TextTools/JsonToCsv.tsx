import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function JsonToCsv() {
  useToolUsageTracking('/text/json-to-csv', 'JSON to CSV')
  const [jsonInput, setJsonInput] = useState('')
  const [csvOutput, setCsvOutput] = useState('')
  const [error, setError] = useState('')

  const convert = () => {
    setError('')
    setCsvOutput('')

    if (!jsonInput.trim()) {
      setError('JSONを入力してください')
      return
    }

    try {
      const data = JSON.parse(jsonInput)

      if (!Array.isArray(data)) {
        setError('JSON配列を入力してください')
        return
      }

      if (data.length === 0) {
        setError('空の配列です')
        return
      }

      // ヘッダーを取得
      const headers = Object.keys(data[0])

      // CSV生成
      const csvLines: string[] = []

      // ヘッダー行
      csvLines.push(headers.map(h => escapeCsvField(h)).join(','))

      // データ行
      data.forEach(item => {
        const row = headers.map(header => {
          const value = item[header]
          if (value === null || value === undefined) {
            return ''
          }
          if (typeof value === 'object') {
            return escapeCsvField(JSON.stringify(value))
          }
          return escapeCsvField(String(value))
        })
        csvLines.push(row.join(','))
      })

      setCsvOutput(csvLines.join('\n'))
    } catch (e) {
      setError('JSONのパースに失敗しました: ' + (e as Error).message)
    }
  }

  const escapeCsvField = (field: string): string => {
    if (field.includes(',') || field.includes('"') || field.includes('\n')) {
      return `"${field.replace(/"/g, '""')}"`
    }
    return field
  }

  const handleCopy = async () => {
    if (!csvOutput) return
    try {
      await navigator.clipboard.writeText(csvOutput)
      alert('コピーしました')
    } catch {
      alert('コピーに失敗しました')
    }
  }

  const handleDownload = () => {
    if (!csvOutput) return
    const blob = new Blob(['\ufeff' + csvOutput], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'data.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleClear = () => {
    setJsonInput('')
    setCsvOutput('')
    setError('')
  }

  return (
    <>
      <SEO path="/text/json-to-csv" />
      <div className="max-w-[600px] mx-auto py-8 px-4">
        <ToolHeader title="JSON to CSV変換" toolPath="/text/json-to-csv" shareTitle="JSON to CSV変換 | Rakit" />

        {/* JSON入力 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            JSON（配列形式）
          </label>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='[{"name": "田中", "age": 30}, {"name": "佐藤", "age": 25}]'
            rows={8}
            className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {/* ボタン */}
        <div className="flex gap-2 mb-4">
          <Button onClick={convert} size="lg" className="flex-1">
            変換
          </Button>
          <Button onClick={handleClear} variant="outline" size="lg" className="flex-1">
            クリア
          </Button>
        </div>

        {/* エラー */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* CSV出力 */}
        {csvOutput && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CSV
            </label>
            <textarea
              value={csvOutput}
              readOnly
              rows={8}
              className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm bg-gray-50"
            />
            <div className="flex gap-2 mt-2">
              <Button onClick={handleCopy} variant="outline" size="sm" className="flex-1">
                コピー
              </Button>
              <Button onClick={handleDownload} size="sm" className="flex-1">
                ダウンロード
              </Button>
            </div>
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• JSON配列を入力してCSVに変換</li>
            <li>• Excel/スプレッドシートで開ける形式</li>
            <li>• ネストされたオブジェクトはJSON文字列化</li>
            <li>• Excel対応のUTF-8 BOM付きでダウンロード</li>
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

export default JsonToCsv
