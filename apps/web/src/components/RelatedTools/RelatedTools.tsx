import { Link } from 'react-router-dom'
import { getRelatedTools, categoryNames } from '@/utils/toolData'

interface RelatedToolsProps {
  currentPath: string
}

export function RelatedTools({ currentPath }: RelatedToolsProps) {
  const relatedTools = getRelatedTools(currentPath, 4)

  if (relatedTools.length === 0) return null

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">関連ツール</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {relatedTools.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            className="flex flex-col p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-amber-50 hover:border-amber-300 transition-all duration-200 group"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
                {categoryNames[tool.category]}
              </span>
            </div>
            <h4 className="font-medium text-gray-900 group-hover:text-amber-700 transition-colors">
              {tool.name}
            </h4>
            <p className="text-sm text-gray-500 mt-1">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
