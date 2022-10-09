export const appendOperator = (prevState, input) => {
  let newFormula // initialize variable

  if (input !== '-') {
    newFormula = prevState.formula.replace(
      // /((?<=[^+\-*/.])$)|([+\-*/.]+$)/,
      /\b$|([+\-*/.]+$)/,
      input
      // appends last digit with curr operator (input); or, if ends in operator or decpoint, replace with input
    )
  } else {
    // ie if(input === '-')
    newFormula = prevState.formula.replace(
      // /((?<=[^+\-*/.])$)|(?<=\d[+\-*/.]?$)/,
      /(\d)$|([+\-*/.]?$)/,
      '$1$2' + input
      // appends last digit with minus (input); or, appends prev operator (max of 1) with minus eg "2+-" or "2*-"
    )
  }

  return {
    ...prevState,
    currVal: input,
    formula: newFormula,
    intFormula: newFormula,
  }
}
