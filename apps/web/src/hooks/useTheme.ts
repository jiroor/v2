import { useState, useEffect, useCallback } from 'react'

type Theme = 'light' | 'dark'

const THEME_KEY = 'rakit_theme'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light'
    
    const stored = localStorage.getItem(THEME_KEY) as Theme | null
    if (stored) return stored
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }, [])

  return { theme, toggleTheme }
}
