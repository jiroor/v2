import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Layout/Header'
import Home from './pages/Home'
import CountdownTimer from './pages/Timer/CountdownTimer'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/timer/countdown" element={<CountdownTimer />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
