import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function LoremIpsum() {
  useToolUsageTracking('/text/lorem-ipsum-advanced', 'ダミーテキスト生成')
  const [paragraphs, setParagraphs] = useState(3)
  const [sentences, setSentences] = useState(5)
  const [output, setOutput] = useState('')
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs')

  const loremWords = [
    'Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ]

  const generateParagraph = (sentenceCount: number): string => {
    const sentences: string[] = []
    for (let i = 0; i < sentenceCount; i++) {
      const wordCount = Math.floor(Math.random() * 10) + 8
      const words: string[] = []
      for (let j = 0; j < wordCount; j++) {
        words.push(loremWords[Math.floor(Math.random() * loremWords.length)])
      }
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
      sentences.push(words.join(' ') + '.')
    }
    return sentences.join(' ')
  }

  const generate = () => {
    let result = ''

    if (type === 'paragraphs') {
      for (let i = 0; i < paragraphs; i++) {
        result += generateParagraph(sentences) + '\n\n'
      }
    } else if (type === 'sentences') {
      result = generateParagraph(sentences)
    } else {
      const words: string[] = []
      for (let i = 0; i < sentences * 10; i++) {
        words.push(loremWords[Math.floor(Math.random() * loremWords.length)])
      }
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
      result = words.join(' ')
    }

    setOutput(result.trim())
  }

  const copyOutput = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <>
      <SEO
        title="ダミーテキスト生成"
        
        path="/text/lorem-ipsum-advanced"
        category="UtilitiesApplication"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <ToolHeader
          title="ダミーテキスト生成"
          toolPath="/text/lorem-ipsum-advanced"
          
        />

        <div className="space-y-4">
          {/* タイプ選択 */}
          <div className="flex gap-2">
            <Button
              variant={type === 'paragraphs' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setType('paragraphs')}
            >
              段落
            </Button>
            <Button
              variant={type === 'sentences' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setType('sentences')}
            >
              文
            </Button>
            <Button
              variant={type === 'words' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setType('words')}
            >
              単語
            </Button>
          </div>

          {/* 数設定 */}
          <div className="grid grid-cols-2 gap-4">
            {type === 'paragraphs' && (
              <div>
                <label className="text-sm font-medium block mb-2">段落数: {paragraphs}</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={paragraphs}
                  onChange={(e) => setParagraphs(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium block mb-2">
                {type === 'paragraphs' ? '1段落あたりの文数' : type === 'sentences' ? '文数' : '単語数'}: {sentences}{type === 'words' ? '0' : ''}
              </label>
              <input
                type="range"
                min={type === 'words' ? 1 : 3}
                max={type === 'words' ? 20 : 15}
                value={sentences}
                onChange={(e) => setSentences(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* 生成ボタン */}
          <Button onClick={generate}>生成</Button>

          {/* 出力 */}
          {output && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">生成結果</label>
                <Button variant="outline" size="sm" onClick={copyOutput}>
                  コピー
                </Button>
              </div>
              <Textarea
                value={output}
                readOnly
                className="min-h-[200px]"
              />
            </div>
          )}

          {/* 広告 */}
          <AdBanner slot="TOOL_BOTTOM" format="horizontal" />
        </div>
      </div>
    </>
  )
}

export default LoremIpsum
