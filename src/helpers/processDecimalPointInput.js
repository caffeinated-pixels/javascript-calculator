import { isMaxDigitLimit } from './isMaxDigitLimit'

export const processDecimalPointInput = (state) => {
  // check if num of digits >= 21; maxDigitLimit returns boolean
  // pass in '0' to reset formula if entering new float when calcDone = true
  if (isMaxDigitLimit(state.currVal)) return state

  // check to prevent sequential decimal points, ie 2..
  const containsDecimal = /\./.test(state.currVal)
  if (containsDecimal) return state

  // check to prevent operator followed by decimal point, eg 2+.
  const endsInOperator = /[+\-*/]$/.test(state.formula)

  if (!state.formula || endsInOperator) {
    // if very 1st input, or if last input was operator
    return {
      ...state,
      currVal: '0.',
      formula: state.formula + '0.',
    }
  }

  // else add decimal to currVal
  return {
    ...state,
    currVal: state.currVal + '.',
    formula: state.formula + '.',
  }
}
