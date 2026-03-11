import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

type Unit = 'paragraphs' | 'sentences' | 'words'

const loremWords = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum',
]

function LoremIpsumGenerator() {
  useToolUsageTracking('/text/lorem', 'Lorem Ipsum生成')
  const [output, setOutput] = useState('')
  const [count, setCount] = useState(3)
  const [unit, setUnit] = useState<Unit>('paragraphs')
  const [copySuccess, setCopySuccess] = useState(false)
  const [startWithLorem, setStartWithLorem] = useState(true)

  const generateWord = (): string => {
    return loremWords[Math.floor(Math.random() * loremWords.length)]
  }

  const generateSentence = (capitalize: boolean = false): string => {
    const length = Math.floor(Math.random() * 10) + 8 // 8-17 words
    let sentence: string[] = []

    for (let i = 0; i < length; i++) {
      sentence.push(generateWord())
    }

    if (capitalize && sentence.length > 0) {
      sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1)
    }

    return sentence.join(' ') + '.'
  }

  const generateParagraph = (startWithClassic: boolean): string => {
    const sentenceCount = Math.floor(Math.random() * 4) + 4 // 4-7 sentences
    let sentences: string[] = []

    if (startWithClassic) {
      sentences.push('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
    }

    for (let i = sentences.length; i < sentenceCount; i++) {
      sentences.push(generateSentence(i === 0 && !startWithClassic))
    }

    return sentences.join(' ')
  }

  const generate = () => {
    let result: string[] = []

    switch (unit) {
      case 'paragraphs':
        for (let i = 0; i < count; i++) {
          result.push(generateParagraph(startWithLorem && i === 0))
        }
        break
      case 'sentences':
        for (let i = 0; i < count; i++) {
          result.push(generateSentence(i === 0 || !startWithLorem))
        }
        break
      case 'words':
        const words: string[] = []
        for (let i = 0; i < count; i++) {
          if (startWithLorem && i < 5 && i < loremWords.length) {
            words.push(loremWords[i])
          } else {
            words.push(generateWord())
          }
        }
        result.push(words.join(' '))
        break
    }

    setOutput(result.join('\n\n'))
    setCopySuccess(false)
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
      key: 'g',
      description: '生成',
      action: generate,
    },
    {
      key: 'd',
      description: 'コピー',
      action: handleCopy,
      meta: true,
      disabled: !output,
    },
  ]

  useKeyboardShortcut(shortcuts)

  return (
    <>
      <SEO path="/text/lorem" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader title="Lorem Ipsum生成" toolPath="/text/lorem" shareTitle="Lorem Ipsum生成 | Rakit" />

        {/* オプション */}
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">単位:</span>
            <Button
              variant={unit === 'paragraphs' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setUnit('paragraphs')}
            >
              段落
            </Button>
            <Button
              variant={unit === 'sentences' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setUnit('sentences')}
            >
              文
            </Button>
            <Button
              variant={unit === 'words' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setUnit('words')}
            >
              単語
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">数:</span>
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
              className="w-20 p-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
              className="w-4 h-4 accent-[#d97706]"
            />
            <span className="text-sm text-gray-700">"Lorem ipsum..."で始める</span>
          </label>
        </div>

        {/* 生成ボタン */}
        <div className="flex justify-center mb-6">
          <Button onClick={generate} size="lg">
            生成
          </Button>
        </div>

        {/* 結果 */}
        {output && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                生成結果
              </label>
              <Button
                onClick={handleCopy}
                size="sm"
                variant={copySuccess ? 'default' : 'outline'}
              >
                {copySuccess ? 'コピーしました！' : 'コピー'}
              </Button>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 whitespace-pre-wrap font-mono text-sm">
              {output}
            </div>
          </div>
        )}

        {!output && (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-8 text-center text-gray-400">
            「生成」ボタンをクリックしてください
          </div>
        )}

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• ウェブサイトやデザインのモックアップに使用</li>
            <li>• 段落、文、単語単位で生成可能</li>
            <li>• 「Lorem ipsum...」で始めるかランダムに開始</li>
            <li>• コピーしてそのまま使用可能</li>
          </ul>
        </div>

        <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner slot="tools-rectangle" format="rectangle" />
      </div>
    </>
  )
}

export default LoremIpsumGenerator
