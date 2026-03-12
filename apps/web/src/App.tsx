import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Layout/Header'
import Footer from './components/Footer'
import { UpdatePrompt } from './components/UpdatePrompt'
import ScrollToTop from './components/ScrollToTop'

// Lazy load page components
const Home = lazy(() => import('./pages/Home'))
const NotFound = lazy(() => import('./pages/NotFound'))
const UsageStats = lazy(() => import('./pages/UsageStats'))
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
const DiscountCalculator = lazy(() => import("./pages/OtherTools/DiscountCalculator"))
const DigitalTimer = lazy(() => import("./pages/OtherTools/DigitalTimer"))
const StopwatchTool = lazy(() => import("./pages/OtherTools/StopwatchTool"))
const DateCalculator = lazy(() => import("./pages/OtherTools/DateCalculator"))
const WordCounter = lazy(() => import("./pages/TextTools/WordCounter"))
const ImageCompressor = lazy(() => import("./pages/OtherTools/ImageCompressor"))
const ImageResizer = lazy(() => import("./pages/OtherTools/ImageResizer"))
const MetaTagGenerator = lazy(() => import("./pages/OtherTools/MetaTagGenerator"))
const CreditCardChecker = lazy(() => import("./pages/OtherTools/CreditCardChecker"))
const CurrencyConverter = lazy(() => import("./pages/OtherTools/CurrencyConverter"))
const ColorPalette = lazy(() => import("./pages/OtherTools/ColorPalette"))
const CompoundInterestCalculator = lazy(() => import("./pages/OtherTools/CompoundInterestCalculator"))
const MortgageCalculator = lazy(() => import("./pages/OtherTools/MortgageCalculator"))
const ImageConverter = lazy(() => import("./pages/OtherTools/ImageConverter"))
const RobotsTxtGenerator = lazy(() => import("./pages/OtherTools/RobotsTxtGenerator"))
const JsonToCsv = lazy(() => import("./pages/TextTools/JsonToCsv"))
const GPACalculator = lazy(() => import("./pages/OtherTools/GPACalculator"))
const PasswordStrengthChecker = lazy(() => import("./pages/OtherTools/PasswordStrengthChecker"))
const SalaryConverter = lazy(() => import("./pages/OtherTools/SalaryConverter"))
const HtmlToMarkdown = lazy(() => import("./pages/TextTools/HtmlToMarkdown"))
const ImageCropper = lazy(() => import("./pages/OtherTools/ImageCropper"))
const AcronymGenerator = lazy(() => import("./pages/TextTools/AcronymGenerator"))
const GoalTracker = lazy(() => import("./pages/OtherTools/GoalTracker"))
const HabitTracker = lazy(() => import("./pages/OtherTools/HabitTracker"))
const IPAddressTool = lazy(() => import("./pages/OtherTools/IPAddressTool"))
const ContactForm = lazy(() => import("./pages/ContactForm"))
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"))
const CalorieCalculator = lazy(() => import("./pages/OtherTools/CalorieCalculator"))
const BMICalculator = lazy(() => import("./pages/OtherTools/BMICalculator"))
const ProgressConverter = lazy(() => import("./pages/OtherTools/ProgressConverter"))
const Calculator = lazy(() => import("./pages/OtherTools/Calculator"))
const TaxCalculator = lazy(() => import("./pages/OtherTools/TaxCalculator"))
const AgeCalculator = lazy(() => import("./pages/OtherTools/AgeCalculator"))
const RandomNumberGenerator = lazy(() => import("./pages/OtherTools/RandomNumberGenerator"))
const TimezoneConverter = lazy(() => import("./pages/OtherTools/TimezoneConverter"))
const PercentageCalculator = lazy(() => import("./pages/OtherTools/PercentageCalculator"))
const UnitConverter = lazy(() => import("./pages/OtherTools/UnitConverter"))
const CronGenerator = lazy(() => import("./pages/OtherTools/CronGenerator"))
const TextSplitter = lazy(() => import("./pages/TextTools/TextSplitter"))
const TextJoiner = lazy(() => import("./pages/TextTools/TextJoiner"))
const WhitespaceRemover = lazy(() => import("./pages/TextTools/WhitespaceRemover"))
const MarkdownPreview = lazy(() => import("./pages/TextTools/MarkdownPreview"))
const ImageToBase64 = lazy(() => import('./pages/OtherTools/ImageToBase64'))
const QRCodeGenerator = lazy(() => import('./pages/OtherTools/QRCodeGenerator'))
const PasswordGenerator = lazy(() => import('./pages/OtherTools/PasswordGenerator'))
const ColorPicker = lazy(() => import('./pages/OtherTools/ColorPicker'))
const Roulette = lazy(() => import('./pages/OtherTools/Roulette'))
const ImageGlitch = lazy(() => import('./pages/OtherTools/ImageGlitch'))
const ImageRotate = lazy(() => import('./pages/OtherTools/ImageRotate'))
const ImageFlip = lazy(() => import('./pages/OtherTools/ImageFlip'))
const Watermark = lazy(() => import('./pages/OtherTools/Watermark'))
const CodeFormatter = lazy(() => import("./pages/TextTools/CodeFormatter"))
const LoremIpsumAdvanced = lazy(() => import("./pages/TextTools/LoremIpsumAdvanced"))
const ExifRemover = lazy(() => import("./pages/OtherTools/ExifRemover"))
const ColorConverter = lazy(() => import("./pages/OtherTools/ColorConverter"))
const ImageMerge = lazy(() => import("./pages/OtherTools/ImageMerge"))
const ImageFlip = lazy(() => import('./pages/OtherTools/ImageFlip'))
const Watermark = lazy(() => import('./pages/OtherTools/Watermark'))
const CodeFormatter = lazy(() => import("./pages/TextTools/CodeFormatter"))
const LoremIpsumAdvanced = lazy(() => import("./pages/TextTools/LoremIpsumAdvanced"))
const ExifRemover = lazy(() => import("./pages/OtherTools/ExifRemover"))
const ColorConverter = lazy(() => import("./pages/OtherTools/ColorConverter"))
const ImageMerge = lazy(() => import("./pages/OtherTools/ImageMerge"))
const ImageCategory = lazy(() => import('./pages/Category/ImageCategory'))
const TextCategory = lazy(() => import('./pages/Category/TextCategory'))
const TimerCategory = lazy(() => import('./pages/Category/TimerCategory'))
const OtherCategory = lazy(() => import('./pages/Category/OtherCategory'))
const CameraSharing = lazy(() => import('./pages/Camera/CameraSharing'))
const CameraMode = lazy(() => import('./pages/Camera/CameraMode'))
const ViewerMode = lazy(() => import('./pages/Camera/ViewerMode'))

function App() {
  return (
    <Router>
      <ScrollToTop />
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
              <Route path="/image" element={<ImageCategory />} />
              <Route path="/text" element={<TextCategory />} />
              <Route path="/timer" element={<TimerCategory />} />
              <Route path="/other" element={<OtherCategory />} />
              <Route path="/stats" element={<UsageStats />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
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
              <Route path="/other/discount" element={<DiscountCalculator />} />
              <Route path="/timer/digital" element={<DigitalTimer />} />
              <Route path="/timer/stopwatch-tool" element={<StopwatchTool />} />
              <Route path="/other/date-calc" element={<DateCalculator />} />
              <Route path="/text/word-count" element={<WordCounter />} />
              <Route path="/other/image-compress" element={<ImageCompressor />} />
              <Route path="/other/image-resize" element={<ImageResizer />} />
              <Route path="/other/meta-tag" element={<MetaTagGenerator />} />
              <Route path="/other/card-check" element={<CreditCardChecker />} />
              <Route path="/other/currency" element={<CurrencyConverter />} />
              <Route path="/other/color-palette" element={<ColorPalette />} />
              <Route path="/other/compound-interest" element={<CompoundInterestCalculator />} />
              <Route path="/other/mortgage" element={<MortgageCalculator />} />
              <Route path="/other/image-convert" element={<ImageConverter />} />
              <Route path="/other/robots-txt" element={<RobotsTxtGenerator />} />
              <Route path="/text/json-to-csv" element={<JsonToCsv />} />
              <Route path="/other/gpa" element={<GPACalculator />} />
              <Route path="/other/password-check" element={<PasswordStrengthChecker />} />
              <Route path="/other/salary" element={<SalaryConverter />} />
              <Route path="/text/html-to-markdown" element={<HtmlToMarkdown />} />
              <Route path="/other/image-crop" element={<ImageCropper />} />
              <Route path="/text/acronym" element={<AcronymGenerator />} />
              <Route path="/other/goal-tracker" element={<GoalTracker />} />
              <Route path="/other/habit-tracker" element={<HabitTracker />} />
              <Route path="/other/ip-address" element={<IPAddressTool />} />
              <Route path="/text/diff" element={<TextDiff />} />
              <Route path="/other/calorie" element={<CalorieCalculator />} />
              <Route path="/other/bmi" element={<BMICalculator />} />
              <Route path="/other/progress" element={<ProgressConverter />} />
              <Route path="/other/calculator" element={<Calculator />} />
              <Route path="/other/tax" element={<TaxCalculator />} />
              <Route path="/other/age" element={<AgeCalculator />} />
              <Route path="/other/random-num" element={<RandomNumberGenerator />} />
              <Route path="/other/timezone" element={<TimezoneConverter />} />
              <Route path="/other/percentage" element={<PercentageCalculator />} />
              <Route path="/other/unit" element={<UnitConverter />} />
              <Route path="/other/cron" element={<CronGenerator />} />
              <Route path="/text/split" element={<TextSplitter />} />
              <Route path="/text/join" element={<TextJoiner />} />
              <Route path="/text/whitespace" element={<WhitespaceRemover />} />
              <Route path="/text/markdown" element={<MarkdownPreview />} />
              <Route path="/text/code-formatter" element={<CodeFormatter />} />
              <Route path="/text/lorem-ipsum-advanced" element={<LoremIpsumAdvanced />} />
              <Route path="/other/exif-remover" element={<ExifRemover />} />
              <Route path="/other/color-converter" element={<ColorConverter />} />
              <Route path="/other/image-base64" element={<ImageToBase64 />} />
              <Route path="/other/qrcode" element={<QRCodeGenerator />} />
              <Route path="/other/password" element={<PasswordGenerator />} />
              <Route path="/other/colorpicker" element={<ColorPicker />} />
              <Route path="/other/roulette" element={<Roulette />} />
              <Route path="/other/image-glitch" element={<ImageGlitch />} />
              <Route path="/other/image-rotate" element={<ImageRotate />} />
              <Route path="/other/image-flip" element={<ImageFlip />} />
              <Route path="/other/watermark" element={<Watermark />} />
              <Route path="/other/image-merge" element={<ImageMerge />} />
              <Route path="/other/watermark" element={<Watermark />} />
              <Route path="/other/image-merge" element={<ImageMerge />} />
              <Route path="/other/image-flip" element={<ImageFlip />} />
              <Route path="/other/watermark" element={<Watermark />} />
              <Route path="/other/image-merge" element={<ImageMerge />} />
              <Route path="/other/watermark" element={<Watermark />} />
              <Route path="/other/image-merge" element={<ImageMerge />} />
              <Route path="/camera" element={<CameraSharing />} />
              <Route path="/camera/mode" element={<CameraMode />} />
              <Route path="/camera/viewer" element={<ViewerMode />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <UpdatePrompt />
      </div>
    </Router>
  )
}

export default App
