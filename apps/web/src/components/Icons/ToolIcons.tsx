import {
  Timer,
  Clock,
  Coffee,
  Globe,
  FileText,
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
  RegexIcon as Regex,
  Fingerprint,
  Type,
  CaseSensitive,
  Hexagon,
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
