import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SEO } from '@/components/SEO/SEO'

function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // In production, this would send to a backend API
    // For now, we'll use mailto as a simple solution
    const mailtoLink = `mailto:contact@rakit.app?subject=${encodeURIComponent(`[Rakit] ${subject}`)}&body=${encodeURIComponent(`名前: ${name}\nメール: ${email}\n\n${message}`)}`
    
    window.location.href = mailtoLink
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <>
        <SEO
          path="/contact"
          title="お問い合わせ"
          description="Rakitへのお問い合わせ・ご要望・不具合報告はこちらから。"
        />
        <div className="max-w-[500px] mx-auto py-8 px-4 text-center">
          <h2 className="text-2xl font-semibold mb-6">お問い合わせ</h2>
          <div className="bg-green-50 border border-green-200 rounded-md p-6">
            <p className="text-green-700 mb-4">メールアプリが開きます。</p>
            <p className="text-sm text-gray-600">内容をご確認の上、送信してください。</p>
          </div>
          <Button
            onClick={() => setSubmitted(false)}
            variant="outline"
            className="mt-4"
          >
            戻る
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO
        path="/contact"
        title="お問い合わせ"
        description="Rakitへのお問い合わせ・ご要望・不具合報告はこちらから。"
      />
      <div className="max-w-[500px] mx-auto py-8 px-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">お問い合わせ</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              お名前 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              件名 <span className="text-red-500">*</span>
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            >
              <option value="">選択してください</option>
              <option value="ご意見・ご要望">ご意見・ご要望</option>
              <option value="バグ報告">バグ報告</option>
              <option value="ビジネスのご相談">ビジネスのご相談</option>
              <option value="広告掲載について">広告掲載について</option>
              <option value="その他">その他</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              メッセージ <span className="text-red-500">*</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={6}
              className="w-full p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]"
            />
          </div>

          <Button type="submit" size="lg" className="w-full">
            送信
          </Button>
        </form>

        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">お問い合わせ内容</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• ご意見・ご要望</li>
            <li>• バグ報告</li>
            <li>• ビジネスのご相談</li>
            <li>• 広告掲載について</li>
            <li>• その他</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default ContactForm
