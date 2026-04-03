import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

type UnitType = 'length' | 'weight' | 'temperature' | 'area' | 'volume'

interface Unit {
  name: string
  symbol: string
  toBase: (value: number) => number
  fromBase: (value: number) => number
}

const units: Record<UnitType, Record<string, Unit>> = {
  length: {
    m: { name: 'メートル', symbol: 'm', toBase: (v) => v, fromBase: (v) => v },
    km: { name: 'キロメートル', symbol: 'km', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    cm: { name: 'センチメートル', symbol: 'cm', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    mm: { name: 'ミリメートル', symbol: 'mm', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    in: { name: 'インチ', symbol: 'in', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    ft: { name: 'フィート', symbol: 'ft', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    yd: { name: 'ヤード', symbol: 'yd', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
    mi: { name: 'マイル', symbol: 'mi', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
  },
  weight: {
    kg: { name: 'キログラム', symbol: 'kg', toBase: (v) => v, fromBase: (v) => v },
    g: { name: 'グラム', symbol: 'g', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    mg: { name: 'ミリグラム', symbol: 'mg', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
    lb: { name: 'ポンド', symbol: 'lb', toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
    oz: { name: 'オンス', symbol: 'oz', toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
  },
  temperature: {
    c: { name: '摂氏', symbol: '°C', toBase: (v) => v, fromBase: (v) => v },
    f: { name: '華氏', symbol: '°F', toBase: (v) => (v - 32) * 5/9, fromBase: (v) => v * 9/5 + 32 },
    k: { name: 'ケルビン', symbol: 'K', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
  },
  area: {
    m2: { name: '平方メートル', symbol: 'm²', toBase: (v) => v, fromBase: (v) => v },
    km2: { name: '平方キロメートル', symbol: 'km²', toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
    ha: { name: 'ヘクタール', symbol: 'ha', toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
    acre: { name: 'エーカー', symbol: 'acre', toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
    ft2: { name: '平方フィート', symbol: 'ft²', toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
  },
  volume: {
    l: { name: 'リットル', symbol: 'L', toBase: (v) => v, fromBase: (v) => v },
    ml: { name: 'ミリリットル', symbol: 'mL', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    m3: { name: '立方メートル', symbol: 'm³', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    gal: { name: 'ガロン（米）', symbol: 'gal', toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
  },
}

function UnitConverter() {
  useToolUsageTracking('/other/unit', '単位変換')
  const [type, setType] = useState<UnitType>('length')
  const [fromUnit, setFromUnit] = useState('m')
  const [toUnit, setToUnit] = useState('km')
  const [fromValue, setFromValue] = useState('')
  const [toValue, setToValue] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)

  const convert = (value: string, from: string, to: string) => {
    if (!value || isNaN(parseFloat(value))) {
      setToValue('')
      return
    }

    const num = parseFloat(value)
    const baseValue = units[type][from].toBase(num)
    const result = units[type][to].fromBase(baseValue)
    setToValue(result.toPrecision(10).replace(/\.?0+$/, ''))
  }

  const handleFromValueChange = (value: string) => {
    setFromValue(value)
    setCopySuccess(false)
    convert(value, fromUnit, toUnit)
  }

  const handleFromUnitChange = (unit: string) => {
    setFromUnit(unit)
    convert(fromValue, unit, toUnit)
  }

  const handleToUnitChange = (unit: string) => {
    setToUnit(unit)
    convert(fromValue, fromUnit, unit)
  }

  const handleTypeChange = (newType: UnitType) => {
    setType(newType)
    const unitKeys = Object.keys(units[newType])
    setFromUnit(unitKeys[0])
    setToUnit(unitKeys[1] || unitKeys[0])
    setFromValue('')
    setToValue('')
  }

  const handleCopy = async () => {
    if (!toValue) return
    try {
      await navigator.clipboard.writeText(toValue)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch {
      alert('コピーに失敗しました')
    }
  }

  const swapUnits = () => {
    const temp = fromUnit
    setFromUnit(toUnit)
    setToUnit(temp)
    setFromValue(toValue)
    convert(toValue, toUnit, temp)
  }

  return (
    <>
      <SEO path="/other/unit" title="単位変換" description="無料のオンライン単位変換ツール。長さ、重さ、温度など各種単位を相互変換。国際単位の換算に便利。" />
      <div className="max-w-[600px] mx-auto py-8 px-4">
        <ToolHeader title="単位変換" toolPath="/other/unit" shareTitle="単位変換 | Rakit" />

        {/* タイプ選択 */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {[
            { key: 'length', label: '長さ' },
            { key: 'weight', label: '重さ' },
            { key: 'temperature', label: '温度' },
            { key: 'area', label: '面積' },
            { key: 'volume', label: '体積' },
          ].map(({ key, label }) => (
            <Button
              key={key}
              variant={type === key ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTypeChange(key as UnitType)}
            >
              {label}
            </Button>
          ))}
        </div>

        {/* 変換 */}
        <div className="space-y-4">
          {/* From */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">変換元</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={fromValue}
                onChange={(e) => handleFromValueChange(e.target.value)}
                placeholder="値を入力"
                className="flex-1 p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
              />
              <select
                value={fromUnit}
                onChange={(e) => handleFromUnitChange(e.target.value)}
                className="w-32 p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
              >
                {Object.entries(units[type]).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.symbol}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap */}
          <div className="flex justify-center">
            <Button onClick={swapUnits} variant="outline" size="sm">
              ↑↓ 入れ替え
            </Button>
          </div>

          {/* To */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">変換先</label>
            <div className="flex gap-2">
              <div className="flex-1 p-3 border border-gray-200 rounded-md font-mono text-sm bg-gray-50">
                {toValue || '---'}
              </div>
              <select
                value={toUnit}
                onChange={(e) => handleToUnitChange(e.target.value)}
                className="w-32 p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
              >
                {Object.entries(units[type]).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.symbol}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* コピー */}
        {toValue && (
          <div className="mt-4 text-center">
            <Button onClick={handleCopy} size="sm">
              {copySuccess ? 'コピーしました！' : '結果をコピー'}
            </Button>
          </div>
        )}

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            単位変換ツールは、長さ、重さ、温度、面積、体積などの単位を変換する無料のオンラインツールです。メートル、フィート、キログラム、ポンド、摂氏、華氏など、様々な単位に対応しています。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 5種類の単位カテゴリ</li>
            <li>• 双方向の変換に対応</li>
            <li>• 一括で入れ替え</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. どの単位に対応していますか？</p>
              <p>A. 長さ（m, km, ft, mile等）、重さ（g, kg, lb等）、温度（℃、℉）、面積、体積に対応しています。</p>
            </div>
            <div>
              <p className="font-medium">Q. 精度はどのくらいですか？</p>
              <p>A. 一般的な計算に十分な精度ですが、科学的な用途には専門ツールをご利用ください。</p>
            </div>
          </div>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner slot="TOOL_BOTTOM" format="rectangle" />
      </div>
    </>
  )
}

export default UnitConverter
