import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'

function HtmlToMarkdown() {
  useToolUsageTracking('/text/html-to-markdown', 'HTML to Markdown')
  const [htmlInput, setHtmlInput] = useState('')
  const [markdownOutput, setMarkdownOutput] = useState('')

  const convert = () => {
    let html = htmlInput

    // Remove script and style tags
    html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')

    // Headers
    html = html.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '# $1\n\n')
    html = html.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '## $1\n\n')
    html = html.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '### $1\n\n')
    html = html.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '#### $1\n\n')
    html = html.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, '##### $1\n\n')
    html = html.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, '###### $1\n\n')

    // Bold and Italic
    html = html.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**')
    html = html.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, '*$2*')

    // Links
    html = html.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')

    // Images
    html = html.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)')
    html = html.replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, '![]($1)')

    // Lists
    html = html.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, '$1\n')
    html = html.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, '$1\n')
    html = html.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n')

    // Code
    html = html.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`')
    html = html.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, '```\n$1\n```\n\n')

    // Blockquote
    html = html.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, '> $1\n\n')

    // Paragraphs
    html = html.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n')

    // Line breaks
    html = html.replace(/<br\s*\/?>/gi, '\n')

    // Horizontal rule
    html = html.replace(/<hr\s*\/?>/gi, '\n---\n\n')

    // Remove remaining HTML tags
    html = html.replace(/<[^>]+>/g, '')

    // Decode HTML entities
    html = html.replace(/&nbsp;/g, ' ')
    html = html.replace(/&amp;/g, '&')
    html = html.replace(/&lt;/g, '<')
    html = html.replace(/&gt;/g, '>')
    html = html.replace(/&quot;/g, '"')
    html = html.replace(/&#39;/g, "'")

    // Clean up whitespace
    html = html.replace(/\n{3,}/g, '\n\n')
    html = html.trim()

    setMarkdownOutput(html)
  }

  const handleCopy = async () => {
    if (!markdownOutput) return
    try {
      await navigator.clipboard.writeText(markdownOutput)
      alert('コピーしました')
    } catch {
      alert('コピーに失敗しました')
    }
  }

  const handleClear = () => {
    setHtmlInput('')
    setMarkdownOutput('')
  }

  return (
    <>
      <SEO path="/text/html-to-markdown" />
      <div className="max-w-[600px] mx-auto py-8 px-4">
        <ToolHeader title="HTML to Markdown" toolPath="/text/html-to-markdown" shareTitle="HTML to Markdown | Rakit" />

        {/* HTML入力 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">HTML</label>
          <textarea
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            placeholder="<h1>Title</h1>&#10;<p>This is <strong>bold</strong> text.</p>"
            rows={8}
            className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {/* ボタン */}
        <div className="flex gap-2 mb-4">
          <Button onClick={convert} size="lg" className="flex-1">
            変換
          </Button>
          <Button onClick={handleClear} variant="outline" size="lg" className="flex-1">
            クリア
          </Button>
        </div>

        {/* Markdown出力 */}
        {markdownOutput && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Markdown</label>
            <textarea
              value={markdownOutput}
              readOnly
              rows={8}
              className="w-full p-3 border border-gray-200 rounded-md font-mono text-sm bg-gray-50"
            />
            <Button onClick={handleCopy} variant="outline" size="sm" className="w-full mt-2">
              コピー
            </Button>
          </div>
        )}

        {/* 対応要素 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">対応要素</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 見出し (h1-h6)</li>
            <li>• 太字・斜体 (strong, em)</li>
            <li>• リンク・画像 (a, img)</li>
            <li>• リスト (ul, ol, li)</li>
            <li>• コード (code, pre)</li>
            <li>• 引用・段落・水平線</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default HtmlToMarkdown
