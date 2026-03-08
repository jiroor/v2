// アフィリエイトリンクコンポーネント
// Amazon、楽天などのアフィリエイトリンクを管理

interface AffiliateLinkProps {
  platform: 'amazon' | 'rakuten' | 'custom'
  productId?: string
  url?: string
  title: string
  description?: string
  className?: string
}

function AffiliateLink({
  platform,
  productId = '',
  url = '',
  title,
  description = '',
  className = ''
}: AffiliateLinkProps) {
  const links = {
    amazon: `https://www.amazon.co.jp/dp/${productId}?tag=your-associate-id`,
    rakuten: `https://hb.afl.rakuten.co.jp/hgc/${productId}/`,
    custom: url
  }

  const styles = {
    amazon: {
      bg: 'bg-[#FF9900]',
      hover: 'hover:bg-[#e68a00]',
      icon: '🛒'
    },
    rakuten: {
      bg: 'bg-[#BF0000]',
      hover: 'hover:bg-[#a60000]',
      icon: '🎁'
    },
    custom: {
      bg: 'bg-blue-600',
      hover: 'hover:bg-blue-700',
      icon: '🔗'
    }
  }

  const style = styles[platform]

  return (
    <div className={`p-4 rounded-lg bg-gray-50 border border-gray-200 ${className}`}>
      <a
        href={links[platform]}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={`
          inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white
          transition-all duration-200 shadow-md hover:shadow-lg
          ${style.bg} ${style.hover}
        `}
      >
        <span className="text-lg">{style.icon}</span>
        <span>{title}</span>
      </a>
      {description && (
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      )}
      <p className="text-xs text-gray-400 mt-1">
        ※このリンクはアフィリエイトリンクです
      </p>
    </div>
  )
}

export default AffiliateLink
