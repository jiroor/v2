import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import { RelatedTools } from '@/components/RelatedTools/RelatedTools'
import AdBanner from '@/components/Ads/AdBanner'

function ImageCropCircle() {
  useToolUsageTracking('/other/image-crop-circle', '画像トリミング（円形）')
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [size, setSize] = useState(200)
  const [shape, setShape] = useState<'circle' | 'square'>('circle')
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
      setCroppedImage(null)
    }
    reader.readAsDataURL(file)
  }

  const cropImage = async () => {
    if (!originalImage || !canvasRef.current) return

    const img = new Image()
    img.src = originalImage
    await new Promise((resolve) => { img.onload = resolve })

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 正方形にクロップ（中央から）
    const minDim = Math.min(img.width, img.height)
    const sx = (img.width - minDim) / 2
    const sy = (img.height - minDim) / 2

    canvas.width = size
    canvas.height = size

    if (shape === 'circle') {
      // 円形にクリップ
      ctx.beginPath()
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()
    }

    ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size)

    setCroppedImage(canvas.toDataURL('image/png'))
  }

  const downloadImage = () => {
    if (!croppedImage) return
    const link = document.createElement('a')
    link.href = croppedImage
    link.download = `cropped_${shape}_${fileName.replace(/\.[^/.]+$/, '')}.png`
    link.click()
  }

  const reset = () => {
    setOriginalImage(null)
    setCroppedImage(null)
    setFileName('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const sizes = [
    { label: '100px', value: 100 },
    { label: '200px', value: 200 },
    { label: '300px', value: 300 },
    { label: '400px', value: 400 },
    { label: '500px', value: 500 },
  ]

  return (
    <>
      <SEO
        path="/other/image-crop-circle"
        title="画像円形切り抜き"
        description="無料のオンライン画像円形切り抜きツール。画像を丸く切り抜き。プロフィールアイコン作成に最適。"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader
          title="画像トリミング（円形・正方形）"
          toolPath="/other/image-crop-circle"

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
                {croppedImage && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">{shape === 'circle' ? '円形' : '正方形'}トリミング</p>
                    <img 
                      src={croppedImage} 
                      alt="Cropped" 
                      className="rounded border"
                      style={{ width: size, height: size }}
                    />
                  </div>
                )}
              </div>

              {/* 形状選択 */}
              <div className="space-y-3">
                <label className="text-sm font-medium">形状:</label>
                <div className="flex gap-4">
                  <Button
                    variant={shape === 'circle' ? 'default' : 'outline'}
                    onClick={() => setShape('circle')}
                  >
                    ⭕ 円形
                  </Button>
                  <Button
                    variant={shape === 'square' ? 'default' : 'outline'}
                    onClick={() => setShape('square')}
                  >
                    ⬜ 正方形
                  </Button>
                </div>
              </div>

              {/* サイズ選択 */}
              <div className="space-y-3">
                <label className="text-sm font-medium">サイズ:</label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <Button
                      key={s.value}
                      variant={size === s.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSize(s.value)}
                    >
                      {s.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* アクションボタン */}
              <div className="flex gap-4">
                <Button onClick={cropImage}>
                  トリミング
                </Button>
                {croppedImage && (
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
              <li>• Twitter、Instagram、LINEなどのプロフィール画像</li>
              <li>• アイコン画像の作成</li>
              <li>• サムネイル画像の作成</li>
            </ul>
          </div>

          {/* このツールについて */}
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="font-semibold mb-2">このツールについて</h3>
            <p className="text-sm text-gray-600 mb-4">
              円形トリミングツールは、画像を円形または正方形にトリミングする無料のオンラインツールです。プロフィール画像やアイコンの作成に最適です。
            </p>
          </div>

          {/* 特徴 */}
          <div className="mt-4 p-4 bg-blue-50 rounded-md">
            <h3 className="font-semibold mb-2">特徴</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 円形・正方形を選択可能</li>
              <li>• 4種類のサイズ（64〜512px）</li>
              <li>• 中央から自動トリミング</li>
              <li>• 完全無料、ブラウザ上で動作</li>
            </ul>
          </div>

          {/* よくある質問 */}
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="font-semibold mb-2">よくある質問</h3>
            <div className="text-sm text-gray-600 space-y-3">
              <div>
                <p className="font-medium">Q. どの部分がトリミングされますか？</p>
                <p>A. 画像の中央部分がトリミングされます。</p>
              </div>
              <div>
                <p className="font-medium">Q. 背景は透過されますか？</p>
                <p>A. はい、円形の場合は透過背景のPNGで出力されます。</p>
              </div>
            </div>
          </div>

          {/* 非表示キャンバス */}
          <canvas ref={canvasRef} className="hidden" />

          {/* 関連ツール */}
      <RelatedTools currentPath="/other/image-crop-circle" />
      {/* 広告 */}
          <AdBanner slot="TOOL_BOTTOM" format="horizontal" />
        </div>
      </div>
    </>
  )
}

export default ImageCropCircle
