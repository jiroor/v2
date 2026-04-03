import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts/KeyboardShortcuts'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function MarkdownPreview() {
  useToolUsageTracking('/text/markdown', 'Markdownプレビュー')
  const [markdown, setMarkdown] = useState(`# Markdownプレビュー

## 見出し2

これは**太字**と*斜体*のテストです。

### リスト

- アイテム1
- アイテム2
- アイテム3

### 番号付きリスト

1. 最初
2. 二番目
3. 三番目

### コード

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

インラインコード: \`const x = 1;\`

### 引用

> これは引用文です。
> 複数行も可能です。

### リンク

[OpenClaw](https://openclaw.ai)

### 水平線

---

以上です！
`)
  const [copySuccess, setCopySuccess] = useState(false)

  const html = useMemo(() => {
    return markdown
      // コードブロック
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded overflow-x-auto"><code>$2</code></pre>')
      // インラインコード
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
      // 見出し
      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
      // 太字・斜体
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      // リンク
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 underline" target="_blank" rel="noopener">$1</a>')
      // 引用
      .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 my-2 text-gray-600">$1</blockquote>')
      // 水平線
      .replace(/^---$/gm, '<hr class="my-4 border-gray-300">')
      // 番号付きリスト
      .replace(/^\d+\. (.+)$/gm, '<li class="ml-6 list-decimal">$1</li>')
      // 箇条書きリスト
      .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
      // 段落
      .replace(/\n\n/g, '</p><p class="my-2">')
      // 改行
      .replace(/\n/g, '<br>')
  }, [markdown])

  const handleCopy = async () => {
    if (!html) return

    try {
      await navigator.clipboard.writeText(html)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      alert('コピーに失敗しました')
    }
  }

  const shortcuts = [
    {
      key: 'd',
      description: 'HTMLをコピー',
      action: handleCopy,
      meta: true,
    },
  ]

  useKeyboardShortcut(shortcuts)

  return (
    <>
      <SEO
        path="/text/markdown"
        title="Markdownプレビュー"
        description="無料のオンラインMarkdownプレビューツール。MarkdownテキストをリアルタイムでHTMLに変換してプレビュー。ブログ記事やドキュメント作成に便利。"
      />
      <div className="max-w-[1000px] mx-auto py-8 px-4">
        <ToolHeader title="Markdownプレビュー" toolPath="/text/markdown" shareTitle="Markdownプレビュー | Rakit" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 入力 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Markdown
            </label>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Markdownを入力"
              className="w-full h-96 p-4 border border-gray-200 rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>

          {/* プレビュー */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                プレビュー
              </label>
              <Button onClick={handleCopy} size="sm" variant="outline">
                {copySuccess ? 'コピーしました！' : 'HTMLをコピー'}
              </Button>
            </div>
            <div 
              className="w-full h-96 p-4 border border-gray-200 rounded-md overflow-auto prose prose-sm"
              dangerouslySetInnerHTML={{ __html: `<p class="my-2">${html}</p>` }}
            />
          </div>
        </div>

        {/* 使い方 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Markdownを入力するとリアルタイムでプレビュー表示</li>
            <li>• 見出し、リスト、コード、リンクなど基本構文に対応</li>
            <li>• HTMLとしてコピーしてブログなどに貼り付け可能</li>
            <li>• ドキュメント作成やブログ記事の確認に便利</li>
          </ul>
        </div>

        <KeyboardShortcuts shortcuts={shortcuts} collapsible={true} defaultExpanded={false} />

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            Markdownプレビューツールは、MarkdownテキストをリアルタイムでHTMLに変換してプレビューできる無料のオンラインツールです。ブログ記事やドキュメントの作成に役立ちます。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• リアルタイムプレビュー</li>
            <li>• 見出し、リスト、リンク、コードなど対応</li>
            <li>• HTMLとしてコピー可能</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. Markdownとは何ですか？</p>
              <p>A. 簡易的なマークアップ言語で、プレーンテキストで文書を書ける形式です。</p>
            </div>
            <div>
              <p className="font-medium">Q. どの構文に対応していますか？</p>
              <p>A. 見出し、太字、斜体、リスト、リンク、コード、引用など基本的な構文に対応しています。</p>
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

export default MarkdownPreview
