import { useState, useMemo } from 'react'
import { countText } from '../../utils/textUtils'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import styles from './CharCounter.module.css'

function CharCounter() {
  const [text, setText] = useState('')

  const stats = useMemo(() => countText(text), [text])

  const handleClear = () => {
    setText('')
  }

  // キーボードショートカットの設定
  const shortcuts = [
    {
      key: 'k',
      description: 'クリア',
      action: handleClear,
      meta: true,
      disabled: text.length === 0,
    },
  ]

  useKeyboardShortcut(shortcuts)

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>文字数カウンター</h2>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.chars.toLocaleString()}</div>
          <div className={styles.statLabel}>文字数</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.charsNoSpaces.toLocaleString()}</div>
          <div className={styles.statLabel}>文字数（スペース除く）</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.words.toLocaleString()}</div>
          <div className={styles.statLabel}>単語数</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.lines.toLocaleString()}</div>
          <div className={styles.statLabel}>行数</div>
        </div>
      </div>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="ここにテキストを入力してください..."
        className={styles.textarea}
      />

      <div className={styles.controls}>
        <Button onClick={handleClear} variant="secondary">
          クリア
        </Button>
      </div>

      {/* ショートカットキー一覧 */}
      <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />
    </div>
  )
}

export default CharCounter
