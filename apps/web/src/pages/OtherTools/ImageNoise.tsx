import { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import { RelatedTools } from '@/components/RelatedTools/RelatedTools'
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
        path="/other/image-noise"
        title="画像ノイズ付与"
        description="無料のオンライン画像ノイズツール。画像にノイズ効果を追加。レトロ風やフィルム風エフェクトに最適。"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader 
          title="画像ノイズ追加" 
          toolPath="/other/image-noise"

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

          {/* このツールについて */}
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="font-semibold mb-2">このツールについて</h3>
            <p className="text-sm text-gray-600 mb-4">
              画像ノイズ追加ツールは、画像にランダムなノイズを追加する無料のオンラインツールです。レトロ風の演出や、アート作品の加工などに役立ちます。
            </p>
          </div>

          {/* 特徴 */}
          <div className="mt-4 p-4 bg-blue-50 rounded-md">
            <h3 className="font-semibold mb-2">特徴</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• ノイズレベルを1〜100%で調整</li>
              <li>• リアルタイムでプレビュー</li>
              <li>• PNG形式でダウンロード</li>
              <li>• 完全無料、ブラウザ上で動作</li>
            </ul>
          </div>

          {/* よくある質問 */}
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="font-semibold mb-2">よくある質問</h3>
            <div className="text-sm text-gray-600 space-y-3">
              <div>
                <p className="font-medium">Q. ノイズは元に戻せますか？</p>
                <p>A. いいえ、一度追加したノイズは解除できません。元画像を別途保存してください。</p>
              </div>
              <div>
                <p className="font-medium">Q. 推奨レベルは？</p>
                <p>A. 微細な演出には20-30%、強い効果を出したい場合は50%以上を推奨。</p>
              </div>
            </div>
          </div>

          {/* 関連ツール */}
          <RelatedTools currentPath="/other/image-noise" />
        </div>

        <div className="mt-8">
          <AdBanner slot="TOOL_BOTTOM" format="horizontal" />
        </div>
      </div>
    </>
  )
}

export default ImageNoise
