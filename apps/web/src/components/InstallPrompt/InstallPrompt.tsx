// PWAインストール促進バナー
// ユーザーにアプリのインストールを促す

import { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // 既にインストールされているかチェック
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // beforeinstallpromptイベントをリッスン
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      
      // ローカルストレージで拒否回数をチェック
      const dismissedCount = parseInt(localStorage.getItem('pwa_install_dismissed') || '0')
      if (dismissedCount < 3) {
        setShowPrompt(true)
      }
    }

    // appinstalledイベントをリッスン
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowPrompt(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    // インストールプロンプトを表示
    await deferredPrompt.prompt()
    
    // ユーザーの選択を待つ
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setIsInstalled(true)
    }
    
    setShowPrompt(false)
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    // 拒否回数をインクリメント
    const dismissedCount = parseInt(localStorage.getItem('pwa_install_dismissed') || '0')
    localStorage.setItem('pwa_install_dismissed', String(dismissedCount + 1))
  }

  if (!showPrompt || isInstalled) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl shadow-lg p-4 z-50">
      <div className="flex items-start gap-3">
        <div className="text-2xl">📲</div>
        <div className="flex-1">
          <p className="font-semibold text-sm">アプリをインストール</p>
          <p className="text-xs text-white/90 mt-1">
            ホーム画面に追加して、オフラインでも使えるようにしましょう
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="text-white/70 hover:text-white transition-colors"
          aria-label="閉じる"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={handleInstall}
          className="flex-1 bg-white text-amber-600 font-medium text-sm py-2 px-4 rounded-lg hover:bg-amber-50 transition-colors"
        >
          インストール
        </button>
        <button
          onClick={handleDismiss}
          className="flex-1 bg-white/20 text-white font-medium text-sm py-2 px-4 rounded-lg hover:bg-white/30 transition-colors"
        >
          後で
        </button>
      </div>
    </div>
  )
}

export default InstallPrompt
