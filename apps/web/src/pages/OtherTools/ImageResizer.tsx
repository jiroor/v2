import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'

function ImageResizer() {
  useToolUsageTracking('/other/image-resize', '画像リサイズ')
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [resizedImage, setResizedImage] = useState<string | null>(null)
  const [originalWidth, setOriginalWidth] = useState(0)
  const [originalHeight, setOriginalHeight] = useState(0)
  const [newWidth, setNewWidth] = useState('')
  const [newHeight, setNewHeight] = useState('')
  const [maintainRatio, setMaintainRatio] = useState(true)
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target?.result as string
      img.onload = () => {
        setOriginalWidth(img.width)
        setOriginalHeight(img.height)
        setNewWidth(String(img.width))
        setNewHeight(String(img.height))
        setOriginalImage(event.target?.result as string)
        setResizedImage(null)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleWidthChange = (value: string) => {
    setNewWidth(value)
    if (maintainRatio && originalWidth > 0) {
      const ratio = originalHeight / originalWidth
      setNewHeight(String(Math.round(parseInt(value) * ratio)))
    }
  }

  const handleHeightChange = (value: string) => {
    setNewHeight(value)
    if (maintainRatio && originalHeight > 0) {
      const ratio = originalWidth / originalHeight
      setNewWidth(String(Math.round(parseInt(value) * ratio)))
    }
  }

  const resizeImage = async () => {
    if (!originalImage || !newWidth || !newHeight) return

    setLoading(true)

    try {
      const img = new Image()
      img.src = originalImage

      await new Promise((resolve) => {
        img.onload = resolve
      })

      const canvas = document.createElement('canvas')
      canvas.width = parseInt(newWidth)
      canvas.height = parseInt(newHeight)

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        setLoading(false)
        return
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      const dataUrl = canvas.toDataURL('image/png')
      setResizedImage(dataUrl)
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!resizedImage) return

    const link = document.createElement('a')
    link.href = resizedImage
    link.download = `resized_${fileName.replace(/\.[^/.]+$/, '')}.png`
    link.click()
  }

  const presetSizes = [
    { label: 'アイコン (64x64)', width: 64, height: 64 },
    { label: 'サムネイル (128x128)', width: 128, height: 128 },
    { label: 'SNS投稿 (1200x630)', width: 1200, height: 630 },
    { label: 'HD (1280x720)', width: 1280, height: 720 },
    { label: 'Full HD (1920x1080)', width: 1920, height: 1080 },
  ]

  return (
    <>
      <SEO path="/other/image-resize" />
      <div className="max-w-[500px] mx-auto py-8 px-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">画像リサイズ</h2>

        {/* ファイル選択 */}
        <div className="mb-6">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
            size="lg"
          >
            画像を選択
          </Button>
        </div>

        {/* 元のサイズ表示 */}
        {originalImage && (
          <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
            <p className="text-sm text-gray-600 mb-2">元のサイズ</p>
            <p className="font-mono">{originalWidth} x {originalHeight} px</p>
          </div>
        )}

        {/* 新しいサイズ入力 */}
        {originalImage && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={maintainRatio}
                onChange={(e) => setMaintainRatio(e.target.checked)}
                className="w-4 h-4"
              />
              <label className="text-sm text-gray-700">縦横比を維持</label>
            </div>

            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">幅</label>
                <input
                  type="number"
                  value={newWidth}
                  onChange={(e) => handleWidthChange(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">高さ</label>
                <input
                  type="number"
                  value={newHeight}
                  onChange={(e) => handleHeightChange(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
                />
              </div>
            </div>

            {/* プリセット */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">プリセット</label>
              <div className="flex flex-wrap gap-2">
                {presetSizes.map((preset) => (
                  <Button
                    key={preset.label}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setNewWidth(String(preset.width))
                      setNewHeight(String(preset.height))
                    }}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* リサイズボタン */}
            <Button
              onClick={resizeImage}
              disabled={loading}
              size="lg"
              className="w-full mb-6"
            >
              {loading ? '処理中...' : 'リサイズ'}
            </Button>
          </div>
        )}

        {/* 結果 */}
        {resizedImage && (
          <>
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">プレビュー</p>
              <img
                src={resizedImage}
                alt="リサイズ後"
                className="w-full border border-gray-200 rounded-md"
              />
            </div>

            <Button onClick={handleDownload} size="lg" className="w-full">
              ダウンロード
            </Button>
          </>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 画像のサイズを変更</li>
            <li>• 縦横比を維持してリサイズ可能</li>
            <li>• SNS投稿、アイコン、サムネイルに便利</li>
            <li>• PNG形式で出力</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default ImageResizer
