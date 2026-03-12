import { Heart } from 'lucide-react'
import { useFavorites } from '@/hooks/useFavorites'
import { ShareButton } from '@/components/Share/ShareButton'

interface ToolHeaderProps {
  title: string
  toolPath?: string
  shareTitle?: string
  description?: string
}

export function ToolHeader({ title, toolPath, shareTitle, description }: ToolHeaderProps) {
  const { isFavorite, toggleFavorite } = useFavorites()

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {toolPath && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(toolPath, title)}
              className={`p-2 rounded-lg transition-colors ${
                isFavorite(toolPath)
                  ? 'text-red-500 hover:text-red-600 bg-red-50'
                  : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'
              }`}
              title={isFavorite(toolPath) ? 'お気に入りから削除' : 'お気に入りに追加'}
            >
              <Heart 
                className={`w-5 h-5 ${isFavorite(toolPath) ? 'fill-current' : ''}`} 
              />
            </button>
            {shareTitle && <ShareButton title={shareTitle} variant="compact" />}
          </div>
        )}
      </div>
      {description && (
        <p className="text-gray-600 text-sm mt-2">{description}</p>
      )}
    </div>
  )
}
