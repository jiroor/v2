import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl mb-6">🔍</div>
      <h1 className="text-4xl font-bold mb-4">ページが見つかりません</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        お探しのページは移動または削除された可能性があります。
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Link
          to="/"
          className="px-6 py-3 bg-[#d97706] text-white rounded-lg font-semibold hover:bg-[#b45309] transition-colors"
        >
          ホームに戻る
        </Link>
        <Link
          to="/stats"
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          人気ツールを見る
        </Link>
      </div>

      {/* おすすめツール */}
      <div className="w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">人気のツール</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/text/json"
            className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">📋</div>
            <div className="text-sm font-medium">JSON整形</div>
          </Link>
          <Link
            to="/other/qrcode"
            className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">📱</div>
            <div className="text-sm font-medium">QRコード生成</div>
          </Link>
          <Link
            to="/other/password"
            className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">🔐</div>
            <div className="text-sm font-medium">パスワード生成</div>
          </Link>
          <Link
            to="/text/base64"
            className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">🔄</div>
            <div className="text-sm font-medium">Base64変換</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
