import { useState } from 'react'
import { generateRandomString } from '../../utils/randomStringUtils'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'

function RandomString() {
  useToolUsageTracking('/text/random', 'ランダム文字列生成')
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
    <>
      <SEO path="/text/random" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
      <h2 className="text-2xl font-semibold mb-8 text-center">ランダム文字列生成</h2>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
        <div className="mb-6 last:mb-0">
          <Label className="text-base mb-3">文字列の長さ</Label>
          <div className="flex items-center gap-4">
            <Slider
              min={4}
              max={64}
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
              className="flex-1"
            />
            <span className="text-lg font-semibold min-w-[60px] text-right">{length}文字</span>
          </div>
        </div>

        <div className="mb-6 last:mb-0">
          <Label className="text-base mb-3">文字種</Label>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-2">
            <Label className="flex items-center gap-2 text-[15px] cursor-pointer p-2 rounded transition-colors hover:bg-gray-100 mb-0">
              <Checkbox
                checked={includeUppercase}
                onCheckedChange={(checked) => setIncludeUppercase(checked === true)}
                className="w-6 h-6 cursor-pointer p-2.5 -my-2.5"
              />
              大文字 (A-Z)
            </Label>
            <Label className="flex items-center gap-2 text-[15px] cursor-pointer p-2 rounded transition-colors hover:bg-gray-100 mb-0">
              <Checkbox
                checked={includeLowercase}
                onCheckedChange={(checked) => setIncludeLowercase(checked === true)}
                className="w-6 h-6 cursor-pointer p-2.5 -my-2.5"
              />
              小文字 (a-z)
            </Label>
            <Label className="flex items-center gap-2 text-[15px] cursor-pointer p-2 rounded transition-colors hover:bg-gray-100 mb-0">
              <Checkbox
                checked={includeNumbers}
                onCheckedChange={(checked) => setIncludeNumbers(checked === true)}
                className="w-6 h-6 cursor-pointer p-2.5 -my-2.5"
              />
              数字 (0-9)
            </Label>
            <Label className="flex items-center gap-2 text-[15px] cursor-pointer p-2 rounded transition-colors hover:bg-gray-100 mb-0">
              <Checkbox
                checked={includeSymbols}
                onCheckedChange={(checked) => setIncludeSymbols(checked === true)}
                className="w-6 h-6 cursor-pointer p-2.5 -my-2.5"
              />
              記号 (!@#$...)
            </Label>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <Button onClick={handleGenerate}>
          生成
        </Button>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <Label>生成された文字列</Label>
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 font-mono text-lg break-all min-h-[60px] flex items-center justify-center">
          {generatedString || (
            <span className="text-gray-500 italic">生成ボタンをクリックしてください</span>
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
    </>
  )
}

export default RandomString
