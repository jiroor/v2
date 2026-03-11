import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function CSVPreview() {
  useToolUsageTracking('/text/csv-preview', 'CSVプレビュー')
  const [input, setInput] = useState('')
  const [data, setData] = useState<string[][]>([])
  const [error, setError] = useState('')
  const [delimiter, setDelimiter] = useState(',')

  const parseCSV = (text: string, delim: string) => {
    if (!text.trim()) {
      setData([])
      setError('')
      return
    }

    try {
      const lines = text.split('\n').filter(line => line.trim())
      const parsed = lines.map(line => {
        // シンプルなCSVパース（引用符対応）
        const result: string[] = []
        let current = ''
        let inQuotes = false

        for (let i = 0; i < line.length; i++) {
          const char = line[i]

          if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
              current += '"'
              i++
            } else {
              inQuotes = !inQuotes
            }
          } else if (char === delim && !inQuotes) {
            result.push(current.trim())
            current = ''
          } else {
            current += char
          }
        }
        result.push(current.trim())
        return result
      })

      setData(parsed)
      setError('')
    } catch (e) {
      setError('CSVの解析に失敗しました')
      setData([])
    }
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    parseCSV(value, delimiter)
  }

  const handleDelimiterChange = (newDelimiter: string) => {
    setDelimiter(newDelimiter)
    parseCSV(input, newDelimiter)
  }

  const stats = {
    rows: data.length,
    cols: data.length > 0 ? Math.max(...data.map(row => row.length)) : 0,
  }

  return (
    <>
      <SEO path="/text/csv-preview" />
      <div className="max-w-[1000px] mx-auto py-8 px-4">
        <ToolHeader title="CSVプレビュー" toolPath="/text/csv-preview" shareTitle="CSVプレビュー | Rakit" />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CSV入力
          </label>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="名前,年齢,都市&#10;太郎,25,東京&#10;花子,30,大阪"
            className="w-full h-40 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        <div className="mb-4 flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">区切り文字:</label>
          <div className="flex gap-2">
            <Button
              variant={delimiter === ',' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleDelimiterChange(',')}
            >
              カンマ (,)
            </Button>
            <Button
              variant={delimiter === '\t' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleDelimiterChange('\t')}
            >
              タブ
            </Button>
            <Button
              variant={delimiter === ';' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleDelimiterChange(';')}
            >
              セミコロン (;)
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}

        {data.length > 0 && (
          <>
            <div className="mb-4 p-3 bg-gray-50 rounded-md flex gap-6">
              <span className="text-sm text-gray-600">行数: <strong>{stats.rows}</strong></span>
              <span className="text-sm text-gray-600">列数: <strong>{stats.cols}</strong></span>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-md">
              <table className="w-full border-collapse">
                <tbody>
                  {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex === 0 ? 'bg-gray-100 font-medium' : ''}>
                      {row.map((cell, colIndex) => (
                        <td
                          key={colIndex}
                          className="border border-gray-200 px-4 py-2 text-sm whitespace-nowrap"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• CSVデータを貼り付けると表形式でプレビュー</li>
            <li>• 区切り文字を切り替え可能（カンマ/タブ/セミコロン）</li>
            <li>• 1行目はヘッダーとして太字で表示</li>
            <li>• 引用符（"）で囲まれた値に対応</li>
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

export default CSVPreview
