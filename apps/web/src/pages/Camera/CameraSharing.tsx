import { Link } from 'react-router-dom'
import { SEO } from '@/components/SEO/SEO'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { Video, Eye } from 'lucide-react'

function CameraSharing() {
  useToolUsageTracking('/camera', 'カメラ映像共有')

  return (
    <>
      <SEO path="/camera" />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <h2 className="text-2xl font-semibold mb-4 text-center">カメラ映像共有</h2>
        <p className="text-gray-600 text-center mb-8">
          スマートフォンやタブレットのカメラ映像をPCで確認できます
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/camera/mode"
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-8 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
          >
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gray-900 text-white transition-all duration-200 group-hover:scale-110">
              <Video className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">カメラになる</h3>
            <p className="text-gray-600 text-sm text-center">
              このデバイスのカメラ映像を配信
            </p>
          </Link>

          <Link
            to="/camera/viewer"
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-8 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706] focus-visible:outline-offset-2 focus-visible:-translate-y-0.5 focus-visible:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group"
          >
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gray-900 text-white transition-all duration-200 group-hover:scale-110">
              <Eye className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">映像を見る</h3>
            <p className="text-gray-600 text-sm text-center">
              カメラの映像を視聴
            </p>
          </Link>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold mb-3">使い方</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>スマートフォンで「カメラになる」を選択</li>
            <li>表示されたQRコードをPCで読み取る、またはルームIDを共有</li>
            <li>PCで「映像を見る」を選択してルームIDを入力</li>
            <li>スマートフォンのカメラ映像がPCに表示されます</li>
          </ol>
        </div>
      </div>
    </>
  )
}

export default CameraSharing
