/**
 * QRコードスキャナーコンポーネント
 */

import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { Button } from '@/components/ui/button'
import { X, Camera } from 'lucide-react'
import { extractRoomIdFromQRCode } from '@/utils/roomIdUtils'

interface QRScannerProps {
  onScan: (roomId: string) => void
  onClose: () => void
}

/**
 * QRコードスキャナーコンポーネント
 *
 * html5-qrcodeライブラリを使用してQRコードをスキャンし、
 * ルームIDを抽出して親コンポーネントに通知します。
 */
export function QRScanner({ onScan, onClose }: QRScannerProps) {
  const [error, setError] = useState<string | null>(null)
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const elementId = 'qr-scanner-region'

  // スキャナーを開始
  useEffect(() => {
    const scanner = new Html5Qrcode(elementId)
    scannerRef.current = scanner

    const startScanning = async () => {
      try {
        setError(null)

        await scanner.start(
          { facingMode: 'environment' }, // バックカメラを優先
          {
            fps: 10, // フレームレート
            qrbox: { width: 250, height: 250 }, // スキャンエリア
          },
          (decodedText) => {
            // QRコードを検出
            console.log('QRコード検出:', decodedText)

            // ルームIDを抽出
            const roomId = extractRoomIdFromQRCode(decodedText)

            if (roomId) {
              console.log('ルームID抽出成功:', roomId)
              onScan(roomId)
            } else {
              setError('有効なルームIDが見つかりませんでした')
            }
          },
          () => {
            // スキャンエラー（通常のスキャン失敗は無視）
            // console.log('スキャン中')
          }
        )
      } catch (err) {
        console.error('QRスキャナー起動エラー:', err)
        setError('カメラの起動に失敗しました。カメラの権限を確認してください。')
      }
    }

    startScanning()

    // クリーンアップ
    return () => {
      if (scanner.isScanning) {
        scanner
          .stop()
          .then(() => {
            console.log('QRスキャナーを停止しました')
          })
          .catch((err) => {
            console.error('QRスキャナー停止エラー:', err)
          })
      }
    }
  }, [onScan])

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* ヘッダー */}
      <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5" />
          <h3 className="font-semibold">QRコードをスキャン</h3>
        </div>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-gray-800"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* スキャナー領域 */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* html5-qrcodeのスキャナー要素 */}
          <div id={elementId} className="rounded-lg overflow-hidden" />

          {/* エラーメッセージ */}
          {error && (
            <div className="mt-4 bg-red-100 border border-red-300 rounded-lg p-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* 説明 */}
          {!error && (
            <div className="mt-4 text-center text-gray-300 text-sm">
              <p>カメラをQRコードに向けてください</p>
              <p className="mt-1 text-xs text-gray-400">
                カメラモードで表示されたQRコードを読み取ります
              </p>
            </div>
          )}
        </div>
      </div>

      {/* フッター */}
      <div className="bg-gray-900 text-white p-4 text-center">
        <Button onClick={onClose} variant="secondary" className="w-full max-w-md">
          キャンセル
        </Button>
      </div>
    </div>
  )
}
