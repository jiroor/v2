import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'

function ImageCompressor() {
  useToolUsageTracking('/other/image-compress', '画像圧縮')
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [compressedImage, setCompressedImage] = useState<string | null>(null)
  const [originalSize, setOriginalSize] = useState<number>(0)
  const [compressedSize, setCompressedSize] = useState<number>(0)
  const [quality, setQuality] = useState(0.8)
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setOriginalSize(file.size)

    const reader = new FileReader()
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string)
      setCompressedImage(null)
      setCompressedSize(0)
    }
    reader.readAsDataURL(file)
  }

  const compressImage = async () => {
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

      ctx.drawImage(img, 0, 0)

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressedSize(blob.size)
            const reader = new FileReader()
            reader.onload = (e) => {
              setCompressedImage(e.target?.result as string)
            }
            reader.readAsDataURL(blob)
          }
          setLoading(false)
        },
        'image/jpeg',
        quality
      )
    } catch {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!compressedImage) return

    const link = document.createElement('a')
    link.href = compressedImage
    link.download = `compressed_${fileName.replace(/\.[^/.]+$/, '')}.jpg`
    link.click()
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  const savings = originalSize > 0 && compressedSize > 0
    ? Math.round((1 - compressedSize / originalSize) * 100)
    : 0

  return (
    <>
      <SEO path="/other/image-compress" />
      <div className="max-w-[500px] mx-auto py-8 px-4">
        <ToolHeader title="画像圧縮" toolPath="/other/image-compress" shareTitle="画像圧縮 | Rakit" />

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

        {/* 品質設定 */}
        {originalImage && (
          <div className="mb-6">
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

        {/* 圧縮ボタン */}
        {originalImage && (
          <Button
            onClick={compressImage}
            disabled={loading}
            size="lg"
            className="w-full mb-6"
          >
            {loading ? '圧縮中...' : '圧縮'}
          </Button>
        )}

        {/* 結果 */}
        {compressedImage && (
          <>
            {/* サイズ比較 */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">元のサイズ</p>
                <p className="text-xl font-bold">{formatSize(originalSize)}</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
                <p className="text-xs text-green-600 mb-1">圧縮後</p>
                <p className="text-xl font-bold text-green-700">{formatSize(compressedSize)}</p>
              </div>
            </div>

            {/* 削減率 */}
            <div className="bg-[#fef3c7] border border-[#d97706] rounded-md p-4 text-center mb-6">
              <p className="text-sm text-gray-600 mb-1">ファイルサイズ削減</p>
              <p className="text-3xl font-bold text-[#d97706]">{savings}%</p>
            </div>

            {/* プレビュー */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">プレビュー</p>
              <img
                src={compressedImage}
                alt="圧縮後"
                className="w-full border border-gray-200 rounded-md"
              />
            </div>

            {/* ダウンロード */}
            <Button onClick={handleDownload} size="lg" className="w-full">
              ダウンロード
            </Button>
          </>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 画像を選択して圧縮</li>
            <li>• 品質を調整してファイルサイズを変更</li>
            <li>• Web公開用の画像軽量化に便利</li>
            <li>• JPEG形式で出力</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default ImageCompressor
