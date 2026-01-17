export interface ColorFormats {
  hex: string
  rgb: { r: number; g: number; b: number }
  hsl: { h: number; s: number; l: number }
}

/**
 * HEX形式を正規化（#を付加し、大文字に変換）
 */
export function normalizeHex(hex: string): string {
  let normalized = hex.trim()
  if (!normalized.startsWith('#')) {
    normalized = '#' + normalized
  }
  return normalized.toUpperCase()
}

/**
 * HEX形式が有効かバリデーション
 */
export function isValidHex(hex: string): boolean {
  const hexRegex = /^#[0-9A-F]{6}$/i
  return hexRegex.test(hex)
}

/**
 * HEX → RGB変換
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = normalizeHex(hex)

  if (!isValidHex(normalized)) {
    throw new Error('Invalid HEX color format')
  }

  const r = parseInt(normalized.slice(1, 3), 16)
  const g = parseInt(normalized.slice(3, 5), 16)
  const b = parseInt(normalized.slice(5, 7), 16)

  return { r, g, b }
}

/**
 * RGB → HEX変換
 */
export function rgbToHex(r: number, g: number, b: number): string {
  // 0-255の範囲に制限
  const clampedR = Math.max(0, Math.min(255, Math.round(r)))
  const clampedG = Math.max(0, Math.min(255, Math.round(g)))
  const clampedB = Math.max(0, Math.min(255, Math.round(b)))

  const hexR = clampedR.toString(16).padStart(2, '0')
  const hexG = clampedG.toString(16).padStart(2, '0')
  const hexB = clampedB.toString(16).padStart(2, '0')

  return `#${hexR}${hexG}${hexB}`.toUpperCase()
}

/**
 * RGB → HSL変換
 */
export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  // 0-255 を 0-1 に正規化
  const red = r / 255
  const green = g / 255
  const blue = b / 255

  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)
  const delta = max - min

  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (delta !== 0) {
    // 彩度の計算
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)

    // 色相の計算
    switch (max) {
      case red:
        h = ((green - blue) / delta + (green < blue ? 6 : 0)) / 6
        break
      case green:
        h = ((blue - red) / delta + 2) / 6
        break
      case blue:
        h = ((red - green) / delta + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

/**
 * HSL → RGB変換
 */
export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  // 範囲を正規化
  const hue = ((h % 360) + 360) % 360 // 0-360
  const saturation = Math.max(0, Math.min(100, s)) / 100 // 0-1
  const lightness = Math.max(0, Math.min(100, l)) / 100 // 0-1

  const c = (1 - Math.abs(2 * lightness - 1)) * saturation
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1))
  const m = lightness - c / 2

  let r = 0
  let g = 0
  let b = 0

  if (hue >= 0 && hue < 60) {
    r = c
    g = x
    b = 0
  } else if (hue >= 60 && hue < 120) {
    r = x
    g = c
    b = 0
  } else if (hue >= 120 && hue < 180) {
    r = 0
    g = c
    b = x
  } else if (hue >= 180 && hue < 240) {
    r = 0
    g = x
    b = c
  } else if (hue >= 240 && hue < 300) {
    r = x
    g = 0
    b = c
  } else if (hue >= 300 && hue < 360) {
    r = c
    g = 0
    b = x
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  }
}

/**
 * HEX → HSL変換
 */
export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const rgb = hexToRgb(hex)
  return rgbToHsl(rgb.r, rgb.g, rgb.b)
}

/**
 * HSL → HEX変換
 */
export function hslToHex(h: number, s: number, l: number): string {
  const rgb = hslToRgb(h, s, l)
  return rgbToHex(rgb.r, rgb.g, rgb.b)
}

/**
 * HEX色からすべての形式を生成
 */
export function getColorFormats(hex: string): ColorFormats {
  const normalized = normalizeHex(hex)
  const rgb = hexToRgb(normalized)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

  return {
    hex: normalized,
    rgb,
    hsl,
  }
}

/**
 * RGB形式の文字列をパース（例: "rgb(255, 0, 0)" → {r: 255, g: 0, b: 0}）
 */
export function parseRgbString(rgbString: string): { r: number; g: number; b: number } | null {
  const match = rgbString.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/)
  if (!match) return null

  const r = parseInt(match[1], 10)
  const g = parseInt(match[2], 10)
  const b = parseInt(match[3], 10)

  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) return null

  return { r, g, b }
}

/**
 * HSL形式の文字列をパース（例: "hsl(120, 50%, 50%)" → {h: 120, s: 50, l: 50}）
 */
export function parseHslString(hslString: string): { h: number; s: number; l: number } | null {
  const match = hslString.match(/hsl\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/)
  if (!match) return null

  const h = parseInt(match[1], 10)
  const s = parseInt(match[2], 10)
  const l = parseInt(match[3], 10)

  if (h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100) return null

  return { h, s, l }
}

/**
 * RGB値を文字列形式で返す
 */
export function formatRgb(r: number, g: number, b: number): string {
  return `rgb(${r}, ${g}, ${b})`
}

/**
 * HSL値を文字列形式で返す
 */
export function formatHsl(h: number, s: number, l: number): string {
  return `hsl(${h}, ${s}%, ${l}%)`
}
