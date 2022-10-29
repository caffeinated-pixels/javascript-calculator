export const processPosNegInput = (state) => {
  // is currVal an operator?
  const isOperator = /[+\-*/]$/.test(state.currVal)

  if (isOperator || state.currVal === '0') return state

  const posNegVal = state.currVal.replace(/(^\b)|(^-)/, (match, p1, p2) => {
    if (match === p1) return '-' // prefix with minus
    if (match === p2) return '' // remove prefix
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
