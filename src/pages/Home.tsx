import { Link } from 'react-router-dom'
import {
  CountdownIcon,
  StopwatchIcon,
  PomodoroIcon,
  CharCounterIcon,
  TextDiffIcon,
  RandomStringIcon,
  QRCodeIcon,
  PasswordIcon,
  ColorPickerIcon,
} from '../components/Icons/ToolIcons'
import styles from './Home.module.css'

function Home() {
  return (
    <div className={styles.home}>
      <h2 className={styles.title}>ツール一覧</h2>
      <p className={styles.description}>
        軽量でミニマルなユーティリティツール集
      </p>

      <div className={styles.toolGrid}>
        <Link to="/timer/countdown" className={styles.toolCard}>
          <CountdownIcon className={styles.icon} />
          <h3>カウントダウンタイマー</h3>
          <p>指定時間からカウントダウン</p>
        </Link>

        <Link to="/timer/stopwatch" className={styles.toolCard}>
          <StopwatchIcon className={styles.icon} />
          <h3>ストップウォッチ</h3>
          <p>時間計測とラップタイム</p>
        </Link>

        <Link to="/timer/pomodoro" className={styles.toolCard}>
          <PomodoroIcon className={styles.icon} />
          <h3>ポモドーロタイマー</h3>
          <p>25分作業 + 5分休憩サイクル</p>
        </Link>

        <Link to="/text/counter" className={styles.toolCard}>
          <CharCounterIcon className={styles.icon} />
          <h3>文字数カウンター</h3>
          <p>文字数、単語数、行数カウント</p>
        </Link>

        <Link to="/text/diff" className={styles.toolCard}>
          <TextDiffIcon className={styles.icon} />
          <h3>テキスト差分</h3>
          <p>2つのテキストの差分表示</p>
        </Link>

        <Link to="/text/random" className={styles.toolCard}>
          <RandomStringIcon className={styles.icon} />
          <h3>ランダム文字列</h3>
          <p>パスワード等の生成</p>
        </Link>

        <Link to="/other/qrcode" className={styles.toolCard}>
          <QRCodeIcon className={styles.icon} />
          <h3>QRコード生成</h3>
          <p>URL等をQRコードに変換</p>
        </Link>

        <Link to="/other/password" className={styles.toolCard}>
          <PasswordIcon className={styles.icon} />
          <h3>パスワード生成</h3>
          <p>セキュアなパスワード生成</p>
        </Link>

        <Link to="/other/colorpicker" className={styles.toolCard}>
          <ColorPickerIcon className={styles.icon} />
          <h3>カラーピッカー</h3>
          <p>HEX/RGB/HSL変換</p>
        </Link>
      </div>
    </div>
  )
}

export default Home
