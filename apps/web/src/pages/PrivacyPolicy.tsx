import { Link } from 'react-router-dom'
import { SEO } from '@/components/SEO/SEO'

function PrivacyPolicy() {
  return (
    <>
      <SEO
        path="/privacy"
        title="プライバシーポリシー"
        description="Rakitのプライバシーポリシー。個人情報の取り扱いについて説明しています。"
      />
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">プライバシーポリシー</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-8">
            最終更新日: 2026年3月6日
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. はじめに</h2>
            <p className="text-gray-700 leading-relaxed">
              Rakit（以下「当サイト」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めています。
              本プライバシーポリシーは、当サイトが収集する情報とその利用方法について説明します。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. 収集する情報</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              当サイトは以下の情報を収集する場合があります：
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>アクセスログ（IPアドレス、ブラウザ種類、アクセス日時など）</li>
              <li>ツールの使用状況（機能改善のため）</li>
              <li>お問い合わせフォームから送信された情報</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. 情報の利用目的</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              収集した情報は以下の目的で利用します：
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>サービスの提供・維持・改善</li>
              <li>ユーザーサポート</li>
              <li>利用状況の分析</li>
              <li>お問い合わせへの対応</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. 情報の第三者提供</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトは、ユーザーの同意がある場合、または法令に基づく場合を除き、
              個人情報を第三者に提供しません。ただし、アクセス解析や広告配信のために
              第三者のサービスを利用する場合があります。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Cookieの使用</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトは、ユーザー体験の向上やアクセス解析のためにCookieを使用する場合があります。
              ブラウザの設定によりCookieを無効にすることができます。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. データの保存</h2>
            <p className="text-gray-700 leading-relaxed">
              一部のツール（習慣トラッカー、目標達成トラッカーなど）では、
              ユーザーのデータをブラウザのLocalStorageに保存します。
              これらのデータはユーザーのデバイス内にのみ保存され、当サイトのサーバーには送信されません。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. プライバシーポリシーの変更</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。
              変更後のポリシーは、本ページに掲載した時点で効力を生じます。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">8. お問い合わせ</h2>
            <p className="text-gray-700 leading-relaxed">
              本プライバシーポリシーに関するお問い合わせは、
              <Link to="/contact" className="text-[#d97706] hover:underline">お問い合わせフォーム</Link>
              からご連絡ください。
            </p>
          </section>
        </div>

        <div className="mt-12">
          <Link to="/" className="text-[#d97706] hover:underline">
            ← ホームに戻る
          </Link>
        </div>
      </div>
    </>
  )
}

export default PrivacyPolicy
