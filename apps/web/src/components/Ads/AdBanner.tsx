// Google AdSense 広告コンポーネント
// 審査通過後に広告スロットIDを設定してください

interface AdBannerProps {
  slot: string
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle'
  className?: string
}

// 審査中は広告を非表示（ 審査通過後にtrueに変更）
const SHOW_ADS = false

function AdBanner({ 
  slot,
  format = 'auto',
  className = ''
}: AdBannerProps) {
  // 審査中は何も表示しない
  if (!SHOW_ADS) {
    return null
  }

  // 環境変数からPublisher IDを取得
  const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT || 'ca-pub-8707902976876530'

  // 広告フォーマットに応じたスタイル
  const formatStyles: Record<string, React.CSSProperties> = {
    horizontal: { minHeight: '90px', width: '100%' },
    vertical: { minHeight: '300px', width: '160px' },
    rectangle: { minHeight: '250px', width: '300px' },
    auto: { minHeight: '100px', width: '100%' },
  }

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={formatStyles[format]}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format === 'auto' ? 'auto' : undefined}
        data-full-width-responsive="true"
      />
      <script>
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </script>
    </div>
  )
}

export default AdBanner

// 使用例:
// <AdBanner slot="1234567890" format="horizontal" />
// 
// 環境変数設定 (.env):
// VITE_ADSENSE_CLIENT=ca-pub-8707902976876530
// VITE_ADSENSE_SLOT_HOME=1234567890
// VITE_ADSENSE_SLOT_TOOLS=0987654321
