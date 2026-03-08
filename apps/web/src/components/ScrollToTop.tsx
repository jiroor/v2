import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// ページ遷移時にスクロール位置をトップに戻す
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop
