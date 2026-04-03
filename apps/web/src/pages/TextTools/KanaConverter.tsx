import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

type ConvertMode = 'hiraganaToKatakana' | 'katakanaToHiragana'

// ひらがな→カタカナ変換テーブル
const hiraganaToKatakanaMap: Record<string, string> = {
  'あ': 'ア', 'い': 'イ', 'う': 'ウ', 'え': 'エ', 'お': 'オ',
  'か': 'カ', 'き': 'キ', 'く': 'ク', 'け': 'ケ', 'こ': 'コ',
  'さ': 'サ', 'し': 'シ', 'す': 'ス', 'せ': 'セ', 'そ': 'ソ',
  'た': 'タ', 'ち': 'チ', 'つ': 'ツ', 'て': 'テ', 'と': 'ト',
  'な': 'ナ', 'に': 'ニ', 'ぬ': 'ヌ', 'ね': 'ネ', 'の': 'ノ',
  'は': 'ハ', 'ひ': 'ヒ', 'ふ': 'フ', 'へ': 'ヘ', 'ほ': 'ホ',
  'ま': 'マ', 'み': 'ミ', 'む': 'ム', 'め': 'メ', 'も': 'モ',
  'や': 'ヤ', 'ゆ': 'ユ', 'よ': 'ヨ',
  'ら': 'ラ', 'り': 'リ', 'る': 'ル', 'れ': 'レ', 'ろ': 'ロ',
  'わ': 'ワ', 'を': 'ヲ', 'ん': 'ン',
  'が': 'ガ', 'ぎ': 'ギ', 'ぐ': 'グ', 'げ': 'ゲ', 'ご': 'ゴ',
  'ざ': 'ザ', 'じ': 'ジ', 'ず': 'ズ', 'ぜ': 'ゼ', 'ぞ': 'ゾ',
  'だ': 'ダ', 'ぢ': 'ヂ', 'づ': 'ヅ', 'で': 'デ', 'ど': 'ド',
  'ば': 'バ', 'び': 'ビ', 'ぶ': 'ブ', 'べ': 'ベ', 'ぼ': 'ボ',
  'ぱ': 'パ', 'ぴ': 'ピ', 'ぷ': 'プ', 'ぺ': 'ペ', 'ぽ': 'ポ',
  'ぁ': 'ァ', 'ぃ': 'ィ', 'ぅ': 'ゥ', 'ぇ': 'ェ', 'ぉ': 'ォ',
  'っ': 'ッ', 'ゃ': 'ャ', 'ゅ': 'ュ', 'ょ': 'ョ',
  'ゎ': 'ヮ', 'ゐ': 'ヰ', 'ゑ': 'ヱ',
  'ー': 'ー', '。': '。', '、': '、', '「': '「', '」': '」',
}

// カタカナ→ひらがな変換テーブル
const katakanaToHiraganaMap: Record<string, string> = {
  'ア': 'あ', 'イ': 'い', 'ウ': 'う', 'エ': 'え', 'オ': 'お',
  'カ': 'か', 'キ': 'き', 'ク': 'く', 'ケ': 'け', 'コ': 'こ',
  'サ': 'さ', 'シ': 'し', 'ス': 'す', 'セ': 'せ', 'ソ': 'そ',
  'タ': 'た', 'チ': 'ち', 'ツ': 'つ', 'テ': 'て', 'ト': 'と',
  'ナ': 'な', 'ニ': 'に', 'ヌ': 'ぬ', 'ネ': 'ね', 'ノ': 'の',
  'ハ': 'は', 'ヒ': 'ひ', 'フ': 'ふ', 'ヘ': 'へ', 'ホ': 'ほ',
  'マ': 'ま', 'ミ': 'み', 'ム': 'む', 'メ': 'め', 'モ': 'も',
  'ヤ': 'や', 'ユ': 'ゆ', 'ヨ': 'よ',
  'ラ': 'ら', 'リ': 'り', 'ル': 'る', 'レ': 'れ', 'ロ': 'ろ',
  'ワ': 'わ', 'ヲ': 'を', 'ン': 'ん',
  'ガ': 'が', 'ギ': 'ぎ', 'グ': 'ぐ', 'ゲ': 'げ', 'ゴ': 'ご',
  'ザ': 'ざ', 'ジ': 'じ', 'ズ': 'ず', 'ゼ': 'ぜ', 'ゾ': 'ぞ',
  'ダ': 'だ', 'ヂ': 'ぢ', 'ヅ': 'づ', 'デ': 'で', 'ド': 'ど',
  'バ': 'ば', 'ビ': 'び', 'ブ': 'ぶ', 'ベ': 'べ', 'ボ': 'ぼ',
  'パ': 'ぱ', 'ピ': 'ぴ', 'プ': 'ぷ', 'ペ': 'ぺ', 'ポ': 'ぽ',
  'ァ': 'ぁ', 'ィ': 'ぃ', 'ゥ': 'ぅ', 'ェ': 'ぇ', 'ォ': 'ぉ',
  'ッ': 'っ', 'ャ': 'ゃ', 'ュ': 'ゅ', 'ョ': 'ょ',
  'ヮ': 'ゎ', 'ヰ': 'ゐ', 'ヱ': 'ゑ',
  'ヴ': 'ゔ',
  'ー': 'ー', '。': '。', '、': '、', '「': '「', '」': '」',
}

// ひらがなをカタカナに変換
const hiraganaToKatakana = (str: string) => {
  return str.split('').map(char => hiraganaToKatakanaMap[char] || char).join('')
}

// カタカナをひらがなに変換
const katakanaToHiragana = (str: string) => {
  return str.split('').map(char => katakanaToHiraganaMap[char] || char).join('')
}

function KanaConverter() {
  useToolUsageTracking('/text/kana', 'ひらがなカタカナ変換')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<ConvertMode>('hiraganaToKatakana')
  const [copySuccess, setCopySuccess] = useState(false)

  const convertText = (text: string, convertMode: ConvertMode) => {
    if (!text) {
      setOutput('')
      return
    }

    let result = text

    switch (convertMode) {
      case 'hiraganaToKatakana':
        result = hiraganaToKatakana(text)
        break
      case 'katakanaToHiragana':
        result = katakanaToHirigana(text)
        break
    }

    setOutput(result)
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    setCopySuccess(false)
    convertText(value, mode)
  }

  const handleModeChange = (newMode: ConvertMode) => {
    setMode(newMode)
    convertText(input, newMode)
  }

  const handleCopy = async () => {
    if (!output) return

    try {
      await navigator.clipboard.writeText(output)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  const shortcuts = [
    {
      key: 'd',
      description: 'コピー',
      action: handleCopy,
      meta: true,
      disabled: !output,
    },
  ]

  useKeyboardShortcut(shortcuts)

  const modeOptions: { value: ConvertMode; label: string; description: string }[] = [
    { value: 'hiraganaToKatakana', label: 'ひらがな→カタカナ', description: 'あいうえお → アイウエオ' },
    { value: 'katakanaToHiragana', label: 'カタカナ→ひらがな', description: 'アイウエオ → あいうえお' },
  ]

  return (
    <>
      <SEO path="/text/kana" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="ひらがなカタカナ変換" toolPath="/text/kana" shareTitle="ひらがなカタカナ変換 | Rakit" />

        {/* モード選択 */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {modeOptions.map(({ value, label }) => (
            <Button
              key={value}
              variant={mode === value ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleModeChange(value)}
            >
              {label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 入力 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              入力テキスト
            </label>
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="変換したいテキストを入力"
              className="w-full h-64 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>

          {/* 出力 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              結果
            </label>
            <textarea
              value={output}
              readOnly
              className="w-full h-64 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y bg-gray-50"
            />
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex gap-2 mt-4 justify-center">
          <Button onClick={handleCopy} disabled={!output}>
            {copySuccess ? 'コピーしました！' : 'コピー'}
          </Button>
        </div>

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• <strong>ひらがな→カタカナ</strong>: こんにちは → コンニチハ</li>
            <li>• <strong>カタカナ→ひらがな</strong>: コンニチハ → こんにちは</li>
          </ul>
          <p className="text-sm text-gray-500 mt-2">
            ※ 漢字や英数字はそのまま出力されます
          </p>
        </div>

        <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            ひらがなカタカナ変換ツールは、ひらがなをカタカナに、またはカタカナをひらがなに変換する無料のオンラインツールです。日本語テキストの処理や、読み方の確認などに役立ちます。漢字や英数字はそのまま保持されます。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• ひらがな⇔カタカナの双方向変換</li>
            <li>• リアルタイムで結果を表示</li>
            <li>• 漢字・英数字はそのまま保持</li>
            <li>• 完全無料、インストール不要</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. 漢字は変換されますか？</p>
              <p>A. いいえ、漢字や英数字はそのまま出力されます。</p>
            </div>
            <div>
              <p className="font-medium">Q. 半角カタカナは対応していますか？</p>
              <p>A. 現在は全角カタカナのみ対応しています。</p>
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

export default KanaConverter

// 修正: 関数名のタイポ修正
function katakanaToHirigana(text: string): string {
  return katakanaToHiragana(text)
}
