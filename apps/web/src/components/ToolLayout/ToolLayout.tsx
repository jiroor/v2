import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import AdBanner from '@/components/Ads/AdBanner'
import { RelatedTools } from '@/components/RelatedTools/RelatedTools'

interface ToolLayoutProps {
  children: ReactNode
  maxWidth?: string
}

export function ToolLayout({ children, maxWidth = '800px' }: ToolLayoutProps) {
  const location = useLocation()

  return (
    <div className={`max-w-[${maxWidth}] mx-auto py-8 px-4`}>
      {children}
      
      {/* 関連ツール */}
      <RelatedTools currentPath={location.pathname} />
      
      {/* 広告（ツール下部） */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner format="rectangle" />
      </div>
    </div>
  )
}
