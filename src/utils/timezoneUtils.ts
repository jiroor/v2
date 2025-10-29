export interface TimezoneOption {
  value: string // IANAタイムゾーン名
  label: string // 日本語表示名
  offset: string // UTCオフセット
}

// 主要なタイムゾーン一覧（約50個）
export const MAJOR_TIMEZONES: TimezoneOption[] = [
  // アジア
  { value: 'Asia/Tokyo', label: '東京（日本）', offset: 'UTC+9' },
  { value: 'Asia/Seoul', label: 'ソウル（韓国）', offset: 'UTC+9' },
  { value: 'Asia/Shanghai', label: '上海（中国）', offset: 'UTC+8' },
  { value: 'Asia/Hong_Kong', label: '香港', offset: 'UTC+8' },
  { value: 'Asia/Singapore', label: 'シンガポール', offset: 'UTC+8' },
  { value: 'Asia/Taipei', label: '台北（台湾）', offset: 'UTC+8' },
  { value: 'Asia/Bangkok', label: 'バンコク（タイ）', offset: 'UTC+7' },
  { value: 'Asia/Ho_Chi_Minh', label: 'ホーチミン（ベトナム）', offset: 'UTC+7' },
  { value: 'Asia/Jakarta', label: 'ジャカルタ（インドネシア）', offset: 'UTC+7' },
  { value: 'Asia/Yangon', label: 'ヤンゴン（ミャンマー）', offset: 'UTC+6:30' },
  { value: 'Asia/Dhaka', label: 'ダッカ（バングラデシュ）', offset: 'UTC+6' },
  { value: 'Asia/Kolkata', label: 'コルカタ（インド）', offset: 'UTC+5:30' },
  { value: 'Asia/Karachi', label: 'カラチ（パキスタン）', offset: 'UTC+5' },
  { value: 'Asia/Dubai', label: 'ドバイ（UAE）', offset: 'UTC+4' },
  { value: 'Asia/Tehran', label: 'テヘラン（イラン）', offset: 'UTC+3:30' },
  { value: 'Asia/Jerusalem', label: 'エルサレム（イスラエル）', offset: 'UTC+2' },

  // ヨーロッパ
  { value: 'Europe/London', label: 'ロンドン（英国）', offset: 'UTC+0' },
  { value: 'Europe/Paris', label: 'パリ（フランス）', offset: 'UTC+1' },
  { value: 'Europe/Berlin', label: 'ベルリン（ドイツ）', offset: 'UTC+1' },
  { value: 'Europe/Rome', label: 'ローマ（イタリア）', offset: 'UTC+1' },
  { value: 'Europe/Madrid', label: 'マドリード（スペイン）', offset: 'UTC+1' },
  { value: 'Europe/Amsterdam', label: 'アムステルダム（オランダ）', offset: 'UTC+1' },
  { value: 'Europe/Brussels', label: 'ブリュッセル（ベルギー）', offset: 'UTC+1' },
  { value: 'Europe/Zurich', label: 'チューリッヒ（スイス）', offset: 'UTC+1' },
  { value: 'Europe/Vienna', label: 'ウィーン（オーストリア）', offset: 'UTC+1' },
  { value: 'Europe/Stockholm', label: 'ストックホルム（スウェーデン）', offset: 'UTC+1' },
  { value: 'Europe/Athens', label: 'アテネ（ギリシャ）', offset: 'UTC+2' },
  { value: 'Europe/Helsinki', label: 'ヘルシンキ（フィンランド）', offset: 'UTC+2' },
  { value: 'Europe/Moscow', label: 'モスクワ（ロシア）', offset: 'UTC+3' },
  { value: 'Europe/Istanbul', label: 'イスタンブール（トルコ）', offset: 'UTC+3' },

  // アフリカ
  { value: 'Africa/Cairo', label: 'カイロ（エジプト）', offset: 'UTC+2' },
  { value: 'Africa/Johannesburg', label: 'ヨハネスブルク（南アフリカ）', offset: 'UTC+2' },
  { value: 'Africa/Lagos', label: 'ラゴス（ナイジェリア）', offset: 'UTC+1' },
  { value: 'Africa/Nairobi', label: 'ナイロビ（ケニア）', offset: 'UTC+3' },

  // 北米
  { value: 'America/New_York', label: 'ニューヨーク（米国東部）', offset: 'UTC-5' },
  { value: 'America/Chicago', label: 'シカゴ（米国中部）', offset: 'UTC-6' },
  { value: 'America/Denver', label: 'デンバー（米国山岳部）', offset: 'UTC-7' },
  { value: 'America/Los_Angeles', label: 'ロサンゼルス（米国西部）', offset: 'UTC-8' },
  { value: 'America/Anchorage', label: 'アンカレッジ（アラスカ）', offset: 'UTC-9' },
  { value: 'Pacific/Honolulu', label: 'ホノルル（ハワイ）', offset: 'UTC-10' },
  { value: 'America/Toronto', label: 'トロント（カナダ）', offset: 'UTC-5' },
  { value: 'America/Vancouver', label: 'バンクーバー（カナダ）', offset: 'UTC-8' },
  { value: 'America/Mexico_City', label: 'メキシコシティ（メキシコ）', offset: 'UTC-6' },

  // 南米
  { value: 'America/Sao_Paulo', label: 'サンパウロ（ブラジル）', offset: 'UTC-3' },
  { value: 'America/Buenos_Aires', label: 'ブエノスアイレス（アルゼンチン）', offset: 'UTC-3' },
  { value: 'America/Lima', label: 'リマ（ペルー）', offset: 'UTC-5' },
  { value: 'America/Bogota', label: 'ボゴタ（コロンビア）', offset: 'UTC-5' },

  // オセアニア
  { value: 'Australia/Sydney', label: 'シドニー（オーストラリア）', offset: 'UTC+10' },
  { value: 'Australia/Melbourne', label: 'メルボルン（オーストラリア）', offset: 'UTC+10' },
  { value: 'Australia/Perth', label: 'パース（オーストラリア）', offset: 'UTC+8' },
  { value: 'Pacific/Auckland', label: 'オークランド（ニュージーランド）', offset: 'UTC+12' },

  // UTC
  { value: 'UTC', label: 'UTC（協定世界時）', offset: 'UTC+0' },
]

/**
 * ブラウザの現在のタイムゾーンを取得
 * 取得できない場合は Asia/Tokyo を返す
 */
export function detectTimezone(): string {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    // 取得したタイムゾーンが主要タイムゾーン一覧に存在するか確認
    const exists = MAJOR_TIMEZONES.some((tz) => tz.value === timezone)
    return exists ? timezone : 'Asia/Tokyo'
  } catch {
    return 'Asia/Tokyo'
  }
}

/**
 * 指定したタイムゾーンの現在時刻をフォーマットして取得
 */
export function formatTime(
  date: Date,
  timezone: string,
  options: {
    showSeconds?: boolean
    locale?: string
  } = {}
): string {
  const { showSeconds = true, locale = 'ja-JP' } = options

  const formatter = new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    ...(showSeconds && { second: '2-digit' }),
    hour12: false,
  })

  return formatter.format(date)
}

/**
 * 指定したタイムゾーンの現在日付をフォーマットして取得
 */
export function formatDate(
  date: Date,
  timezone: string,
  options: {
    locale?: string
  } = {}
): { year: string; month: string; day: string; weekday: string } {
  const { locale = 'ja-JP' } = options

  const year = new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    year: 'numeric',
  }).format(date)

  const month = new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    month: '2-digit',
  }).format(date)

  const day = new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    day: '2-digit',
  }).format(date)

  const weekday = new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    weekday: 'short',
  }).format(date)

  return { year, month, day, weekday }
}
