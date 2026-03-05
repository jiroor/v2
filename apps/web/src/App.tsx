import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Layout/Header'
import { UpdatePrompt } from './components/UpdatePrompt'

// Lazy load page components
const Home = lazy(() => import('./pages/Home'))
const CountdownTimer = lazy(() => import('./pages/Timer/CountdownTimer'))
const Stopwatch = lazy(() => import('./pages/Timer/Stopwatch'))
const PomodoroTimer = lazy(() => import('./pages/Timer/PomodoroTimer'))
const CurrentTime = lazy(() => import('./pages/Timer/CurrentTime'))
const CharCounter = lazy(() => import('./pages/TextTools/CharCounter'))
const TextDiff = lazy(() => import('./pages/TextTools/TextDiff'))
const RandomString = lazy(() => import('./pages/TextTools/RandomString'))
const Base64Encoder = lazy(() => import('./pages/TextTools/Base64Encoder'))
const URLEncoder = lazy(() => import('./pages/TextTools/URLEncoder'))
const JSONFormatter = lazy(() => import('./pages/TextTools/JSONFormatter'))
const HashGenerator = lazy(() => import('./pages/TextTools/HashGenerator'))
const UnixTimestamp = lazy(() => import('./pages/TextTools/UnixTimestamp'))
const RegexTester = lazy(() => import('./pages/TextTools/RegexTester'))
const UUIDGenerator = lazy(() => import('./pages/TextTools/UUIDGenerator'))
const LoremIpsumGenerator = lazy(() => import('./pages/TextTools/LoremIpsumGenerator'))
const CaseConverter = lazy(() => import('./pages/TextTools/CaseConverter'))
const NumberConverter = lazy(() => import('./pages/TextTools/NumberConverter'))
const DuplicateRemover = lazy(() => import('./pages/TextTools/DuplicateRemover'))
const TextSorter = lazy(() => import('./pages/TextTools/TextSorter'))
const TextStatistics = lazy(() => import('./pages/TextTools/TextStatistics'))
const ImageToBase64 = lazy(() => import('./pages/OtherTools/ImageToBase64'))
const QRCodeGenerator = lazy(() => import('./pages/OtherTools/QRCodeGenerator'))
const PasswordGenerator = lazy(() => import('./pages/OtherTools/PasswordGenerator'))
const ColorPicker = lazy(() => import('./pages/OtherTools/ColorPicker'))
const Roulette = lazy(() => import('./pages/OtherTools/Roulette'))
const CameraSharing = lazy(() => import('./pages/Camera/CameraSharing'))
const CameraMode = lazy(() => import('./pages/Camera/CameraMode'))
const ViewerMode = lazy(() => import('./pages/Camera/ViewerMode'))

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 px-6 py-6 md:px-4 md:py-4 max-w-screen-xl mx-auto w-full">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                  <span className="sr-only">読み込み中...</span>
                </div>
                <p className="mt-4 text-sm text-gray-600">読み込み中...</p>
              </div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/timer/countdown" element={<CountdownTimer />} />
              <Route path="/timer/stopwatch" element={<Stopwatch />} />
              <Route path="/timer/pomodoro" element={<PomodoroTimer />} />
              <Route path="/timer/current" element={<CurrentTime />} />
              <Route path="/text/counter" element={<CharCounter />} />
              <Route path="/text/diff" element={<TextDiff />} />
              <Route path="/text/random" element={<RandomString />} />
              <Route path="/text/base64" element={<Base64Encoder />} />
              <Route path="/text/url" element={<URLEncoder />} />
              <Route path="/text/json" element={<JSONFormatter />} />
              <Route path="/text/hash" element={<HashGenerator />} />
              <Route path="/text/unix" element={<UnixTimestamp />} />
              <Route path="/text/regex" element={<RegexTester />} />
              <Route path="/text/uuid" element={<UUIDGenerator />} />
              <Route path="/text/case" element={<CaseConverter />} />
              <Route path="/text/number" element={<NumberConverter />} />
              <Route path="/text/lorem" element={<LoremIpsumGenerator />} />
              <Route path="/text/duplicate" element={<DuplicateRemover />} />
              <Route path="/text/sort" element={<TextSorter />} />
              <Route path="/text/statistics" element={<TextStatistics />} />
              <Route path="/other/image-base64" element={<ImageToBase64 />} />
              <Route path="/other/qrcode" element={<QRCodeGenerator />} />
              <Route path="/other/password" element={<PasswordGenerator />} />
              <Route path="/other/colorpicker" element={<ColorPicker />} />
              <Route path="/other/roulette" element={<Roulette />} />
              <Route path="/camera" element={<CameraSharing />} />
              <Route path="/camera/mode" element={<CameraMode />} />
              <Route path="/camera/viewer" element={<ViewerMode />} />
            </Routes>
          </Suspense>
        </main>
        <UpdatePrompt />
      </div>
    </Router>
  )
}

export default App
