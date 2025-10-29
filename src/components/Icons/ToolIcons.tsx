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
