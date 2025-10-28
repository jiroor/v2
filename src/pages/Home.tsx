import styles from './Home.module.css'

function Home() {
  return (
    <div className={styles.home}>
      <h2 className={styles.title}>ツール一覧</h2>
      <p className={styles.description}>
        軽量でミニマルなユーティリティツール集
      </p>

      <div className={styles.toolGrid}>
        <div className={styles.toolCard}>
          <h3>タイマー</h3>
          <p>カウントダウン、ストップウォッチ、ポモドーロ</p>
        </div>

        <div className={styles.toolCard}>
          <h3>テキストツール</h3>
          <p>文字数カウンター、差分表示、ランダム生成</p>
        </div>

        <div className={styles.toolCard}>
          <h3>その他</h3>
          <p>QRコード、パスワード生成、カラーピッカー</p>
        </div>
      </div>
    </div>
  )
}

export default Home
