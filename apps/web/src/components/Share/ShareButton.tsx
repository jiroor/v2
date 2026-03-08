// ShareButton.tsx - Rakit用シェアボタンコンポーネント
// 保存場所: src/components/Share/ShareButton.tsx

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface ShareButtonProps {
  title: string
  url?: string
  text?: string
  variant?: 'default' | 'compact'
}

export function ShareButton({ 
  title, 
  url, 
  text,
  variant = 'default' 
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const shareText = text || title

  // X (Twitter) でシェア
  const shareTwitter = () => {
    const twitterUrl = new URL('https://twitter.com/intent/tweet')
    twitterUrl.searchParams.set('text', shareText)
    twitterUrl.searchParams.set('url', shareUrl)
    twitterUrl.searchParams.set('via', 'rakit_tools') // あれば
    window.open(twitterUrl.toString(), '_blank', 'width=550,height=420')
  }

  // LINE でシェア
  const shareLine = () => {
    const lineUrl = new URL('https://social-plugins.line.me/lineit/share')
    lineUrl.searchParams.set('url', shareUrl)
    lineUrl.searchParams.set('text', shareText)
    window.open(lineUrl.toString(), '_blank', 'width=550,height=520')
  }

  // クリップボードにコピー
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('コピーに失敗しました', err)
    }
  }

  // Native Share API（モバイル対応）
  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareText,
          url: shareUrl,
        })
      } catch (err) {
        console.log('シェアがキャンセルされました')
      }
    }
  }

  // モバイルでネイティブシェアが使える場合はそちらを優先
  const canNativeShare = typeof navigator !== 'undefined' && navigator.share

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={shareTwitter}
          className="p-2 text-gray-500 hover:text-black transition-colors"
          title="Xでシェア"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </button>
        <button
          onClick={shareLine}
          className="p-2 text-gray-500 hover:text-[#00B900] transition-colors"
          title="LINEでシェア"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#00B900">
            <path d="M19.365 9.863c.326 0 .59.265.59.59v3.39c0 .326-.264.59-.59.59H4.635c-.326 0-.59-.264-.59-.59v-3.39c0-.325.264-.59.59-.59h14.73zM12 2C6.477 2 2 5.813 2 10.5c0 2.714 1.45 5.14 3.72 6.763V22l4.193-2.293c.71.131 1.446.203 2.087.203 5.523 0 10-3.813 10-8.5S17.523 2 12 2z"/>
          </svg>
        </button>
        <button
          onClick={copyToClipboard}
          className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
          title={copied ? 'コピーしました！' : 'URLをコピー'}
        >
          {copied ? (
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          )}
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {canNativeShare && (
        <Button variant="outline" size="sm" onClick={nativeShare}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          シェア
        </Button>
      )}
      <Button variant="outline" size="sm" onClick={shareTwitter}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        X
      </Button>
      <Button variant="outline" size="sm" onClick={shareLine}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#00B900">
          <path d="M19.365 9.863c.326 0 .59.265.59.59v3.39c0 .326-.264.59-.59.59H4.635c-.326 0-.59-.264-.59-.59v-3.39c0-.325.264-.59.59-.59h14.73zM12 2C6.477 2 2 5.813 2 10.5c0 2.714 1.45 5.14 3.72 6.763V22l4.193-2.293c.71.131 1.446.203 2.087.203 5.523 0 10-3.813 10-8.5S17.523 2 12 2z"/>
        </svg>
        LINE
      </Button>
      <Button variant="outline" size="sm" onClick={copyToClipboard}>
        {copied ? (
          <>
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            コピー済み
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            コピー
          </>
        )}
      </Button>
    </div>
  )
}

export default ShareButton
