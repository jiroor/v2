import { useState, useMemo } from 'react'
import { calculateDiff } from '../../utils/textDiffUtils'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'

function TextDiff() {
  useToolUsageTracking('/text/diff', 'テキスト差分表示')
  const [originalText, setOriginalText] = useState('')
  const [modifiedText, setModifiedText] = useState('')

  const diffResult = useMemo(() => {
    if (originalText === '' && modifiedText === '') {
      return []
    }
    return calculateDiff(originalText, modifiedText)
  }, [originalText, modifiedText])

  const handleClear = () => {
    setOriginalText('')
    setModifiedText('')
  }

  return (
    <div className="max-w-[1200px] mx-auto py-8 px-4">
      <h2 className="text-2xl font-semibold mb-8 text-center">テキスト差分表示</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col">
          <Label className="text-base">オリジナルテキスト</Label>
          <Textarea
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            placeholder="元のテキストを入力..."
            className="w-full min-h-[200px] md:min-h-[200px] p-4 text-sm md:text-sm font-mono leading-relaxed border border-gray-200 rounded-lg resize-y transition-colors focus:outline-none focus:border-black placeholder:text-gray-500"
          />
        </div>

        <div className="flex flex-col">
          <Label className="text-base">比較テキスト</Label>
          <Textarea
            value={modifiedText}
            onChange={(e) => setModifiedText(e.target.value)}
            placeholder="比較するテキストを入力..."
            className="w-full min-h-[200px] md:min-h-[200px] p-4 text-sm md:text-sm font-mono leading-relaxed border border-gray-200 rounded-lg resize-y transition-colors focus:outline-none focus:border-black placeholder:text-gray-500"
          />
        </div>
      </div>

      <div className="flex justify-end mb-6">
        <Button onClick={handleClear} variant="secondary">
          クリア
        </Button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">差分結果</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-sm md:text-sm leading-relaxed max-h-[600px] md:max-h-[600px] overflow-y-auto">
          {diffResult.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              テキストを入力すると差分が表示されます
            </div>
          ) : (
            diffResult.map((line, index) => (
              <div
                key={index}
                className={`py-1 px-3 my-0.5 rounded-sm whitespace-pre-wrap break-all ${
                  line.type === 'added'
                    ? 'bg-[#d4f4dd] text-[#1a7f37]'
                    : line.type === 'removed'
                    ? 'bg-[#ffd7d5] text-[#d1242f]'
                    : 'bg-transparent'
                }`}
              >
                {line.type === 'added' && '+ '}
                {line.type === 'removed' && '- '}
                {line.type === 'unchanged' && '  '}
                {line.content}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default TextDiff
