import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="max-w-screen-xl mx-auto px-6 md:px-4">
        <Link
          to="/"
          className="no-underline text-gray-900 cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-orange-600 focus-visible:outline-offset-4 focus-visible:rounded"
        >
          <h1 className="text-[28px] md:text-2xl font-bold tracking-tight bg-gradient-to-br from-[#d97706] to-[#b45309] bg-clip-text text-transparent">
            Rakit
          </h1>
        </Link>
      </div>
    </header>
  )
}

export default Header
