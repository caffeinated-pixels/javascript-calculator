import { AppState } from '../constants'

export const processPosNegInput = (state: AppState) => {
  // is currVal an operator?
  const isOperator = /[+\-*/]$/.test(state.currVal)

  if (isOperator || state.currVal === '0') return state

  const posNegVal = state.currVal.replace(/(^\b)|(^-)/, (match, p1) => {
    // either prefix with minus or remove minus
    return match === p1 ? '-' : ''
  })

  if (state.isCalcDone) {
    return {
      ...state,
      currVal: posNegVal,
      formula: posNegVal,
      intFormula: '',
      isCalcDone: false,
    }
  } else {
    return {
      ...state,
      currVal: posNegVal,
      formula: state.intFormula + posNegVal,
    }
  }
}
