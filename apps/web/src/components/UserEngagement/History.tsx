import { Clock, Trash2 } from 'lucide-react'
import type { HistoryItem } from '@/hooks/useHistory'

interface HistoryListProps {
  history: HistoryItem[]
  onClear: () => void
}

export function HistoryList({ history, onClear }: HistoryListProps) {
  if (history.length === 0) return null

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-500" />
          最近使ったツール
        </h3>
        <button
          onClick={onClear}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          <Trash2 className="w-4 h-4" />
          クリア
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.slice(0, 10).map((item) => (
          <a
            key={item.path}
            href={item.path}
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
          >
            {item.name}
          </a>
        ))}
      </div>
    </div>
  )
}
