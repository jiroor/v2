import { useState, useMemo } from 'react'
import { generateRandomString } from '../../utils/randomStringUtils'
import styles from './PasswordGenerator.module.css'

type PasswordStrength = 'weak' | 'medium' | 'strong'

function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [generatedPassword, setGeneratedPassword] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)

  const passwordStrength = useMemo((): {
    strength: PasswordStrength
    score: number
  } => {
    if (!generatedPassword) {
      return { strength: 'weak', score: 0 }
    }

    let score = 0

    // 長さのスコア (最大40点)
    if (length >= 16) score += 40
    else if (length >= 12) score += 30
    else if (length >= 8) score += 20
    else score += 10

    // 文字種の多様性 (最大60点)
    let charTypeCount = 0
    if (includeUppercase) charTypeCount++
    if (includeLowercase) charTypeCount++
    if (includeNumbers) charTypeCount++
    if (includeSymbols) charTypeCount++

    if (charTypeCount === 4) score += 60
    else if (charTypeCount === 3) score += 45
    else if (charTypeCount === 2) score += 30
    else score += 15

    // 強度判定
    let strength: PasswordStrength
    if (score >= 70) strength = 'strong'
    else if (score >= 50) strength = 'medium'
    else strength = 'weak'

    return { strength, score }
  }, [generatedPassword, length, includeUppercase, includeLowercase, includeNumbers, includeSymbols])

  const handleGenerate = () => {
    try {
      const result = generateRandomString({
        length,
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols,
      })
      setGeneratedPassword(result)
      setCopySuccess(false)
    } catch (error) {
      alert('少なくとも1つの文字種を選択してください')
    }
  }

  const handleCopy = async () => {
    if (!generatedPassword) return

    try {
      await navigator.clipboard.writeText(generatedPassword)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  const getStrengthClass = () => {
    switch (passwordStrength.strength) {
      case 'weak':
        return styles.strengthWeak
      case 'medium':
        return styles.strengthMedium
      case 'strong':
        return styles.strengthStrong
    }
  }

  const getStrengthText = () => {
    switch (passwordStrength.strength) {
      case 'weak':
        return '弱い'
      case 'medium':
        return '普通'
      case 'strong':
        return '強い'
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>パスワード生成</h2>

      <div className={styles.optionsSection}>
        <div className={styles.optionGroup}>
          <label className={styles.optionLabel}>パスワードの長さ</label>
          <div className={styles.lengthControl}>
            <input
              type="range"
              min="8"
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
        <button onClick={handleGenerate} className={styles.button}>
          生成
        </button>
      </div>

      <div className={styles.resultSection}>
        {generatedPassword && (
          <div className={styles.strengthIndicator}>
            <span className={styles.strengthLabel}>強度:</span>
            <div className={styles.strengthBar}>
              <div
                className={`${styles.strengthFill} ${getStrengthClass()}`}
                style={{ width: `${passwordStrength.score}%` }}
              />
            </div>
            <span className={`${styles.strengthText} ${getStrengthClass()}`}>
              {getStrengthText()}
            </span>
          </div>
        )}

        <div className={styles.resultDisplay}>
          {generatedPassword || (
            <span className={styles.emptyState}>生成ボタンをクリックしてください</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          disabled={!generatedPassword}
          className={styles.copyButton}
        >
          {copySuccess ? 'コピーしました！' : 'コピー'}
        </button>
      </div>
    </div>
  )
}

export default PasswordGenerator
