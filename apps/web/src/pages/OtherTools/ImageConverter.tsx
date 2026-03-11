import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function ImageConverter() {
  useToolUsageTracking('/other/image-convert', '画像形式変換')
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [convertedImage, setConvertedImage] = useState<string | null>(null)
  const [originalFormat, setOriginalFormat] = useState<string>('')
  const [targetFormat, setTargetFormat] = useState<'png' | 'jpeg' | 'webp'>('png')
  const [quality, setQuality] = useState(0.9)
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    
    // Detect format
    const ext = file.name.split('.').pop()?.toLowerCase() || ''
    setOriginalFormat(ext)

    const reader = new FileReader()
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string)
      setConvertedImage(null)
    }
    reader.readAsDataURL(file)
  }

  const convertImage = async () => {
    if (!originalImage) return

    setLoading(true)

    try {
      const img = new Image()
      img.src = originalImage

      await new Promise((resolve) => {
        img.onload = resolve
      })

      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        setLoading(false)
        return
      }

      // 白背景を描画（JPEG用）
      if (targetFormat === 'jpeg') {
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      ctx.drawImage(img, 0, 0)

      const mimeType = targetFormat === 'jpeg' ? 'image/jpeg' : targetFormat === 'webp' ? 'image/webp' : 'image/png'
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const reader = new FileReader()
            reader.onload = (e) => {
              setConvertedImage(e.target?.result as string)
            }
            reader.readAsDataURL(blob)
          }
          setLoading(false)
        },
        mimeType,
        quality
      )
    } catch {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!convertedImage) return

    const link = document.createElement('a')
    link.href = convertedImage
    link.download = `${fileName.replace(/\.[^/.]+$/, '')}.${targetFormat}`
    link.click()
  }

  return (
    <>
      <SEO path="/other/image-convert" />
      <div className="max-w-[500px] mx-auto py-8 px-4">
        <ToolHeader title="画像形式変換" toolPath="/other/image-convert" shareTitle="画像形式変換 | Rakit" />

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

        {/* 変換設定 */}
        {originalImage && (
          <div className="mb-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                変換後の形式
              </label>
              <div className="flex gap-2">
                <Button
                  variant={targetFormat === 'png' ? 'default' : 'outline'}
                  onClick={() => setTargetFormat('png')}
                  className="flex-1"
                >
                  PNG
                </Button>
                <Button
                  variant={targetFormat === 'jpeg' ? 'default' : 'outline'}
                  onClick={() => setTargetFormat('jpeg')}
                  className="flex-1"
                >
                  JPEG
                </Button>
                <Button
                  variant={targetFormat === 'webp' ? 'default' : 'outline'}
                  onClick={() => setTargetFormat('webp')}
                  className="flex-1"
                >
                  WebP
                </Button>
              </div>
            </div>

            {targetFormat !== 'png' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  品質: {Math.round(quality * 100)}%
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            )}

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md text-sm">
              <span className="text-gray-600">元の形式: </span>
              <span className="font-bold uppercase">{originalFormat}</span>
              <span className="mx-2">→</span>
              <span className="text-gray-600">変換後: </span>
              <span className="font-bold uppercase text-[#d97706]">{targetFormat}</span>
            </div>

            <Button
              onClick={convertImage}
              disabled={loading}
              size="lg"
              className="w-full"
            >
              {loading ? '変換中...' : '変換'}
            </Button>
          </div>
        )}

        {/* 結果 */}
        {convertedImage && (
          <>
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">プレビュー</p>
              <img
                src={convertedImage}
                alt="変換後"
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
            <li>• PNG, JPEG, WebP間の変換</li>
            <li>• JPEG/WebPは品質調整可能</li>
            <li>• 透過PNG→JPEGは白背景になります</li>
            <li>• Web公開用画像の形式変換に便利</li>
          </ul>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner slot="TOOL_BOTTOM" format="rectangle" />
      </div>
    </>
  )
}

export default ImageConverter
