import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'

function ImageCropper() {
  useToolUsageTracking('/other/image-crop', '画像トリミング')
  const [image, setImage] = useState<string | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 100, height: 100 })
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [aspectRatio, setAspectRatio] = useState<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target?.result as string
      img.onload = () => {
        setImageSize({ width: img.width, height: img.height })
        setCropArea({ x: 0, y: 0, width: Math.min(100, img.width), height: Math.min(100, img.height) })
        setImage(event.target?.result as string)
        setCroppedImage(null)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!image) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width * imageSize.width
    const y = (e.clientY - rect.top) / rect.height * imageSize.height
    setIsDragging(true)
    setDragStart({ x: x - cropArea.x, y: y - cropArea.y })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !image) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(imageSize.width - cropArea.width, (e.clientX - rect.left) / rect.width * imageSize.width - dragStart.x))
    const y = Math.max(0, Math.min(imageSize.height - cropArea.height, (e.clientY - rect.top) / rect.height * imageSize.height - dragStart.y))
    setCropArea(prev => ({ ...prev, x, y }))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const cropImage = useCallback(() => {
    if (!image || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.src = image
    img.onload = () => {
      canvas.width = cropArea.width
      canvas.height = cropArea.height
      ctx.drawImage(
        img,
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height,
        0,
        0,
        cropArea.width,
        cropArea.height
      )
      setCroppedImage(canvas.toDataURL('image/png'))
    }
  }, [image, cropArea])

  const handleDownload = () => {
    if (!croppedImage) return
    const link = document.createElement('a')
    link.href = croppedImage
    link.download = 'cropped_image.png'
    link.click()
  }

  const aspectRatios = [
    { label: '1:1', ratio: 1 },
    { label: '4:3', ratio: 4 / 3 },
    { label: '16:9', ratio: 16 / 9 },
    { label: '3:2', ratio: 3 / 2 },
    { label: '2:3', ratio: 2 / 3 },
    { label: '9:16', ratio: 9 / 16 },
  ]

  useEffect(() => {
    if (aspectRatio && image) {
      const newWidth = cropArea.width
      const newHeight = newWidth / aspectRatio
      setCropArea(prev => ({ ...prev, height: Math.min(newHeight, imageSize.height) }))
    }
  }, [aspectRatio])

  return (
    <>
      <SEO path="/other/image-crop" />
      <div className="max-w-[500px] mx-auto py-8 px-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">画像トリミング</h2>

        <canvas ref={canvasRef} className="hidden" />

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

        {/* アスペクト比選択 */}
        {image && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">アスペクト比</label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={aspectRatio === null ? 'default' : 'outline'}
                onClick={() => setAspectRatio(null)}
                size="sm"
              >
                フリー
              </Button>
              {aspectRatios.map((ar) => (
                <Button
                  key={ar.label}
                  variant={aspectRatio === ar.ratio ? 'default' : 'outline'}
                  onClick={() => setAspectRatio(ar.ratio)}
                  size="sm"
                >
                  {ar.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* 画像とクロップエリア */}
        {image && (
          <div className="mb-4">
            <div
              className="relative cursor-move border border-gray-200 rounded-md overflow-hidden"
              style={{ aspectRatio: `${imageSize.width} / ${imageSize.height}` }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <img src={image} alt="Original" className="w-full h-full object-contain" />
              <div
                className="absolute border-2 border-[#d97706] bg-[#d97706]/20"
                style={{
                  left: `${(cropArea.x / imageSize.width) * 100}%`,
                  top: `${(cropArea.y / imageSize.height) * 100}%`,
                  width: `${(cropArea.width / imageSize.width) * 100}%`,
                  height: `${(cropArea.height / imageSize.height) * 100}%`,
                }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1 text-center">
              ドラッグして選択範囲を移動
            </p>
          </div>
        )}

        {/* トリミングボタン */}
        {image && (
          <Button onClick={cropImage} size="lg" className="w-full mb-6">
            トリミング
          </Button>
        )}

        {/* 結果 */}
        {croppedImage && (
          <>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">プレビュー</p>
              <img
                src={croppedImage}
                alt="Cropped"
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
            <li>• 画像を選択してトリミング</li>
            <li>• アスペクト比を固定可能</li>
            <li>• ドラッグで選択範囲を移動</li>
            <li>• SNS投稿、サムネイル作成に便利</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default ImageCropper
