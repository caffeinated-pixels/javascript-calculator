const appendNonMinusOperator = (newState, input) => {
  return newState.formula.replace(
    /\b$|([+\-*/.]+$)/,
    input
    // appends last digit with curr operator (input);
    // or, if ends in operator or decpoint, replace with input
  )
}

const appendMinusOperator = (newState, input) => {
  return newState.formula.replace(
    /\b$|([+\-*/.]+$)/,
    input
    // appends last digit with curr operator (input);
    // or, if ends in operator or decpoint, replace with input
  )
}

export const appendOperator = (state, input) => {
  const newState = state.isCalcDone
    ? {
        ...state,
        currVal: '0',
        formula: '' + state.prevAns,
        intFormula: '' + state.prevAns,
        isCalcDone: false,
      }
    : { ...state }

  const newFormula =
    input !== '-'
      ? appendNonMinusOperator(newState, input)
      : appendMinusOperator(newState, input)

  return {
    ...newState,
    currVal: input,
    formula: newFormula,
    intFormula: newFormula,
  }
}
