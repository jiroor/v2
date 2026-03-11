import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function RegexTester() {
  useToolUsageTracking('/text/regex', '正規表現テスト')
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [testString, setTestString] = useState('')
  const [error, setError] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)

  const result = useMemo(() => {
    if (!pattern || !testString) {
      setError('')
      return null
    }

    try {
      const regex = new RegExp(pattern, flags)
      const matches = testString.match(regex)
      setError('')
      return {
        matches: matches ? (flags.includes('g') ? matches : [matches[0]]) : [],
        isValid: true,
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : '無効な正規表現')
      return null
    }
  }, [pattern, flags, testString])

  const handleCopy = async () => {
    if (!result) return

    try {
      await navigator.clipboard.writeText(JSON.stringify(result.matches, null, 2))
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  const toggleFlag = (flag: string) => {
    setFlags(prev => prev.includes(flag) ? prev.replace(flag, '') : prev + flag)
  }

  const highlightMatches = () => {
    if (!pattern || !testString || error) return testString

    try {
      const regex = new RegExp(`(${pattern})`, flags.includes('g') ? flags : flags + 'g')
      return testString.replace(regex, '<mark class="bg-yellow-300 rounded px-0.5">$1</mark>')
    } catch {
      return testString
    }
  }

  const flagsInfo = [
    { flag: 'g', name: 'グローバル', desc: '全てのマッチを検索' },
    { flag: 'i', name: '大文字小文字無視', desc: '大文字小文字を区別しない' },
    { flag: 'm', name: '複数行', desc: '^と$が行の先頭・末尾にマッチ' },
    { flag: 's', name: 'ドット全マッチ', desc: '.が改行にもマッチ' },
  ]

  const shortcuts = [
    {
      key: 'd',
      description: '結果をコピー',
      action: handleCopy,
      meta: true,
      disabled: !result || result.matches.length === 0,
    },
  ]

  useKeyboardShortcut(shortcuts)

  return (
    <>
      <SEO path="/text/regex" />
      <div className="max-w-[900px] mx-auto py-8 px-4">
        <ToolHeader title="正規表現テスト" toolPath="/text/regex" shareTitle="正規表現テスト | Rakit" />

        {/* パターン入力 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            正規表現パターン
          </label>
          <div className="flex gap-2">
            <div className="flex items-center bg-gray-100 border border-gray-200 rounded-l-md px-3 text-gray-500 font-mono">
              /
            </div>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="例: \d+"
              className="flex-1 p-3 border border-l-0 border-gray-200 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
            <div className="flex items-center bg-gray-100 border border-gray-200 border-l-0 rounded-r-md px-3 text-gray-500 font-mono">
              /{flags}
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>

        {/* フラグ選択 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            フラグ
          </label>
          <div className="flex flex-wrap gap-2">
            {flagsInfo.map(({ flag, name, desc }) => (
              <button
                key={flag}
                onClick={() => toggleFlag(flag)}
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  flags.includes(flag)
                    ? 'bg-[#d97706] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title={desc}
              >
                {flag} ({name})
              </button>
            ))}
          </div>
        </div>

        {/* テスト文字列 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            テスト文字列
          </label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="テストしたい文字列を入力"
            className="w-full h-40 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {/* 結果表示 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            マッチ結果
          </label>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
            {result && result.matches.length > 0 ? (
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  {result.matches.length}件のマッチ:
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {result.matches.map((match, i) => (
                    <span
                      key={i}
                      className="bg-yellow-200 px-2 py-1 rounded font-mono text-sm"
                    >
                      {match}
                    </span>
                  ))}
                </div>
                <Button onClick={handleCopy} size="sm">
                  {copySuccess ? 'コピーしました！' : '結果をコピー'}
                </Button>
              </div>
            ) : pattern && testString && !error ? (
              <p className="text-gray-500">マッチなし</p>
            ) : (
              <p className="text-gray-400">結果がここに表示されます</p>
            )}
          </div>
        </div>

        {/* ハイライト表示 */}
        {testString && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ハイライト表示
            </label>
            <div
              className="bg-white border border-gray-200 rounded-md p-4 font-mono text-sm whitespace-pre-wrap break-all"
              dangerouslySetInnerHTML={{ __html: highlightMatches() }}
            />
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 正規表現パターンを入力してテスト</li>
            <li>• フラグをクリックでオン/オフ切り替え</li>
            <li>• マッチした部分がハイライト表示</li>
            <li>• JavaScriptの正規表現構文に対応</li>
          </ul>
        </div>

        {/* よく使うパターン */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よく使うパターン</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <button onClick={() => setPattern('\\d+')} className="text-left p-2 hover:bg-gray-100 rounded font-mono">
              <span className="text-[#d97706]">\d+</span> - 数字
            </button>
            <button onClick={() => setPattern('[a-zA-Z]+')} className="text-left p-2 hover:bg-gray-100 rounded font-mono">
              <span className="text-[#d97706]">[a-zA-Z]+</span> - アルファベット
            </button>
            <button onClick={() => setPattern('[\\w.-]+@[\\w.-]+\\.\\w+')} className="text-left p-2 hover:bg-gray-100 rounded font-mono">
              <span className="text-[#d97706]">メール</span> - メールアドレス
            </button>
            <button onClick={() => setPattern('https?://[\\w./-]+')} className="text-left p-2 hover:bg-gray-100 rounded font-mono">
              <span className="text-[#d97706]">URL</span> - URL
            </button>
          </div>
        </div>

        <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />

        {/* 広告 */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <AdBanner slot="tools-rectangle" format="rectangle" />
        </div>
      </div>
    </>
  )
}

export default RegexTester
