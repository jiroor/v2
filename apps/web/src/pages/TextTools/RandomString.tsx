import { useState } from 'react'
import { generateRandomString } from '../../utils/randomStringUtils'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

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
      <SEO
        path="/text/random"
        title="ランダム文字列生成"
        description="無料のオンラインランダム文字列生成ツール。指定した条件でランダムな文字列を生成。パスワードやテストデータ作成に便利。"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
      <ToolHeader title="ランダム文字列生成" toolPath="/text/random" shareTitle="ランダム文字列生成 | Rakit" />

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

      {/* このツールについて */}
      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h3 className="font-semibold mb-2">このツールについて</h3>
        <p className="text-sm text-gray-600 mb-4">
          ランダム文字列生成ツールは、指定した条件でランダムな文字列を生成する無料のオンラインツールです。パスワード生成、テストデータ作成、認証コード生成などに活用できます。長さと文字種を自由にカスタマイズ可能です。
        </p>
      </div>

      {/* 特徴 */}
      <div className="mt-4 p-4 bg-blue-50 rounded-md">
        <h3 className="font-semibold mb-2">特徴</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• 4〜64文字まで長さをカスタマイズ</li>
          <li>• 大文字・小文字・数字・記号を選択可能</li>
          <li>• 暗号学的に安全な乱数を使用</li>
          <li>• 完全無料、ブラウザ上で動作</li>
        </ul>
      </div>

      {/* よくある質問 */}
      <div className="mt-4 p-4 bg-gray-50 rounded-md">
        <h3 className="font-semibold mb-2">よくある質問</h3>
        <div className="text-sm text-gray-600 space-y-3">
          <div>
            <p className="font-medium">Q. パスワードとして使えますか？</p>
            <p>A. はい、パスワード生成ツールとしてもご利用いただけます。</p>
          </div>
          <div>
            <p className="font-medium">Q. 生成される文字列はユニークですか？</p>
            <p>A. 暗号学的に安全な乱数を使用しているため、衝突確率は極めて低いです。</p>
          </div>
        </div>
      </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner slot="TOOL_BOTTOM" format="rectangle" />
      </div>
    </>
  )
}

export default RandomString
