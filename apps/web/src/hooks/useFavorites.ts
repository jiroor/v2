import { useState, useEffect, useCallback } from 'react'

const FAVORITES_KEY = 'rakit_favorites'
const MAX_FAVORITES = 20

export interface FavoriteTool {
  path: string
  name: string
  addedAt: number
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteTool[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY)
      if (stored) {
        setFavorites(JSON.parse(stored))
      }
    } catch (e) {
      console.error('Failed to load favorites:', e)
    }
  }, [])

  const saveFavorites = useCallback((newFavorites: FavoriteTool[]) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites))
      setFavorites(newFavorites)
    } catch (e) {
      console.error('Failed to save favorites:', e)
    }
  }, [])

  const addFavorite = useCallback((path: string, name: string) => {
    setFavorites(prev => {
      if (prev.some(f => f.path === path)) return prev
      
      const newFavorites = [...prev, { path, name, addedAt: Date.now() }]
      if (newFavorites.length > MAX_FAVORITES) {
        newFavorites.shift()
      }
      
      saveFavorites(newFavorites)
      return newFavorites
    })
  }, [saveFavorites])

  const removeFavorite = useCallback((path: string) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(f => f.path !== path)
      saveFavorites(newFavorites)
      return newFavorites
    })
  }, [saveFavorites])

  const isFavorite = useCallback((path: string) => {
    return favorites.some(f => f.path === path)
  }, [favorites])

  const toggleFavorite = useCallback((path: string, name: string) => {
    if (isFavorite(path)) {
      removeFavorite(path)
    } else {
      addFavorite(path, name)
    }
  }, [isFavorite, removeFavorite, addFavorite])

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite
  }
}
