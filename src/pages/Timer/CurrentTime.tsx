import { useState, useMemo } from 'react'
import { useCurrentTime } from '../../hooks/useCurrentTime'
import {
  MAJOR_TIMEZONES,
  detectTimezone,
  formatTime,
  formatDate,
} from '../../utils/timezoneUtils'
import { AlignCenterHorizontal, AlignCenterVertical } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'

type DateFormat = 'kanji' | 'slash'

interface ClockSettings {
  timezone: string
  layout: 'horizontal' | 'vertical'
  showSeconds: boolean
  dateFormat: DateFormat
  showYear: boolean
  showWeekday: boolean
}

export default function CurrentTime() {
  useToolUsageTracking('/timer/current-time', '現在日時')
  const currentTime = useCurrentTime()
  const [settings, setSettings] = useState<ClockSettings>({
    timezone: detectTimezone(),
    layout: 'horizontal',
    showSeconds: true,
    dateFormat: 'kanji',
    showYear: true,
    showWeekday: true,
  })

  // フォーマットされた時刻
  const formattedTime = useMemo(
    () =>
      formatTime(currentTime, settings.timezone, {
        showSeconds: settings.showSeconds,
      }),
    [currentTime, settings.timezone, settings.showSeconds]
  )

  // フォーマットされた日付
  const formattedDate = useMemo(
    () => formatDate(currentTime, settings.timezone),
    [currentTime, settings.timezone]
  )

  return (
    <div className="max-w-[800px] mx-auto py-6 px-6 md:px-4">
      <h1 className="text-2xl font-bold mb-8 text-center">現在日時</h1>

      {/* メイン表示エリア */}
      <div
        className={`flex items-center justify-center p-8 bg-gray-50 rounded-lg min-h-[300px] ${
          settings.layout === 'vertical'
            ? 'flex-col gap-6'
            : 'flex-row gap-8 max-md:flex-col max-md:gap-4'
        }`}
      >
        {/* 日付表示 */}
        <div className="text-xl font-medium text-gray-600 max-md:text-lg">
          <span>
            {(() => {
              const parts: string[] = []

              if (settings.dateFormat === 'slash') {
                // スラッシュ区切り
                if (settings.showYear) parts.push(formattedDate.year)
                parts.push(formattedDate.month)
                parts.push(formattedDate.day)
                return parts.join('/')
              } else {
                // 漢字表記
                if (settings.showYear) parts.push(`${formattedDate.year}年`)
                parts.push(`${formattedDate.month}月`)
                parts.push(`${formattedDate.day}日`)
                return parts.join('')
              }
            })()}
            {settings.showWeekday && `（${formattedDate.weekday}）`}
          </span>
        </div>

        {/* 時刻表示 */}
        <div className="text-[64px] font-bold tabular-nums tracking-[0.05em] text-[#d97706] max-md:text-5xl">
          {formattedTime}
        </div>
      </div>

      {/* 設定エリア */}
      <div className="flex flex-col gap-4 mb-8 p-6 bg-gray-50 rounded-md">
        {/* タイムゾーン選択 */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="timezone">タイムゾーン</Label>
          <Select
            value={settings.timezone}
            onValueChange={(value) =>
              setSettings({ ...settings, timezone: value })
            }
          >
            <SelectTrigger id="timezone">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MAJOR_TIMEZONES.map((tz) => (
                <SelectItem key={tz.value} value={tz.value}>
                  {tz.label} ({tz.offset})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* レイアウト切り替え */}
        <div className="flex flex-col gap-2">
          <Label>レイアウト</Label>
          <div className="flex gap-2">
            <Button
              onClick={() => setSettings({ ...settings, layout: 'horizontal' })}
              variant={settings.layout === 'horizontal' ? 'default' : 'outline'}
              className="flex-1 gap-2"
            >
              <AlignCenterHorizontal size={20} />
              <span>横組み</span>
            </Button>
            <Button
              onClick={() => setSettings({ ...settings, layout: 'vertical' })}
              variant={settings.layout === 'vertical' ? 'default' : 'outline'}
              className="flex-1 gap-2"
            >
              <AlignCenterVertical size={20} />
              <span>縦組み</span>
            </Button>
          </div>
        </div>

        {/* 日付形式切り替え */}
        <div className="flex flex-col gap-2">
          <Label>日付の表示方法</Label>
          <div className="flex gap-2">
            <Button
              onClick={() => setSettings({ ...settings, dateFormat: 'kanji' })}
              variant={settings.dateFormat === 'kanji' ? 'default' : 'outline'}
              className="flex-1"
            >
              <span>年月日</span>
            </Button>
            <Button
              onClick={() => setSettings({ ...settings, dateFormat: 'slash' })}
              variant={settings.dateFormat === 'slash' ? 'default' : 'outline'}
              className="flex-1"
            >
              <span>/</span>
            </Button>
          </div>
        </div>

        {/* 表示項目 */}
        <div className="flex flex-col gap-2">
          <Label>表示項目</Label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-base cursor-pointer">
              <Checkbox
                checked={settings.showYear}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, showYear: checked === true })
                }
                className="w-6 h-6 cursor-pointer p-2.5 -my-2.5"
              />
              年
            </label>
            <label className="flex items-center gap-2 text-base cursor-pointer">
              <Checkbox
                checked={settings.showWeekday}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, showWeekday: checked === true })
                }
                className="w-6 h-6 cursor-pointer p-2.5 -my-2.5"
              />
              曜日
            </label>
            <label className="flex items-center gap-2 text-base cursor-pointer">
              <Checkbox
                checked={settings.showSeconds}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, showSeconds: checked === true })
                }
                className="w-6 h-6 cursor-pointer p-2.5 -my-2.5"
              />
              秒
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
