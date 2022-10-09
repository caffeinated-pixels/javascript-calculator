import { useState, useEffect } from 'react'

import { Header, DisplayContainer, KeyPad, Footer } from './components'
import { addCommasToNum, appendOperator, evaluateFormula } from './helpers'

const initialState = {
  currVal: '0', // display value; appended to formula
  storeVal: '', // store currVal for displaying max digit warning
  formula: '', // display formula; intFormula + currVal
  intFormula: '', // only updated after operator or equals
  prevAns: '', // store answer for starting new calculation
  calcDone: false, // was last input equals key?
}

export default function App() {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    // add event listener for keypresses
    document.addEventListener('keydown', handleKeyPress)

    return () => document.removeEventListener('keydown', handleKeyPress)
  })

  // EVENT HANDLERS
  const handleNum = (input) => {
    // check if num of digits >= 21; maxDigitLimit returns boolean
    // pass in empty string to reset formula if entering new num when calcDone = true
    if (maxDigitLimit('')) return

    setState((prevState) => {
      // test whether previous input was operator
      const isOperator = /[+\-*/]$/.test(prevState.formula)

      // format number with commas
      const newCurrVal = addCommasToNum(prevState.currVal + input)

      if ((prevState.currVal === '0' && prevState.formula) || isOperator) {
        // for input following deletion of all digits
        // or for creating new num following operator
        return {
          ...prevState,
          currVal: input,
          formula: prevState.intFormula + input,
        }
      } else if (prevState.currVal === '0') {
        // for very first input when key press is 0 and intFormula empty
        return {
          ...prevState,
          currVal: input,
          formula: input,
          intFormula: '',
        }
      } else {
        // for adding to previous digit (expand num)
        return {
          ...prevState,
          currVal: newCurrVal,
          formula: prevState.intFormula + newCurrVal,
        }
      }
    })
  }

  const handleDecimal = () => {
    // check if num of digits >= 21; maxDigitLimit returns boolean
    // pass in '0' to reset formula if entering new float when calcDone = true
    if (maxDigitLimit('0')) return

    setState((prevState) => {
      // check to prevent sequential decimal points, ie 2..
      const containsDecimal = /\./.test(prevState.currVal)

      // check to prevent operator followed by decimal point, eg 2+.
      const endsInOperator = /[+\-*/]$/.test(prevState.formula)

      if (!prevState.formula || endsInOperator) {
        // if very 1st input, or if last input was operator
        return {
          ...prevState,
          currVal: '0.',
          formula: prevState.formula + '0.',
        }
      }

      if (!containsDecimal) {
        return {
          ...prevState,
          currVal: prevState.currVal + '.',
          formula: prevState.formula + '.',
        }
      }
    })
  }

  const handleOperator = (input) => {
    // need to check if previous calculation has been performed
    setState((prevState) => {
      if (prevState.calcDone) {
        return {
          ...prevState,
          currVal: '0',
          formula: '' + prevState.prevAns,
          intFormula: '' + prevState.prevAns,
          calcDone: false,
        }
      } else if (!prevState.formula) {
        return {
          ...prevState,
          formula: '0',
        }
      } else {
        return appendOperator(prevState, input)
      }
    })
  }

  const handlePosNeg = () => {
    setState((prevState) => {
      // is currVal an operator?
      const isOperator = /[+\-*/]$/.test(prevState.currVal)
      // is last value in intFormula an operator followed by minus eg "2+-"
      const multipleOp = /[+\-*/]-$/.test(prevState.intFormula)

      let newFormula // initialize for below

      if (isOperator || prevState.currVal === '0') return // do nothing

      const posNegVal = prevState.currVal.replace(
        /(^\b)|(^-)/,
        (match, p1, p2) => {
          if (match === p1) return '-' // prefix with minus
          if (match === p2) return '' // remove prefix
        }
      )

      if (prevState.calcDone) {
        return {
          ...prevState,
          currVal: posNegVal,
          formula: posNegVal,
          intFormula: '',
          calcDone: false,
        }
      } else if (multipleOp) {
        // remove minus symbol at end of formula so we don't end up with "2+--"
        newFormula = prevState.intFormula.replace(/([+\-*/])-$/, '$1')

        return {
          ...prevState,
          intFormula: newFormula,
          formula: newFormula + prevState.currVal,
        }
      } else {
        return {
          ...prevState,
          currVal: posNegVal,
          formula: prevState.intFormula + posNegVal,
        }
      }
    })
  }

  const handleEquals = () => {
    setState((prevState) => {
      if (prevState.calcDone) {
        // deal with spamming equals button
        return {
          ...prevState,
          currVal: '' + prevState.currVal,
          formula: '' + prevState.currVal,
          calcDone: true,
        }
      }

      if (!prevState.intFormula) {
        // for when formula consists of single number & no operator
        return { ...prevState }
      }

      const evaluateMe = prevState.formula.replace(
        // remove commas, convert (--) to (+)
        /(\D+$)|(,)|(--)/g,
        (match, p1, p2, p3) => {
          if (p1 || p2 === match) return ''
          if (p3 === match) return '+'
        }
      )

      // tidy up incomplete formulas for displaying after evaluation
      const tidyFormulaEnd = prevState.formula.replace(/\D+$/, '')

      const answer = evaluateFormula(evaluateMe)

      // deal with answer = Infinity
      const answerCommas = isFinite(answer)
        ? addCommasToNum(answer.toString())
        : 'Infinity'

      const newFormula = tidyFormulaEnd + '=' + answerCommas
      return {
        ...prevState,
        currVal: answerCommas,
        prevAns: answerCommas,
        formula: newFormula,
        calcDone: true,
      }
    })
  }

  const handleClear = () => {
    // reset state to original values
    setState(initialState)
  }

  const handleDel = () => {
    setState((prevState) => {
      const endsInOperator = /[+\-*/]$/.test(prevState.formula)
      // do nothing if last input operator or currVal is an answer
      if (endsInOperator || prevState.calcDone) return { ...prevState }

      const singleNegDigit = /-\d$|^\d$/.test(prevState.currVal)
      // return '0' if currVal single digit eg -2 or 2
      if (singleNegDigit)
        return {
          ...prevState,
          currVal: '0',
          formula: prevState.intFormula,
        }

      const trimCurrVal = prevState.currVal.replace(/\.$|\d$/, '')
      const trimCurrValCommas = addCommasToNum(trimCurrVal)
      return {
        ...prevState,
        currVal: trimCurrValCommas,
        formula: prevState.intFormula + trimCurrValCommas,
      }
    })
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

  // HELPER FUNCTIONS
  const maxDigitLimit = (input) => {
    /* get number of digits (remove "-", "." & "," before counting);
    JS switches to scientific notation at 22 digits (ie 1e+21), so limit set to 21 */
    const checkLength = state.currVal.replace(/-|\.|,/g, '').length >= 21

    // need to reset state if creating new num after answer
    if (state.calcDone) {
      setState((prevState) => {
        return {
          ...prevState,
          currVal: '0',
          formula: input,
          intFormula: '',
          calcDone: false,
        }
      })
      return false // return false for maxDigitLimit
    }

    // if warning already displayed we can return true
    if (state.currVal === 'Max Digits Reached!') return true

    // if < 21 we can return false and continue adding digits
    if (!checkLength) return false

    setState((prevState) => {
      // make a copy of currVal (avoids pass by ref) to be restored after limit message
      const storeMe = prevState.currVal.slice()
      return {
        ...prevState,
        currVal: 'Max Digits Reached!',
        storeVal: storeMe,
      }
    })

    // restore stored value to currVal after timeout
    setTimeout(
      () =>
        setState((prevState) => {
          const restoreMe = prevState.storeVal.slice()

          return { ...prevState, currVal: restoreMe, storeVal: '' }
        }),
      600
    )
    return true // return true for maxDigitLimit
  }

  return (
    <>
      <main className="calculator-body">
        <Header />
        <DisplayContainer
          currVal={state.currVal}
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
