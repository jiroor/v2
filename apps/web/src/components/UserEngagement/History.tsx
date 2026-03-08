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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-2 mb-4">
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {history.slice(0, 10).map((item) => (
          <a
            key={item.path}
            href={item.path}
            className="p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-[#d97706] transition-all text-center"
          >
            <span className="text-sm text-gray-700 font-medium">{item.name}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
