import { useState, useEffect, useRef } from 'react'
import QRCode from 'qrcode'
import { Button } from '@/components/ui/button'
import styles from './QRCodeGenerator.module.css'

type QRSize = 128 | 256 | 512

function QRCodeGenerator() {
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
    <div className={styles.container}>
      <h2 className={styles.title}>QRコード生成</h2>

      <div className={styles.inputSection}>
        <label className={styles.label}>テキスト / URL</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="URL、テキスト、電話番号などを入力..."
          className={styles.textarea}
        />
      </div>

      <div className={styles.sizeSection}>
        <label className={styles.label}>サイズ</label>
        <div className={styles.sizeButtons}>
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

      <div className={styles.qrcodeSection}>
        {text ? (
          <canvas ref={canvasRef} className={styles.qrcodeCanvas} />
        ) : (
          <div className={styles.emptyState}>
            テキストを入力するとQRコードが生成されます
          </div>
        )}
      </div>

      <div className={styles.controls}>
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
