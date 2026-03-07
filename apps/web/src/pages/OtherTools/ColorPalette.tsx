import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'

function generateRandomColor(): string {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

function ColorPalette() {
  useToolUsageTracking('/other/color-palette', 'カラーパレット生成')
  const [colors, setColors] = useState<string[]>([
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEAA7',
  ])
  const [lockedColors, setLockedColors] = useState<Set<number>>(new Set())

  const generatePalette = useCallback(() => {
    const newColors = colors.map((color, index) =>
      lockedColors.has(index) ? color : generateRandomColor()
    )
    setColors(newColors)
  }, [colors, lockedColors])

  const toggleLock = (index: number) => {
    const newLocked = new Set(lockedColors)
    if (newLocked.has(index)) {
      newLocked.delete(index)
    } else {
      newLocked.add(index)
    }
    setLockedColors(newLocked)
  }

  const copyColor = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color)
      alert(`${color} をコピーしました`)
    } catch {
      alert('コピーに失敗しました')
    }
  }

  const addColor = () => {
    if (colors.length < 10) {
      setColors([...colors, generateRandomColor()])
    }
  }

  const removeColor = (index: number) => {
    if (colors.length > 2) {
      const newColors = colors.filter((_, i) => i !== index)
      setColors(newColors)
      const newLocked = new Set(lockedColors)
      newLocked.delete(index)
      setLockedColors(newLocked)
    }
  }

  return (
    <>
      <SEO path="/other/color-palette" />
      <div className="max-w-[600px] mx-auto py-8 px-4">
        <ToolHeader title="カラーパレット生成" toolPath="/other/color-palette" shareTitle="カラーパレット生成 | Rakit" />

        {/* パレット */}
        <div className="flex flex-wrap gap-2 mb-6">
          {colors.map((color, index) => (
            <div
              key={index}
              className="relative group"
              style={{ width: `${100 / Math.min(colors.length, 5)}%`, minWidth: '60px' }}
            >
              <div
                className="aspect-square rounded-lg cursor-pointer transition-transform hover:scale-105"
                style={{ backgroundColor: color }}
                onClick={() => copyColor(color)}
              >
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: getContrastColor(color) }}
                >
                  <span className="text-xs font-mono">{color}</span>
                </div>
              </div>
              <div className="flex justify-center gap-1 mt-1">
                <button
                  onClick={() => toggleLock(index)}
                  className={`text-xs px-2 py-1 rounded ${lockedColors.has(index) ? 'bg-[#d97706] text-white' : 'bg-gray-100'}`}
                >
                  {lockedColors.has(index) ? '🔒' : '🔓'}
                </button>
                {colors.length > 2 && (
                  <button
                    onClick={() => removeColor(index)}
                    className="text-xs px-2 py-1 rounded bg-red-100 text-red-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ボタン */}
        <div className="flex gap-2 mb-6">
          <Button onClick={generatePalette} size="lg" className="flex-1">
            新しいパレット
          </Button>
          {colors.length < 10 && (
            <Button onClick={addColor} variant="outline" size="lg">
              +追加
            </Button>
          )}
        </div>

        {/* カラーコード一覧 */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6">
          <h3 className="font-semibold mb-2 text-sm">カラーコード</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color, index) => (
              <button
                key={index}
                onClick={() => copyColor(color)}
                className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-mono hover:bg-gray-100"
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* 使い方 */}
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 「新しいパレット」でランダム生成</li>
            <li>• 色をクリックでコピー</li>
            <li>• 🔒で色を固定（再生成時に変更されない）</li>
            <li>• 最大10色まで追加可能</li>
            <li>• Webデザイン、グラフィック制作に便利</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default ColorPalette
