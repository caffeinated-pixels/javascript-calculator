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

  let newFormula // initialize variable

  if (input !== '-') {
    newFormula = newState.formula.replace(
      // /((?<=[^+\-*/.])$)|([+\-*/.]+$)/,
      /\b$|([+\-*/.]+$)/,
      input
      // appends last digit with curr operator (input); or, if ends in operator or decpoint, replace with input
    )
  } else {
    // ie if(input === '-')
    newFormula = newState.formula.replace(
      // /((?<=[^+\-*/.])$)|(?<=\d[+\-*/.]?$)/,
      /(\d)$|([+\-*/.]?$)/,
      '$1$2' + input
      // appends last digit with minus (input); or, appends prev operator (max of 1) with minus eg "2+-" or "2*-"
    )
  }

  return {
    ...newState,
    currVal: input,
    formula: newFormula,
    intFormula: newFormula,
  }
}
