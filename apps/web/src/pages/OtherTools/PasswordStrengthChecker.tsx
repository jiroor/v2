import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function PasswordStrengthChecker() {
  useToolUsageTracking('/other/password-check', 'パスワード強度チェック')
  const [password, setPassword] = useState('')

  const analysis = useMemo(() => {
    if (!password) return null

    const length = password.length
    const hasLower = /[a-z]/.test(password)
    const hasUpper = /[A-Z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    const hasRepeat = /(.)\1{2,}/.test(password)

    let score = 0
    const checks = [
      { label: '8文字以上', passed: length >= 8, points: 1 },
      { label: '12文字以上', passed: length >= 12, points: 1 },
      { label: '小文字を含む', passed: hasLower, points: 1 },
      { label: '大文字を含む', passed: hasUpper, points: 1 },
      { label: '数字を含む', passed: hasNumber, points: 1 },
      { label: '記号を含む', passed: hasSpecial, points: 2 },
      { label: '連続文字なし', passed: !hasRepeat, points: 1 },
    ]

    checks.forEach(check => {
      if (check.passed) score += check.points
    })

    let strength: string
    let color: string
    let width: number

    if (score <= 2) {
      strength = '弱い'
      color = 'bg-red-500'
      width = 20
    } else if (score <= 4) {
      strength = '普通'
      color = 'bg-yellow-500'
      width = 40
    } else if (score <= 6) {
      strength = '強い'
      color = 'bg-green-500'
      width = 70
    } else {
      strength = '非常に強い'
      color = 'bg-green-700'
      width = 100
    }

    return { score, strength, color, width, checks }
  }, [password])

  const handleClear = () => {
    setPassword('')
  }

  return (
    <>
      <SEO path="/other/password-check" title="パスワード強度チェック" description="無料のオンラインパスワード強度チェックツール。パスワードの安全性を診断。セキュリティ向上に最適。" />
      <div className="max-w-[400px] mx-auto py-8 px-4">
        <ToolHeader title="パスワード強度チェック" toolPath="/other/password-check" shareTitle="パスワード強度チェック | Rakit" />

        {/* パスワード入力 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            パスワード
          </label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワードを入力"
            className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
          <p className="text-xs text-gray-500 mt-1">※ 入力したパスワードは送信されません</p>
        </div>

        {/* クリアボタン */}
        {password && (
          <Button onClick={handleClear} variant="outline" size="sm" className="w-full mb-6">
            クリア
          </Button>
        )}

        {/* 分析結果 */}
        {analysis && (
          <div className="space-y-4">
            {/* 強度バー */}
            <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full ${analysis.color} transition-all duration-300`}
                style={{ width: `${analysis.width}%` }}
              />
            </div>

            {/* 強度ラベル */}
            <div className="text-center">
              <span className={`text-lg font-bold ${
                analysis.score <= 2 ? 'text-red-600' :
                analysis.score <= 4 ? 'text-yellow-600' :
                analysis.score <= 6 ? 'text-green-600' : 'text-green-700'
              }`}>
                {analysis.strength}
              </span>
              <span className="text-gray-600 text-sm ml-2">
                (スコア: {analysis.score}/8)
              </span>
            </div>

            {/* チェックリスト */}
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <h3 className="font-semibold mb-3 text-sm">チェックリスト</h3>
              <div className="space-y-2">
                {analysis.checks.map((check, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <span className={check.passed ? 'text-green-500' : 'text-gray-400'}>
                      {check.passed ? '✓' : '○'}
                    </span>
                    <span className={check.passed ? 'text-gray-700' : 'text-gray-400'}>
                      {check.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* アドバイス */}
            {analysis.score <= 4 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <h3 className="font-semibold mb-2 text-yellow-800 text-sm">改善のヒント</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  {!analysis.checks[0].passed && <li>• 最低8文字以上にしてください</li>}
                  {!analysis.checks[2].passed && <li>• 小文字を含めてください</li>}
                  {!analysis.checks[3].passed && <li>• 大文字を含めてください</li>}
                  {!analysis.checks[4].passed && <li>• 数字を含めてください</li>}
                  {!analysis.checks[5].passed && <li>• 記号を含めるとより安全です</li>}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• パスワードの強度をリアルタイムで分析</li>
            <li>• 文字種、長さ、パターンをチェック</li>
            <li>• 安全なパスワード作成の参考に</li>
            <li>• 入力内容は送信されません</li>
          </ul>
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            パスワード強度チェッカーは、パスワードの安全性を分析する無料のオンラインツールです。長さ、文字種、パターンをチェックして、安全なパスワード作成の参考になります。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 8項目のチェックリスト</li>
            <li>• リアルタイムで分析</li>
            <li>• 改善のヒントを表示</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. 入力したパスワードは保存されますか？</p>
              <p>A. いいえ、ブラウザ内で処理され、サーバーには送信されません。</p>
            </div>
            <div>
              <p className="font-medium">Q. 強いパスワードの条件は？</p>
              <p>A. 12文字以上で、大文字・小文字・数字・記号を含むことが推奨されます。</p>
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

export default PasswordStrengthChecker
