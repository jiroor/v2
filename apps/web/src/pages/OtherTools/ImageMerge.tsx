import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function ImageMerge() {
  useToolUsageTracking('/other/image-merge', '画像結合')
  const [images, setImages] = useState<string[]>([])
  const [mergedImage, setMergedImage] = useState<string | null>(null)
  const [direction, setDirection] = useState<'horizontal' | 'vertical'>('horizontal')
  const [gap, setGap] = useState(0)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newImages: string[] = []
    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        newImages.push(event.target?.result as string)
        if (newImages.length === files.length) {
          setImages((prev) => [...prev, ...newImages])
          setMergedImage(null)
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const mergeImages = async () => {
    if (images.length < 2 || !canvasRef.current) return

    setLoading(true)

    try {
      const imgElements = await Promise.all(
        images.map((src) => {
          return new Promise<HTMLImageElement>((resolve) => {
            const img = new Image()
            img.src = src
            img.onload = () => resolve(img)
          })
        })
      )

      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      if (direction === 'horizontal') {
        const totalWidth = imgElements.reduce((sum, img) => sum + img.width, 0) + gap * (imgElements.length - 1)
        const maxHeight = Math.max(...imgElements.map((img) => img.height))
        canvas.width = totalWidth
        canvas.height = maxHeight

        let x = 0
        imgElements.forEach((img) => {
          ctx.drawImage(img, x, 0)
          x += img.width + gap
        })
      } else {
        const maxWidth = Math.max(...imgElements.map((img) => img.width))
        const totalHeight = imgElements.reduce((sum, img) => sum + img.height, 0) + gap * (imgElements.length - 1)
        canvas.width = maxWidth
        canvas.height = totalHeight

        let y = 0
        imgElements.forEach((img) => {
          ctx.drawImage(img, 0, y)
          y += img.height + gap
        })
      }

      setMergedImage(canvas.toDataURL('image/png'))
    } catch (error) {
      console.error('Merge error:', error)
    } finally {
      setLoading(false)
    }
  }

  const downloadImage = () => {
    if (!mergedImage) return
    const link = document.createElement('a')
    link.href = mergedImage
    link.download = 'merged_image.png'
    link.click()
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
    setMergedImage(null)
  }

  const reset = () => {
    setImages([])
    setMergedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <>
      <SEO
        title="画像結合"
        description="複数の画像を1枚に結合するツール。横並び・縦並びに対応。ブラウザ完結で無料。"
        path="/other/image-merge"
        category="DesignApplication"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader
          title="画像結合"
          description="複数の画像を1枚に結合。横並び・縦並び対応。"
        />

        <div className="space-y-6">
          {/* ファイル選択 */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              multiple
              className="hidden"
              id="image-input"
            />
            <label htmlFor="image-input" className="cursor-pointer">
              <div className="text-gray-600">
                <p className="text-lg mb-2">📷 画像を複数選択</p>
                <p className="text-sm">PNG, JPG, WebP対応（複数選択可）</p>
              </div>
            </label>
          </div>

          {/* 選択画像一覧 */}
          {images.length > 0 && (
            <div className="space-y-4">
              <p className="text-sm font-medium">選択画像 ({images.length}枚):</p>
              <div className="flex flex-wrap gap-2">
                {images.map((img, index) => (
                  <div key={index} className="relative">
                    <img src={img} alt={`Image ${index + 1}`} className="w-20 h-20 object-cover rounded border" />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 設定 */}
          {images.length >= 2 && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  variant={direction === 'horizontal' ? 'default' : 'outline'}
                  onClick={() => setDirection('horizontal')}
                >
                  ↔️ 横並び
                </Button>
                <Button
                  variant={direction === 'vertical' ? 'default' : 'outline'}
                  onClick={() => setDirection('vertical')}
                >
                  ↕️ 縦並び
                </Button>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">間隔: {gap}px</label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={gap}
                  onChange={(e) => setGap(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* アクションボタン */}
          {images.length >= 2 && (
            <div className="flex gap-4">
              <Button onClick={mergeImages} disabled={loading}>
                {loading ? '処理中...' : '結合'}
              </Button>
              <Button variant="secondary" onClick={reset}>
                リセット
              </Button>
            </div>
          )}

          {/* 結果 */}
          {mergedImage && (
            <div className="space-y-4">
              <p className="text-sm font-medium">結合結果:</p>
              <img src={mergedImage} alt="Merged" className="max-w-full rounded border" />
              <Button variant="outline" onClick={downloadImage}>
                ダウンロード
              </Button>
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

export default ImageMerge
