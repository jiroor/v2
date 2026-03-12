// ツール検索コンポーネント
// 112ツールから目的のツールを素早く見つける

import { useState, useMemo, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { searchTools, CATEGORY_NAMES } from '@/constants/tools'

interface ToolSearchProps {
  className?: string
}

export function ToolSearch({ className = '' }: ToolSearchProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // 検索結果（最大10件）
  const results = useMemo(() => {
    if (!query.trim()) return []
    return searchTools(query).slice(0, 10)
  }, [query])

  // 外部クリックで閉じる
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // キーボードショートカット (Ctrl+K / Cmd+K)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        setIsOpen(true)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
        inputRef.current?.blur()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className={`relative ${className}`}>
      {/* 検索入力 */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="ツールを検索... (Ctrl+K)"
          className="w-full px-4 py-3 pl-11 pr-20 text-gray-900 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
        />
        {/* 検索アイコン */}
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {/* ショートカット表示 */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 text-xs text-gray-400">
          <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded">Ctrl</kbd>
          <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded">K</kbd>
        </div>
      </div>

      {/* 検索結果ドロップダウン */}
      {isOpen && query.trim() && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-[400px] overflow-y-auto"
        >
          {results.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <p>「{query}」に一致するツールが見つかりません</p>
              <p className="text-sm mt-1">別のキーワードをお試しください</p>
            </div>
          ) : (
            <div className="py-2">
              <div className="px-3 py-1.5 text-xs text-gray-500 border-b border-gray-100">
                {results.length}件のツールが見つかりました
              </div>
              {results.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  onClick={() => {
                    setQuery('')
                    setIsOpen(false)
                  }}
                  className="flex items-start gap-3 px-3 py-2.5 hover:bg-amber-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 truncate">{tool.name}</span>
                      <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                        {CATEGORY_NAMES[tool.category]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{tool.description}</p>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ToolSearch
