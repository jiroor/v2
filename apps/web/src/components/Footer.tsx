import { Link } from 'react-router-dom'
import { ShareButton } from '@/components/Share/ShareButton'

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* ブランド */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Rakit</h3>
            <p className="text-sm mb-4">
              便利なオンラインツールを無料で提供。開発者、デザイナー、学生に役立つ55以上のツール。
            </p>
            <ShareButton title="Rakit - 楽に使えるツール集" variant="compact" />
          </div>

          {/* テキストツール */}
          <div>
            <h4 className="text-white font-semibold mb-4">テキストツール</h4>
            <ul className="text-sm space-y-2">
              <li><Link to="/text/base64" className="hover:text-white transition-colors">Base64エンコード</Link></li>
              <li><Link to="/text/json" className="hover:text-white transition-colors">JSON整形</Link></li>
              <li><Link to="/text/regex" className="hover:text-white transition-colors">正規表現テスト</Link></li>
              <li><Link to="/text/hash" className="hover:text-white transition-colors">ハッシュ生成</Link></li>
            </ul>
          </div>

          {/* 計算ツール */}
          <div>
            <h4 className="text-white font-semibold mb-4">計算ツール</h4>
            <ul className="text-sm space-y-2">
              <li><Link to="/other/bmi" className="hover:text-white transition-colors">BMI計算</Link></li>
              <li><Link to="/other/calorie" className="hover:text-white transition-colors">カロリー計算</Link></li>
              <li><Link to="/other/mortgage" className="hover:text-white transition-colors">住宅ローン計算</Link></li>
              <li><Link to="/other/currency" className="hover:text-white transition-colors">為替計算</Link></li>
            </ul>
          </div>

          {/* その他 */}
          <div>
            <h4 className="text-white font-semibold mb-4">その他</h4>
            <ul className="text-sm space-y-2">
              <li><Link to="/stats" className="hover:text-white transition-colors">利用統計</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">お問い合わせ</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">利用規約</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Rakit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
