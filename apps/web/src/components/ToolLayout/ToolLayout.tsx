import { ReactNode } from 'react'
import AdBanner from '@/components/Ads/AdBanner'

interface ToolLayoutProps {
  children: ReactNode
  maxWidth?: string
}

export function ToolLayout({ children, maxWidth = '800px' }: ToolLayoutProps) {
  return (
    <div className={`max-w-[${maxWidth}] mx-auto py-8 px-4`}>
      {children}
      
      {/* 広告（ツール下部） */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner format="rectangle" />
      </div>
    </div>
  )
}
