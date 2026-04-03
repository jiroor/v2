import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function RobotsTxtGenerator() {
  useToolUsageTracking('/other/robots-txt', 'Robots.txt生成')
  const [userAgent, setUserAgent] = useState('*')
  const [allowPaths, setAllowPaths] = useState('/')
  const [disallowPaths, setDisallowPaths] = useState('/admin/\n/private/')
  const [sitemapUrl, setSitemapUrl] = useState('')

  const generateRobotsTxt = () => {
    let robotsTxt = `User-agent: ${userAgent}\n`

    if (allowPaths) {
      const allows = allowPaths.split('\n').filter(p => p.trim())
      allows.forEach(path => {
        robotsTxt += `Allow: ${path.trim()}\n`
      })
    }

    if (disallowPaths) {
      const disallows = disallowPaths.split('\n').filter(p => p.trim())
      disallows.forEach(path => {
        robotsTxt += `Disallow: ${path.trim()}\n`
      })
    }

    if (sitemapUrl) {
      robotsTxt += `\nSitemap: ${sitemapUrl}\n`
    }

    return robotsTxt
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateRobotsTxt())
      alert('コピーしました')
    } catch {
      alert('コピーに失敗しました')
    }
  }

  const handleDownload = () => {
    const blob = new Blob([generateRobotsTxt()], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'robots.txt'
    link.click()
    URL.revokeObjectURL(url)
  }

  const robotsTxt = generateRobotsTxt()

  return (
    <>
      <SEO path="/other/robots-txt" title="Robots.txt生成" description="無料のオンラインRobots.txt生成ツール。クローラーのアクセス制御を設定。SEO対策に最適。" />
      <div className="max-w-[600px] mx-auto py-8 px-4">
        <ToolHeader title="Robots.txt生成" toolPath="/other/robots-txt" shareTitle="Robots.txt生成 | Rakit" />

        {/* User-agent */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            User-agent
          </label>
          <input
            type="text"
            value={userAgent}
            onChange={(e) => setUserAgent(e.target.value)}
            placeholder="*（すべてのクローラー）"
            className="w-full p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
          <p className="text-xs text-gray-500 mt-1">*: すべてのクローラー</p>
        </div>

        {/* Allow */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Allow（許可するパス）
          </label>
          <textarea
            value={allowPaths}
            onChange={(e) => setAllowPaths(e.target.value)}
            placeholder="/ （すべて許可）&#10;/blog/"
            rows={2}
            className="w-full p-3 border border-gray-200 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
          <p className="text-xs text-gray-500 mt-1">1行に1つのパス</p>
        </div>

        {/* Disallow */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Disallow（禁止するパス）
          </label>
          <textarea
            value={disallowPaths}
            onChange={(e) => setDisallowPaths(e.target.value)}
            placeholder="/admin/&#10;/private/"
            rows={3}
            className="w-full p-3 border border-gray-200 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
          <p className="text-xs text-gray-500 mt-1">1行に1つのパス</p>
        </div>

        {/* Sitemap */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sitemap URL（任意）
          </label>
          <input
            type="url"
            value={sitemapUrl}
            onChange={(e) => setSitemapUrl(e.target.value)}
            placeholder="https://example.com/sitemap.xml"
            className="w-full p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
          />
        </div>

        {/* ボタン */}
        <div className="flex gap-2 mb-6">
          <Button onClick={handleCopy} size="lg" className="flex-1">
            コピー
          </Button>
          <Button onClick={handleDownload} variant="outline" size="lg" className="flex-1">
            ダウンロード
          </Button>
        </div>

        {/* 生成結果 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            生成されたrobots.txt
          </label>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-md text-xs overflow-x-auto whitespace-pre-wrap">
            {robotsTxt}
          </pre>
        </div>

        {/* 使い方 */}
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">使い方</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• クローラーのアクセス制御を設定</li>
            <li>• 生成されたファイルをサーバーのルートに配置</li>
            <li>• SEO対策に必須のファイル</li>
            <li>• Google Search Consoleでテスト可能</li>
          </ul>
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            robots.txt生成ツールは、検索エンジンのクローラーに対するアクセス制御を設定する無料のオンラインツールです。特定のページのインデックスを防止したり、サイトマップの場所を指定したりできます。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Allow/Disallowを設定</li>
            <li>• 複数のパスに対応</li>
            <li>• Sitemap URLを設定</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. robots.txtとは何ですか？</p>
              <p>A. クローラーにサイト内のアクセス可否を伝えるためのファイルです。</p>
            </div>
            <div>
              <p className="font-medium">Q. どこに配置すればいい？</p>
              <p>A. サイトのルートディレクトリ（https://example.com/robots.txt）に配置します。</p>
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

export default RobotsTxtGenerator
