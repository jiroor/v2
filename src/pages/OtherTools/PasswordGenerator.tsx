import { useState, useMemo } from 'react'
import { generateRandomString } from '../../utils/randomStringUtils'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'

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
        return 'bg-[#ef4444]'
      case 'medium':
        return 'bg-[#f59e0b]'
      case 'strong':
        return 'bg-[#10b981]'
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

  // キーボードショートカットの設定
  const shortcuts = [
    {
      key: ' ',
      description: '生成',
      action: handleGenerate,
    },
    {
      key: 'd',
      description: 'コピー',
      action: handleCopy,
      meta: true,
      disabled: !generatedPassword,
    },
  ]

  useKeyboardShortcut(shortcuts)

  return (
    <div className="max-w-[800px] mx-auto py-8 px-4">
      <h2 className="text-2xl font-semibold mb-8 text-center">パスワード生成</h2>

      <div className="bg-gray-50 border border-gray-200 rounded-md p-6 mb-6">
        <div className="mb-6">
          <Label className="text-base mb-3">パスワードの長さ</Label>
          <div className="flex items-center gap-4">
            <Slider
              min={8}
              max={64}
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
              className="flex-1"
            />
            <span className="text-lg font-semibold text-[#d97706] min-w-[70px] text-right">{length}文字</span>
          </div>
        </div>

        <div>
          <Label className="text-base mb-3">文字種</Label>
          <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
            <label className="flex items-center gap-2 text-[15px] cursor-pointer p-2 rounded transition-colors duration-200 hover:bg-gray-100">
              <Checkbox
                checked={includeUppercase}
                onCheckedChange={(checked) => setIncludeUppercase(checked === true)}
                className="w-6 h-6 cursor-pointer p-2.5 -my-2.5 focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2"
              />
              大文字 (A-Z)
            </label>
            <label className="flex items-center gap-2 text-[15px] cursor-pointer p-2 rounded transition-colors duration-200 hover:bg-gray-100">
              <Checkbox
                checked={includeLowercase}
                onCheckedChange={(checked) => setIncludeLowercase(checked === true)}
                className="w-6 h-6 cursor-pointer p-2.5 -my-2.5 focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2"
              />
              小文字 (a-z)
            </label>
            <label className="flex items-center gap-2 text-[15px] cursor-pointer p-2 rounded transition-colors duration-200 hover:bg-gray-100">
              <Checkbox
                checked={includeNumbers}
                onCheckedChange={(checked) => setIncludeNumbers(checked === true)}
                className="w-6 h-6 cursor-pointer p-2.5 -my-2.5 focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2"
              />
              数字 (0-9)
            </label>
            <label className="flex items-center gap-2 text-[15px] cursor-pointer p-2 rounded transition-colors duration-200 hover:bg-gray-100">
              <Checkbox
                checked={includeSymbols}
                onCheckedChange={(checked) => setIncludeSymbols(checked === true)}
                className="w-6 h-6 cursor-pointer p-2.5 -my-2.5 focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2"
              />
              記号 (!@#$...)
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-6 max-md:flex-col">
        <Button onClick={handleGenerate}>
          生成
        </Button>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-md p-6 mb-4">
        {generatedPassword && (
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-medium text-gray-600">強度:</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-[width,background] duration-200 rounded-full ${getStrengthClass()}`}
                style={{ width: `${passwordStrength.score}%` }}
              />
            </div>
            <span className={`text-sm font-semibold min-w-[50px] ${getStrengthClass()}`}>
              {getStrengthText()}
            </span>
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-md p-4 mb-4 font-mono text-lg break-all min-h-[60px] flex items-center justify-center text-gray-900 max-md:text-base">
          {generatedPassword || (
            <span className="text-gray-600 italic">生成ボタンをクリックしてください</span>
          )}
        </div>
        <Button
          onClick={handleCopy}
          disabled={!generatedPassword}
        >
          {copySuccess ? 'コピーしました！' : 'コピー'}
        </Button>
      </div>

      {/* ショートカットキー一覧 */}
      <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />
    </div>
  )
}

export default PasswordGenerator
