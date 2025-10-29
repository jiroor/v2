import { useState } from 'react'
import { generateRandomString } from '../../utils/randomStringUtils'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
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
          <Label className={styles.optionLabel}>文字列の長さ</Label>
          <div className={styles.lengthControl}>
            <Slider
              min={4}
              max={64}
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
              className={styles.slider}
            />
            <span className={styles.lengthValue}>{length}文字</span>
          </div>
        </div>

        <div className={styles.optionGroup}>
          <Label className={styles.optionLabel}>文字種</Label>
          <div className={styles.checkboxGroup}>
            <Label className={styles.checkboxLabel}>
              <Checkbox
                checked={includeUppercase}
                onCheckedChange={(checked) => setIncludeUppercase(checked === true)}
                className={styles.checkbox}
              />
              大文字 (A-Z)
            </Label>
            <Label className={styles.checkboxLabel}>
              <Checkbox
                checked={includeLowercase}
                onCheckedChange={(checked) => setIncludeLowercase(checked === true)}
                className={styles.checkbox}
              />
              小文字 (a-z)
            </Label>
            <Label className={styles.checkboxLabel}>
              <Checkbox
                checked={includeNumbers}
                onCheckedChange={(checked) => setIncludeNumbers(checked === true)}
                className={styles.checkbox}
              />
              数字 (0-9)
            </Label>
            <Label className={styles.checkboxLabel}>
              <Checkbox
                checked={includeSymbols}
                onCheckedChange={(checked) => setIncludeSymbols(checked === true)}
                className={styles.checkbox}
              />
              記号 (!@#$...)
            </Label>
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
