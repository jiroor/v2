interface IconProps {
  className?: string
}

// カウントダウンタイマー（デジタル庁: history）
export function CountdownIcon({ className }: IconProps) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_320_58)">
        <path fillRule="evenodd" clipRule="evenodd" d="M7.2 5.20031C10.9 1.90031 16.6 2.30031 19.9 6.00031C23.2 9.80031 22.8 15.5003 19.2 18.7003C17.4 20.3003 15.3 21.0003 13.2 21.0003C10.7 21.0003 8.2 20.0003 6.4 18.0003L7.5 17.0003C10.3 20.1003 15 20.4003 18.1 17.6003C21.2 14.8003 21.5 10.1003 18.8 7.00031C16 3.90031 11.3 3.60031 8.2 6.40031C6.6 7.80031 5.7 9.90031 5.7 12.0003L7.8 9.80031L8.9 10.9003L4.9 14.9003L1 10.9003L2 9.90031L4.2 11.9003C4.2 9.40031 5.3 6.90031 7.2 5.20031ZM12 12.7V7.5H13.5V12.1L16.7 15.3L15.7 16.4L12 12.7Z" fill="currentColor"/>
      </g>
      <defs>
        <clipPath id="clip0_320_58">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
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

// 文字数カウンター（デジタル庁: documents）
export function CharCounterIcon({ className }: IconProps) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_320_642)">
        <path fillRule="evenodd" clipRule="evenodd" d="M6 4V20H18V4H6ZM4.5 2.5H19.5V21.5H4.5V2.5ZM7.5 7H16.5V8.5H7.5V7ZM7.5 11H16.5V12.5H7.5V11ZM16.5 15H7.5V16.5H16.5V15Z" fill="currentColor"/>
      </g>
      <defs>
        <clipPath id="clip0_320_642">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
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

// QRコード（デジタル庁: code_reader）
export function QRCodeIcon({ className }: IconProps) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_320_618)">
        <path fillRule="evenodd" clipRule="evenodd" d="M2.5 7.5H4V4H7.5V2.5H2.5V7.5ZM2.5 21.5H7.5V20H4V16.5H2.5V21.5ZM21.5 21.5H16.5V20H20V16.5H21.5V21.5ZM20 7.5H21.5V2.5H16.5V4H20V7.5ZM9.5 7.5V9.5H7.5V7.5H9.5ZM11 6H6V11H11V6ZM16.5 9.5V7.5H14.5V9.5H16.5ZM13 6H18V11H13V6ZM9.5 14.5V16.5H7.5V14.5H9.5ZM11 13H6V18H11V13ZM13 13H18V18H13V13Z" fill="currentColor"/>
      </g>
      <defs>
        <clipPath id="clip0_320_618">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

// パスワード生成（デジタル庁: password）
export function PasswordIcon({ className }: IconProps) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_320_686)">
        <path fillRule="evenodd" clipRule="evenodd" d="M16 8H18.5V17H5.5V8H14.5V6C14.5 4.6 13.4 3.5 12 3.5C10.6 3.5 9.5 4.6 9.5 6V6.5H8V6C8 3.8 9.8 2 12 2C14.2 2 16 3.8 16 6V8ZM7 9.5V15.5H17V9.5H7ZM7.5 20.5C7.5 21.3284 6.82843 22 6 22C5.17157 22 4.5 21.3284 4.5 20.5C4.5 19.6716 5.17157 19 6 19C6.82843 19 7.5 19.6716 7.5 20.5ZM10.5 20.5C10.5 19.7 11.2 19 12 19C12.8 19 13.5 19.7 13.5 20.5C13.5 21.3 12.8 22 12 22C11.2 22 10.5 21.3 10.5 20.5ZM18 22C18.8284 22 19.5 21.3284 19.5 20.5C19.5 19.6716 18.8284 19 18 19C17.1716 19 16.5 19.6716 16.5 20.5C16.5 21.3284 17.1716 22 18 22Z" fill="currentColor"/>
      </g>
      <defs>
        <clipPath id="clip0_320_686">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
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
