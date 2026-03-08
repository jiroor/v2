import { useState } from 'react'
import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    
    // 本番環境ではAPIに送信
    // 現在はローカルストレージに保存
    try {
      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]')
      if (!subscribers.includes(email)) {
        subscribers.push(email)
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers))
      }
      setSubmitted(true)
    } catch {
      alert('登録に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <p className="text-green-700 font-semibold mb-2">登録ありがとうございます！</p>
        <p className="text-sm text-green-600">新しいツールやアップデートをお知らせします。</p>
      </div>
    )
  }

  return (
    <div className="bg-[#fef3c7] border border-[#d97706] rounded-lg p-6">
      <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
        <Mail className="w-5 h-5 text-[#d97706]" />
        ニュースレター登録
      </h3>
      <p className="text-sm text-gray-700 mb-4">
        新しいツールの追加や機能アップデートをいち早くお届けします。
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
          required
          className="flex-1 p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
        />
        <Button type="submit" disabled={loading}>
          {loading ? '登録中...' : '登録'}
        </Button>
      </form>
      <p className="text-xs text-gray-500 mt-2">
        ※ スパムは送信しません。いつでも配信停止可能です。
      </p>
    </div>
  )
}

export default NewsletterSignup
