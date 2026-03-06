import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'

function CreditCardChecker() {
  useToolUsageTracking('/other/card-check', 'カード番号チェック')
  const [cardNumber, setCardNumber] = useState('')
  const [result, setResult] = useState<{
    valid: boolean
    type: string
    formatted: string
  } | null>(null)

  const detectCardType = (number: string): string => {
    const cleaned = number.replace(/\D/g, '')

    if (/^4/.test(cleaned)) return 'Visa'
    if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) return 'Mastercard'
    if (/^3[47]/.test(cleaned)) return 'American Express'
    if (/^6(?:011|5)/.test(cleaned)) return 'Discover'
    if (/^(?:2131|1800|35\d{3})/.test(cleaned)) return 'JCB'
    if (/^3(?:0[0-5]|[68])/.test(cleaned)) return 'Diners Club'
    if (/^(636|50(?!66|67|77|87|90))/.test(cleaned)) return 'Maestro'

    return 'Unknown'
  }

  const luhnCheck = (number: string): boolean => {
    const cleaned = number.replace(/\D/g, '')
    if (!/^\d+$/.test(cleaned)) return false

    let sum = 0
    let isEven = false

    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i], 10)

      if (isEven) {
        digit *= 2
        if (digit > 9) digit -= 9
      }

      sum += digit
      isEven = !isEven
    }

    return sum % 10 === 0
  }

  const formatCardNumber = (number: string): string => {
    const cleaned = number.replace(/\D/g, '')
    const groups = cleaned.match(/.{1,4}/g)
    return groups ? groups.join(' ') : cleaned
  }

  const checkCard = () => {
    const cleaned = cardNumber.replace(/\D/g, '')

    if (cleaned.length < 13 || cleaned.length > 19) {
      setResult({
        valid: false,
        type: 'Unknown',
        formatted: formatCardNumber(cardNumber),
      })
      return
    }

    const valid = luhnCheck(cleaned)
    const type = detectCardType(cleaned)
    const formatted = formatCardNumber(cleaned)

    setResult({ valid, type, formatted })
  }

  const handleInputChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    setCardNumber(cleaned)
    setResult(null)
  }

  const handleClear = () => {
    setCardNumber('')
    setResult(null)
  }

  return (
    <>
      <SEO path="/other/card-check" />
      <div className="max-w-[400px] mx-auto py-8 px-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">カード番号チェック</h2>

        {/* 入力 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            カード番号
          </label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="例: 4242424242424242"
            maxLength={19}
            className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
          <p className="text-xs text-gray-500 mt-1">数字のみ入力してください</p>
        </div>

        {/* ボタン */}
        <div className="flex gap-2 mb-6">
          <Button onClick={checkCard} size="lg" className="flex-1">
            チェック
          </Button>
          <Button onClick={handleClear} variant="outline" size="lg" className="flex-1">
            クリア
          </Button>
        </div>

        {/* 結果 */}
        {result && (
          <div className="space-y-3">
            <div className={`p-4 rounded-md border ${result.valid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-2xl ${result.valid ? 'text-green-500' : 'text-red-500'}`}>
                  {result.valid ? '✓' : '✗'}
                </span>
                <span className={`font-bold ${result.valid ? 'text-green-700' : 'text-red-700'}`}>
                  {result.valid ? '有効な番号' : '無効な番号'}
                </span>
              </div>
              <p className="text-sm text-gray-600 font-mono">{result.formatted}</p>
            </div>

            {result.valid && result.type !== 'Unknown' && (
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                <p className="text-sm text-gray-600">カード種類</p>
                <p className="text-lg font-bold">{result.type}</p>
              </div>
            )}
          </div>
        )}

        {/* 注意書き */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h3 className="font-semibold mb-2 text-yellow-800">⚠️ 注意</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• 実際のカード番号は入力しないでください</li>
            <li>• これは番号の形式チェックのみです</li>
            <li>• Luhnアルゴリズムによる検証</li>
          </ul>
        </div>

        {/* 対応カード */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">対応カード</h3>
          <p className="text-sm text-gray-600">
            Visa, Mastercard, American Express, Discover, JCB, Diners Club, Maestro
          </p>
        </div>
      </div>
    </>
  )
}

export default CreditCardChecker
