import { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function ImageNoise() {
  useToolUsageTracking('/other/image-noise', '画像ノイズ追加')
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [noiseLevel, setNoiseLevel] = useState(50)
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string)
      setProcessedImage(null)
    }
    reader.readAsDataURL(file)
  }

  const addNoise = useCallback(async () => {
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
        throw new Error('Canvas context not available')
      }

      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      const intensity = noiseLevel / 100

      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 255 * intensity
        
        data[i] = Math.max(0, Math.min(255, data[i] + noise))     // R
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise)) // G
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise)) // B
      }

      ctx.putImageData(imageData, 0, 0)

      const processedDataUrl = canvas.toDataURL('image/png')
      setProcessedImage(processedDataUrl)
    } catch (error) {
      console.error('Error adding noise:', error)
    } finally {
      setLoading(false)
    }
  }, [originalImage, noiseLevel])

  const downloadImage = () => {
    if (!processedImage) return

    const link = document.createElement('a')
    link.download = `noise_${fileName}`
    link.href = processedImage
    link.click()
  }

  const reset = () => {
    setOriginalImage(null)
    setProcessedImage(null)
    setFileName('')
    setNoiseLevel(50)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <>
      <SEO 
        title="画像ノイズ追加" 
        description="画像にノイズエフェクトを追加。レトロな雰囲気や芸術的な効果を出したい画像に。" 
        path="/other/image-noise" 
        category="ImageApplication"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader 
          title="画像ノイズ追加" 
          description="画像にノイズエフェクトを追加して、レトロな雰囲気や芸術的な効果を演出します。" 
        />

        <div className="space-y-6">
          {/* ファイル選択 */}
          <div>
            <label className="block text-sm font-medium mb-2">画像を選択</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-primary file:text-white
                hover:file:bg-primary/90"
            />
          </div>

          {/* ノイズレベル調整 */}
          {originalImage && (
            <div>
              <label className="block text-sm font-medium mb-2">
                ノイズレベル: {noiseLevel}%
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={noiseLevel}
                onChange={(e) => setNoiseLevel(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>微細</span>
                <span>強烈</span>
              </div>
            </div>
          )}

          {/* プレビュー */}
          {originalImage && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-2">元画像</p>
                <div className="border rounded-lg p-2 bg-gray-50">
                  <img 
                    src={originalImage} 
                    alt="元画像" 
                    className="max-w-full h-auto mx-auto max-h-64 object-contain"
                  />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">加工後</p>
                <div className="border rounded-lg p-2 bg-gray-50 min-h-[100px] flex items-center justify-center">
                  {processedImage ? (
                    <img 
                      src={processedImage} 
                      alt="加工後" 
                      className="max-w-full h-auto mx-auto max-h-64 object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">ここに表示されます</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ボタン */}
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={addNoise}
              disabled={!originalImage || loading}
            >
              {loading ? '処理中...' : 'ノイズを追加'}
            </Button>
            <Button
              onClick={downloadImage}
              variant="outline"
              disabled={!processedImage}
            >
              ダウンロード
            </Button>
            <Button
              onClick={reset}
              variant="secondary"
              disabled={!originalImage}
            >
              リセット
            </Button>
          </div>
        </div>

        <div className="mt-8">
          <AdBanner slot="TOOL_BOTTOM" format="horizontal" />
        </div>
      </div>
    </>
  )
}

export default ImageNoise
