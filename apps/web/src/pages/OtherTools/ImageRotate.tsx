import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function ImageRotate() {
  useToolUsageTracking('/other/image-rotate', '画像回転')
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [rotatedImage, setRotatedImage] = useState<string | null>(null)
  const [rotation, setRotation] = useState(0)
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
      setRotatedImage(null)
      setRotation(0)
    }
    reader.readAsDataURL(file)
  }

  const applyRotation = async (degrees: number) => {
    if (!originalImage || !canvasRef.current) return

    setLoading(true)

    try {
      const img = new Image()
      img.src = originalImage
      await new Promise((resolve) => { img.onload = resolve })

      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // 回転後のサイズを計算
      const radians = (degrees * Math.PI) / 180
      const sin = Math.abs(Math.sin(radians))
      const cos = Math.abs(Math.cos(radians))
      const newWidth = img.width * cos + img.height * sin
      const newHeight = img.width * sin + img.height * cos

      canvas.width = newWidth
      canvas.height = newHeight

      // 中心を原点として回転
      ctx.translate(newWidth / 2, newHeight / 2)
      ctx.rotate(radians)
      ctx.drawImage(img, -img.width / 2, -img.height / 2)

      setRotatedImage(canvas.toDataURL('image/png'))
      setRotation(degrees)
    } catch (error) {
      console.error('Rotation error:', error)
    } finally {
      setLoading(false)
    }
  }

  const downloadImage = () => {
    if (!rotatedImage) return
    const link = document.createElement('a')
    link.href = rotatedImage
    link.download = `rotated_${rotation}deg_${fileName}`
    link.click()
  }

  const reset = () => {
    setOriginalImage(null)
    setRotatedImage(null)
    setRotation(0)
    setFileName('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const presets = [
    { label: '90° 右', value: 90 },
    { label: '180°', value: 180 },
    { label: '90° 左', value: 270 },
  ]

  return (
    <>
      <SEO
        title="画像回転"

        path="/other/image-rotate"
        category="DesignApplication"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader
          title="画像回転"
          toolPath="/other/image-rotate"

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
                {rotatedImage && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">回転後 ({rotation}°)</p>
                    <img src={rotatedImage} alt="Rotated" className="max-w-full rounded border" />
                  </div>
                )}
              </div>

              {/* 回転ボタン */}
              <div className="space-y-3">
                <label className="text-sm font-medium">回転角度:</label>
                <div className="flex flex-wrap gap-2">
                  {presets.map((preset) => (
                    <Button
                      key={preset.value}
                      variant={rotation === preset.value ? 'default' : 'outline'}
                      onClick={() => applyRotation(preset.value)}
                      disabled={loading}
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>

                {/* カスタム角度 */}
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={rotation}
                    onChange={(e) => setRotation(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-12">{rotation}°</span>
                  <Button onClick={() => applyRotation(rotation)} disabled={loading}>
                    適用
                  </Button>
                </div>
              </div>

              {/* アクションボタン */}
              <div className="flex gap-4">
                {rotatedImage && (
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

          {/* このツールについて */}
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="font-semibold mb-2">このツールについて</h3>
            <p className="text-sm text-gray-600 mb-4">
              画像回転ツールは、画像を任意の角度で回転する無料のオンラインツールです。90度単位の回転や、0〜360度の自由な回転に対応しています。
            </p>
          </div>

          {/* 特徴 */}
          <div className="mt-4 p-4 bg-blue-50 rounded-md">
            <h3 className="font-semibold mb-2">特徴</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 90度、180度、270度のプリセット</li>
              <li>• 0〜360度の自由な角度指定</li>
              <li>• PNG形式でダウンロード</li>
              <li>• 完全無料、ブラウザ上で動作</li>
            </ul>
          </div>

          {/* よくある質問 */}
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="font-semibold mb-2">よくある質問</h3>
            <div className="text-sm text-gray-600 space-y-3">
              <div>
                <p className="font-medium">Q. 回転時に余白ができますか？</p>
                <p>A. はい、斜めに回転すると余白ができます。</p>
              </div>
              <div>
                <p className="font-medium">Q. 元のサイズを維持できますか？</p>
                <p>A. 回転に合わせてキャンバスサイズが自動調整されます。</p>
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

export default ImageRotate
