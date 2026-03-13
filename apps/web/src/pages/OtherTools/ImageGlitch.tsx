import { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function ImageGlitch() {
  useToolUsageTracking('/other/image-glitch', '画像グリッチ')
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [glitchedImage, setGlitchedImage] = useState<string | null>(null)
  const [intensity, setIntensity] = useState(50)
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string)
      setGlitchedImage(null)
    }
    reader.readAsDataURL(file)
  }

  const applyGlitch = useCallback(async () => {
    if (!originalImage || !canvasRef.current) return

    setLoading(true)

    try {
      const img = new Image()
      img.src = originalImage
      await new Promise((resolve) => { img.onload = resolve })

      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      const glitchAmount = Math.floor(intensity * 2)

      // RGBシフト（カラーグリッチ）
      const shiftAmount = Math.floor(glitchAmount / 5)
      for (let i = 0; i < data.length; i += 4) {
        // Red チャンネルをシフト
        if (i + shiftAmount * 4 < data.length) {
          data[i] = data[i + shiftAmount * 4] || data[i]
        }
        // Blue チャンネルを逆シフト
        if (i - shiftAmount * 4 >= 0) {
          data[i + 2] = data[i - shiftAmount * 4 + 2] || data[i + 2]
        }
      }

      // ランダムノイズ
      for (let i = 0; i < data.length; i += 4) {
        if (Math.random() < glitchAmount / 500) {
          const noise = Math.random() * 255
          data[i] = noise
          data[i + 1] = noise
          data[i + 2] = noise
        }
      }

      // スキャンライン
      const scanlineGap = Math.max(1, Math.floor(50 - glitchAmount / 3))
      for (let y = 0; y < canvas.height; y += scanlineGap) {
        for (let x = 0; x < canvas.width; x++) {
          const i = (y * canvas.width + x) * 4
          data[i] = Math.floor(data[i] * 0.8)
          data[i + 1] = Math.floor(data[i + 1] * 0.8)
          data[i + 2] = Math.floor(data[i + 2] * 0.8)
        }
      }

      ctx.putImageData(imageData, 0, 0)
      setGlitchedImage(canvas.toDataURL('image/png'))
    } catch (error) {
      console.error('Glitch error:', error)
    } finally {
      setLoading(false)
    }
  }, [originalImage, intensity])

  const downloadImage = () => {
    if (!glitchedImage) return
    const link = document.createElement('a')
    link.href = glitchedImage
    link.download = `glitch_${fileName}`
    link.click()
  }

  const reset = () => {
    setOriginalImage(null)
    setGlitchedImage(null)
    setFileName('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <>
      <SEO
        title="画像グリッチ"

        path="/other/image-glitch"
        category="DesignApplication"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader
          title="画像グリッチ"
          toolPath="/other/image-glitch"

        />

        <div className="space-y-6">
          {/* ファイル選択 */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
              id="image-input"
            />
            <label htmlFor="image-input" className="cursor-pointer">
              <div className="text-gray-600">
                <p className="text-lg mb-2">📷 画像を選択</p>
                <p className="text-sm">PNG, JPG, WebP対応</p>
              </div>
            </label>
          </div>

          {/* プレビュー */}
          {originalImage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">元画像</p>
                  <img src={originalImage} alt="Original" className="max-w-full rounded border" />
                </div>
                {glitchedImage && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">グリッチ加工</p>
                    <img src={glitchedImage} alt="Glitched" className="max-w-full rounded border" />
                  </div>
                )}
              </div>

              {/* 強度スライダー */}
              <div className="space-y-2">
                <label className="text-sm font-medium">グリッチ強度: {intensity}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* ボタン */}
              <div className="flex gap-4">
                <Button onClick={applyGlitch} disabled={loading}>
                  {loading ? '処理中...' : 'グリッチ適用'}
                </Button>
                {glitchedImage && (
                  <Button variant="outline" onClick={downloadImage}>
                    ダウンロード
                  </Button>
                )}
                <Button variant="secondary" onClick={reset}>
                  リセット
                </Button>
              </div>
            </div>
          )}

          {/* 非表示キャンバス */}
          <canvas ref={canvasRef} className="hidden" />

          {/* 広告 */}
          <AdBanner slot="TOOL_BOTTOM" format="horizontal" />
        </div>
      </div>
    </>
  )
}

export default ImageGlitch
