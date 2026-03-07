import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

type CaseType = 'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'pascal' | 'snake' | 'kebab' | 'constant'

function CaseConverter() {
  useToolUsageTracking('/text/case', 'ケース変換')
  const [input, setInput] = useState('')
  const [copySuccess, setCopySuccess] = useState<CaseType | null>(null)

  const toCamelCase = (str: string): string => {
    return str
      .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
      .replace(/^(.)/, (c) => c.toLowerCase())
  }

  const toPascalCase = (str: string): string => {
    const camel = toCamelCase(str)
    return camel.charAt(0).toUpperCase() + camel.slice(1)
  }

  const toSnakeCase = (str: string): string => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/[-\s]+/g, '_')
      .toLowerCase()
  }

  const toKebabCase = (str: string): string => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[_\s]+/g, '-')
      .toLowerCase()
  }

  const toConstantCase = (str: string): string => {
    return toSnakeCase(str).toUpperCase()
  }

  const toTitleCase = (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[-_\s]+(.)?/g, (_, c) => (c ? ' ' + c.toUpperCase() : ' '))
      .replace(/^./, (c) => c.toUpperCase())
      .trim()
  }

  const toSentenceCase = (str: string): string => {
    const lower = str.toLowerCase()
    return lower.charAt(0).toUpperCase() + lower.slice(1)
  }

  const conversions: Record<CaseType, { label: string; convert: (s: string) => string }> = {
    upper: { label: '大文字 (UPPERCASE)', convert: (s) => s.toUpperCase() },
    lower: { label: '小文字 (lowercase)', convert: (s) => s.toLowerCase() },
    title: { label: 'タイトルケース (Title Case)', convert: toTitleCase },
    sentence: { label: '文形式 (Sentence case)', convert: toSentenceCase },
    camel: { label: 'キャメルケース (camelCase)', convert: toCamelCase },
    pascal: { label: 'パスカルケース (PascalCase)', convert: toPascalCase },
    snake: { label: 'スネークケース (snake_case)', convert: toSnakeCase },
    kebab: { label: 'ケバブケース (kebab-case)', convert: toKebabCase },
    constant: { label: '定数形式 (CONSTANT_CASE)', convert: toConstantCase },
  }

  const handleCopy = async (text: string, type: CaseType) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(type)
      setTimeout(() => setCopySuccess(null), 2000)
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  const shortcuts = [
    {
      key: 'd',
      description: 'コピー（最初の結果）',
      action: () => input && handleCopy(conversions.upper.convert(input), 'upper'),
      meta: true,
      disabled: !input,
    },
  ]

  useKeyboardShortcut(shortcuts)

  return (
    <>
      <SEO path="/text/case" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="ケース変換" toolPath="/text/case" shareTitle="ケース変換 | Rakit" />

        {/* 入力 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            入力テキスト
          </label>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              setCopySuccess(null)
            }}
            placeholder="変換したいテキストを入力"
            className="w-full h-32 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {/* 変換結果 */}
        {input && (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700">変換結果</h3>
            {(Object.entries(conversions) as [CaseType, typeof conversions.upper][]).map(([type, { label, convert }]) => {
              const result = convert(input)
              return (
                <div key={type} className="bg-gray-50 border border-gray-200 rounded-md p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">{label}</span>
                    <Button
                      onClick={() => handleCopy(result, type)}
                      size="sm"
                      variant={copySuccess === type ? 'default' : 'ghost'}
                      className="text-xs h-6"
                    >
                      {copySuccess === type ? '✓' : 'コピー'}
                    </Button>
                  </div>
                  <p className="font-mono text-sm break-all text-gray-900">{result}</p>
                </div>
              )
            })}
          </div>
        )}

        {!input && (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-8 text-center text-gray-400">
            テキストを入力すると変換結果が表示されます
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• テキストを入力すると全てのケース形式に自動変換</li>
            <li>• <strong>キャメルケース</strong>: JavaScript変数名に使用</li>
            <li>• <strong>スネークケース</strong>: Python変数名、データベースカラム名に使用</li>
            <li>• <strong>ケバブケース</strong>: CSS、URLに使用</li>
          </ul>
        </div>

        <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />

        {/* 広告 */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <AdBanner format="rectangle" />
        </div>
      </div>
    </>
  )
}

export default CaseConverter
