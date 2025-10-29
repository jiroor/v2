import { useState, useMemo } from 'react'
import { countText } from '../../utils/textUtils'
import { Button } from '@/components/ui/button'
import styles from './CharCounter.module.css'

function CharCounter() {
  const [text, setText] = useState('')

  const stats = useMemo(() => countText(text), [text])

  const handleClear = () => {
    setText('')
  }

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

      <textarea
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
    </div>
  )
}

export default CharCounter
