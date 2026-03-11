import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function TextReplace() {
  useToolUsageTracking('/text/replace', 'テキスト置換')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [search, setSearch] = useState('')
  const [replace, setReplace] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [useRegex, setUseRegex] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [matchCount, setMatchCount] = useState(0)

  const performReplace = (text: string, searchStr: string, replaceStr: string) => {
    if (!text || !searchStr) {
      setOutput(text)
      setMatchCount(0)
      return
    }

    try {
      let count = 0
      
      if (useRegex) {
        const flags = caseSensitive ? 'g' : 'gi'
        const regex = new RegExp(searchStr, flags)
        const result = text.replace(regex, () => {
          count++
          return replaceStr
        })
        setOutput(result)
      } else {
        const searchText = caseSensitive ? searchStr : searchStr.toLowerCase()
        const textToSearch = caseSensitive ? text : text.toLowerCase()
        
        let result = ''
        let lastIndex = 0
        
        for (let i = 0; i <= textToSearch.length - searchText.length; i++) {
          if (textToSearch.substring(i, i + searchText.length) === searchText) {
            result += text.substring(lastIndex, i)
            result += replaceStr
            lastIndex = i + searchText.length
            count++
            i = lastIndex - 1
          }
        }
        result += text.substring(lastIndex)
        setOutput(result)
      }
      
      setMatchCount(count)
    } catch (e) {
      setOutput('正規表現エラー: ' + (e as Error).message)
      setMatchCount(0)
    }
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    setCopySuccess(false)
    performReplace(value, search, replace)
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    performReplace(input, value, replace)
  }

  const handleReplaceChange = (value: string) => {
    setReplace(value)
    performReplace(input, search, value)
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

  const shortcuts = [
    {
      key: 'd',
      description: 'コピー',
      action: handleCopy,
      meta: true,
      disabled: !output,
    },
  ]

  useKeyboardShortcut(shortcuts)

  return (
    <>
      <SEO path="/text/replace" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="テキスト置換" toolPath="/text/replace" shareTitle="テキスト置換 | Rakit" />

        {/* 検索・置換入力 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              検索文字列
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="検索する文字列"
              className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              置換文字列
            </label>
            <input
              type="text"
              value={replace}
              onChange={(e) => handleReplaceChange(e.target.value)}
              placeholder="置換後の文字列"
              className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>
        </div>

        {/* オプション */}
        <div className="flex gap-6 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => {
                setCaseSensitive(e.target.checked)
                performReplace(input, search, replace)
              }}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700">大文字小文字を区別</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useRegex}
              onChange={(e) => {
                setUseRegex(e.target.checked)
                performReplace(input, search, replace)
              }}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700">正規表現を使用</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 入力 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              入力テキスト
            </label>
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="置換したいテキストを入力"
              className="w-full h-64 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706]"
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
              className="w-full h-64 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y bg-gray-50"
            />
          </div>
        </div>

        {/* 統計 */}
        {matchCount > 0 && (
          <div className="mt-4 text-center text-sm text-gray-600">
            <span className="font-medium text-[#d97706]">{matchCount}件</span> 置換しました
          </div>
        )}

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
            <li>• 検索文字列と置換文字列を入力して置換</li>
            <li>• 大文字小文字の区別を切り替え可能</li>
            <li>• 正規表現を使用して高度な置換も可能</li>
            <li>• リアルタイムで置換結果をプレビュー</li>
          </ul>
        </div>

        <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner format="rectangle" />
      </div>
    </>
  )
}

export default TextReplace
