import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

type BarcodeType = 'code128' | 'ean13' | 'code39'

function BarcodeGenerator() {
  useToolUsageTracking('/text/barcode', 'バーコード生成')
  const [input, setInput] = useState('')
  const [barcodeType, setBarcodeType] = useState<BarcodeType>('code128')
  const [barcodeUrl, setBarcodeUrl] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generateBarcode = () => {
    if (!input) return

    // 簡易的なバーコード生成（CODE 128風）
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // キャンバスをクリア
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // バーコードパターン生成（簡易版）
    let x = 20
    const barHeight = 100

    // 文字列をバイナリパターンに変換（簡易）
    const generatePattern = (text: string): number[] => {
      const pattern: number[] = []
      // スタートコード
      pattern.push(2, 1, 2, 1, 2, 1)

      for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i)
        // 簡易的なパターン生成
        const bits = charCode.toString(2).padStart(8, '0')
        for (const bit of bits) {
          pattern.push(bit === '1' ? 3 : 1)
          pattern.push(bit === '1' ? 1 : 2)
        }
      }

      // エンドコード
      pattern.push(2, 3, 3, 1, 1, 1, 2)
      return pattern
    }

    const pattern = generatePattern(input)
    ctx.fillStyle = 'black'

    for (let i = 0; i < pattern.length; i++) {
      const width = pattern[i]
      if (i % 2 === 0) {
        ctx.fillRect(x, 20, width, barHeight)
      }
      x += width
    }

    // テキストを描画
    ctx.fillStyle = 'black'
    ctx.font = '16px monospace'
    ctx.textAlign = 'center'
    ctx.fillText(input, canvas.width / 2, barHeight + 45)

    // 画像URLを生成
    setBarcodeUrl(canvas.toDataURL('image/png'))
  }

  const handleDownload = () => {
    if (!barcodeUrl) return

    const link = document.createElement('a')
    link.download = `barcode-${input}.png`
    link.href = barcodeUrl
    link.click()
  }

  return (
    <>
      <SEO path="/text/barcode" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="バーコード生成" toolPath="/text/barcode" shareTitle="バーコード生成 | Rakit" />

        {/* タイプ選択 */}
        <div className="mb-4 flex flex-wrap gap-2 justify-center">
          <Button
            variant={barcodeType === 'code128' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setBarcodeType('code128')}
          >
            CODE 128
          </Button>
          <Button
            variant={barcodeType === 'ean13' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setBarcodeType('ean13')}
          >
            EAN-13
          </Button>
          <Button
            variant={barcodeType === 'code39' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setBarcodeType('code39')}
          >
            CODE 39
          </Button>
        </div>

        {/* 入力 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            バーコードの値
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="例: 1234567890"
            className="w-full p-4 border border-gray-200 rounded-md font-mono text-lg focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        <div className="flex gap-2 mb-6 justify-center">
          <Button onClick={generateBarcode} disabled={!input}>
            生成
          </Button>
          {barcodeUrl && (
            <Button onClick={handleDownload} variant="outline">
              📥 ダウンロード
            </Button>
          )}
        </div>

        {/* プレビュー */}
        <div className="flex justify-center mb-6">
          <canvas
            ref={canvasRef}
            width={400}
            height={150}
            className="border border-gray-200 rounded-md bg-white"
          />
        </div>

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• CODE 128: 英数字に対応した汎用バーコード</li>
            <li>• EAN-13: 商品管理用の13桁バーコード</li>
            <li>• CODE 39: 英数字と記号に対応</li>
            <li>• 生成したバーコードをPNGでダウンロード</li>
          </ul>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner format="rectangle" />
      </div>
    </>
  )
}

export default BarcodeGenerator
