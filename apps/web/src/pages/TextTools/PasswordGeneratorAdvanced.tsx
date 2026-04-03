import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function PasswordGeneratorAdvanced() {
  useToolUsageTracking('/text/password-adv', 'パスワード生成（詳細）')
  const [passwords, setPasswords] = useState<string[]>([])
  const [length, setLength] = useState(16)
  const [count, setCount] = useState(5)
  const [includeLower, setIncludeLower] = useState(true)
  const [includeUpper, setIncludeUpper] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false)
  const [copyIndex, setCopyIndex] = useState<number | null>(null)

  const generatePasswords = () => {
    let chars = ''
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'
    const ambiguous = 'il1Lo0O'

    if (includeLower) chars += lowercase
    if (includeUpper) chars += uppercase
    if (includeNumbers) chars += numbers
    if (includeSymbols) chars += symbols

    if (excludeAmbiguous) {
      chars = chars.split('').filter(c => !ambiguous.includes(c)).join('')
    }

    if (chars.length === 0) {
      setPasswords([])
      return
    }

    const newPasswords: string[] = []
    for (let i = 0; i < count; i++) {
      let password = ''
      for (let j = 0; j < length; j++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      newPasswords.push(password)
    }

    setPasswords(newPasswords)
  }

  const handleCopy = async (password: string, index: number) => {
    try {
      await navigator.clipboard.writeText(password)
      setCopyIndex(index)
      setTimeout(() => setCopyIndex(null), 2000)
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  const handleCopyAll = async () => {
    if (passwords.length === 0) return

    try {
      await navigator.clipboard.writeText(passwords.join('\n'))
      alert('全てコピーしました')
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  return (
    <>
      <SEO path="/text/password-adv" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="パスワード生成（詳細）" toolPath="/text/password-adv" shareTitle="パスワード生成（詳細） | Rakit" />

        {/* オプション */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">長さ:</span>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(Math.max(4, Math.min(64, parseInt(e.target.value) || 16)))}
                min={4}
                max={64}
                className="w-16 p-2 border border-gray-200 rounded-md text-center"
              />
              <span className="text-sm text-gray-600">文字</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">生成数:</span>
              <input
                type="number"
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(20, parseInt(e.target.value) || 5)))}
                min={1}
                max={20}
                className="w-16 p-2 border border-gray-200 rounded-md text-center"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeLower}
                onChange={(e) => setIncludeLower(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">小文字 (a-z)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeUpper}
                onChange={(e) => setIncludeUpper(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">大文字 (A-Z)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">数字 (0-9)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">記号 (!@#$...)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={excludeAmbiguous}
                onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">紛らわしい文字を除外</span>
            </label>
          </div>
        </div>

        <div className="flex gap-2 mb-6 justify-center">
          <Button onClick={generatePasswords}>
            🔐 パスワード生成
          </Button>
          {passwords.length > 0 && (
            <Button onClick={handleCopyAll} variant="outline">
              📋 全てコピー
            </Button>
          )}
        </div>

        {/* 結果 */}
        {passwords.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">生成されたパスワード</h3>
            {passwords.map((password, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="font-mono text-lg break-all">{password}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(password, index)}
                >
                  {copyIndex === index ? '✓' : 'コピー'}
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 文字の種類や長さをカスタマイズ</li>
            <li>• 複数のパスワードを一度に生成</li>
            <li>• 紛らわしい文字（il1Lo0O）を除外可能</li>
            <li>• セキュリティ重視の強力なパスワード作成に</li>
          </ul>
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            パスワード生成ツールは、安全で強力なパスワードを生成する無料のオンラインツールです。文字数、使用する文字の種類、紛らわしい文字の除外など、詳細なカスタマイズが可能です。アカウント登録やセキュリティ更新の際にご利用ください。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 4〜64文字まで長さをカスタマイズ</li>
            <li>• 大文字・小文字・数字・記号を選択可能</li>
            <li>• 紛らわしい文字（0O, 1l, I等）を除外可能</li>
            <li>• 完全無料、ブラウザ内で生成</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. 推奨されるパスワード長は？</p>
              <p>A. 12文字以上を推奨します。重要なアカウントは16文字以上を推奨。</p>
            </div>
            <div>
              <p className="font-medium">Q. 生成したパスワードは保存されますか？</p>
              <p>A. いいえ、ブラウザ内で生成され、サーバーには送信されません。</p>
            </div>
          </div>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner slot="tools-rectangle" format="rectangle" />
      </div>
    </>
  )
}

export default PasswordGeneratorAdvanced
