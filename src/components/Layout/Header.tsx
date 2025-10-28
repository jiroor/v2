import { Link } from 'react-router-dom'
import styles from './Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <h1>Utility Tools</h1>
        </Link>
      </div>
    </header>
  )
}

export default Header
