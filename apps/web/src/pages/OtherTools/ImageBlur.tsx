import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function ImageBlur() {
  useToolUsageTracking('/other/image-blur', '画像ぼかし')
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [blurredImage, setBlurredImage] = useState<string | null>(null)
  const [blurAmount, setBlurAmount] = useState(10)
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
      setBlurredImage(null)
    }
    reader.readAsDataURL(file)
  }

  const applyBlur = async () => {
    if (!originalImage || !canvasRef.current) return

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

    // CSS filterを使用してぼかし効果を適用
    ctx.filter = `blur(${blurAmount}px)`
    ctx.drawImage(img, 0, 0)
    ctx.filter = 'none'

    setBlurredImage(canvas.toDataURL('image/png'))
  }

  const downloadImage = () => {
    if (!blurredImage) return
    const link = document.createElement('a')
    link.href = blurredImage
    link.download = `blurred_${fileName.replace(/\.[^/.]+$/, '')}.png`
    link.click()
  }

  const reset = () => {
    setOriginalImage(null)
    setBlurredImage(null)
    setFileName('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <>
      <SEO
        title="画像ぼかし"

        path="/other/image-blur"
        category="UtilitiesApplication"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader
          title="画像ぼかし"
          toolPath="/other/image-blur"

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
                {blurredImage && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">ぼかし適用後</p>
                    <img src={blurredImage} alt="Blurred" className="max-w-full rounded border" />
                  </div>
                )}
              </div>

              {/* ぼかし強度 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">ぼかし強度: {blurAmount}px</label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={blurAmount}
                  onChange={(e) => setBlurAmount(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setBlurAmount(5)}>軽い</Button>
                  <Button variant="outline" size="sm" onClick={() => setBlurAmount(15)}>中程度</Button>
                  <Button variant="outline" size="sm" onClick={() => setBlurAmount(30)}>強い</Button>
                </div>
              </div>

              {/* アクションボタン */}
              <div className="flex gap-4">
                <Button onClick={applyBlur}>
                  ぼかし適用
                </Button>
                {blurredImage && (
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

          {/* 説明 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">💡 使い道</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• SNS投稿時の顔ぼかし</li>
              <li>• 個人情報（住所、電話番号など）の秘匿</li>
              <li>• プライバシー保護</li>
            </ul>
          </div>

          {/* このツールについて */}
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="font-semibold mb-2">このツールについて</h3>
            <p className="text-sm text-gray-600 mb-4">
              画像ぼかしツールは、画像にぼかし効果を追加する無料のオンラインツールです。SNS投稿時の顔ぼかしや、個人情報の秘匿など、プライバシー保護に役立ちます。
            </p>
          </div>

          {/* 特徴 */}
          <div className="mt-4 p-4 bg-blue-50 rounded-md">
            <h3 className="font-semibold mb-2">特徴</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• ぼかし強度を1〜50pxで調整</li>
              <li>• 3段階のプリセット</li>
              <li>• PNG形式でダウンロード</li>
              <li>• 完全無料、ブラウザ上で動作</li>
            </ul>
          </div>

          {/* よくある質問 */}
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="font-semibold mb-2">よくある質問</h3>
            <div className="text-sm text-gray-600 space-y-3">
              <div>
                <p className="font-medium">Q. ぼかしは元に戻せますか？</p>
                <p>A. いいえ、一度適用したぼかしは解除できません。元画像を別途保存してください。</p>
              </div>
              <div>
                <p className="font-medium">Q. 一部だけぼかせますか？</p>
                <p>A. 現在は画像全体へのぼかしのみ対応しています。</p>
              </div>
            </div>
          </div>

          {/* 非表示キャンバス */}
          <canvas ref={canvasRef} className="hidden" />

          {/* 広告 */}
          <AdBanner slot="TOOL_BOTTOM" format="horizontal" />
        </div>
      </div>
    </>
  )
}

export default ImageBlur
