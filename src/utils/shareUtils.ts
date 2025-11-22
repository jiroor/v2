/**
 * 共有機能のユーティリティ関数
 */

/**
 * ビューワー用の共有URLを生成
 * @param roomId - ルームID
 * @returns 共有URL
 */
export function generateViewerUrl(roomId: string): string {
  const baseUrl = window.location.origin
  return `${baseUrl}/camera/viewer?room=${roomId}`
}

/**
 * クリップボードにテキストをコピー
 * @param text - コピーするテキスト
 * @returns コピーが成功したかどうか
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // Clipboard APIを使用
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }

    // フォールバック: 古いブラウザ向け
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    const successful = document.execCommand('copy')
    textArea.remove()

    return successful
  } catch (err) {
    console.error('クリップボードへのコピーに失敗しました:', err)
    return false
  }
}

/**
 * Web Share APIを使用して共有
 * @param title - 共有タイトル
 * @param text - 共有テキスト
 * @param url - 共有URL
 * @returns 共有が成功したかどうか
 */
export async function shareUrl(
  title: string,
  text: string,
  url: string
): Promise<boolean> {
  try {
    // Web Share APIが利用可能かチェック
    if (!navigator.share) {
      return false
    }

    await navigator.share({
      title,
      text,
      url,
    })

    return true
  } catch (err) {
    // ユーザーがキャンセルした場合もエラーになるが、これは正常な動作
    if ((err as Error).name === 'AbortError') {
      console.log('共有がキャンセルされました')
      return false
    }

    console.error('共有に失敗しました:', err)
    return false
  }
}

/**
 * Web Share APIが利用可能かチェック
 * @returns Web Share APIが利用可能かどうか
 */
export function isShareSupported(): boolean {
  return typeof navigator.share !== 'undefined'
}
