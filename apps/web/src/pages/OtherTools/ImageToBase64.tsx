import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'

function ImageToBase64() {
  useToolUsageTracking('/other/image-base64', '画像Base64変換')
  const [base64, setBase64] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [fileName, setFileName] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('画像ファイルを選択してください')
      return
    }

    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setBase64(result)
      setImagePreview(result)
    }
    reader.readAsDataURL(file)
    setCopySuccess(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleCopy = async () => {
    if (!base64) return

    try {
      await navigator.clipboard.writeText(base64)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  const handleClear = () => {
    setBase64('')
    setImagePreview('')
    setFileName('')
    setCopySuccess(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <>
      <SEO path="/other/image-base64" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="画像→Base64変換" toolPath="/other/image-base64" shareTitle="画像→Base64変換 | Rakit" />

        {/* ドロップエリア */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-md p-12 text-center cursor-pointer transition-colors ${
            dragOver
              ? 'border-[#d97706] bg-[#fef3c7]'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
          />
          <div className="text-gray-500">
            <svg
              className="w-12 h-12 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-lg font-medium">クリックまたはドラッグ＆ドロップ</p>
            <p className="text-sm mt-2">PNG, JPG, GIF, SVG など</p>
          </div>
        </div>

        {/* プレビューと結果 */}
        {imagePreview && (
          <div className="mt-6 space-y-4">
            {/* 画像プレビュー */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                プレビュー: {fileName}
              </label>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                <img
                  src={imagePreview}
                  alt="プレビュー"
                  className="max-w-full max-h-64 mx-auto rounded"
                />
              </div>
            </div>

            {/* Base64結果 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base64 ({base64.length.toLocaleString()}文字)
              </label>
              <textarea
                value={base64}
                readOnly
                className="w-full h-32 p-4 border border-gray-200 rounded-md font-mono text-xs resize-y bg-gray-50"
              />
            </div>

            {/* アクションボタン */}
            <div className="flex gap-2">
              <Button onClick={handleCopy}>
                {copySuccess ? 'コピーしました！' : 'Base64をコピー'}
              </Button>
              <Button onClick={handleClear} variant="outline">
                クリア
              </Button>
            </div>
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 画像ファイルをドラッグ＆ドロップまたはクリックで選択</li>
            <li>• Base64形式のデータURIを取得</li>
            <li>• HTMLやCSSに直接埋め込み可能</li>
            <li>• 小さな画像のインライン化に便利</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default ImageToBase64
