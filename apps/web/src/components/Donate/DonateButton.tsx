// 寄付ボタンコンポーネント（Ko-fi / Buy Me a Coffee対応）
// ユーザーからのサポートを受け付ける

interface DonateButtonProps {
  platform?: 'kofi' | 'buymeacoffee'
  username?: string
  className?: string
}

function DonateButton({ 
  platform = 'kofi',
  username = 'your-username', // 本番では実際のユーザー名に変更
  className = ''
}: DonateButtonProps) {
  const links = {
    kofi: `https://ko-fi.com/${username}`,
    buymeacoffee: `https://www.buymeacoffee.com/${username}`
  }

  const styles = {
    kofi: {
      bg: 'bg-[#FF5E5B]',
      hover: 'hover:bg-[#e54d4a]',
      text: 'Ko-fiでサポート',
      icon: '☕'
    },
    buymeacoffee: {
      bg: 'bg-[#FFDD00]',
      hover: 'hover:bg-[#e5c700]',
      text: 'コーヒーを奢る',
      icon: '☕'
    }
  }

  const style = styles[platform]

  return (
    <a
      href={links[platform]}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white
        transition-all duration-200 shadow-md hover:shadow-lg
        ${style.bg} ${style.hover}
        ${className}
      `}
    >
      <span className="text-lg">{style.icon}</span>
      <span>{style.text}</span>
    </a>
  )
}

export default DonateButton
