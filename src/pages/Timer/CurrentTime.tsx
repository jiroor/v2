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
import styles from './CurrentTime.module.css'

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
    <div className={styles.container}>
      <h1 className={styles.title}>現在日時</h1>

      {/* メイン表示エリア */}
      <div
        className={`${styles.display} ${
          settings.layout === 'vertical' ? styles.vertical : styles.horizontal
        }`}
      >
        {/* 日付表示 */}
        <div className={styles.date}>
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
        <div className={styles.time}>{formattedTime}</div>
      </div>

      {/* 設定エリア */}
      <div className={styles.settings}>
        {/* タイムゾーン選択 */}
        <div className={styles.settingItem}>
          <Label htmlFor="timezone" className={styles.label}>
            タイムゾーン
          </Label>
          <Select
            value={settings.timezone}
            onValueChange={(value) =>
              setSettings({ ...settings, timezone: value })
            }
          >
            <SelectTrigger id="timezone" className={styles.select}>
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
        <div className={styles.settingItem}>
          <label className={styles.label}>レイアウト</label>
          <div className={styles.buttonGroup}>
            <button
              onClick={() => setSettings({ ...settings, layout: 'horizontal' })}
              className={`${styles.buttonGroupButton} ${
                settings.layout === 'horizontal' ? styles.active : ''
              }`}
            >
              <AlignCenterHorizontal size={20} />
              <span>横組み</span>
            </button>
            <button
              onClick={() => setSettings({ ...settings, layout: 'vertical' })}
              className={`${styles.buttonGroupButton} ${
                settings.layout === 'vertical' ? styles.active : ''
              }`}
            >
              <AlignCenterVertical size={20} />
              <span>縦組み</span>
            </button>
          </div>
        </div>

        {/* 日付形式切り替え */}
        <div className={styles.settingItem}>
          <label className={styles.label}>日付の表示方法</label>
          <div className={styles.buttonGroup}>
            <button
              onClick={() => setSettings({ ...settings, dateFormat: 'kanji' })}
              className={`${styles.buttonGroupButton} ${
                settings.dateFormat === 'kanji' ? styles.active : ''
              }`}
            >
              <span>年月日</span>
            </button>
            <button
              onClick={() => setSettings({ ...settings, dateFormat: 'slash' })}
              className={`${styles.buttonGroupButton} ${
                settings.dateFormat === 'slash' ? styles.active : ''
              }`}
            >
              <span>/</span>
            </button>
          </div>
        </div>

        {/* 表示項目 */}
        <div className={styles.settingItem}>
          <Label className={styles.label}>表示項目</Label>
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <Checkbox
                checked={settings.showYear}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, showYear: checked === true })
                }
                className={styles.checkbox}
              />
              年
            </label>
            <label className={styles.checkboxLabel}>
              <Checkbox
                checked={settings.showWeekday}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, showWeekday: checked === true })
                }
                className={styles.checkbox}
              />
              曜日
            </label>
            <label className={styles.checkboxLabel}>
              <Checkbox
                checked={settings.showSeconds}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, showSeconds: checked === true })
                }
                className={styles.checkbox}
              />
              秒
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
