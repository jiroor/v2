import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'

// 固定レート（実際のAPIを使用する場合は更新が必要）
const RATES: Record<string, number> = {
  USD: 150.5,
  EUR: 162.3,
  GBP: 190.2,
  CNY: 20.8,
  KRW: 0.112,
  AUD: 98.5,
  CAD: 110.3,
  CHF: 170.8,
  HKD: 19.2,
  SGD: 112.5,
}

const CURRENCY_NAMES: Record<string, string> = {
  USD: 'アメリカドル',
  EUR: 'ユーロ',
  GBP: 'イギリスポンド',
  CNY: '中国人民元',
  KRW: '韓国ウォン',
  AUD: 'オーストラリアドル',
  CAD: 'カナダドル',
  CHF: 'スイスフラン',
  HKD: '香港ドル',
  SGD: 'シンガポールドル',
}

function CurrencyConverter() {
  useToolUsageTracking('/other/currency', '為替計算')
  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('JPY')
  const [result, setResult] = useState<number | null>(null)
  const [rate, setRate] = useState<number | null>(null)

  useEffect(() => {
    if (fromCurrency === 'JPY') {
      setRate(1)
    } else {
      setRate(RATES[fromCurrency] || null)
    }
  }, [fromCurrency])

  const convert = () => {
    const amountNum = parseFloat(amount)
    if (isNaN(amountNum) || !rate) {
      setResult(null)
      return
    }

    let converted: number

    if (fromCurrency === 'JPY') {
      // JPY to other
      if (toCurrency === 'JPY') {
        converted = amountNum
      } else {
        const toRate = RATES[toCurrency] || 1
        converted = amountNum / toRate
      }
    } else if (toCurrency === 'JPY') {
      // other to JPY
      converted = amountNum * rate
    } else {
      // other to other (via JPY)
      const jpyAmount = amountNum * rate
      const toRate = RATES[toCurrency] || 1
      converted = jpyAmount / toRate
    }

    setResult(converted)
  }

  const swapCurrencies = () => {
    const temp = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temp)
    setResult(null)
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString('ja-JP', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const currencies = Object.keys(RATES)

  return (
    <>
      <SEO path="/other/currency" />
      <div className="max-w-[400px] mx-auto py-8 px-4">
        <ToolHeader title="為替計算" toolPath="/other/currency" shareTitle="為替計算 | Rakit" />

        {/* 金額入力 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">金額</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="例: 100"
            className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {/* 通貨選択 */}
        <div className="flex gap-2 items-center mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">から</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            >
              <option value="JPY">日本円 (JPY)</option>
              {currencies.map((code) => (
                <option key={code} value={code}>
                  {CURRENCY_NAMES[code]} ({code})
                </option>
              ))}
            </select>
          </div>

          <Button onClick={swapCurrencies} variant="outline" size="sm" className="mt-6">
            ↔
          </Button>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">へ</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            >
              <option value="JPY">日本円 (JPY)</option>
              {currencies.map((code) => (
                <option key={code} value={code}>
                  {CURRENCY_NAMES[code]} ({code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* レート表示 */}
        {rate && fromCurrency !== 'JPY' && (
          <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-md text-sm">
            <span className="text-gray-600">参考レート: </span>
            <span className="font-mono font-bold">1 {fromCurrency} = {rate} JPY</span>
          </div>
        )}

        {/* 計算ボタン */}
        <Button onClick={convert} size="lg" className="w-full mb-6">
          計算
        </Button>

        {/* 結果 */}
        {result !== null && (
          <div className="bg-[#fef3c7] border border-[#d97706] rounded-md p-6 text-center">
            <p className="text-sm text-gray-600 mb-1">変換結果</p>
            <p className="text-3xl font-bold text-[#d97706]">
              {formatNumber(result)} {toCurrency}
            </p>
          </div>
        )}

        {/* 注意書き */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h3 className="font-semibold mb-2 text-yellow-800">⚠️ 注意</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• 表示レートは参考値です</li>
            <li>• 実際の取引レートとは異なります</li>
            <li>• 正確なレートは金融機関でご確認ください</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default CurrencyConverter
