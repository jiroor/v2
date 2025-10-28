import { Link } from 'react-router-dom'
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
          <h3>カウントダウンタイマー</h3>
          <p>指定時間からカウントダウン</p>
        </Link>

        <Link to="/timer/stopwatch" className={styles.toolCard}>
          <h3>ストップウォッチ</h3>
          <p>時間計測とラップタイム</p>
        </Link>

        <div className={styles.toolCard}>
          <h3>ポモドーロタイマー</h3>
          <p>25分作業 + 5分休憩サイクル（準備中）</p>
        </div>

        <div className={styles.toolCard}>
          <h3>文字数カウンター</h3>
          <p>文字数、単語数、行数カウント（準備中）</p>
        </div>

        <div className={styles.toolCard}>
          <h3>テキスト差分</h3>
          <p>2つのテキストの差分表示（準備中）</p>
        </div>

        <div className={styles.toolCard}>
          <h3>ランダム文字列</h3>
          <p>パスワード等の生成（準備中）</p>
        </div>

        <div className={styles.toolCard}>
          <h3>QRコード生成</h3>
          <p>URL等をQRコードに変換（準備中）</p>
        </div>

        <div className={styles.toolCard}>
          <h3>パスワード生成</h3>
          <p>セキュアなパスワード生成（準備中）</p>
        </div>

        <div className={styles.toolCard}>
          <h3>カラーピッカー</h3>
          <p>HEX/RGB/HSL変換（準備中）</p>
        </div>
      </div>
    </div>
  )
}

export default Home
