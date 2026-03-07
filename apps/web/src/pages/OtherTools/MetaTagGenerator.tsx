import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function MetaTagGenerator() {
  useToolUsageTracking('/other/meta-tag', 'メタタグ生成')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [keywords, setKeywords] = useState('')
  const [ogImage, setOgImage] = useState('')
  const [url, setUrl] = useState('')
  const [siteName, setSiteName] = useState('')

  const metaTags = `<!-- Primary Meta Tags -->
<title>${title || 'ページタイトル'}</title>
<meta name="title" content="${title || 'ページタイトル'}">
<meta name="description" content="${description || 'ページの説明文'}">
${keywords ? `<meta name="keywords" content="${keywords}">` : ''}

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url || 'https://example.com'}">
<meta property="og:title" content="${title || 'ページタイトル'}">
<meta property="og:description" content="${description || 'ページの説明文'}">
${ogImage ? `<meta property="og:image" content="${ogImage}">` : ''}
${siteName ? `<meta property="og:site_name" content="${siteName}">` : ''}

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url || 'https://example.com'}">
<meta property="twitter:title" content="${title || 'ページタイトル'}">
<meta property="twitter:description" content="${description || 'ページの説明文'}">
${ogImage ? `<meta property="twitter:image" content="${ogImage}">` : ''}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(metaTags)
      alert('コピーしました')
    } catch {
      alert('コピーに失敗しました')
    }
  }

  const handleClear = () => {
    setTitle('')
    setDescription('')
    setKeywords('')
    setOgImage('')
    setUrl('')
    setSiteName('')
  }

  return (
    <>
      <SEO path="/other/meta-tag" />
      <div className="max-w-[600px] mx-auto py-8 px-4">
        <ToolHeader title="メタタグ生成" toolPath="/other/meta-tag" shareTitle="メタタグ生成 | Rakit" />

        {/* 入力フォーム */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ページタイトル <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例: 無料オンラインツール - Rakit"
              className="w-full p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
            <p className="text-xs text-gray-500 mt-1">{title.length}/60文字（推奨: 50-60文字）</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ページの説明文 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="例: 開発者向けの無料オンラインツール集。JSON整形、Base64エンコード、ハッシュ生成など。"
              rows={3}
              className="w-full p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
            <p className="text-xs text-gray-500 mt-1">{description.length}/160文字（推奨: 150-160文字）</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              キーワード（カンマ区切り）
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="例: ツール,オンライン,無料,JSON,Base64"
              className="w-full p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ページURL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="例: https://example.com/page"
              className="w-full p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              OGP画像URL
            </label>
            <input
              type="url"
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
              placeholder="例: https://example.com/ogp.png"
              className="w-full p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
            <p className="text-xs text-gray-500 mt-1">推奨サイズ: 1200x630px</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              サイト名
            </label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="例: Rakit"
              className="w-full p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>
        </div>

        {/* ボタン */}
        <div className="flex gap-2 mb-6">
          <Button onClick={handleCopy} size="lg" className="flex-1">
            コピー
          </Button>
          <Button onClick={handleClear} variant="outline" size="lg" className="flex-1">
            クリア
          </Button>
        </div>

        {/* 生成結果 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            生成されたメタタグ
          </label>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-md text-xs overflow-x-auto whitespace-pre-wrap">
            {metaTags}
          </pre>
        </div>

        {/* 使い方 */}
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• タイトルと説明文を入力</li>
            <li>• 生成されたタグをHTMLのhead内に貼り付け</li>
            <li>• SEO対策、SNSシェア最適化に便利</li>
            <li>• Twitter/Facebook/OGP対応</li>
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

export default MetaTagGenerator
