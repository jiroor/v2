import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'
import { RelatedTools } from '@/components/RelatedTools/RelatedTools'

type JoinMode = 'none' | 'space' | 'comma' | 'newline' | 'custom'

function TextJoinerAdvanced() {
  useToolUsageTracking('/text/join-adv', 'テキスト結合（詳細）')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<JoinMode>('comma')
  const [customSeparator, setCustomSeparator] = useState('')
  const [prefix, setPrefix] = useState('')
  const [suffix, setSuffix] = useState('')
  const [removeEmpty, setRemoveEmpty] = useState(true)
  const [copySuccess, setCopySuccess] = useState(false)

  const joinText = (text: string, joinMode: JoinMode) => {
    if (!text) {
      setOutput('')
      return
    }

    let lines = text.split('\n')
    
    if (removeEmpty) {
      lines = lines.filter(line => line.trim() !== '')
    }

    let separator = ''
    switch (joinMode) {
      case 'none':
        separator = ''
        break
      case 'space':
        separator = ' '
        break
      case 'comma':
        separator = ', '
        break
      case 'newline':
        separator = '\n'
        break
      case 'custom':
        separator = customSeparator
        break
    }

    let result = lines.join(separator)
    
    if (prefix) {
      result = prefix + result
    }
    if (suffix) {
      result = result + suffix
    }

    setOutput(result)
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    setCopySuccess(false)
    joinText(value, mode)
  }

  const handleModeChange = (newMode: JoinMode) => {
    setMode(newMode)
    joinText(input, newMode)
  }

  const handleCustomSeparatorChange = (value: string) => {
    setCustomSeparator(value)
    if (mode === 'custom') {
      joinText(input, mode)
    }
  }

  const handlePrefixChange = (value: string) => {
    setPrefix(value)
    joinText(input, mode)
  }

  const handleSuffixChange = (value: string) => {
    setSuffix(value)
    joinText(input, mode)
  }

  const handleRemoveEmptyChange = (checked: boolean) => {
    setRemoveEmpty(checked)
    joinText(input, mode)
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

  const modeOptions: { value: JoinMode; label: string }[] = [
    { value: 'none', label: 'なし' },
    { value: 'space', label: 'スペース' },
    { value: 'comma', label: 'カンマ' },
    { value: 'newline', label: '改行' },
    { value: 'custom', label: 'カスタム' },
  ]

  return (
    <>
      <SEO
        path="/text/join-adv"
        title="テキスト結合（詳細）"
        description="無料のオンラインテキスト結合ツール。区切り文字、接頭辞、接尾辞を指定可能。SQLのIN句作成やCSV作成など柔軟な結合に対応。"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="テキスト結合（詳細）" toolPath="/text/join-adv" shareTitle="テキスト結合（詳細） | Rakit" />

        {/* オプション */}
        <div className="mb-4 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-gray-700">区切り文字:</span>
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
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">カスタム区切り:</span>
              <input
                type="text"
                value={customSeparator}
                onChange={(e) => handleCustomSeparatorChange(e.target.value)}
                placeholder="区切り文字"
                className="w-32 p-2 border border-gray-200 rounded-md font-mono text-sm"
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">先頭:</span>
              <input
                type="text"
                value={prefix}
                onChange={(e) => handlePrefixChange(e.target.value)}
                placeholder="例: ["
                className="w-32 p-2 border border-gray-200 rounded-md font-mono text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">末尾:</span>
              <input
                type="text"
                value={suffix}
                onChange={(e) => handleSuffixChange(e.target.value)}
                placeholder="例: ]"
                className="w-32 p-2 border border-gray-200 rounded-md font-mono text-sm"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={removeEmpty}
              onChange={(e) => handleRemoveEmptyChange(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700">空行を削除</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 入力 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              入力テキスト（1行ずつ結合）
            </label>
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="各行を結合したいテキストを入力"
              className="w-full h-48 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>

          {/* 出力 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              結果
            </label>
            <textarea
              value={output}
              readOnly
              className="w-full h-48 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y bg-gray-50"
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
            <li>• 複数行のテキストを1行に結合</li>
            <li>• 区切り文字を選択（スペース、カンマ、カスタム）</li>
            <li>• 先頭・末尾に文字を追加可能</li>
            <li>• SQLのIN句作成やCSV作成に便利</li>
          </ul>
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            テキスト結合（詳細版）は、複数行のテキストを柔軟に結合する無料のオンラインツールです。区切り文字、接頭辞、接尾辞を指定でき、SQLのIN句作成やCSV作成などに最適です。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 先頭・末尾の文字を追加可能</li>
            <li>• 空行の削除オプション</li>
            <li>• カスタム区切り文字</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. SQLのIN句を作成できますか？</p>
              <p>A. はい、先頭に「(」、末尾に「)」を追加して、区切り文字を「,」に設定してください。</p>
            </div>
            <div>
              <p className="font-medium">Q. 空行はどうなりますか？</p>
              <p>A. デフォルトで空行は削除されます。オフにすることも可能です。</p>
            </div>
          </div>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        {/* 関連ツール */}
        <RelatedTools currentPath="/text/join-adv" />
        <AdBanner slot="tools-rectangle" format="rectangle" />
      </div>
    </>
  )
}

export default TextJoinerAdvanced
