import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function WordCounter() {
  useToolUsageTracking('/text/word-count', '文字数カウンター')
  const [text, setText] = useState('')

  const stats = useMemo(() => {
    const charCount = text.length
    const charCountNoSpace = text.replace(/\s/g, '').length
    const lineCount = text.split('\n').length
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
    const paragraphCount = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0

    // 日本語の文字数（ひらがな・カタカナ・漢字のみ）
    const japaneseCount = (text.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g) || []).length

    // 英語の単語数
    const englishWordCount = (text.match(/[a-zA-Z]+/g) || []).length

    // 数字の数
    const numberCount = (text.match(/[0-9]+/g) || []).length

    return {
      charCount,
      charCountNoSpace,
      lineCount,
      wordCount,
      paragraphCount,
      japaneseCount,
      englishWordCount,
      numberCount,
    }
  }, [text])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      alert('コピーしました')
    } catch {
      alert('コピーに失敗しました')
    }
  }

  const handleClear = () => {
    setText('')
  }

  return (
    <>
      <SEO path="/text/word-count" />
      <div className="max-w-[600px] mx-auto py-8 px-4">
        <ToolHeader title="文字数カウンター" toolPath="/text/word-count" shareTitle="文字数カウンター | Rakit" />

        {/* テキスト入力 */}
        <div className="mb-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="テキストを入力してください..."
            className="w-full h-[200px] p-4 border border-gray-200 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706] resize-y"
          />
        </div>

        {/* ボタン */}
        <div className="flex gap-2 mb-6">
          <Button onClick={handleCopy} variant="outline" className="flex-1">
            コピー
          </Button>
          <Button onClick={handleClear} variant="destructive" className="flex-1">
            クリア
          </Button>
        </div>

        {/* 統計 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">文字数</p>
            <p className="text-2xl font-bold text-[#d97706]">{stats.charCount.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">文字数（空白除く）</p>
            <p className="text-2xl font-bold">{stats.charCountNoSpace.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">行数</p>
            <p className="text-2xl font-bold">{stats.lineCount.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">単語数</p>
            <p className="text-2xl font-bold">{stats.wordCount.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">段落</p>
            <p className="text-2xl font-bold">{stats.paragraphCount.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">日本語文字</p>
            <p className="text-2xl font-bold">{stats.japaneseCount.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">英単語</p>
            <p className="text-2xl font-bold">{stats.englishWordCount.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">数字</p>
            <p className="text-2xl font-bold">{stats.numberCount.toLocaleString()}</p>
          </div>
        </div>

        {/* このツールについて */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-3 text-lg">文字数カウンターとは</h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            文字数カウンターは、テキストの文字数や単語数をリアルタイムで計算する無料のオンラインツールです。
            日本語と英語の両方に対応しており、論文、ブログ記事、SNS投稿、SEO記事などの文字数管理に最適です。
            インストール不要で、ブラウザ上ですぐに使えます。
          </p>
          
          <h4 className="font-semibold mb-2">主な機能</h4>
          <ul className="text-sm text-gray-600 space-y-1 mb-4">
            <li>• <strong>文字数カウント</strong>: 全文字数と空白を除いた文字数を表示</li>
            <li>• <strong>日本語対応</strong>: ひらがな、カタカナ、漢字のみの文字数をカウント</li>
            <li>• <strong>単語数カウント</strong>: 英語の単語数と日本語の文字数を分けて表示</li>
            <li>• <strong>行数・段落数</strong>: テキストの構成を把握</li>
            <li>• <strong>リアルタイム集計</strong>: 入力するだけで即座に結果を表示</li>
          </ul>

          <h4 className="font-semibold mb-2">使い方</h4>
          <ol className="text-sm text-gray-600 space-y-1 mb-4 list-decimal list-inside">
            <li>テキストエリアに文章を入力または貼り付け</li>
            <li>リアルタイムで各種統計が表示されます</li>
            <li>「コピー」ボタンでテキストをクリップボードにコピー</li>
            <li>「クリア」ボタンで入力内容をリセット</li>
          </ol>

          <h4 className="font-semibold mb-2">活用シーン</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 論文やレポートの文字数制限チェック</li>
            <li>• SEO記事の文字数最適化（Google推奨2,000文字以上）</li>
            <li>• Twitter（X）の文字数管理</li>
            <li>• メールマガジンの文字数調整</li>
            <li>• 商品説明文やキャッチコピーの長さ確認</li>
          </ul>
        </div>

        {/* FAQ */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-3 text-lg">よくある質問</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm text-gray-800">Q. 日本語の文字数はどうカウントされていますか？</h4>
              <p className="text-sm text-gray-600 mt-1">A. 日本語文字数は、ひらがな、カタカナ、漢字のみをカウントしています。記号や英数字は含まれません。</p>
            </div>
            
            <div>
              <h4 className="font-medium text-sm text-gray-800">Q. 入力したテキストは保存されますか？</h4>
              <p className="text-sm text-gray-600 mt-1">A. いいえ、すべての処理はブラウザ上で完結しており、サーバーには一切保存されません。安心してご利用ください。</p>
            </div>
            
            <div>
              <h4 className="font-medium text-sm text-gray-800">Q. スマートフォンでも使えますか？</h4>
              <p className="text-sm text-gray-600 mt-1">A. はい、PC・スマートフォン・タブレットのすべてのデバイスに対応しています。PWA対応なので、アプリのようにホーム画面に追加も可能です。</p>
            </div>
            
            <div>
              <h4 className="font-medium text-sm text-gray-800">Q. WordやGoogleドキュメントの文字数と一致しません</h4>
              <p className="text-sm text-gray-600 mt-1">A. 文字数のカウント方法はアプリケーションによって異なります。当ツールは一般的な文字数カウント方式を採用しています。</p>
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

export default WordCounter
