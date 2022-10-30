import { AppState } from '../constants'

const appendNonMinusOperator = (formula: string, input: string) => {
  return formula.replace(
    /\b$|([+\-*/.]+$)/,
    input
    // appends last digit with curr operator (input);
    // or, if ends in operator or decpoint, replace with input
  )
}

const appendMinusOperator = (formula: string, input: string) => {
  return formula.replace(
    /\b$|([+\-*/.]+$)/,
    input
    // appends last digit with curr operator (input);
    // or, if ends in operator or decpoint, replace with input
  )
}

export const appendOperator = (state: AppState, input: string): AppState => {
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
      ? appendNonMinusOperator(newState.formula, input)
      : appendMinusOperator(newState.formula, input)

  return {
    ...newState,
    currVal: input,
    formula: newFormula,
    intFormula: newFormula,
  }
}
