import styles from './KeyBadge.module.css'

interface KeyBadgeProps {
  keyName: string
  ctrl?: boolean
  meta?: boolean
  shift?: boolean
  alt?: boolean
}

/**
 * キーボードキーを視覚的に表示するコンポーネント
 */
export const KeyBadge = ({ keyName, ctrl, meta, shift, alt }: KeyBadgeProps) => {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0

  // 表示用のキー名を取得
  const getDisplayKey = (key: string): string => {
    const keyMap: Record<string, string> = {
      ' ': 'Space',
      'Enter': '↵',
      'Escape': 'Esc',
      'ArrowUp': '↑',
      'ArrowDown': '↓',
      'ArrowLeft': '←',
      'ArrowRight': '→',
    }
    return keyMap[key] || key.toUpperCase()
  }

  const keys: string[] = []

  // 修飾キーの追加
  if (ctrl && !isMac) keys.push('Ctrl')
  if (meta || (ctrl && isMac)) keys.push(isMac ? '⌘' : 'Ctrl')
  if (alt) keys.push(isMac ? '⌥' : 'Alt')
  if (shift) keys.push(isMac ? '⇧' : 'Shift')

  // メインキーの追加
  keys.push(getDisplayKey(keyName))

  return (
    <span className={styles.keyBadgeGroup}>
      {keys.map((key, index) => (
        <span key={index}>
          <kbd className={styles.keyBadge}>{key}</kbd>
          {index < keys.length - 1 && <span className={styles.separator}>+</span>}
        </span>
      ))}
    </span>
  )
}
