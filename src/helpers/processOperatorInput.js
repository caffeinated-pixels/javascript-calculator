import { appendOperator } from './appendOperator'

export const processOperatorInput = (state, input) => {
  return state.formula
    ? appendOperator(state, input)
    : { ...state, formula: '0' }
}
