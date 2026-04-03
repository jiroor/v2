import { Link } from 'react-router-dom'
import { SEO } from '@/components/SEO/SEO'
import {
  QRCodeIcon,
  PasswordIcon,
  ColorPickerIcon,
  RouletteIcon,
  ImageToBase64Icon,
  CronGeneratorIcon,
  UnitConverterIcon,
  PercentageCalculatorIcon,
  TimezoneConverterIcon,
  RandomNumberGeneratorIcon,
  AgeCalculatorIcon,
  TaxCalculatorIcon,
  CalculatorIcon,
  ProgressConverterIcon,
  BMICalculatorIcon,
  CalorieCalculatorIcon,
  DiscountCalculatorIcon,
  IPAddressToolIcon,
  ImageCompressorIcon,
  CurrencyConverterIcon,
} from '@/components/Icons/ToolIcons'

const otherTools = [
  { path: '/other/qrcode', name: 'QRコード生成', desc: 'URL等をQRコードに変換', icon: QRCodeIcon },
  { path: '/other/password', name: 'パスワード生成', desc: 'セキュアなパスワード生成', icon: PasswordIcon },
  { path: '/other/colorpicker', name: 'カラーピッカー', desc: 'HEX/RGB/HSL変換', icon: ColorPickerIcon },
  { path: '/other/roulette', name: 'ルーレット', desc: 'ランダム抽選ツール', icon: RouletteIcon },
  { path: '/other/image-base64', name: '画像Base64変換', desc: '画像をBase64に変換', icon: ImageToBase64Icon },
  { path: '/other/cron', name: 'Cron式生成', desc: 'スケジュール設定', icon: CronGeneratorIcon },
  { path: '/other/unit', name: '単位変換', desc: '長さ・重さ・温度など', icon: UnitConverterIcon },
  { path: '/other/percentage', name: 'パーセント計算', desc: '割合・増減の計算', icon: PercentageCalculatorIcon },
  { path: '/other/timezone', name: '時差計算', desc: '世界の時間変換', icon: TimezoneConverterIcon },
  { path: '/other/random-num', name: '乱数生成', desc: 'ランダムな数字を生成', icon: RandomNumberGeneratorIcon },
  { path: '/other/age', name: '年齢計算', desc: '満年齢を計算', icon: AgeCalculatorIcon },
  { path: '/other/tax', name: '消費税計算', desc: '税抜・税込計算', icon: TaxCalculatorIcon },
  { path: '/other/calculator', name: '計算機', desc: 'シンプルな電卓', icon: CalculatorIcon },
  { path: '/other/bmi', name: 'BMI計算', desc: '肥満度を判定', icon: BMICalculatorIcon },
  { path: '/other/calorie', name: 'カロリー計算', desc: '1日の必要カロリー', icon: CalorieCalculatorIcon },
  { path: '/other/discount', name: '割引計算', desc: '割引後の価格を計算', icon: DiscountCalculatorIcon },
  { path: '/other/ip-address', name: 'IPアドレス確認', desc: '自分のIPアドレスを表示', icon: IPAddressToolIcon },
  { path: '/other/image-compress', name: '画像圧縮', desc: '画像ファイルを圧縮', icon: ImageCompressorIcon },
  { path: '/other/currency', name: '通貨変換', desc: '為替レート計算', icon: CurrencyConverterIcon },
  { path: '/other/progress', name: '進捗変換', desc: '分数↔パーセント', icon: ProgressConverterIcon },
]

export default function OtherToolsList() {
  return (
    <>
      <SEO
        path="/other"
        title="その他ツール一覧"
        description="無料のオンラインユーティリティツール集。QRコード生成、パスワード生成、画像変換、計算機など、様々な便利ツールを提供。"
      />
      <div className="py-8 px-6 max-w-[1400px] mx-auto">
        <h1 className="text-3xl font-bold mb-2">🔧 その他ツール</h1>
        <p className="text-gray-600 mb-8">
          計算・変換・生成に関する便利なツール集
        </p>
        
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 max-md:grid-cols-1">
          {otherTools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.path}
                to={tool.path}
                className="flex flex-col items-center bg-white border border-gray-200  rounded-lg p-6 transition-all duration-200 cursor-pointer no-underline text-inherit hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#fef3c7]  group"
              >
                <Icon className="w-12 h-12 mb-4 text-gray-900 transition-all duration-200 group-hover:scale-110 group-hover:text-[#d97706]" />
                <h3 className="text-xl font-semibold mb-2 text-center">{tool.name}</h3>
                <p className="text-gray-600 text-sm text-center">{tool.desc}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
