import { useState } from 'react'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import { RelatedTools } from '@/components/RelatedTools/RelatedTools'
import AdBanner from '@/components/Ads/AdBanner'

// Color conversion utilities
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

function rgbToCmyk(r: number, g: number, b: number) {
  let c = 1 - r / 255
  let m = 1 - g / 255
  let y = 1 - b / 255
  const k = Math.min(c, m, y)

  c = Math.round(((c - k) / (1 - k)) * 100) || 0
  m = Math.round(((m - k) / (1 - k)) * 100) || 0
  y = Math.round(((y - k) / (1 - k)) * 100) || 0

  return {
    c,
    m,
    y,
    k: Math.round(k * 100),
  }
}

function ColorConverter() {
  const [hex, setHex] = useState('#3B82F6')

  const rgb = hexToRgb(hex) || { r: 0, g: 0, b: 0 }
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <SEO
        path="/other/color-converter"
        title="色変換"
        description="無料のオンライン色変換ツール。HEX、RGB、HSLなど色形式を相互変換。Webデザインやグラフィック制作に便利。"
      />
      <div className="max-w-[600px] mx-auto py-8 px-4">
        <ToolHeader
          title="色変換"
          toolPath="/other/color-converter"
        />

        <div className="space-y-6">
          <div
            className="h-24 rounded-lg border shadow-inner"
            style={{ backgroundColor: hex }}
          />

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold">HEX</label>
              <button
                onClick={() => copyToClipboard(hex)}
                className="text-sm text-blue-600 hover:underline"
              >
                コピー
              </button>
            </div>
            <input
              type="text"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="w-full p-2 border rounded font-mono"
              placeholder="#000000"
            />
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold">RGB</label>
              <button
                onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                className="text-sm text-blue-600 hover:underline"
              >
                コピー
              </button>
            </div>
            <div className="font-mono">rgb({rgb.r}, {rgb.g}, {rgb.b})</div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold">HSL</label>
              <button
                onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
                className="text-sm text-blue-600 hover:underline"
              >
                コピー
              </button>
            </div>
            <div className="font-mono">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold">CMYK</label>
              <button
                onClick={() => copyToClipboard(`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`)}
                className="text-sm text-blue-600 hover:underline"
              >
                コピー
              </button>
            </div>
            <div className="font-mono">cmyk({cmyk.c}%, {cmyk.m}%, {cmyk.y}%, {cmyk.k}%)</div>
          </div>

          <AdBanner slot="TOOL_BOTTOM" format="rectangle" />

          {/* このツールについて */}
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="font-semibold mb-2">このツールについて</h3>
            <p className="text-sm text-gray-600 mb-4">
              色変換ツールは、HEX、RGB、HSL、CMYKの色コードを相互変換する無料のオンラインツールです。Webデザイン、印刷、グラフィック制作で色コードの変換に役立ちます。
            </p>
          </div>

          {/* 特徴 */}
          <div className="mt-4 p-4 bg-blue-50 rounded-md">
            <h3 className="font-semibold mb-2">特徴</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• HEX、RGB、HSL、CMYKに対応</li>
              <li>• リアルタイムで変換</li>
              <li>• 各形式をクリックでコピー</li>
              <li>• 完全無料、ブラウザ上で動作</li>
            </ul>
          </div>

          {/* よくある質問 */}
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="font-semibold mb-2">よくある質問</h3>
            <div className="text-sm text-gray-600 space-y-3">
              <div>
                <p className="font-medium">Q. CMYKは何に使いますか？</p>
                <p>A. 印刷用途の色指定に使われます。WebではRGBやHEXを使用します。</p>
              </div>
              <div>
                <p className="font-medium">Q. HSLのメリットは？</p>
                <p>A. 色相・彩度・明度を個別に調整できるため、色の微調整に便利です。</p>
              </div>
            </div>
          </div>

          {/* 関連ツール */}
          <RelatedTools currentPath="/other/color-converter" />
        </div>
      </div>
    </>
  )
}

export default ColorConverter
