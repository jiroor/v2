import { Heart } from 'lucide-react'
import type { FavoriteTool } from '@/hooks/useFavorites'

interface FavoriteButtonProps {
  path: string
  name: string
  isFavorite: boolean
  onToggle: () => void
}

export function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onToggle()
      }}
      className={`p-2 rounded-lg transition-colors ${
        isFavorite 
          ? 'text-red-500 hover:text-red-600' 
          : 'text-gray-400 hover:text-gray-500'
      }`}
      title={isFavorite ? 'お気に入りから削除' : 'お気に入りに追加'}
    >
      <Heart 
        className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} 
      />
    </button>
  )
}

interface FavoritesListProps {
  favorites: FavoriteTool[]
  onRemove: (path: string) => void
}

export function FavoritesList({ favorites, onRemove }: FavoritesListProps) {
  if (favorites.length === 0) return null

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2 mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500" />
          お気に入り
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {favorites.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm transition-colors flex items-center gap-2"
          >
            {item.name}
            <button
              onClick={(e) => {
                e.preventDefault()
                onRemove(item.path)
              }}
              className="text-red-400 hover:text-red-600"
            >
              ×
            </button>
          </a>
        ))}
      </div>
    </div>
  )
}
