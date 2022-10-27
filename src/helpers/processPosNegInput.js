export const processPosNegInput = (state) => {
  // is currVal an operator?
  const isOperator = /[+\-*/]$/.test(state.currVal)
  // is last value in intFormula an operator followed by minus eg "2+-"
  const multipleOp = /[+\-*/]-$/.test(state.intFormula)

  let newFormula // initialize for below

  if (isOperator || state.currVal === '0') return // do nothing

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
  } else if (multipleOp) {
    // remove minus symbol at end of formula so we don't end up with "2+--"
    newFormula = state.intFormula.replace(/([+\-*/])-$/, '$1')

    return {
      ...state,
      intFormula: newFormula,
      formula: newFormula + state.currVal,
    }
  } else {
    return {
      ...state,
      currVal: posNegVal,
      formula: state.intFormula + posNegVal,
    }
  }
}
