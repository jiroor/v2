import { useState, useMemo } from 'react'
import { calculateDiff } from '../../utils/textDiffUtils'
import styles from './TextDiff.module.css'

function TextDiff() {
  const [originalText, setOriginalText] = useState('')
  const [modifiedText, setModifiedText] = useState('')

  const diffResult = useMemo(() => {
    if (originalText === '' && modifiedText === '') {
      return []
    }
    return calculateDiff(originalText, modifiedText)
  }, [originalText, modifiedText])

  const handleClear = () => {
    setOriginalText('')
    setModifiedText('')
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>テキスト差分表示</h2>

      <div className={styles.inputSection}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>オリジナルテキスト</label>
          <textarea
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            placeholder="元のテキストを入力..."
            className={styles.textarea}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>比較テキスト</label>
          <textarea
            value={modifiedText}
            onChange={(e) => setModifiedText(e.target.value)}
            placeholder="比較するテキストを入力..."
            className={styles.textarea}
          />
        </div>
      </div>

      <div className={styles.controls}>
        <button onClick={handleClear} className={styles.buttonSecondary}>
          クリア
        </button>
      </div>

      <div className={styles.resultSection}>
        <h3 className={styles.resultTitle}>差分結果</h3>
        <div className={styles.diffContainer}>
          {diffResult.length === 0 ? (
            <div className={styles.emptyState}>
              テキストを入力すると差分が表示されます
            </div>
          ) : (
            diffResult.map((line, index) => (
              <div
                key={index}
                className={`${styles.diffLine} ${
                  line.type === 'added'
                    ? styles.diffLineAdded
                    : line.type === 'removed'
                    ? styles.diffLineRemoved
                    : styles.diffLineUnchanged
                }`}
              >
                {line.type === 'added' && '+ '}
                {line.type === 'removed' && '- '}
                {line.type === 'unchanged' && '  '}
                {line.content}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default TextDiff
