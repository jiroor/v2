import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'
import { RelatedTools } from '@/components/RelatedTools/RelatedTools'

type ConvertMode = 'romajiToHiragana' | 'hiraganaToRomaji'

// ローマ字→ひらがな変換テーブル
const romajiToHiraganaMap: Record<string, string> = {
  // 基本母音
  'a': 'あ', 'i': 'い', 'u': 'う', 'e': 'え', 'o': 'お',
  // か行
  'ka': 'か', 'ki': 'き', 'ku': 'く', 'ke': 'け', 'ko': 'こ',
  'kya': 'きゃ', 'kyu': 'きゅ', 'kyo': 'きょ',
  // さ行
  'sa': 'さ', 'shi': 'し', 'su': 'す', 'se': 'せ', 'so': 'そ',
  'sha': 'しゃ', 'shu': 'しゅ', 'sho': 'しょ',
  'sya': 'しゃ', 'syu': 'しゅ', 'syo': 'しょ',
  'si': 'し',
  // た行
  'ta': 'た', 'chi': 'ち', 'tsu': 'つ', 'te': 'て', 'to': 'と',
  'cha': 'ちゃ', 'chu': 'ちゅ', 'cho': 'ちょ',
  'tya': 'ちゃ', 'tyu': 'ちゅ', 'tyo': 'ちょ',
  'ti': 'ち', 'tu': 'つ',
  // な行
  'na': 'な', 'ni': 'に', 'nu': 'ぬ', 'ne': 'ね', 'no': 'の',
  'nya': 'にゃ', 'nyu': 'にゅ', 'nyo': 'にょ',
  // は行
  'ha': 'は', 'hi': 'ひ', 'fu': 'ふ', 'he': 'へ', 'ho': 'ほ',
  'hya': 'ひゃ', 'hyu': 'ひゅ', 'hyo': 'ひょ',
  'hu': 'ふ',
  // ま行
  'ma': 'ま', 'mi': 'み', 'mu': 'む', 'me': 'め', 'mo': 'も',
  'mya': 'みゃ', 'myu': 'みゅ', 'myo': 'みょ',
  // や行
  'ya': 'や', 'yu': 'ゆ', 'yo': 'よ',
  // ら行
  'ra': 'ら', 'ri': 'り', 'ru': 'る', 're': 'れ', 'ro': 'ろ',
  'rya': 'りゃ', 'ryu': 'りゅ', 'ryo': 'りょ',
  // わ行
  'wa': 'わ', 'wo': 'を', 'n': 'ん',
  // が行
  'ga': 'が', 'gi': 'ぎ', 'gu': 'ぐ', 'ge': 'げ', 'go': 'ご',
  'gya': 'ぎゃ', 'gyu': 'ぎゅ', 'gyo': 'ぎょ',
  // ざ行
  'za': 'ざ', 'ji': 'じ', 'zu': 'ず', 'ze': 'ぜ', 'zo': 'ぞ',
  'ja': 'じゃ', 'ju': 'じゅ', 'jo': 'じょ',
  'jya': 'じゃ', 'jyu': 'じゅ', 'jyo': 'じょ',
  'zi': 'じ',
  // だ行
  'da': 'だ', 'di': 'ぢ', 'du': 'づ', 'de': 'で', 'do': 'ど',
  'dya': 'ぢゃ', 'dyu': 'ぢゅ', 'dyo': 'ぢょ',
  // ば行
  'ba': 'ば', 'bi': 'び', 'bu': 'ぶ', 'be': 'べ', 'bo': 'ぼ',
  'bya': 'びゃ', 'byu': 'びゅ', 'byo': 'びょ',
  // ぱ行
  'pa': 'ぱ', 'pi': 'ぴ', 'pu': 'ぷ', 'pe': 'ぺ', 'po': 'ぽ',
  'pya': 'ぴゃ', 'pyu': 'ぴゅ', 'pyo': 'ぴょ',
  // 促音
  'kka': 'っか', 'kki': 'っき', 'kku': 'っく', 'kke': 'っけ', 'kko': 'っこ',
  'ssa': 'っさ', 'ssi': 'っし', 'ssu': 'っす', 'sse': 'っせ', 'sso': 'っそ',
  'tta': 'った', 'tti': 'っち', 'ttu': 'っつ', 'tte': 'って', 'tto': 'っと',
  'hha': 'っは', 'hhi': 'っひ', 'hhu': 'っふ', 'hhe': 'っへ', 'hho': 'っほ',
  'mma': 'っま', 'mmi': 'っみ', 'mmu': 'っむ', 'mme': 'っめ', 'mmo': 'っても',
  'rra': 'っら', 'rri': 'っり', 'rru': 'っる', 'rre': 'っれ', 'rro': 'っろ',
  'gga': 'っが', 'ggi': 'っぎ', 'ggu': 'っぐ', 'gge': 'っげ', 'ggo': 'っご',
  'zza': 'っざ', 'zzi': 'っじ', 'zzu': 'っず', 'zze': 'っぜ', 'zzo': 'っぞ',
  'dda': 'っだ', 'ddi': 'っぢ', 'ddu': 'っづ', 'dde': 'っで', 'ddo': 'っど',
  'bba': 'っば', 'bbi': 'っび', 'bbu': 'っぶ', 'bbe': 'っべ', 'bbo': 'っぼ',
  'ppa': 'っぱ', 'ppi': 'っぴ', 'ppu': 'っぷ', 'ppe': 'っぺ', 'ppo': 'っぽ',
  // 撥音
  'nn': 'ん',
  // 小さいつ
  'ltu': 'っ', 'xtu': 'っ', 'ltsu': 'っ',
  // 小さいやゆよ
  'lya': 'ゃ', 'lyu': 'ゅ', 'lyo': 'ょ',
  'xya': 'ゃ', 'xyu': 'ゅ', 'xyo': 'ょ',
}

// ひらがな→ローマ字変換テーブル
const hiraganaToRomajiMap: Record<string, string> = {
  'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
  'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
  'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
  'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
  'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
  'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
  'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
  'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
  'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
  'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
  'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
  'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
  'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
  'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
  'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
  'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
  'わ': 'wa', 'を': 'wo', 'ん': 'n',
  'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
  'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
  'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
  'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo',
  'だ': 'da', 'ぢ': 'di', 'づ': 'du', 'で': 'de', 'ど': 'do',
  'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
  'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
  'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
  'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',
  'っ': 'tsu',
  'ゃ': 'ya', 'ゅ': 'yu', 'ょ': 'yo',
}

// ローマ字をひらがなに変換
const romajiToHiragana = (str: string) => {
  let result = str.toLowerCase()
  
  // 長いパターンから先に置換
  const sortedKeys = Object.keys(romajiToHiraganaMap).sort((a, b) => b.length - a.length)
  
  for (const key of sortedKeys) {
    result = result.split(key).join(romajiToHiraganaMap[key])
  }
  
  return result
}

// ひらがなをローマ字に変換
const hiraganaToRomaji = (str: string) => {
  let result = str
  
  // 長いパターンから先に置換
  const sortedKeys = Object.keys(hiraganaToRomajiMap).sort((a, b) => b.length - a.length)
  
  for (const key of sortedKeys) {
    result = result.split(key).join(hiraganaToRomajiMap[key])
  }
  
  return result
}

function RomajiConverter() {
  useToolUsageTracking('/text/romaji', 'ローマ字変換')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<ConvertMode>('romajiToHiragana')
  const [copySuccess, setCopySuccess] = useState(false)

  const convertText = (text: string, convertMode: ConvertMode) => {
    if (!text) {
      setOutput('')
      return
    }

    let result = text

    switch (convertMode) {
      case 'romajiToHiragana':
        result = romajiToHiragana(text)
        break
      case 'hiraganaToRomaji':
        result = hiraganaToRomaji(text)
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
    { value: 'romajiToHiragana', label: 'ローマ字→ひらがな', description: 'konnichiha → こんにちは' },
    { value: 'hiraganaToRomaji', label: 'ひらがな→ローマ字', description: 'こんにちは → konnichiha' },
  ]

  return (
    <>
      <SEO
        path="/text/romaji"
        title="ローマ字変換"
        description="無料のオンラインローマ字変換ツール。ローマ字をひらがなに、ひらがなをローマ字に変換。ヘボン式ローマ字に対応。"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="ローマ字変換" toolPath="/text/romaji" shareTitle="ローマ字変換 | Rakit" />

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
            <li>• <strong>ローマ字→ひらがな</strong>: konnichiha → こんにちは</li>
            <li>• <strong>ひらがな→ローマ字</strong>: こんにちは → konnichiha</li>
          </ul>
          <p className="text-sm text-gray-500 mt-2">
            ※ ヘボン式ローマ字に対応しています
          </p>
        </div>

        <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            ローマ字変換ツールは、ローマ字をひらがなに、またはひらがなをローマ字に変換する無料のオンラインツールです。ヘボン式ローマ字に対応しており、日本語学習やテキスト処理に役立ちます。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• ローマ字⇔ひらがなの双方向変換</li>
            <li>• ヘボン式ローマ字に対応</li>
            <li>• 拗音・促音・濁点に対応</li>
            <li>• 完全無料、インストール不要</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. ヘボン式とは何ですか？</p>
              <p>A. 日本語をローマ字表記する際の一般的な方式です。「し」を「shi」と表記するなど特徴があります。</p>
            </div>
            <div>
              <p className="font-medium">Q. カタカナも変換できますか？</p>
              <p>A. 現在はひらがなのみ対応しています。カタカナは一度ひらがなに変換してからご利用ください。</p>
            </div>
          </div>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        {/* 関連ツール */}
        <RelatedTools currentPath="/text/romaji" />
        <AdBanner slot="tools-rectangle" format="rectangle" />
      </div>
    </>
  )
}

export default RomajiConverter
