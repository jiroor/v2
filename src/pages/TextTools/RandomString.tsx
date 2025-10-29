import { useState } from 'react'
import { generateRandomString } from '../../utils/randomStringUtils'
import { Button } from '@/components/ui/button'
import styles from './RandomString.module.css'

function RandomString() {
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [generatedString, setGeneratedString] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)

  const handleGenerate = () => {
    try {
      const result = generateRandomString({
        length,
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols,
      })
      setGeneratedString(result)
      setCopySuccess(false)
    } catch (error) {
      alert('少なくとも1つの文字種を選択してください')
    }
  }

  const handleCopy = async () => {
    if (!generatedString) return

    try {
      await navigator.clipboard.writeText(generatedString)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>ランダム文字列生成</h2>

      <div className={styles.optionsSection}>
        <div className={styles.optionGroup}>
          <label className={styles.optionLabel}>文字列の長さ</label>
          <div className={styles.lengthControl}>
            <input
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className={styles.slider}
            />
            <span className={styles.lengthValue}>{length}文字</span>
          </div>
        </div>

        <div className={styles.optionGroup}>
          <label className={styles.optionLabel}>文字種</label>
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className={styles.checkbox}
              />
              大文字 (A-Z)
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className={styles.checkbox}
              />
              小文字 (a-z)
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className={styles.checkbox}
              />
              数字 (0-9)
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className={styles.checkbox}
              />
              記号 (!@#$...)
            </label>
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <Button onClick={handleGenerate}>
          生成
        </Button>
      </div>

      <div className={styles.resultSection}>
        <div className={styles.resultLabel}>生成された文字列</div>
        <div className={styles.resultDisplay}>
          {generatedString || (
            <span className={styles.emptyState}>生成ボタンをクリックしてください</span>
          )}
        </div>
        <Button
          onClick={handleCopy}
          disabled={!generatedString}
        >
          {copySuccess ? 'コピーしました！' : 'コピー'}
        </Button>
      </div>
    </div>
  )
}

export default RandomString
