import { useState, useCallback, useMemo } from 'react'
import {
  getColorFormats,
  parseRgbString,
  parseHslString,
  rgbToHex,
  hslToHex,
  formatRgb,
  formatHsl,
  isValidHex,
  normalizeHex,
} from '../../utils/colorUtils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'

function ColorPicker() {
  useToolUsageTracking('/other/color-picker', 'カラーピッカー')
  const [selectedColor, setSelectedColor] = useState('#3B82F6')
  const [hexInput, setHexInput] = useState('#3B82F6')
  const [rgbInput, setRgbInput] = useState('rgb(59, 130, 246)')
  const [hslInput, setHslInput] = useState('hsl(217, 91%, 60%)')
  const [copySuccess, setCopySuccess] = useState<string | null>(null)

  // 選択された色のすべての形式を計算
  const colorFormats = useMemo(() => {
    try {
      return getColorFormats(selectedColor)
    } catch {
      return getColorFormats('#3B82F6')
    }
  }, [selectedColor])

  // 入力フィールドの値を更新
  const updateAllInputs = useCallback((hex: string) => {
    try {
      const formats = getColorFormats(hex)
      setHexInput(formats.hex)
      setRgbInput(formatRgb(formats.rgb.r, formats.rgb.g, formats.rgb.b))
      setHslInput(formatHsl(formats.hsl.h, formats.hsl.s, formats.hsl.l))
      setSelectedColor(formats.hex)
    } catch {
      // エラー時は何もしない
    }
  }, [])

  // カラーピッカーの変更
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value
    updateAllInputs(hex)
  }

  // HEX入力の変更
  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setHexInput(value)

    const normalized = normalizeHex(value)
    if (isValidHex(normalized)) {
      updateAllInputs(normalized)
    }
  }

  // RGB入力の変更
  const handleRgbInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setRgbInput(value)

    const parsed = parseRgbString(value)
    if (parsed) {
      const hex = rgbToHex(parsed.r, parsed.g, parsed.b)
      updateAllInputs(hex)
    }
  }

  // HSL入力の変更
  const handleHslInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setHslInput(value)

    const parsed = parseHslString(value)
    if (parsed) {
      const hex = hslToHex(parsed.h, parsed.s, parsed.l)
      updateAllInputs(hex)
    }
  }

  // コピー機能
  const handleCopy = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(format)
      setTimeout(() => setCopySuccess(null), 2000)
    } catch {
      alert('コピーに失敗しました')
    }
  }

  // HEXコードをコピー
  const handleCopyHex = () => {
    handleCopy(colorFormats.hex, 'hex')
  }

  // ランダムな色を生成
  const handleRandomColor = () => {
    const randomHex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    updateAllInputs(randomHex)
  }

  // キーボードショートカットの設定
  const shortcuts = [
    {
      key: 'd',
      description: 'HEXコードをコピー',
      action: handleCopyHex,
      meta: true,
    },
    {
      key: 'r',
      description: 'ランダムな色を生成',
      action: handleRandomColor,
    },
  ]

  useKeyboardShortcut(shortcuts)

  return (
    <div className="max-w-[600px] mx-auto py-8 px-4">
      <h2 className="text-2xl font-semibold mb-8 text-center">カラーピッカー</h2>

      <div className="bg-gray-50 border border-gray-200 rounded-md p-6 mb-6">
        <Label className="text-base mb-4">色を選択</Label>
        <div className="flex gap-4 items-center">
          <Input
            type="color"
            value={selectedColor}
            onChange={handleColorChange}
            className="w-20 h-20 border-2 border-gray-300 rounded-md cursor-pointer transition-colors hover:border-gray-900"
          />
          <div
            className="flex-1 h-[120px] border-2 border-gray-200 rounded-md transition-all"
            style={{ backgroundColor: selectedColor }}
          />
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-md p-6 mb-4">
        <div className="mb-4">
          <Label>HEX</Label>
          <div className="flex gap-3">
            <Input
              type="text"
              value={hexInput}
              onChange={handleHexInputChange}
              className="flex-1 p-3 text-[15px] font-mono bg-white border border-gray-300 rounded-md transition-colors focus:border-gray-900"
              placeholder="#3B82F6"
            />
            <Button
              onClick={() => handleCopy(colorFormats.hex, 'hex')}
            >
              {copySuccess === 'hex' ? 'コピー済み' : 'コピー'}
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <Label>RGB</Label>
          <div className="flex gap-3">
            <Input
              type="text"
              value={rgbInput}
              onChange={handleRgbInputChange}
              className="flex-1 p-3 text-[15px] font-mono bg-white border border-gray-300 rounded-md transition-colors focus:border-gray-900"
              placeholder="rgb(59, 130, 246)"
            />
            <Button
              onClick={() =>
                handleCopy(
                  formatRgb(colorFormats.rgb.r, colorFormats.rgb.g, colorFormats.rgb.b),
                  'rgb'
                )
              }
            >
              {copySuccess === 'rgb' ? 'コピー済み' : 'コピー'}
            </Button>
          </div>
        </div>

        <div>
          <Label>HSL</Label>
          <div className="flex gap-3">
            <Input
              type="text"
              value={hslInput}
              onChange={handleHslInputChange}
              className="flex-1 p-3 text-[15px] font-mono bg-white border border-gray-300 rounded-md transition-colors focus:border-gray-900"
              placeholder="hsl(217, 91%, 60%)"
            />
            <Button
              onClick={() =>
                handleCopy(
                  formatHsl(colorFormats.hsl.h, colorFormats.hsl.s, colorFormats.hsl.l),
                  'hsl'
                )
              }
            >
              {copySuccess === 'hsl' ? 'コピー済み' : 'コピー'}
            </Button>
          </div>
        </div>
      </div>

      <div className="text-center p-4">
        <p className="text-sm text-gray-600 m-0">
          各形式の入力フィールドから直接入力することもできます。
        </p>
      </div>

      {/* ショートカットキー一覧 */}
      <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />
    </div>
  )
}

export default ColorPicker
