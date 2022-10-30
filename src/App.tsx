import { useEffect } from 'react'
import { useAppState, ActionTypes } from './hooks/useAppState'
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
      dispatch({ type: ActionTypes.CLEAR_WARNING })
    }, 600)
    dispatch({ type: ActionTypes.TIMER_ID, payload: timerId })
  }

  const handleNum = (input) => {
    dispatch({ type: ActionTypes.NUMBER, payload: input })
  }

  const handleDecimal = () => {
    dispatch({ type: ActionTypes.DECIMAL })
  }

  const handleOperator = (input) => {
    dispatch({ type: ActionTypes.OPERATOR, payload: input })
  }

  const handlePosNeg = () => {
    dispatch({ type: ActionTypes.POS_NEG })
  }

  const handleEquals = () => {
    dispatch({ type: ActionTypes.EQUALS })
  }

  const handleClear = () => {
    dispatch({ type: ActionTypes.CLEAR })
  }

  const handleDel = () => {
    dispatch({ type: ActionTypes.DEL })
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
