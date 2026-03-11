import { Link } from 'react-router-dom'
import { Breadcrumbs } from './Breadcrumbs'
import { useTheme } from '@/hooks/useTheme'

function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-4">
      <div className="max-w-screen-xl mx-auto px-6 md:px-4 flex items-center justify-between">
        <div>
          <Link
            to="/"
            className="no-underline text-gray-900 dark:text-white cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-orange-600 focus-visible:outline-offset-4 focus-visible:rounded"
          >
            <h1 className="text-[28px] md:text-2xl font-bold tracking-tight bg-gradient-to-br from-[#d97706] to-[#b45309] bg-clip-text text-transparent">
              Rakit
            </h1>
          </Link>
          <Breadcrumbs />
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label={theme === 'light' ? 'ダークモードに切り替え' : 'ライトモードに切り替え'}
        >
          {theme === 'light' ? (
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  )
}

export default Header
