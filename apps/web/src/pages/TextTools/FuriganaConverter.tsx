import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

type FuriganaMode = 'html' | 'plain' | 'markdown'

function FuriganaConverter() {
  useToolUsageTracking('/text/furigana', 'ふりがな変換')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<FuriganaMode>('html')

  // 簡易的なふりがな辞書（一般的な漢字）
  const furiganaDict: Record<string, string> = {
    '日本語': 'にほんご',
    '漢字': 'かんじ',
    '平仮名': 'ひらがな',
    '片仮名': 'かたかな',
    '言葉': 'ことば',
    '文章': 'ぶんしょう',
    '読み方': 'よみかた',
    '今日': 'きょう',
    '明日': 'あした',
    '昨日': 'きのう',
    '時間': 'じかん',
    '場所': 'ばしょ',
    '人間': 'にんげん',
    '世界': 'せかい',
    '会社': 'かいしゃ',
    '仕事': 'しごと',
    '電話': 'でんわ',
    '学校': 'がっこう',
    '先生': 'せんせい',
    '学生': 'がくせい',
    '音楽': 'おんがく',
    '映画': 'えいが',
    '本': 'ほん',
    '水': 'みず',
    '山': 'やま',
    '川': 'かわ',
    '海': 'うみ',
    '空': 'そら',
    '花': 'はな',
    '木': 'き',
    '田中': 'たなか',
    '山田': 'やまだ',
    '佐藤': 'さとう',
    '鈴木': 'すずき',
    '東京': 'とうきょう',
    '大阪': 'おおさか',
    '京都': 'きょうと',
    '北海道': 'ほっかいどう',
    '沖縄': 'おきなわ',
  }

  const addFurigana = (text: string, furiganaMode: FuriganaMode) => {
    if (!text) {
      setOutput('')
      return
    }

    let result = text

    // 辞書にある漢字をふりがなに変換
    for (const [kanji, reading] of Object.entries(furiganaDict)) {
      switch (furiganaMode) {
        case 'html':
          result = result.replace(new RegExp(kanji, 'g'), `<ruby>${kanji}<rt>${reading}</rt></ruby>`)
          break
        case 'plain':
          result = result.replace(new RegExp(kanji, 'g'), `${kanji}(${reading})`)
          break
        case 'markdown':
          result = result.replace(new RegExp(kanji, 'g'), `${kanji}[${reading}]`)
          break
      }
    }

    setOutput(result)
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    addFurigana(value, mode)
  }

  const handleModeChange = (newMode: FuriganaMode) => {
    setMode(newMode)
    addFurigana(input, newMode)
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
      <SEO path="/text/furigana" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="ふりがな変換" toolPath="/text/furigana" shareTitle="ふりがな変換 | Rakit" />

        {/* モード選択 */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <Button
            variant={mode === 'html' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleModeChange('html')}
          >
            HTML (ruby)
          </Button>
          <Button
            variant={mode === 'plain' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleModeChange('plain')}
          >
            括弧形式
          </Button>
          <Button
            variant={mode === 'markdown' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleModeChange('markdown')}
          >
            Markdown
          </Button>
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
              placeholder="日本語の文章を入力"
              className="w-full h-48 p-4 border border-gray-200 rounded-md text-lg resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706]"
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
              className="w-full h-48 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y bg-gray-50"
            />
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex gap-2 mt-4 justify-center">
          <Button onClick={handleCopy} disabled={!output}>
            コピー
          </Button>
        </div>

        {/* プレビュー */}
        {mode === 'html' && output && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="font-semibold mb-2">プレビュー</h3>
            <div 
              className="text-xl leading-relaxed"
              dangerouslySetInnerHTML={{ __html: output }}
            />
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• よく使われる漢字にふりがなを自動追加</li>
            <li>• HTML (rubyタグ)、括弧形式、Markdownに対応</li>
            <li>• 教育教材や読みやすい文章作成に便利</li>
            <li>※ 登録されている単語のみ変換されます</li>
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

export default FuriganaConverter
