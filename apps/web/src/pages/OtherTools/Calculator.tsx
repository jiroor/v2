import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToolUsageTracking } from '@/hooks/useToolUsageTracking'
import { SEO } from '@/components/SEO/SEO'

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
      <SEO path="/other/calculator" />
      <div className="max-w-[320px] mx-auto py-8 px-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">計算機</h2>

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
      </div>
    </>
  )
}

export default Calculator
