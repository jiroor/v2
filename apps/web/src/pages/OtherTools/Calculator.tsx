import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'
import { ToolHeader } from '@/components/ToolHeader'
import AdBanner from '@/components/Ads/AdBanner'

function Calculator() {
  useToolUsageTracking('/other/calculator', '計算機')
  const [display, setDisplay] = useState('0')
  const [firstOperand, setFirstOperand] = useState<number | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForSecond, setWaitingForSecond] = useState(false)

  const inputDigit = (digit: string) => {
    if (waitingForSecond) {
      setDisplay(digit)
      setWaitingForSecond(false)
    } else {
      setDisplay(display === '0' ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForSecond) {
      setDisplay('0.')
      setWaitingForSecond(false)
      return
    }
    if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecond(false)
  }

  const toggleSign = () => {
    setDisplay(String(-parseFloat(display)))
  }

  const inputPercent = () => {
    setDisplay(String(parseFloat(display) / 100))
  }

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display)

    if (firstOperand === null) {
      setFirstOperand(inputValue)
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator)
      setDisplay(String(result))
      setFirstOperand(result)
    }

    setWaitingForSecond(true)
    setOperator(nextOperator)
  }

  const calculate = (first: number, second: number, op: string): number => {
    switch (op) {
      case '+':
        return first + second
      case '-':
        return first - second
      case '*':
        return first * second
      case '/':
        return second !== 0 ? first / second : 0
      default:
        return second
    }
  }

  const handleEquals = () => {
    if (operator && firstOperand !== null) {
      const result = calculate(firstOperand, parseFloat(display), operator)
      setDisplay(String(result))
      setFirstOperand(null)
      setOperator(null)
      setWaitingForSecond(false)
    }
  }

  const buttonClass = 'h-14 text-xl font-semibold rounded-md transition-colors'

  return (
    <>
      <SEO path="/other/calculator" title="計算機" description="無料のオンライン電卓。四則演算からパーセント計算まで対応。シンプルで使いやすい計算機。" />
      <div className="max-w-[320px] mx-auto py-8 px-4">
        <ToolHeader title="計算機" toolPath="/other/calculator" shareTitle="計算機 | Rakit" />

        <div className="bg-gray-100 border border-gray-200 rounded-md p-4 mb-4 text-right">
          <p className="text-3xl font-mono font-bold overflow-x-auto">
            {display.length > 12 ? parseFloat(display).toExponential(6) : display}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <Button variant="outline" className={buttonClass} onClick={clear}>C</Button>
          <Button variant="outline" className={buttonClass} onClick={toggleSign}>±</Button>
          <Button variant="outline" className={buttonClass} onClick={inputPercent}>%</Button>
          <Button variant="default" className={buttonClass} onClick={() => performOperation('/')}>÷</Button>

          <Button variant="secondary" className={buttonClass} onClick={() => inputDigit('7')}>7</Button>
          <Button variant="secondary" className={buttonClass} onClick={() => inputDigit('8')}>8</Button>
          <Button variant="secondary" className={buttonClass} onClick={() => inputDigit('9')}>9</Button>
          <Button variant="default" className={buttonClass} onClick={() => performOperation('*')}>x</Button>

          <Button variant="secondary" className={buttonClass} onClick={() => inputDigit('4')}>4</Button>
          <Button variant="secondary" className={buttonClass} onClick={() => inputDigit('5')}>5</Button>
          <Button variant="secondary" className={buttonClass} onClick={() => inputDigit('6')}>6</Button>
          <Button variant="default" className={buttonClass} onClick={() => performOperation('-')}>-</Button>

          <Button variant="secondary" className={buttonClass} onClick={() => inputDigit('1')}>1</Button>
          <Button variant="secondary" className={buttonClass} onClick={() => inputDigit('2')}>2</Button>
          <Button variant="secondary" className={buttonClass} onClick={() => inputDigit('3')}>3</Button>
          <Button variant="default" className={buttonClass} onClick={() => performOperation('+')}>+</Button>

          <Button variant="secondary" className={`${buttonClass} col-span-2`} onClick={() => inputDigit('0')}>0</Button>
          <Button variant="secondary" className={buttonClass} onClick={inputDecimal}>.</Button>
          <Button variant="default" className={buttonClass} onClick={handleEquals}>=</Button>
        </div>

        {/* このツールについて */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">このツールについて</h3>
          <p className="text-sm text-gray-600 mb-4">
            電卓は、基本的な四則演算を行う無料のオンラインツールです。加減乗除、パーセント計算、符号反転に対応しています。日常的な計算や簡単な算数に役立ちます。
          </p>
        </div>

        {/* 特徴 */}
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">特徴</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 四則演算に対応</li>
            <li>• パーセント計算</li>
            <li>• 小数点の計算</li>
            <li>• 完全無料、ブラウザ上で動作</li>
          </ul>
        </div>

        {/* よくある質問 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">よくある質問</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium">Q. 0で割るとどうなりますか？</p>
              <p>A. エラーにならず、0として表示されます。</p>
            </div>
            <div>
              <p className="font-medium">Q. 履歴は保存されますか？</p>
              <p>A. いいえ、ページを閉じるとリセットされます。</p>
            </div>
          </div>
        </div>
      </div>
      {/* 広告 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <AdBanner slot="TOOL_BOTTOM" format="rectangle" />
      </div>
    </>
  )
}

export default Calculator
