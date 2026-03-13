import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function ImageFlip() {
  useToolUsageTracking('/other/image-flip', '画像反転')
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [flippedImage, setFlippedImage] = useState<string | null>(null)
  const [flipType, setFlipType] = useState<'horizontal' | 'vertical' | null>(null)
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
      setFlippedImage(null)
      setFlipType(null)
    }
    reader.readAsDataURL(file)
  }

  const applyFlip = async (type: 'horizontal' | 'vertical') => {
    if (!originalImage || !canvasRef.current) return

    const img = new Image()
    img.src = originalImage
    await new Promise((resolve) => { img.onload = resolve })

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = img.width
    canvas.height = img.height

    // 変換行列を設定
    if (type === 'horizontal') {
      ctx.translate(img.width, 0)
      ctx.scale(-1, 1)
    } else {
      ctx.translate(0, img.height)
      ctx.scale(1, -1)
    }

    ctx.drawImage(img, 0, 0)
    setFlippedImage(canvas.toDataURL('image/png'))
    setFlipType(type)
  }

  const downloadImage = () => {
    if (!flippedImage) return
    const suffix = flipType === 'horizontal' ? '_hflip' : '_vflip'
    const link = document.createElement('a')
    link.href = flippedImage
    link.download = `${fileName.replace(/\.[^/.]+$/, '')}${suffix}.png`
    link.click()
  }

  const reset = () => {
    setOriginalImage(null)
    setFlippedImage(null)
    setFlipType(null)
    setFileName('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <>
      <SEO
        title="画像反転"

        path="/other/image-flip"
        category="DesignApplication"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader
          title="画像反転"
          toolPath="/other/image-flip"

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
                {flippedImage && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      反転後 ({flipType === 'horizontal' ? '左右' : '上下'})
                    </p>
                    <img src={flippedImage} alt="Flipped" className="max-w-full rounded border" />
                  </div>
                )}
              </div>

              {/* 反転ボタン */}
              <div className="space-y-3">
                <label className="text-sm font-medium">反転方向:</label>
                <div className="flex gap-4">
                  <Button
                    variant={flipType === 'horizontal' ? 'default' : 'outline'}
                    onClick={() => applyFlip('horizontal')}
                  >
                    ↔️ 左右反転
                  </Button>
                  <Button
                    variant={flipType === 'vertical' ? 'default' : 'outline'}
                    onClick={() => applyFlip('vertical')}
                  >
                    ↕️ 上下反転
                  </Button>
                </div>
              </div>

              {/* アクションボタン */}
              <div className="flex gap-4">
                {flippedImage && (
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

export default ImageFlip
