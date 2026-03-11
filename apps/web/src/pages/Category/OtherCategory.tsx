import { Link } from 'react-router-dom'
import { SEO } from '@/components/SEO/SEO'
import AdBanner from '@/components/Ads/AdBanner'
import { 
  Calculator, 
  Percent, 
  Calendar, 
  Globe, 
  Ruler, 
  Hash, 
  CreditCard, 
  DollarSign,
  Scale,
  Target,
  Repeat,
  Network
} from 'lucide-react'

const otherTools = [
  {
    path: '/other/calculator',
    title: '計算機',
    description: '基本的な計算を行う',
    icon: Calculator,
    color: 'bg-blue-500'
  },
  {
    path: '/other/percentage',
    title: 'パーセント計算',
    description: '割合や増減を計算',
    icon: Percent,
    color: 'bg-green-500'
  },
  {
    path: '/other/discount',
    title: '割引計算',
    description: '割引後の価格を計算',
    icon: DollarSign,
    color: 'bg-red-500'
  },
  {
    path: '/other/tax',
    title: '税金計算',
    description: '消費税を計算',
    icon: Hash,
    color: 'bg-orange-500'
  },
  {
    path: '/other/date-calc',
    title: '日付計算',
    description: '日付の加算減算を計算',
    icon: Calendar,
    color: 'bg-purple-500'
  },
  {
    path: '/other/age',
    title: '年齢計算',
    description: '年齢を詳細に計算',
    icon: Calendar,
    color: 'bg-pink-500'
  },
  {
    path: '/other/timezone',
    title: 'タイムゾーン変換',
    description: '世界各地の時刻を変換',
    icon: Globe,
    color: 'bg-cyan-500'
  },
  {
    path: '/other/unit',
    title: '単位変換',
    description: '長さ・重さなどの単位変換',
    icon: Ruler,
    color: 'bg-teal-500'
  },
  {
    path: '/other/currency',
    title: '通貨変換',
    description: '通貨をリアルタイムで変換',
    icon: DollarSign,
    color: 'bg-emerald-500'
  },
  {
    path: '/other/compound-interest',
    title: '複利計算',
    description: '複利での将来価値を計算',
    icon: Percent,
    color: 'bg-indigo-500'
  },
  {
    path: '/other/mortgage',
    title: '住宅ローン計算',
    description: '月々の返済額を計算',
    icon: DollarSign,
    color: 'bg-violet-500'
  },
  {
    path: '/other/salary',
    title: '給与変換',
    description: '年収・月収・時給を相互変換',
    icon: DollarSign,
    color: 'bg-amber-500'
  },
  {
    path: '/other/bmi',
    title: 'BMI計算',
    description: 'BMIを計算',
    icon: Scale,
    color: 'bg-rose-500'
  },
  {
    path: '/other/calorie',
    title: 'カロリー計算',
    description: '1日の必要カロリーを計算',
    icon: Target,
    color: 'bg-lime-500'
  },
  {
    path: '/other/card-check',
    title: 'カード番号チェック',
    description: 'クレジットカード番号を検証',
    icon: CreditCard,
    color: 'bg-slate-500'
  },
  {
    path: '/other/cron',
    title: 'Cron生成',
    description: 'Cron式を生成・解析',
    icon: Repeat,
    color: 'bg-gray-500'
  },
  {
    path: '/other/ip-address',
    title: 'IPアドレスツール',
    description: 'IPアドレスを解析',
    icon: Network,
    color: 'bg-sky-500'
  },
]

function OtherCategory() {
  return (
    <>
      <SEO
        title="その他のツール"
        description="計算機、単位変換、日付計算、BMI計算など、日常生活や仕事に役立つ便利ツール集。完全無料でブラウザ完結。"
        path="/other"
        category="UtilitiesApplication"
      />
      <div className="max-w-[1000px] mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">🛠️ その他のツール</h1>
          <p className="text-gray-600">
            計算、変換、健康チェックなど。日常生活や仕事に役立つ便利ツール。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherTools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.path}
                to={tool.path}
                className="block p-4 border rounded-lg hover:shadow-lg transition-shadow bg-white"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${tool.color} text-white`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-semibold mb-1">{tool.title}</h2>
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
          <h2 className="text-xl font-semibold mb-4">その他ツールの特徴</h2>
          <ul className="space-y-2 text-gray-600">
            <li>✅ 完全無料 - 登録不要で使える</li>
            <li>✅ ブラウザ完結 - アプリのインストール不要</li>
            <li>✅ 高精度計算 - 正確な結果を瞬時に表示</li>
            <li>✅ プライバシー保護 - データはサーバーに送信されません</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default OtherCategory
