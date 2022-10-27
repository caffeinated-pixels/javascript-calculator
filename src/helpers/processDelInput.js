import { addCommasToNum } from './addCommasToNum'

export const processDelInput = (state) => {
  const endsInOperator = /[+\-*/]$/.test(state.formula)
  // do nothing if last input operator or currVal is an answer
  if (endsInOperator || state.isCalcDone) return { ...state }

  const singleNegDigit = /-\d$|^\d$/.test(state.currVal)
  // return '0' if currVal single digit eg -2 or 2
  if (singleNegDigit)
    return {
      ...state,
      currVal: '0',
      formula: state.intFormula,
    }

  const trimCurrVal = state.currVal.replace(/\.$|\d$/, '')
  const trimCurrValCommas = addCommasToNum(trimCurrVal)
  return {
    ...state,
    currVal: trimCurrValCommas,
    formula: state.intFormula + trimCurrValCommas,
  }
}
