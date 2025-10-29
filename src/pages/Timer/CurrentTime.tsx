import { useState, useMemo } from 'react'
import { useCurrentTime } from '../../hooks/useCurrentTime'
import {
  MAJOR_TIMEZONES,
  detectTimezone,
  formatTime,
  formatDate,
} from '../../utils/timezoneUtils'
import { AlignCenterHorizontal, AlignCenterVertical } from 'lucide-react'
import styles from './CurrentTime.module.css'

interface ClockSettings {
  timezone: string
  layout: 'horizontal' | 'vertical'
  showSeconds: boolean
}

export default function CurrentTime() {
  const currentTime = useCurrentTime()
  const [settings, setSettings] = useState<ClockSettings>({
    timezone: detectTimezone(),
    layout: 'horizontal',
    showSeconds: true,
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

      {/* 設定エリア */}
      <div className={styles.settings}>
        {/* タイムゾーン選択 */}
        <div className={styles.settingItem}>
          <label htmlFor="timezone" className={styles.label}>
            タイムゾーン
          </label>
          <select
            id="timezone"
            value={settings.timezone}
            onChange={(e) =>
              setSettings({ ...settings, timezone: e.target.value })
            }
            className={styles.select}
          >
            {MAJOR_TIMEZONES.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label} ({tz.offset})
              </option>
            ))}
          </select>
        </div>

        {/* レイアウト切り替え */}
        <div className={styles.settingItem}>
          <label className={styles.label}>レイアウト</label>
          <button
            onClick={() =>
              setSettings({
                ...settings,
                layout: settings.layout === 'horizontal' ? 'vertical' : 'horizontal',
              })
            }
            className={styles.toggleButton}
            aria-label="レイアウト切り替え"
          >
            {settings.layout === 'horizontal' ? (
              <>
                <AlignCenterHorizontal size={20} />
                <span>横組み</span>
              </>
            ) : (
              <>
                <AlignCenterVertical size={20} />
                <span>縦組み</span>
              </>
            )}
          </button>
        </div>

        {/* 秒数表示切り替え */}
        <div className={styles.settingItem}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={settings.showSeconds}
              onChange={(e) =>
                setSettings({ ...settings, showSeconds: e.target.checked })
              }
              className={styles.checkbox}
            />
            秒数を表示
          </label>
        </div>
      </div>

      {/* メイン表示エリア */}
      <div
        className={`${styles.display} ${
          settings.layout === 'vertical' ? styles.vertical : styles.horizontal
        }`}
      >
        {/* 日付表示 */}
        <div className={styles.date}>
          {settings.layout === 'horizontal' ? (
            <span>
              {formattedDate.year}年{formattedDate.month}月{formattedDate.day}日
              （{formattedDate.weekday}）
            </span>
          ) : (
            <>
              <span>{formattedDate.year}</span>
              <span>/</span>
              <span>{formattedDate.month}</span>
              <span>/</span>
              <span>{formattedDate.day}</span>
              <span>/</span>
              <span>({formattedDate.weekday})</span>
            </>
          )}
        </div>

        {/* 時刻表示 */}
        <div className={styles.time}>{formattedTime}</div>
      </div>
    </div>
  )
}
