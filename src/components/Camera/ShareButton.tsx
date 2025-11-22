/**
 * カメラ共有リンクボタン
 */

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Share2, Check, Copy } from 'lucide-react'
import {
  generateViewerUrl,
  copyToClipboard,
  shareUrl,
  isShareSupported,
} from '@/utils/shareUtils'

interface ShareButtonProps {
  roomId: string
  className?: string
}

/**
 * カメラ共有リンクボタン
 *
 * Web Share API対応 (モバイル優先)、
 * フォールバックでクリップボードコピー
 */
export function ShareButton({ roomId, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  // 共有処理
  const handleShare = async () => {
    const url = generateViewerUrl(roomId)
    const title = 'カメラ映像を共有'
    const text = `カメラ映像にアクセスできます。ルームID: ${roomId}`

    // Web Share APIが利用可能ならそちらを優先
    if (isShareSupported()) {
      const success = await shareUrl(title, text, url)
      if (success) {
        return
      }
      // 共有がキャンセルまたは失敗した場合はクリップボードにコピー
    }

    // クリップボードにコピー
    const success = await copyToClipboard(url)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      className={className}
      size="sm"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          コピーしました
        </>
      ) : isShareSupported() ? (
        <>
          <Share2 className="w-4 h-4 mr-2" />
          リンクを共有
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 mr-2" />
          リンクをコピー
        </>
      )}
    </Button>
  )
}
