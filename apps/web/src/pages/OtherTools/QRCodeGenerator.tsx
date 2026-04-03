import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ShareButton } from '@/components/Share/ShareButton'

type QRSize = 128 | 256 | 512

function QRCodeGenerator() {
  useToolUsageTracking('/other/qrcode', 'QRコード生成')
  const [text, setText] = useState('')
  const [size, setSize] = useState<QRSize>(256)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!text || !canvasRef.current) return

    const generateQR = async () => {
      setIsGenerating(true)
      setError(null)

      try {
        const QRCode = (await import('qrcode')).default
        await QRCode.toCanvas(canvasRef.current!, text, {
          width: size,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        })
      } catch (err) {
        console.error('QRコード生成エラー:', err)
        setError('QRコードの生成に失敗しました')
      } finally {
        setIsGenerating(false)
      }
    }

    generateQR()
  }, [text, size])

  const handleDownload = () => {
    if (!canvasRef.current || !text) return

    canvasRef.current.toBlob((blob) => {
      if (!blob) return

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      const now = new Date()
      const timestamp = now
        .toISOString()
        .replace(/[-:]/g, '')
        .replace('T', '-')
        .split('.')[0]
      link.download = `qrcode-${timestamp}.png`
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
    })
  }

  const handleClear = () => {
    setText('')
  }

  return (
    <>
      <SEO path="/other/qrcode" title="QRコード生成" description="無料のオンラインQRコード生成ツール。URLやテキストをQRコードに変換。サイズや色をカスタマイズ可能。" />
      <div className="max-w-[600px] mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold">QRコード生成</h2>
        <ShareButton title="QRコード生成 | Rakit" variant="compact" />
      </div>

      <div className="mb-6">
        <Label className="text-base mb-3">テキスト / URL</Label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="URL、テキスト、電話番号などを入力..."
          className="w-full min-h-[100px]"
        />
      </div>

      <div className="mb-6">
        <Label className="text-base mb-3">サイズ</Label>
        <div className="flex gap-3">
          <Button
            onClick={() => setSize(128)}
            variant={size === 128 ? 'default' : 'secondary'}
          >
            小 (128px)
          </Button>
          <Button
            onClick={() => setSize(256)}
            variant={size === 256 ? 'default' : 'secondary'}
          >
            中 (256px)
          </Button>
          <Button
            onClick={() => setSize(512)}
            variant={size === 512 ? 'default' : 'secondary'}
          >
            大 (512px)
          </Button>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6 text-center">
        {text ? (
          <>
            <canvas ref={canvasRef} className="max-w-full h-auto rounded-lg shadow-sm" />
            {isGenerating && (
              <div className="mt-4 text-sm text-gray-600">
                QRコードを生成中...
              </div>
            )}
            {error && (
              <div className="mt-4 text-sm text-red-600">
                {error}
              </div>
            )}
          </>
        ) : (
          <div className="py-8 text-gray-600 italic">
            テキストを入力するとQRコードが生成されます
          </div>
        )}
      </div>

      <div className="flex gap-4 md:flex-row flex-col">
        <Button
          onClick={handleDownload}
          disabled={!text}
        >
          ダウンロード
        </Button>
        <Button
          onClick={handleClear}
          variant="secondary"
        >
          クリア
        </Button>
      </div>

      {/* このツールについて */}
      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h3 className="font-semibold mb-2">このツールについて</h3>
        <p className="text-sm text-gray-600 mb-4">
          QRコード生成ツールは、テキストをQRコードに変換する無料のオンラインツールです。URL、テキスト、連絡先情報などをQRコード化できます。名刺、チラシ、Webサイトなどでご利用ください。
        </p>
      </div>

      {/* 特徴 */}
      <div className="mt-4 p-4 bg-blue-50 rounded-md">
        <h3 className="font-semibold mb-2">特徴</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• 3種類のサイズ（128、256、512px）</li>
          <li>• PNG形式でダウンロード</li>
          <li>• リアルタイムでプレビュー</li>
          <li>• 完全無料、インストール不要</li>
        </ul>
      </div>

      {/* よくある質問 */}
      <div className="mt-4 p-4 bg-gray-50 rounded-md">
        <h3 className="font-semibold mb-2">よくある質問</h3>
        <div className="text-sm text-gray-600 space-y-3">
          <div>
            <p className="font-medium">Q. どのくらいの文字数まで入力できますか？</p>
            <p>A. 約4,000文字程度まで可能ですが、QRコードが密集して読み取りにくくなる場合があります。</p>
          </div>
          <div>
            <p className="font-medium">Q. 日本語も使えますか？</p>
            <p>A. はい、日本語も問題なくQRコード化できます。</p>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default QRCodeGenerator
