import { useState, useEffect, useRef } from 'react'
import QRCode from 'qrcode'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'

type QRSize = 128 | 256 | 512

function QRCodeGenerator() {
  useToolUsageTracking('/other/qrcode', 'QRコード生成')
  const [text, setText] = useState('')
  const [size, setSize] = useState<QRSize>(256)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!text || !canvasRef.current) return

    QRCode.toCanvas(
      canvasRef.current,
      text,
      {
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      },
      (error) => {
        if (error) {
          console.error('QRコード生成エラー:', error)
        }
      }
    )
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
    <div className="max-w-[600px] mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-8 text-center">QRコード生成</h2>

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
          <canvas ref={canvasRef} className="max-w-full h-auto rounded-lg shadow-sm" />
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
    </div>
  )
}

export default QRCodeGenerator
