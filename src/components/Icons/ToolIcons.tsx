interface IconProps {
  className?: string
}

// カウントダウンタイマー
export function CountdownIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="13" r="9" />
      <polyline points="12 8 12 13 15 15" />
      <path d="M8 4 L16 4" />
    </svg>
  )
}

// ストップウォッチ
export function StopwatchIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="14" r="8" />
      <polyline points="12 10 12 14 14 16" />
      <path d="M10 3 L14 3" />
      <circle cx="12" cy="3" r="1" fill="currentColor" />
    </svg>
  )
}

// ポモドーロタイマー
export function PomodoroIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3 C12 3 11 4 11 5 L11 6" />
      <ellipse cx="12" cy="14" rx="7" ry="8" />
      <path d="M12 10 L12 14 L14 16" />
    </svg>
  )
}

// 文字数カウンター
export function CharCounterIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7 L4 19 L20 19 L20 7" />
      <rect x="4" y="5" width="16" height="2" />
      <path d="M8 11 L16 11" />
      <path d="M8 15 L13 15" />
    </svg>
  )
}

// テキスト差分
export function TextDiffIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="8" height="16" rx="1" />
      <rect x="13" y="4" width="8" height="16" rx="1" />
      <path d="M6 8 L8 8" />
      <path d="M6 12 L8 12" />
      <path d="M16 8 L18 8" />
      <path d="M16 12 L18 12" />
      <path d="M16 16 L18 16" />
    </svg>
  )
}

// ランダム文字列
export function RandomStringIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 8 Q8 5, 12 8 T19 8" />
      <path d="M5 12 Q8 15, 12 12 T19 12" />
      <path d="M5 16 Q8 13, 12 16 T19 16" />
      <circle cx="5" cy="8" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="19" cy="16" r="1" fill="currentColor" />
    </svg>
  )
}

// QRコード
export function QRCodeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="8" height="8" />
      <rect x="5" y="5" width="4" height="4" fill="currentColor" />
      <rect x="13" y="3" width="8" height="8" />
      <rect x="15" y="5" width="4" height="4" fill="currentColor" />
      <rect x="3" y="13" width="8" height="8" />
      <rect x="5" y="15" width="4" height="4" fill="currentColor" />
      <rect x="13" y="13" width="2" height="2" fill="currentColor" />
      <rect x="16" y="13" width="2" height="2" fill="currentColor" />
      <rect x="19" y="13" width="2" height="2" fill="currentColor" />
      <rect x="13" y="16" width="2" height="2" fill="currentColor" />
      <rect x="16" y="19" width="2" height="2" fill="currentColor" />
      <rect x="19" y="16" width="2" height="2" fill="currentColor" />
    </svg>
  )
}

// パスワード生成
export function PasswordIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <path d="M7 11 L7 7 C7 4.8, 8.8 3, 11 3 L13 3 C15.2 3, 17 4.8, 17 7 L17 11" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
      <path d="M12 17 L12 18" strokeWidth="1.5" />
    </svg>
  )
}

// カラーピッカー
export function ColorPickerIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3 L12 12 L18 9" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  )
}
