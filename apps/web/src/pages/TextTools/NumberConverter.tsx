import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'
import { RelatedTools } from '@/components/RelatedTools/RelatedTools'

type Base = 'decimal' | 'binary' | 'octal' | 'hex'

function NumberConverter() {
  useToolUsageTracking('/text/number', '数字変換')
  const [values, setValues] = useState({
    decimal: '',
    binary: '',
    octal: '',
    hex: '',
  })
  const [copySuccess, setCopySuccess] = useState<Base | null>(null)
  const [error, setError] = useState('')

  const baseConfig: Record<Base, { label: string; radix: number; prefix: string }> = {
    decimal: { label: '10進数', radix: 10, prefix: '' },
    binary: { label: '2進数', radix: 2, prefix: '0b' },
    octal: { label: '8進数', radix: 8, prefix: '0o' },
    hex: { label: '16進数', radix: 16, prefix: '0x' },
  }

  const convertFrom = (base: Base, value: string) => {
    setError('')
    setCopySuccess(null)

    if (!value.trim()) {
      setValues({ decimal: '', binary: '', octal: '', hex: '' })
      return
    }

    // プレフィックスを削除
    const cleanValue = value.replace(/^0[xbo]/i, '')

    try {
      const num = parseInt(cleanValue, baseConfig[base].radix)

      if (isNaN(num)) {
        setError(`無効な${baseConfig[base].label}です`)
        setValues({ decimal: '', binary: '', octal: '', hex: '' })
        return
      }

      if (num < 0) {
        setError('正の整数のみ対応しています')
        setValues({ decimal: '', binary: '', octal: '', hex: '' })
        return
      }

      // JavaScriptの最大安全整数を超える場合はBigIntを使用
      if (num > Number.MAX_SAFE_INTEGER) {
        setError('数値が大きすぎます')
        setValues({ decimal: '', binary: '', octal: '', hex: '' })
        return
      }

      setValues({
        decimal: num.toString(10),
        binary: num.toString(2),
        octal: num.toString(8),
        hex: num.toString(16).toUpperCase(),
      })
    } catch (e) {
      setError('変換に失敗しました')
      setValues({ decimal: '', binary: '', octal: '', hex: '' })
    }
  }

  const handleInputChange = (base: Base, value: string) => {
    convertFrom(base, value)
  }

  const handleCopy = async (value: string, base: Base) => {
    if (!value) return

    try {
      await navigator.clipboard.writeText(value)
      setCopySuccess(base)
      setTimeout(() => setCopySuccess(null), 2000)
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  const shortcuts = [
    {
      key: 'd',
      description: 'コピー（10進数）',
      action: () => values.decimal && handleCopy(values.decimal, 'decimal'),
      meta: true,
      disabled: !values.decimal,
    },
  ]

  useKeyboardShortcut(shortcuts)

  return (
    <>
      <SEO
        path="/text/number"
        title="数字変換（基数変換）"
        description="無料のオンライン数字変換ツール。10進数、2進数、8進数、16進数を相互変換。プログラミングやデジタル回路の学習に便利。"
      />
      <div className="max-w-[600px] mx-auto py-8 px-4">
        <ToolHeader title="数字変換（基数変換）" toolPath="/text/number" shareTitle="数字変換 | Rakit" />

        {/* エラー表示 */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-md p-3 mb-4">
            {error}
          </div>
        )}

        {/* 各基数の入力・表示 */}
        <div className="space-y-4">
          {(Object.entries(baseConfig) as [Base, typeof baseConfig.decimal][]).map(([base, { label, prefix }]) => (
            <div key={base}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
              </label>
              <div className="flex gap-2">
                {prefix && (
                  <div className="flex items-center bg-gray-100 border border-gray-200 rounded-l-md px-3 text-gray-500 font-mono text-sm">
                    {prefix}
                  </div>
                )}
                <input
                  type="text"
                  value={values[base]}
                  onChange={(e) => handleInputChange(base, e.target.value)}
                  placeholder={`${label}を入力`}
                  className={`flex-1 p-3 border border-gray-200 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706] ${
                    prefix ? '' : 'rounded-l-md'
                  } rounded-r-md`}
                />
                <Button
                  onClick={() => handleCopy(values[base], base)}
                  disabled={!values[base]}
                  variant={copySuccess === base ? 'default' : 'outline'}
                >
                  {copySuccess === base ? '✓' : 'コピー'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• いずれかの欄に数値を入力すると自動変換</li>
            <li>• <strong>2進数</strong>: 0と1のみ（プレフィックス: 0b）</li>
            <li>• <strong>8進数</strong>: 0〜7（プレフィックス: 0o）</li>
            <li>• <strong>16進数</strong>: 0〜9, A〜F（プレフィックス: 0x）</li>
            <li>• 正の整数のみ対応</li>
          </ul>
        </div>

        <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            数字変換（基数変換）ツールは、10進数、2進数、8進数、16進数を相互変換する無料のオンラインツールです。プログラミングやデジタル回路の学習、データ解析などで役立ちます。いずれかの基数を入力すると、他の基数にリアルタイムで変換されます。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 4種類の基数を相互変換</li>
            <li>• リアルタイムで結果を表示</li>
            <li>• プレフィックス表示（0b, 0o, 0x）</li>
            <li>• 完全無料、インストール不要</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. 負の数は変換できますか？</p>
              <p>A. 現在は正の整数のみ対応しています。</p>
            </div>
            <div>
              <p className="font-medium">Q. 小数は変換できますか？</p>
              <p>A. 現在は整数のみ対応しています。</p>
            </div>
          </div>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        {/* 関連ツール */}
        <RelatedTools currentPath="/text/number" />
        <AdBanner slot="TOOL_BOTTOM" format="rectangle" />
      </div>
    </>
  )
}

export default NumberConverter
