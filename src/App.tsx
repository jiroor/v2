import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Layout/Header'
import Home from './pages/Home'
import CountdownTimer from './pages/Timer/CountdownTimer'
import Stopwatch from './pages/Timer/Stopwatch'
import PomodoroTimer from './pages/Timer/PomodoroTimer'
import CurrentTime from './pages/Timer/CurrentTime'
import CharCounter from './pages/TextTools/CharCounter'
import TextDiff from './pages/TextTools/TextDiff'
import RandomString from './pages/TextTools/RandomString'
import QRCodeGenerator from './pages/OtherTools/QRCodeGenerator'
import PasswordGenerator from './pages/OtherTools/PasswordGenerator'
import ColorPicker from './pages/OtherTools/ColorPicker'
import Roulette from './pages/OtherTools/Roulette'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 px-6 py-6 md:px-4 md:py-4 max-w-screen-xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/timer/countdown" element={<CountdownTimer />} />
            <Route path="/timer/stopwatch" element={<Stopwatch />} />
            <Route path="/timer/pomodoro" element={<PomodoroTimer />} />
            <Route path="/timer/current" element={<CurrentTime />} />
            <Route path="/text/counter" element={<CharCounter />} />
            <Route path="/text/diff" element={<TextDiff />} />
            <Route path="/text/random" element={<RandomString />} />
            <Route path="/other/qrcode" element={<QRCodeGenerator />} />
            <Route path="/other/password" element={<PasswordGenerator />} />
            <Route path="/other/colorpicker" element={<ColorPicker />} />
            <Route path="/other/roulette" element={<Roulette />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
