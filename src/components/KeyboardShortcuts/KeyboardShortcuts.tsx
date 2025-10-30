import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { ShortcutConfig } from '@/hooks/useKeyboardShortcut'
import { KeyBadge } from './KeyBadge'

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
    <div className="fixed bottom-4 right-4 max-w-[320px] p-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-[1000] md:max-sm:bottom-2 md:max-sm:right-2 md:max-sm:left-2 md:max-sm:max-w-none">
      <button
        className="flex items-center justify-between w-full p-0 bg-transparent border-none cursor-pointer transition-opacity duration-200 hover:opacity-70 disabled:cursor-default disabled:opacity-100"
        onClick={toggleExpanded}
        disabled={!collapsible}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold m-0 text-gray-900 dark:text-gray-100">{title}</h3>
          <span className="opacity-60">
            <KeyBadge keyName="?" />
          </span>
        </div>
        {collapsible && (
          <span className="flex items-center text-gray-500 dark:text-gray-400">
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </span>
        )}
      </button>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-700">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 pb-2 border-b border-gray-300 dark:border-gray-700 w-[30%] md:max-sm:w-[40%]">
                  キー
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 pb-2 border-b border-gray-300 dark:border-gray-700 w-[70%] md:max-sm:w-[60%]">
                  操作
                </th>
              </tr>
            </thead>
            <tbody>
              {shortcuts
                .filter((shortcut) => !shortcut.disabled)
                .map((shortcut, index) => (
                  <tr key={index} className="border-b border-gray-300 dark:border-gray-700 last:border-b-0">
                    <td className="py-2">
                      <KeyBadge
                        keyName={shortcut.key}
                        ctrl={shortcut.ctrl}
                        meta={shortcut.meta}
                        shift={shortcut.shift}
                        alt={shortcut.alt}
                      />
                    </td>
                    <td className="py-2 text-sm text-gray-900 dark:text-gray-100 md:max-sm:text-[13px]">
                      {shortcut.description}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
