import { Link } from 'react-router-dom'
import { ShareButton } from '@/components/Share/ShareButton'
import { DonateButton } from '@/components/Donate'

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* ブランド */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Rakit</h3>
            <p className="text-sm mb-4">
              便利なオンラインツールを無料で提供。開発者、デザイナー、学生に役立つ100以上のツール。
            </p>
            <ShareButton title="Rakit - 楽に使えるツール集" variant="compact" />
            <div className="mt-4">
              <DonateButton platform="kofi" username="rakit" className="text-sm" />
            </div>
          </div>

          {/* リンク */}
          <div>
            <h4 className="text-white font-semibold mb-4">リンク</h4>
            <ul className="text-sm space-y-2">
              <li><Link to="/stats" className="hover:text-white transition-colors">利用統計</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">お問い合わせ</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link></li>
            </ul>
          </div>

          {/* カテゴリ */}
          <div>
            <h4 className="text-white font-semibold mb-4">カテゴリ</h4>
            <ul className="text-sm space-y-2">
              <li><Link to="/text" className="hover:text-white transition-colors">📝 テキストツール</Link></li>
              <li><Link to="/image" className="hover:text-white transition-colors">🖼️ 画像ツール</Link></li>
              <li><Link to="/timer" className="hover:text-white transition-colors">⏱️ タイマー</Link></li>
              <li><Link to="/other" className="hover:text-white transition-colors">🛠️ その他</Link></li>
            </ul>
          </div>

          {/* おすすめ（アフィリエイト用） */}
          <div>
            <h4 className="text-white font-semibold mb-4">おすすめ</h4>
            <ul className="text-sm space-y-2">
              <li>
                <a 
                  href="#" 
                  className="hover:text-white transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📚 技術書籍
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-white transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  💻 開発ツール
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-white transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🎨 デザインツール
                </a>
              </li>
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
