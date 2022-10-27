import { appendOperator } from './appendOperator'

export const processOperatorInput = (state, input) => {
  // need to check if previous calculation has been performed

  return state.isCalcDone || state.formula
    ? appendOperator(state, input)
    : { ...state, formula: '0' }
}
