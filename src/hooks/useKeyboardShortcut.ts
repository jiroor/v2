import { useEffect } from 'react'

export interface ShortcutConfig {
  key: string
  description: string
  action: () => void
  ctrl?: boolean
  meta?: boolean
  shift?: boolean
  alt?: boolean
  disabled?: boolean
}

/**
 * キーボードショートカットを登録するカスタムフック
 *
 * @param shortcuts - ショートカット設定の配列
 * @param enabled - ショートカットの有効/無効
 */
export const useKeyboardShortcut = (
  shortcuts: ShortcutConfig[],
  enabled: boolean = true
) => {
  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (event: KeyboardEvent) => {
      // 入力欄でのショートカットを無効化
      const target = event.target as HTMLElement
      const isInputField =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable

      // 入力欄では修飾キー付きのショートカットのみ許可
      if (isInputField) {
        const hasModifier = event.ctrlKey || event.metaKey || event.altKey
        if (!hasModifier) {
          return
        }
      }

      for (const shortcut of shortcuts) {
        if (shortcut.disabled) continue

        // キーの比較（大文字小文字を区別しない）
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase() ||
                        (shortcut.key === ' ' && event.code === 'Space')

        // 修飾キーのチェック
        const ctrlMatch = shortcut.ctrl ? event.ctrlKey : !event.ctrlKey
        const metaMatch = shortcut.meta ? event.metaKey : !event.metaKey
        const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey
        const altMatch = shortcut.alt ? event.altKey : !event.altKey

        // Mac では Cmd キー、Windows では Ctrl キーを meta として扱う
        const modifierMatch = shortcut.meta || shortcut.ctrl
          ? (event.metaKey || event.ctrlKey)
          : !(event.metaKey || event.ctrlKey)

        if (keyMatch && modifierMatch && shiftMatch && altMatch) {
          event.preventDefault()
          shortcut.action()
          break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [shortcuts, enabled])
}
