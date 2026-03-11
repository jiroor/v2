import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function FlipText() {
  useToolUsageTracking('/text/flip', 'フリップテキスト')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const flipMap: Record<string, string> = {
    a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ',
    j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ',
    s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
    A: '∀', B: 'q', C: 'Ɔ', D: 'p', E: 'Ǝ', F: 'Ⅎ', G: '⅁', H: 'H', I: 'I',
    J: 'ſ', K: 'ʞ', L: '˥', M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Q', R: 'ᴚ',
    S: 'S', T: '⊥', U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z',
    '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ',
    '8': '8', '9': '6', '0': '0',
    '.': '˙', ',': '\'', '\'': ',', '"': ',', '?': '¿', '!': '¡',
    '[': ']', ']': '[', '(': ')', ')': '(', '{': '}', '}': '{',
    '<': '>', '>': '<', '&': '⅋', '_': '‾',
  }

  const flipText = (text: string) => {
    // 文字を逆順にして、各文字をフリップ
    const flipped = text.split('').reverse().map(char => {
      return flipMap[char] || char
    }).join('')
    setOutput(flipped)
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    flipText(value)
  }

  const handleCopy = async () => {
    if (!output) return

    try {
      await navigator.clipboard.writeText(output)
      alert('コピーしました')
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  return (
    <>
      <SEO path="/text/flip" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="フリップテキスト" toolPath="/text/flip" shareTitle="フリップテキスト | Rakit" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 入力 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              入力テキスト
            </label>
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="フリップしたいテキストを入力"
              className="w-full h-48 p-4 border border-gray-200 rounded-md font-mono text-lg resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>

          {/* 出力 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              フリップ結果
            </label>
            <div className="w-full h-48 p-4 border border-gray-200 rounded-md bg-gray-50 overflow-y-auto">
              <p className="font-mono text-lg whitespace-pre-wrap">{output || '結果がここに表示されます'}</p>
            </div>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex gap-2 mt-4 justify-center">
          <Button onClick={handleCopy} disabled={!output}>
            📋 コピー
          </Button>
        </div>

        {/* プレビュー */}
        {output && (
          <div className="mt-8 p-6 bg-gray-900 text-white rounded-lg text-center">
            <p className="text-2xl font-bold" style={{ transform: 'scaleY(-1)', letterSpacing: '0.1em' }}>
              {input}
            </p>
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• テキストを上下逆さまに変換</li>
            <li>• SNSやメッセージでユニークな表現に</li>
            <li>• 英数字と記号に対応</li>
            <li>• 日本語はそのまま反転表示</li>
          </ul>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner format="rectangle" />
      </div>
    </>
  )
}

export default FlipText
