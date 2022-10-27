import { addCommasToNum, isMaxDigitLimit } from '.'

export const processNumInput = (state, input) => {
  if (state.isCalcDone)
    return {
      ...state,
      currVal: input,
      formula: input,
      intFormula: '',
      isCalcDone: false,
    }

  if (state.isMaxDigits) return { ...state }

  if (isMaxDigitLimit(state.currVal)) {
    return {
      ...state,
      isMaxDigits: true,
    }
  }

  // test whether previous input was operator
  const isOperator = /[+\-*/]$/.test(state.formula)

  // format number with commas
  const newCurrVal = addCommasToNum(state.currVal + input)

  if ((state.currVal === '0' && state.formula) || isOperator) {
    // for input following deletion of all digits
    // or for creating new num following operator
    return {
      ...state,
      currVal: input,
      formula: state.intFormula + input,
    }
  } else if (state.currVal === '0') {
    // for very first input when key press is 0 and intFormula empty
    return {
      ...state,
      currVal: input,
      formula: input,
      intFormula: '',
    }
  } else {
    // for adding to previous digit (expand num)
    return {
      ...state,
      currVal: newCurrVal,
      formula: state.intFormula + newCurrVal,
    }
  }
}
