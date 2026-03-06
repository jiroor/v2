import {
  Timer,
  Clock,
  Coffee,
  Globe,
  FileText,
  FileCode,
  Columns2,
  Shuffle,
  QrCode,
  Lock,
  Palette,
  CircleDot,
  Video,
  Binary,
  Link2,
  Braces,
  Hash,
  Calendar,
  CalendarDays,
  Receipt,
  Calculator,
  TrendingUp,
  Activity,
  Flame,
  Tags,
  Watch,
  Home,
  RegexIcon as Regex,
  Fingerprint,
  Type,
  CaseSensitive,
  Hexagon,
  Layers,
  ArrowUpDown,
  BarChart3,
  Image,
  Space,
  Merge,
  Split,
  Ruler,
  Percent,
} from 'lucide-react'

interface IconProps {
  className?: string
}

// カウントダウンタイマー
export function CountdownIcon({ className }: IconProps) {
  return <Timer className={className} />
}

// ストップウォッチ
export function StopwatchIcon({ className }: IconProps) {
  return <Clock className={className} />
}

// ポモドーロタイマー
export function PomodoroIcon({ className }: IconProps) {
  return <Coffee className={className} />
}

// 現在日時表示
export function CurrentTimeIcon({ className }: IconProps) {
  return <Globe className={className} />
}

// 文字数カウンター
export function CharCounterIcon({ className }: IconProps) {
  return <FileText className={className} />
}

// テキスト差分
export function TextDiffIcon({ className }: IconProps) {
  return <Columns2 className={className} />
}

// 画像圧縮
export function ImageCompressorIcon({ className }: IconProps) {
  return <Image className={className} />
}

// 画像リサイズ
export function ImageResizerIcon({ className }: IconProps) {
  return <Ruler className={className} />
}

// メタタグ生成
export function MetaTagGeneratorIcon({ className }: IconProps) {
  return <FileCode className={className} />
}

// カード番号チェック
export function CreditCardCheckerIcon({ className }: IconProps) {
  return <Receipt className={className} />
}

// 為替計算
export function CurrencyConverterIcon({ className }: IconProps) {
  return <Globe className={className} />
}

// カラーパレット生成
export function ColorPaletteIcon({ className }: IconProps) {
  return <Palette className={className} />
}

// 複利計算
export function CompoundInterestCalculatorIcon({ className }: IconProps) {
  return <TrendingUp className={className} />
}

// 住宅ローン計算
export function MortgageCalculatorIcon({ className }: IconProps) {
  return <Home className={className} />
}

// 画像形式変換
export function ImageConverterIcon({ className }: IconProps) {
  return <Image className={className} />
}

// Robots.txt生成
export function RobotsTxtGeneratorIcon({ className }: IconProps) {
  return <FileText className={className} />
}

// JSON to CSV
export function JsonToCsvIcon({ className }: IconProps) {
  return <Braces className={className} />
}

// GPA計算
export function GPACalculatorIcon({ className }: IconProps) {
  return <BarChart3 className={className} />
}

// パスワード強度チェック
export function PasswordStrengthCheckerIcon({ className }: IconProps) {
  return <Lock className={className} />
}

// 年収・月収・時給変換
export function SalaryConverterIcon({ className }: IconProps) {
  return <Receipt className={className} />
}

// GIF作成
export function GifMakerIcon({ className }: IconProps) {
  return <Video className={className} />
}

// ランダム文字列
export function RandomStringIcon({ className }: IconProps) {
  return <Shuffle className={className} />
}

// QRコード
export function QRCodeIcon({ className }: IconProps) {
  return <QrCode className={className} />
}

// パスワード生成
export function PasswordIcon({ className }: IconProps) {
  return <Lock className={className} />
}

// カラーピッカー
export function ColorPickerIcon({ className }: IconProps) {
  return <Palette className={className} />
}

// ルーレット
export function RouletteIcon({ className }: IconProps) {
  return <CircleDot className={className} />
}

// カメラ映像共有
export function CameraSharingIcon({ className }: IconProps) {
  return <Video className={className} />
}

// Base64エンコード/デコード
export function Base64Icon({ className }: IconProps) {
  return <Binary className={className} />
}

// URLエンコード/デコード
export function URLEncoderIcon({ className }: IconProps) {
  return <Link2 className={className} />
}

// JSON整形
export function JSONFormatterIcon({ className }: IconProps) {
  return <Braces className={className} />
}

// ハッシュ生成
export function HashGeneratorIcon({ className }: IconProps) {
  return <Hash className={className} />
}

// Unix時間変換
export function UnixTimestampIcon({ className }: IconProps) {
  return <Calendar className={className} />
}

// 正規表現テスト
export function RegexTesterIcon({ className }: IconProps) {
  return <Regex className={className} />
}

// UUID生成
export function UUIDGeneratorIcon({ className }: IconProps) {
  return <Fingerprint className={className} />
}

// Lorem Ipsum生成
export function LoremIpsumIcon({ className }: IconProps) {
  return <Type className={className} />
}

// ケース変換
export function CaseConverterIcon({ className }: IconProps) {
  return <CaseSensitive className={className} />
}

// 数字変換
export function NumberConverterIcon({ className }: IconProps) {
  return <Hexagon className={className} />
}

// 重複行削除
export function DuplicateRemoverIcon({ className }: IconProps) {
  return <Layers className={className} />
}

// テキストソート
export function TextSorterIcon({ className }: IconProps) {
  return <ArrowUpDown className={className} />
}

// テキスト統計
export function TextStatisticsIcon({ className }: IconProps) {
  return <BarChart3 className={className} />
}

// 画像Base64変換
export function ImageToBase64Icon({ className }: IconProps) {
  return <Image className={className} />
}

// Markdownプレビュー
export function MarkdownPreviewIcon({ className }: IconProps) {
  return <FileCode className={className} />
}

// 空白削除
export function WhitespaceRemoverIcon({ className }: IconProps) {
  return <Space className={className} />
}

// テキスト結合
export function TextJoinerIcon({ className }: IconProps) {
  return <Merge className={className} />
}

// テキスト分割
export function TextSplitterIcon({ className }: IconProps) {
  return <Split className={className} />
}

// Cron式生成
export function CronGeneratorIcon({ className }: IconProps) {
  return <Clock className={className} />
}

// 単位変換
export function UnitConverterIcon({ className }: IconProps) {
  return <Ruler className={className} />
}

// パーセント計算
export function PercentageCalculatorIcon({ className }: IconProps) {
  return <Percent className={className} />
}

// 時差計算
export function TimezoneConverterIcon({ className }: IconProps) {
  return <Globe className={className} />
}

// 乱数生成
export function RandomNumberGeneratorIcon({ className }: IconProps) {
  return <Shuffle className={className} />
}

// 年齢計算
export function AgeCalculatorIcon({ className }: IconProps) {
  return <CalendarDays className={className} />
}

// 消費税計算
export function TaxCalculatorIcon({ className }: IconProps) {
  return <Receipt className={className} />
}

// 計算機
export function CalculatorIcon({ className }: IconProps) {
  return <Calculator className={className} />
}

// 進捗変換
export function ProgressConverterIcon({ className }: IconProps) {
  return <TrendingUp className={className} />
}

// BMI計算
export function BMICalculatorIcon({ className }: IconProps) {
  return <Activity className={className} />
}

// カロリー計算
export function CalorieCalculatorIcon({ className }: IconProps) {
  return <Flame className={className} />
}

// 割引計算
export function DiscountCalculatorIcon({ className }: IconProps) {
  return <Tags className={className} />
}

// デジタルタイマー
export function DigitalTimerIcon({ className }: IconProps) {
  return <Timer className={className} />
}

// ストップウォッチ
export function StopwatchToolIcon({ className }: IconProps) {
  return <Watch className={className} />
}

// 日付計算
export function DateCalculatorIcon({ className }: IconProps) {
  return <CalendarDays className={className} />
}

// 文字数カウンター
export function WordCounterIcon({ className }: IconProps) {
  return <FileText className={className} />
}

// IPアドレス確認
export function IPAddressToolIcon({ className }: IconProps) {
  return <Globe className={className} />
}
