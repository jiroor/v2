import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function TextWrapper() {
  useToolUsageTracking('/text/wrap', 'テキストラップ')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [width, setWidth] = useState(80)
  const [copySuccess, setCopySuccess] = useState(false)

  const wrapText = (text: string, maxWidth: number) => {
    if (!text) {
      setOutput('')
      return
    }

    const lines = text.split('\n')
    const wrappedLines: string[] = []

    for (const line of lines) {
      if (line.length <= maxWidth) {
        wrappedLines.push(line)
      } else {
        // 単語単位で分割してラップ
        const words = line.split(/(\s+)/)
        let currentLine = ''

        for (const word of words) {
          if (currentLine.length + word.length <= maxWidth) {
            currentLine += word
          } else {
            if (currentLine) {
              wrappedLines.push(currentLine.trim())
            }
            // 単語自体が長い場合は強制的に分割
            if (word.length > maxWidth) {
              for (let i = 0; i < word.length; i += maxWidth) {
                wrappedLines.push(word.slice(i, i + maxWidth))
              }
              currentLine = ''
            } else {
              currentLine = word
            }
          }
        }
        if (currentLine) {
          wrappedLines.push(currentLine.trim())
        }
      }
    }

    setOutput(wrappedLines.join('\n'))
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    setCopySuccess(false)
    wrapText(value, width)
  }

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth)
    wrapText(input, newWidth)
  }

  const handleCopy = async () => {
    if (!output) return

    try {
      await navigator.clipboard.writeText(output)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  const presets = [
    { label: '40文字', width: 40 },
    { label: '72文字', width: 72 },
    { label: '80文字', width: 80 },
    { label: '100文字', width: 100 },
  ]

  const inputStats = {
    lines: input.split('\n').length,
    chars: input.length,
  }

  const outputStats = {
    lines: output.split('\n').length,
    chars: output.length,
  }

  return (
    <>
      <SEO path="/text/wrap" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="テキストラップ" toolPath="/text/wrap" shareTitle="テキストラップ | Rakit" />

        <div className="mb-4 flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">幅:</label>
          <input
            type="number"
            value={width}
            onChange={(e) => handleWidthChange(parseInt(e.target.value) || 80)}
            min={10}
            max={200}
            className="w-20 p-2 border border-gray-200 rounded-md text-center"
          />
          <span className="text-sm text-gray-600">文字</span>
          <div className="flex gap-2 ml-4">
            {presets.map((preset) => (
              <Button
                key={preset.label}
                variant={width === preset.width ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleWidthChange(preset.width)}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 入力 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              入力テキスト ({inputStats.lines}行, {inputStats.chars}文字)
            </label>
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="ラップしたいテキストを入力"
              className="w-full h-64 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>

          {/* 出力 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              結果 ({outputStats.lines}行, {outputStats.chars}文字)
            </label>
            <textarea
              value={output}
              readOnly
              className="w-full h-64 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y bg-gray-50"
            />
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex gap-2 mt-4 justify-center">
          <Button onClick={handleCopy} disabled={!output}>
            {copySuccess ? 'コピーしました！' : 'コピー'}
          </Button>
        </div>

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 指定した幅でテキストを折り返し</li>
            <li>• 単語単位で分割して読みやすく整形</li>
            <li>• メールやドキュメントの整形に便利</li>
            <li>• プリセットからよく使う幅を選択可能</li>
          </ul>
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            テキストラップツールは、テキストを指定した幅で折り返す無料のオンラインツールです。メールやドキュメントの整形、コードのフォーマットなどに役立ちます。40、72、80、100文字のプリセットを搭載しています。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 10〜200文字で幅を指定可能</li>
            <li>• 4つのプリセット</li>
            <li>• 単語単位で分割</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. 日本語はどうなりますか？</p>
              <p>A. 日本語は文字単位で折り返されます。</p>
            </div>
            <div>
              <p className="font-medium">Q. 72文字がおすすめな理由は？</p>
              <p>A. メールやコードの標準的な折り返し幅として使われます。</p>
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

export default TextWrapper
