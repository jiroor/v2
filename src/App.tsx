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

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
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
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
