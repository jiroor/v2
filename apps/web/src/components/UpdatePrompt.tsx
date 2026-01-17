import { useEffect, useState } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import styles from './UpdatePrompt.module.css'

export function UpdatePrompt() {
  const [showPrompt, setShowPrompt] = useState(false)

  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r: ServiceWorkerRegistration | undefined) {
      console.log('Service Worker registered:', r)
    },
    onRegisterError(error: unknown) {
      console.error('Service Worker registration error:', error)
    },
  })

  useEffect(() => {
    if (needRefresh) {
      setShowPrompt(true)
    }
  }, [needRefresh])

  const handleUpdate = () => {
    updateServiceWorker(true)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
  }

  if (!showPrompt) {
    return null
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.prompt}>
        <p className={styles.message}>新しいバージョンが利用可能です</p>
        <div className={styles.buttons}>
          <button className={styles.updateButton} onClick={handleUpdate}>
            更新
          </button>
          <button className={styles.dismissButton} onClick={handleDismiss}>
            後で
          </button>
        </div>
      </div>
    </div>
  )
}
