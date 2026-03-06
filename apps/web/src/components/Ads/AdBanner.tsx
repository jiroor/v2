// Google AdSense 広告コンポーネント
// 実際の広告表示にはGoogle AdSenseのアカウント登録が必要

interface AdBannerProps {
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle'
  className?: string
}

function AdBanner({ 
  format = 'auto',
  className = ''
}: AdBannerProps) {
  // 本番環境では実際のAdSenseコードを使用
  // 現在はプレースホルダーを表示
  
  return (
    <div className={`ad-container ${className}`}>
      <div 
        className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm"
        style={{
          minHeight: format === 'horizontal' ? '90px' : 
                    format === 'vertical' ? '300px' : 
                    format === 'rectangle' ? '250px' : '100px',
          width: '100%',
        }}
      >
        <div className="text-center p-4">
          <p className="font-medium">広告スペース</p>
          <p className="text-xs mt-1">Google AdSense</p>
        </div>
      </div>
    </div>
  )
}

export default AdBanner

// 使用例:
// <AdBanner slot="home-top" format="horizontal" />
// <AdBanner slot="tool-sidebar" format="vertical" />
// <AdBanner slot="tool-bottom" format="rectangle" />
