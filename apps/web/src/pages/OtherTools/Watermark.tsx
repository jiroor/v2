import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function Watermark() {
  useToolUsageTracking('/other/watermark', '透かし追加')
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [watermarkText, setWatermarkText] = useState('Rakit')
  const [opacity, setOpacity] = useState(0.3)
  const [position, setPosition] = useState<'center' | 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'>('bottom-right')
  const [fontSize, setFontSize] = useState(24)
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
      setResultImage(null)
    }
    reader.readAsDataURL(file)
  }

  const applyWatermark = async () => {
    if (!originalImage || !canvasRef.current || !watermarkText) return

    const img = new Image()
    img.src = originalImage
    await new Promise((resolve) => { img.onload = resolve })

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = img.width
    canvas.height = img.height

    // 元画像を描画
    ctx.drawImage(img, 0, 0)

    // 透かしを追加
    ctx.globalAlpha = opacity
    ctx.font = `bold ${fontSize}px Arial`
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)'
    ctx.lineWidth = 2

    const padding = 20
    const textWidth = ctx.measureText(watermarkText).width
    const textHeight = fontSize

    let x: number, y: number

    switch (position) {
      case 'center':
        x = (img.width - textWidth) / 2
        y = img.height / 2
        break
      case 'top-left':
        x = padding
        y = padding + textHeight
        break
      case 'top-right':
        x = img.width - textWidth - padding
        y = padding + textHeight
        break
      case 'bottom-left':
        x = padding
        y = img.height - padding
        break
      case 'bottom-right':
      default:
        x = img.width - textWidth - padding
        y = img.height - padding
    }

    // 縁取り付きテキスト
    ctx.strokeText(watermarkText, x, y)
    ctx.fillText(watermarkText, x, y)

    ctx.globalAlpha = 1
    setResultImage(canvas.toDataURL('image/png'))
  }

  const downloadImage = () => {
    if (!resultImage) return
    const link = document.createElement('a')
    link.href = resultImage
    link.download = `watermarked_${fileName}`
    link.click()
  }

  const reset = () => {
    setOriginalImage(null)
    setResultImage(null)
    setFileName('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const positions = [
    { value: 'bottom-right', label: '右下' },
    { value: 'bottom-left', label: '左下' },
    { value: 'top-right', label: '右上' },
    { value: 'top-left', label: '左上' },
    { value: 'center', label: '中央' },
  ]

  return (
    <>
      <SEO
        title="透かし追加"
        description="画像に透かし（ウォーターマーク）を追加するツール。著作権保護に。ブラウザ完結で無料。"
        path="/other/watermark"
        category="DesignApplication"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader
          title="透かし追加"
          description="画像に透かし（ウォーターマーク）を追加。著作権保護に。"
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
                {resultImage && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">透かし追加後</p>
                    <img src={resultImage} alt="Watermarked" className="max-w-full rounded border" />
                  </div>
                )}
              </div>

              {/* 設定 */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-2">透かしテキスト</label>
                  <Textarea
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    placeholder="透かしテキストを入力"
                    className="w-full"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">位置</label>
                    <div className="flex flex-wrap gap-2">
                      {positions.map((p) => (
                        <Button
                          key={p.value}
                          variant={position === p.value ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setPosition(p.value as typeof position)}
                        >
                          {p.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-2">フォントサイズ: {fontSize}px</label>
                    <input
                      type="range"
                      min="12"
                      max="72"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2">不透明度: {Math.round(opacity * 100)}%</label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={opacity}
                    onChange={(e) => setOpacity(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              {/* アクションボタン */}
              <div className="flex gap-4">
                <Button onClick={applyWatermark} disabled={!watermarkText}>
                  透かしを追加
                </Button>
                {resultImage && (
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

export default Watermark
