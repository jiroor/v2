import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { ShortcutConfig } from '@/hooks/useKeyboardShortcut'
import { KeyBadge } from './KeyBadge'
import styles from './KeyboardShortcuts.module.css'

interface KeyboardShortcutsProps {
  shortcuts: ShortcutConfig[]
  title?: string
  collapsible?: boolean
  defaultExpanded?: boolean
}

/**
 * ショートカットキー一覧を表示するコンポーネント
 */
export const KeyboardShortcuts = ({
  shortcuts,
  title = 'ショートカットキー',
  collapsible = true,
  defaultExpanded = false,
}: KeyboardShortcutsProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  // "?" キーで開閉を切り替え
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '?' && !event.ctrlKey && !event.metaKey && !event.altKey) {
        // 入力欄では無効化
        const target = event.target as HTMLElement
        const isInputField =
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable

        if (!isInputField) {
          event.preventDefault()
          setIsExpanded((prev) => !prev)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const toggleExpanded = () => {
    if (collapsible) {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.header}
        onClick={toggleExpanded}
        disabled={!collapsible}
        aria-expanded={isExpanded}
      >
        <div className={styles.titleGroup}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.hint}>
            <KeyBadge keyName="?" />
          </span>
        </div>
        {collapsible && (
          <span className={styles.icon}>
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </span>
        )}
      </button>

      {isExpanded && (
        <div className={styles.content}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.keyColumn}>キー</th>
                <th className={styles.descColumn}>操作</th>
              </tr>
            </thead>
            <tbody>
              {shortcuts
                .filter((shortcut) => !shortcut.disabled)
                .map((shortcut, index) => (
                  <tr key={index}>
                    <td className={styles.keyCell}>
                      <KeyBadge
                        keyName={shortcut.key}
                        ctrl={shortcut.ctrl}
                        meta={shortcut.meta}
                        shift={shortcut.shift}
                        alt={shortcut.alt}
                      />
                    </td>
                    <td className={styles.descCell}>{shortcut.description}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
