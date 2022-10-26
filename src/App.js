import { useEffect } from 'react'
import { useAppState } from './hooks/useAppState'
import { Header, DisplayContainer, KeyPad, Footer } from './components'

import { INITIAL_STATE, MAX_DIGIT_WARNING } from './constants'

export default function App() {
  const [state, dispatch] = useAppState(INITIAL_STATE)

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    return () => document.removeEventListener('keydown', handleKeyPress)
  })

  if (state.isMaxDigits && !state.maxDigitTimerId) {
    const timerId = setTimeout(() => {
      dispatch({ type: 'CLEAR_MAX_DIGIT_WARNING' })
    }, 600)
    dispatch({ type: 'SET_MAX_DIGIT_TIMER_ID', payload: timerId })
  }

  const handleNum = (input) => {
    dispatch({ type: 'PROCESS_NUM', payload: input })
  }

  const handleDecimal = () => {
    dispatch({ type: 'PROCESS_DECIMAL_POINT' })
  }

  const handleOperator = (input) => {
    dispatch({ type: 'PROCESS_OPERATOR', payload: input })
  }

  const handlePosNeg = () => {
    dispatch({ type: 'PROCESS_POS_NEG' })
  }

  const handleEquals = () => {
    dispatch({ type: 'PROCESS_EQUALS' })
  }

  const handleClear = () => {
    dispatch({ type: 'PROCESS_CLEAR' })
  }

  const handleDel = () => {
    dispatch({ type: 'PROCESS_DEL' })
  }

  const handleKeyPress = (event) => {
    const testIfNum = /^\d/.test(event.key)
    const testIfDec = /\./.test(event.key)
    const testIfOp = /[+\-*/]/.test(event.key)
    const testIfEqOrEntr = /enter|=/i.test(event.key)
    const testIfBackspace = /backspace/i.test(event.key)
    const testIfClear = /delete/i.test(event.key)

    if (testIfNum) return handleNum(event.key)
    if (testIfDec) return handleDecimal()
    if (testIfOp) return handleOperator(event.key)
    if (testIfEqOrEntr) return handleEquals()
    if (testIfBackspace) return handleDel()
    if (testIfClear) return handleClear()
  }

  return (
    <>
      <main className="calculator-body">
        <Header />
        <DisplayContainer
          currVal={state.isMaxDigits ? MAX_DIGIT_WARNING : state.currVal}
          formulaDisplay={state.formula}
        />
        <KeyPad
          handleNum={handleNum}
          handleDecimal={handleDecimal}
          handleOperator={handleOperator}
          handlePosNeg={handlePosNeg}
          handleEquals={handleEquals}
          handleClear={handleClear}
          handleDel={handleDel}
        />
      </main>
      <Footer />
    </>
  )
}
