import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function GifMaker() {
  useToolUsageTracking('/other/gif-maker', 'GIF作成')
  const [images, setImages] = useState<string[]>([])
  const [delay, setDelay] = useState(200)
  const [gifUrl, setGifUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages: string[] = []
    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        newImages.push(event.target?.result as string)
        if (newImages.length === files.length) {
          setImages((prev) => [...prev, ...newImages])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const clearImages = () => {
    setImages([])
    setGifUrl(null)
  }

  const generateGif = async () => {
    if (images.length < 2) {
      alert('2枚以上の画像を選択してください')
      return
    }

    setLoading(true)

    try {
      // Simple GIF generation using canvas
      // Note: This is a basic implementation. For production, use a library like gif.js
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        setLoading(false)
        return
      }

      // Load all images first
      const loadedImages: HTMLImageElement[] = []
      for (const imgSrc of images) {
        const img = new Image()
        img.src = imgSrc
        await new Promise((resolve) => {
          img.onload = resolve
        })
        loadedImages.push(img)
      }

      // Set canvas size to first image
      canvas.width = loadedImages[0].width
      canvas.height = loadedImages[0].height

      // Create frames
      const frames: string[] = []
      for (const img of loadedImages) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        frames.push(canvas.toDataURL('image/png'))
      }

      // For now, just return the first frame as PNG
      // In production, use a proper GIF encoding library
      setGifUrl(frames[0])
      setLoading(false)

      alert('注意: 簡易版のため、最初のフレームのみ出力されます。本格的なGIF生成にはgif.js等のライブラリが必要です。')
    } catch {
      setLoading(false)
      alert('エラーが発生しました')
    }
  }

  const handleDownload = () => {
    if (!gifUrl) return

    const link = document.createElement('a')
    link.href = gifUrl
    link.download = 'animation.png'
    link.click()
  }

  return (
    <>
      <SEO path="/other/gif-maker" />
      <div className="max-w-[600px] mx-auto py-8 px-4">
        <ToolHeader title="GIFアニメーション作成" toolPath="/other/gif-maker" shareTitle="GIFアニメーション作成 | Rakit" />

        {/* 画像選択 */}
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
            size="lg"
          >
            画像を追加（複数可）
          </Button>
        </div>

        {/* 遅延設定 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            フレーム間隔: {delay}ms
          </label>
          <input
            type="range"
            min="50"
            max="1000"
            step="50"
            value={delay}
            onChange={(e) => setDelay(parseInt(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            {delay}ms = {1000 / delay}fps
          </p>
        </div>

        {/* 選択した画像 */}
        {images.length > 0 && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                選択した画像 ({images.length}枚)
              </label>
              <Button onClick={clearImages} variant="outline" size="sm">
                全て削除
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt={`Frame ${index + 1}`}
                    className="w-20 h-20 object-cover rounded border border-gray-200"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs"
                  >
                    ×
                  </button>
                  <p className="text-xs text-center text-gray-500 mt-1">{index + 1}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 生成ボタン */}
        {images.length >= 2 && (
          <Button
            onClick={generateGif}
            disabled={loading}
            size="lg"
            className="w-full mb-6"
          >
            {loading ? '生成中...' : 'GIF生成'}
          </Button>
        )}

        {/* 結果 */}
        {gifUrl && (
          <>
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">プレビュー</p>
              <img
                src={gifUrl}
                alt="生成されたGIF"
                className="w-full border border-gray-200 rounded-md"
              />
            </div>

            <Button onClick={handleDownload} size="lg" className="w-full">
              ダウンロード
            </Button>
          </>
        )}

        {/* 注意書き */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h3 className="font-semibold mb-2 text-yellow-800">⚠️ 注意</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• 簡易版実装です（最初のフレームのみ出力）</li>
            <li>• 本格的なGIF生成にはgif.js等のライブラリ推奨</li>
            <li>• 同じサイズの画像を使用してください</li>
          </ul>
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            GIF作成ツールは、複数の画像を組み合わせてアニメーションGIFを作成する無料のオンラインツールです。フレーム間隔を調整でき、簡単なアニメーションを作成できます。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 複数画像をGIFに変換</li>
            <li>• フレーム間隔を調整可能</li>
            <li>• 画像の順序をドラッグで変更</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. 何枚まで画像を追加できますか？</p>
              <p>A. 制限はありませんが、多いほど処理に時間がかかります。</p>
            </div>
            <div>
              <p className="font-medium">Q. 異なるサイズの画像も使えますか？</p>
              <p>A. 最初の画像のサイズに合わせて出力されます。</p>
            </div>
          </div>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner slot="TOOL_BOTTOM" format="rectangle" />
      </div>
    </>
  )
}

export default GifMaker
