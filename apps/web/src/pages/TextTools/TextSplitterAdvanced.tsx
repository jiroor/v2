import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

type SplitMode = 'chars' | 'words' | 'lines' | 'custom'

function TextSplitterAdvanced() {
  useToolUsageTracking('/text/split-adv', 'テキスト分割（詳細）')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>([])
  const [mode, setMode] = useState<SplitMode>('custom')
  const [separator, setSeparator] = useState(',')

  const splitText = (text: string, splitMode: SplitMode) => {
    if (!text) {
      setOutput([])
      return
    }

    let result: string[] = []

    switch (splitMode) {
      case 'chars':
        result = text.split('')
        break
      case 'words':
        result = text.split(/\s+/).filter(w => w)
        break
      case 'lines':
        result = text.split('\n').filter(l => l)
        break
      case 'custom':
        if (separator) {
          result = text.split(separator)
        } else {
          result = [text]
        }
        break
    }

    setOutput(result)
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    splitText(value, mode)
  }

  const handleModeChange = (newMode: SplitMode) => {
    setMode(newMode)
    splitText(input, newMode)
  }

  const handleSeparatorChange = (value: string) => {
    setSeparator(value)
    if (mode === 'custom') {
      splitText(input, mode)
    }
  }

  const handleCopy = async () => {
    if (output.length === 0) return

    try {
      await navigator.clipboard.writeText(output.join('\n'))
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  const handleCopyAsArray = async () => {
    if (output.length === 0) return

    try {
      await navigator.clipboard.writeText(JSON.stringify(output, null, 2))
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  const modeOptions: { value: SplitMode; label: string }[] = [
    { value: 'chars', label: '文字単位' },
    { value: 'words', label: '単語単位' },
    { value: 'lines', label: '行単位' },
    { value: 'custom', label: 'カスタム' },
  ]

  return (
    <>
      <SEO path="/text/split-adv" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="テキスト分割（詳細）" toolPath="/text/split-adv" shareTitle="テキスト分割（詳細） | Rakit" />

        {/* モード選択 */}
        <div className="mb-4 flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-gray-700">分割方法:</span>
          <div className="flex flex-wrap gap-2">
            {modeOptions.map(({ value, label }) => (
              <Button
                key={value}
                variant={mode === value ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleModeChange(value)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {mode === 'custom' && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm text-gray-600">区切り文字:</span>
            <input
              type="text"
              value={separator}
              onChange={(e) => handleSeparatorChange(e.target.value)}
              placeholder="区切り文字"
              className="w-32 p-2 border border-gray-200 rounded-md font-mono text-sm"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 入力 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              入力テキスト
            </label>
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="分割したいテキストを入力"
              className="w-full h-48 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>

          {/* 出力 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              分割結果 ({output.length}件)
            </label>
            <div className="h-48 p-4 border border-gray-200 rounded-md bg-gray-50 overflow-y-auto">
              {output.length > 0 ? (
                <ul className="space-y-1">
                  {output.map((item, index) => (
                    <li key={index} className="font-mono text-sm bg-white p-2 rounded border flex">
                      <span className="text-gray-400 mr-2">{index + 1}.</span>
                      <span className="break-all">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-center py-8">結果なし</p>
              )}
            </div>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex gap-2 mt-4 justify-center">
          <Button onClick={handleCopy} disabled={output.length === 0}>
            📋 行でコピー
          </Button>
          <Button onClick={handleCopyAsArray} disabled={output.length === 0} variant="outline">
            📋 JSON配列でコピー
          </Button>
        </div>

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• テキストを指定した単位で分割</li>
            <li>• 文字単位、単語単位、行単位、カスタム区切りに対応</li>
            <li>• 結果をリストまたはJSON配列でコピー</li>
            <li>• データ解析やテキスト処理に便利</li>
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

export default TextSplitterAdvanced
