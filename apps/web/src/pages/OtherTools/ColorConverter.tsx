import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function ColorConverter() {
  useToolUsageTracking('/other/color-converter', '色変換')
  const [hex, setHex] = useState('#3B82F6')
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 })
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 })
  const [cmyk, setCmyk] = useState({ c: 76, m: 47, y: 0, k: 4 })

  // HEX to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  // RGB to HEX
  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('').toUpperCase()
  }

  // RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h = 0, s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
  }

  // RGB to CMYK
  const rgbToCmyk = (r: number, g: number, b: number) => {
    if (r === 0 && g === 0 && b === 0) return { c: 0, m: 0, y: 0, k: 100 }
    const rr = r / 255, gg = g / 255, bb = b / 255
    const k = 1 - Math.max(rr, gg, bb)
    const c = (1 - rr - k) / (1 - k)
    const m = (1 - gg - k) / (1 - k)
    const y = (1 - bb - k) / (1 - k)
    return { 
      c: Math.round(c * 100), 
      m: Math.round(m * 100), 
      y: Math.round(y * 100), 
      k: Math.round(k * 100) 
    }
  }

  // HSL to RGB
  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360; s /= 100; l /= 100
    let r, g, b

    if (s === 0) {
      r = g = b = l
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1/6) return p + (q - p) * 6 * t
        if (t < 1/2) return q
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
        return p
      }
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1/3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1/3)
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) }
  }

  const updateFromHex = (newHex: string) => {
    setHex(newHex)
    const rgbVal = hexToRgb(newHex)
    if (rgbVal) {
      setRgb(rgbVal)
      setHsl(rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b))
      setCmyk(rgbToCmyk(rgbVal.r, rgbVal.g, rgbVal.b))
    }
  }

  const updateFromRgb = (newRgb: { r: number; g: number; b: number }) => {
    setRgb(newRgb)
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b))
    setCmyk(rgbToCmyk(newRgb.r, newRgb.g, newRgb.b))
  }

  const updateFromHsl = (newHsl: { h: number; s: number; l: number }) => {
    setHsl(newHsl)
    const rgbVal = hslToRgb(newHsl.h, newHsl.s, newHsl.l)
    setRgb(rgbVal)
    setHex(rgbToHex(rgbVal.r, rgbVal.g, rgbVal.b))
    setCmyk(rgbToCmyk(rgbVal.r, rgbVal.g, rgbVal.b))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <SEO
        title="色変換"
        description="HEX, RGB, HSL, CMYKを相互変換するツール。デザイナー・開発者に便利。ブラウザ完結で無料。"
        path="/other/color-converter"
        category="DesignApplication"
      />
      <div className="max-w-[600px] mx-auto py-8 px-4">
        <ToolHeader
          title="色変換"
          description="HEX, RGB, HSL, CMYKを相互変換。"
        />

        <div className="space-y-6">
          {/* プレビュー */}
          <div 
            className="h-24 rounded-lg border shadow-inner"
            style={{ backgroundColor: hex }}
          />

          {/* HEX */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold">HEX</label>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(hex)}>
                コピー
              </Button>
            </div>
            <input
              type="text"
              value={hex}
              onChange={(e) => updateFromHex(e.target.value)}
              className="w-full p-2 border rounded font-mono"
              placeholder="#000000"
            />
          </div>

          {/* RGB */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold">RGB</label>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}>
                コピー
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-gray-500">R</label>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgb.r}
                  onChange={(e) => updateFromRgb({ ...rgb, r: Number(e.target.value) })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">G</label>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgb.g}
                  onChange={(e) => updateFromRgb({ ...rgb, g: Number(e.target.value) })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">B</label>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgb.b}
                  onChange={(e) => updateFromRgb({ ...rgb, b: Number(e.target.value) })}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>

          {/* HSL */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold">HSL</label>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}>
                コピー
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-gray-500">H (色相)</label>
                <input
                  type="number"
                  min="0"
                  max="360"
                  value={hsl.h}
                  onChange={(e) => updateFromHsl({ ...hsl, h: Number(e.target.value) })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">S (彩度)%</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={hsl.s}
                  onChange={(e) => updateFromHsl({ ...hsl, s: Number(e.target.value) })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">L (輝度)%</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={hsl.l}
                  onChange={(e) => updateFromHsl({ ...hsl, l: Number(e.target.value) })}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>

          {/* CMYK */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold">CMYK</label>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`)}>
                コピー
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div>
                <label className="text-xs text-gray-500">C%</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={cmyk.c}
                  readOnly
                  className="w-full p-2 border rounded bg-white"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">M%</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={cmyk.m}
                  readOnly
                  className="w-full p-2 border rounded bg-white"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Y%</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={cmyk.y}
                  readOnly
                  className="w-full p-2 border rounded bg-white"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">K%</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={cmyk.k}
                  readOnly
                  className="w-full p-2 border rounded bg-white"
                />
              </div>
            </div>
          </div>

          {/* 広告 */}
          <AdBanner slot="TOOL_BOTTOM" format="horizontal" />
        </div>
      </div>
    </>
  )
}

export default ColorConverter
