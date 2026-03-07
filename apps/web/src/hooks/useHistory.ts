import { useState, useEffect, useCallback } from 'react'

const HISTORY_KEY = 'rakit_history'
const MAX_HISTORY = 30

export interface HistoryItem {
  path: string
  name: string
  visitedAt: number
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY)
      if (stored) {
        setHistory(JSON.parse(stored))
      }
    } catch (e) {
      console.error('Failed to load history:', e)
    }
  }, [])

  const saveHistory = useCallback((newHistory: HistoryItem[]) => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory))
      setHistory(newHistory)
    } catch (e) {
      console.error('Failed to save history:', e)
    }
  }, [])

  const addToHistory = useCallback((path: string, name: string) => {
    setHistory(prev => {
      const filtered = prev.filter(h => h.path !== path)
      const newItem: HistoryItem = {
        path,
        name,
        visitedAt: Date.now()
      }
      
      const newHistory = [newItem, ...filtered].slice(0, MAX_HISTORY)
      saveHistory(newHistory)
      return newHistory
    })
  }, [saveHistory])

  const clearHistory = useCallback(() => {
    localStorage.removeItem(HISTORY_KEY)
    setHistory([])
  }, [])

  return {
    history,
    addToHistory,
    clearHistory
  }
}
