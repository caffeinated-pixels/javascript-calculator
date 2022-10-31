import { useEffect } from 'react'
import { useAppState, Actions } from './hooks/useAppState'
import { Header, DisplayContainer, KeyPad, Footer } from './components'

import { INITIAL_STATE, MAX_DIGIT_WARNING } from './constants'

export default function App() {
  const { state, dispatch } = useAppState(INITIAL_STATE)

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    return () => document.removeEventListener('keydown', handleKeyPress)
  })

  if (state.isMaxDigits && !state.maxDigitTimerId) {
    const timerId = setTimeout(() => {
      dispatch({ type: Actions.CLEAR_WARNING })
    }, 600)
    dispatch({ type: Actions.TIMER_ID, payload: timerId })
  }

  const handleNum = (input: string) => {
    dispatch({ type: Actions.NUMBER, payload: input })
  }

  const handleDecimal = () => {
    dispatch({ type: Actions.DECIMAL })
  }

  const handleOperator = (input: string) => {
    dispatch({ type: Actions.OPERATOR, payload: input })
  }

  const handlePosNeg = () => {
    dispatch({ type: Actions.POS_NEG })
  }

  const handleEquals = () => {
    dispatch({ type: Actions.EQUALS })
  }

  const handleClear = () => {
    dispatch({ type: Actions.CLEAR })
  }

  const handleDel = () => {
    dispatch({ type: Actions.DEL })
  }

  const handleKeyPress = (event: KeyboardEvent) => {
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
