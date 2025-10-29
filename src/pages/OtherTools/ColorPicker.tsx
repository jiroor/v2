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
import styles from './ColorPicker.module.css'

function ColorPicker() {
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
    <div className={styles.container}>
      <h2 className={styles.title}>カラーピッカー</h2>

      <div className={styles.pickerSection}>
        <Label className={styles.pickerLabel}>色を選択</Label>
        <div className={styles.pickerWrapper}>
          <Input
            type="color"
            value={selectedColor}
            onChange={handleColorChange}
            className={styles.colorInput}
          />
          <div className={styles.colorPreview} style={{ backgroundColor: selectedColor }} />
        </div>
      </div>

      <div className={styles.formatsSection}>
        <div className={styles.formatGroup}>
          <Label className={styles.formatLabel}>HEX</Label>
          <div className={styles.formatInputWrapper}>
            <Input
              type="text"
              value={hexInput}
              onChange={handleHexInputChange}
              className={styles.formatInput}
              placeholder="#3B82F6"
            />
            <Button
              onClick={() => handleCopy(colorFormats.hex, 'hex')}
            >
              {copySuccess === 'hex' ? 'コピー済み' : 'コピー'}
            </Button>
          </div>
        </div>

        <div className={styles.formatGroup}>
          <Label className={styles.formatLabel}>RGB</Label>
          <div className={styles.formatInputWrapper}>
            <Input
              type="text"
              value={rgbInput}
              onChange={handleRgbInputChange}
              className={styles.formatInput}
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

        <div className={styles.formatGroup}>
          <Label className={styles.formatLabel}>HSL</Label>
          <div className={styles.formatInputWrapper}>
            <Input
              type="text"
              value={hslInput}
              onChange={handleHslInputChange}
              className={styles.formatInput}
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

      <div className={styles.infoSection}>
        <p className={styles.infoText}>
          各形式の入力フィールドから直接入力することもできます。
        </p>
      </div>

      {/* ショートカットキー一覧 */}
      <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />
    </div>
  )
}

export default ColorPicker
