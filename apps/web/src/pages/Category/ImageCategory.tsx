import { Link } from 'react-router-dom'
import { SEO } from '@/components/SEO/SEO'
import AdBanner from '@/components/Ads/AdBanner'
import { 
  Image, 
  Crop, 
  Compress, 
  Maximize, 
  FileImage, 
  QrCode, 
  Palette, 
  Sparkles,
  RotateCw,
  FlipHorizontal,
  Droplet,
  Layers,
  Shield
} from 'lucide-react'

const imageTools = [
  {
    path: '/other/image-compress',
    title: '画像圧縮',
    description: '画像ファイルのサイズを圧縮して軽量化',
    icon: Compress,
    color: 'bg-blue-500'
  },
  {
    path: '/other/image-resize',
    title: '画像リサイズ',
    description: '画像のサイズを変更して最適化',
    icon: Maximize,
    color: 'bg-green-500'
  },
  {
    path: '/other/image-convert',
    title: '画像変換',
    description: 'PNG, JPG, WebPなど形式を変換',
    icon: FileImage,
    color: 'bg-purple-500'
  },
  {
    path: '/other/image-crop',
    title: '画像切り抜き',
    description: '画像をトリミングして必要な部分を抽出',
    icon: Crop,
    color: 'bg-orange-500'
  },
  {
    path: '/other/image-base64',
    title: '画像→Base64',
    description: '画像をBase64エンコードしてテキスト化',
    icon: Image,
    color: 'bg-cyan-500'
  },
  {
    path: '/other/image-glitch',
    title: '画像グリッチ',
    description: '画像にグリッチ効果を追加してアート加工',
    icon: Sparkles,
    color: 'bg-pink-500'
  },
  {
    path: '/other/image-rotate',
    title: '画像回転',
    description: '画像を回転させる（90°, 180°, 270°）',
    icon: RotateCw,
    color: 'bg-yellow-500'
  },
  {
    path: '/other/image-flip',
    title: '画像反転',
    description: '画像を左右・上下に反転',
    icon: FlipHorizontal,
    color: 'bg-teal-500'
  },
  {
    path: '/other/watermark',
    title: '透かし追加',
    description: '画像にウォーターマークを追加',
    icon: Droplet,
    color: 'bg-sky-500'
  },
  {
    path: '/other/image-merge',
    title: '画像結合',
    description: '複数の画像を1枚に結合',
    icon: Layers,
    color: 'bg-violet-500'
  },
  {
    path: '/other/exif-remover',
    title: 'EXIF削除',
    description: '画像のEXIF情報を削除（プライバシー保護）',
    icon: Shield,
    color: 'bg-red-600'
  },
  {
    path: '/other/qrcode',
    title: 'QRコード生成',
    description: 'URLやテキストからQRコードを作成',
    icon: QrCode,
    color: 'bg-indigo-500'
  },
  {
    path: '/other/colorpicker',
    title: 'カラーピッカー',
    description: '色を選択してHEX/RGB値を取得',
    icon: Palette,
    color: 'bg-red-500'
  },
]

function ImageCategory() {
  return (
    <>
      <SEO
        title="画像ツール"
        description="画像の圧縮、リサイズ、変換、グリッチ効果など、無料で使える画像編集ツール集。ブラウザ完結でインストール不要。"
        path="/image"
        category="DesignApplication"
      />
      <div className="max-w-[1000px] mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">🖼️ 画像ツール</h1>
          <p className="text-gray-600">
            画像の圧縮、リサイズ、変換、加工など。ブラウザ完結でインストール不要。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {imageTools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.path}
                to={tool.path}
                className="block p-6 border rounded-lg hover:shadow-lg transition-shadow bg-white"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${tool.color} text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold mb-1">{tool.title}</h2>
                    <p className="text-sm text-gray-600">{tool.description}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* 広告 */}
        <div className="mt-8">
          <AdBanner slot="CATEGORY_BOTTOM" format="horizontal" />
        </div>

        {/* SEO対策テキスト */}
        <div className="mt-8 prose prose-sm max-w-none">
          <h2 className="text-xl font-semibold mb-4">画像ツールの特徴</h2>
          <ul className="space-y-2 text-gray-600">
            <li>✅ 完全無料 - 登録不要で使える</li>
            <li>✅ ブラウザ完結 - アプリのインストール不要</li>
            <li>✅ プライバシー保護 - 画像はサーバーにアップロードされません</li>
            <li>✅ 高速処理 - ローカルで処理してすぐにダウンロード</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default ImageCategory
