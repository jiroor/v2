import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'
import { RelatedTools } from '@/components/RelatedTools/RelatedTools'

function CodeFormatter() {
  useToolUsageTracking('/text/code-formatter', 'コードフォーマッタ')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [language, setLanguage] = useState<'json' | 'html' | 'css' | 'javascript'>('json')

  const formatCode = () => {
    setError('')
    try {
      let formatted = ''

      switch (language) {
        case 'json':
          formatted = JSON.stringify(JSON.parse(input), null, 2)
          break
        case 'html':
          formatted = formatHTML(input)
          break
        case 'css':
          formatted = formatCSS(input)
          break
        case 'javascript':
          formatted = formatJS(input)
          break
      }

      setOutput(formatted)
    } catch (e) {
      setError(`フォーマットエラー: ${e instanceof Error ? e.message : '不明なエラー'}`)
      setOutput('')
    }
  }

  const formatHTML = (html: string): string => {
    let formatted = ''
    let indent = 0
    const lines = html.split(/(<[^>]+>)/g).filter(line => line.trim())
    
    lines.forEach(line => {
      const trimmed = line.trim()
      if (!trimmed) return

      if (trimmed.startsWith('</')) {
        indent = Math.max(0, indent - 1)
        formatted += '  '.repeat(indent) + trimmed + '\n'
      } else if (trimmed.startsWith('<') && !trimmed.startsWith('<!') && !trimmed.endsWith('/>')) {
        formatted += '  '.repeat(indent) + trimmed + '\n'
        if (!trimmed.match(/<\w+[^>]*\/>/)) {
          indent++
        }
      } else {
        formatted += '  '.repeat(indent) + trimmed + '\n'
      }
    })

    return formatted.trim()
  }

  const formatCSS = (css: string): string => {
    return css
      .replace(/\s*{\s*/g, ' {\n  ')
      .replace(/;\s*/g, ';\n  ')
      .replace(/\s*}\s*/g, '\n}\n')
      .replace(/,\s*/g, ',\n')
      .replace(/\n\s*\n/g, '\n')
      .trim()
  }

  const formatJS = (js: string): string => {
    // Simple JS formatting
    return js
      .replace(/\s*{\s*/g, ' {\n  ')
      .replace(/;\s*/g, ';\n')
      .replace(/\s*}\s*/g, '\n}\n')
      .replace(/,\s*/g, ', ')
      .replace(/\n\s*\n/g, '\n')
      .trim()
  }

  const copyOutput = () => {
    navigator.clipboard.writeText(output)
  }

  const clear = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  return (
    <>
      <SEO
        title="コードフォーマッタ"
        description="無料のオンラインコードフォーマッタ。JSON、HTML、CSS、JavaScriptのコードを整形。圧縮されたコードを見やすい形式に変換。"
        path="/text/code-formatter"
        category="DeveloperApplication"
      />
      <div className="max-w-[900px] mx-auto py-8 px-4">
        <ToolHeader
          title="コードフォーマッタ"
          toolPath="/text/code-formatter"
          
        />

        <div className="space-y-4">
          {/* 言語選択 */}
          <div className="flex gap-2">
            {(['json', 'html', 'css', 'javascript'] as const).map((lang) => (
              <Button
                key={lang}
                variant={language === lang ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguage(lang)}
              >
                {lang.toUpperCase()}
              </Button>
            ))}
          </div>

          {/* 入力 */}
          <div>
            <label className="text-sm font-medium block mb-2">入力コード</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={language === 'json' ? '{"key": "value"}' : language === 'html' ? '<div><p>text</p></div>' : language === 'css' ? 'body{margin:0;padding:0}' : 'function test(){return true}'}
              className="font-mono text-sm min-h-[200px]"
            />
          </div>

          {/* ボタン */}
          <div className="flex gap-2">
            <Button onClick={formatCode} disabled={!input}>
              フォーマット
            </Button>
            <Button variant="secondary" onClick={clear}>
              クリア
            </Button>
          </div>

          {/* エラー */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* 出力 */}
          {output && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">フォーマット結果</label>
                <Button variant="outline" size="sm" onClick={copyOutput}>
                  コピー
                </Button>
              </div>
              <Textarea
                value={output}
                readOnly
                className="font-mono text-sm min-h-[200px] bg-gray-50"
              />
            </div>
          )}

          {/* 広告 */}
          {/* 関連ツール */}
        <RelatedTools currentPath="/text/code-formatter" />
        <AdBanner slot="TOOL_BOTTOM" format="horizontal" />
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            コードフォーマッタは、JSON、HTML、CSS、JavaScriptのコードを整形する無料のオンラインツールです。圧縮されたコードや読みづらいコードを見やすい形式に整形できます。開発やデバッグに役立ちます。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• JSON、HTML、CSS、JavaScriptに対応</li>
            <li>• 自動インデント整形</li>
            <li>• 構文エラーを検出</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. どの言語に対応していますか？</p>
              <p>A. JSON、HTML、CSS、JavaScriptの4言語に対応しています。</p>
            </div>
            <div>
              <p className="font-medium">Q. 大きなファイルも処理できますか？</p>
              <p>A. 数千行程度まで問題なく処理できます。</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CodeFormatter
