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

export const appendOperator = (prevState, input) => {
  const newState = prevState.calcDone
    ? {
        ...prevState,
        currVal: '0',
        formula: '' + prevState.prevAns,
        intFormula: '' + prevState.prevAns,
        calcDone: false,
      }
    : { ...prevState }

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
