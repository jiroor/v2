import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import { RelatedTools } from '@/components/RelatedTools/RelatedTools'
import AdBanner from '@/components/Ads/AdBanner'

function ExifRemover() {
  useToolUsageTracking('/other/exif-remover', 'EXIF削除')
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [cleanedImage, setCleanedImage] = useState<string | null>(null)
  const [fileName, setFileName] = useState('')
  const [hasExif, setHasExif] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      setOriginalImage(dataUrl)
      setCleanedImage(null)

      // EXIFチェック（簡易版：JPEGかどうか）
      const isJpeg = file.type === 'image/jpeg'
      setHasExif(isJpeg)
    }
    reader.readAsDataURL(file)
  }

  const removeExif = async () => {
    if (!originalImage || !canvasRef.current) return

    const img = new Image()
    img.src = originalImage
    await new Promise((resolve) => { img.onload = resolve })

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = img.width
    canvas.height = img.height

    // キャンバスに描画（EXIF情報は削除される）
    ctx.drawImage(img, 0, 0)

    // PNGとして出力（EXIF情報なし）
    setCleanedImage(canvas.toDataURL('image/png'))
  }

  const downloadImage = () => {
    if (!cleanedImage) return
    const link = document.createElement('a')
    link.href = cleanedImage
    link.download = `cleaned_${fileName.replace(/\.[^/.]+$/, '')}.png`
    link.click()
  }

  const reset = () => {
    setOriginalImage(null)
    setCleanedImage(null)
    setFileName('')
    setHasExif(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <>
      <SEO
        path="/other/exif-remover"
        title="EXIF削除"
        description="無料のオンラインEXIF削除ツール。画像の位置情報やメタデータを削除。プライバシー保護に最適。"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader
          title="EXIF削除"
          toolPath="/other/exif-remover"

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

          {/* EXIF情報表示 */}
          {originalImage && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">📋 画像情報</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>ファイル名: {fileName}</li>
                <li>EXIF情報: {hasExif ? '⚠️ 含まれる可能性があります（JPEG）' : '✅ なし（PNG形式など）'}</li>
              </ul>
              {hasExif && (
                <p className="mt-2 text-xs text-blue-600">
                  ※ EXIF情報には、撮影日時、カメラ機種、位置情報などが含まれる場合があります。
                </p>
              )}
            </div>
          )}

          {/* プレビュー */}
          {originalImage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">元画像</p>
                  <img src={originalImage} alt="Original" className="max-w-full rounded border" />
                </div>
                {cleanedImage && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">EXIF削除済み</p>
                    <img src={cleanedImage} alt="Cleaned" className="max-w-full rounded border" />
                  </div>
                )}
              </div>

              {/* アクションボタン */}
              <div className="flex gap-4">
                <Button onClick={removeExif}>
                  EXIF削除
                </Button>
                {cleanedImage && (
                  <Button variant="outline" onClick={downloadImage}>
                    ダウンロード（PNG）
                  </Button>
                )}
                <Button variant="secondary" onClick={reset}>
                  リセット
                </Button>
              </div>
            </div>
          )}

          {/* 説明 */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">🔒 EXIF情報とは？</h3>
            <p className="text-sm text-gray-600">
              EXIF（Exchangeable Image File Format）は、デジタルカメラやスマートフォンで撮影した画像に埋め込まれるメタデータです。
              撮影日時、カメラ機種、露出設定、GPS座標（位置情報）などが含まれる場合があります。
              SNSに画像をアップロードする前にEXIF情報を削除することで、プライバシーを保護できます。
            </p>
          </div>

          {/* このツールについて */}
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="font-semibold mb-2">このツールについて</h3>
            <p className="text-sm text-gray-600 mb-4">
              EXIF削除ツールは、画像に含まれるメタデータ（EXIF情報）を削除する無料のオンラインツールです。撮影日時、カメラ情報、GPS座標などのプライベート情報を削除して、SNS投稿時のプライバシーを保護します。
            </p>
          </div>

          {/* 特徴 */}
          <div className="mt-4 p-4 bg-blue-50 rounded-md">
            <h3 className="font-semibold mb-2">特徴</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• EXIF情報を完全削除</li>
              <li>• PNG形式で出力（メタデータなし）</li>
              <li>• 画質はそのまま維持</li>
              <li>• 完全無料、ブラウザ上で動作</li>
            </ul>
          </div>

          {/* よくある質問 */}
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="font-semibold mb-2">よくある質問</h3>
            <div className="text-sm text-gray-600 space-y-3">
              <div>
                <p className="font-medium">Q. どの画像形式に対応していますか？</p>
                <p>A. JPEG、PNG、WebPなど、一般的な画像形式に対応しています。</p>
              </div>
              <div>
                <p className="font-medium">Q. 削除したEXIFは復元できますか？</p>
                <p>A. いいえ、一度削除した情報は復元できません。</p>
              </div>
            </div>
          </div>

          {/* 非表示キャンバス */}
          <canvas ref={canvasRef} className="hidden" />

          {/* 関連ツール */}
      <RelatedTools currentPath="/other/exif-remover" />
      {/* 広告 */}
          <AdBanner slot="TOOL_BOTTOM" format="horizontal" />
        </div>
      </div>
    </>
  )
}

export default ExifRemover
