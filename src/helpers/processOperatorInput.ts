import { appendOperator } from './appendOperator'
import { AppState } from '../constants'

export const processOperatorInput = (state: AppState, input: string) => {
  return state.formula
    ? appendOperator(state, input)
    : { ...state, formula: '0' }
}
