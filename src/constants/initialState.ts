type AppState = {
  currVal: string // display value; appended to formula
  formula: string // display formula; intFormula + currVal
  intFormula: string // only updated after operator or equals
  prevAns: string // store answer for starting new calculation
  isCalcDone: boolean // was last input equals key?
  isMaxDigits: boolean // is currVal at max digits?
  maxDigitTimerId: number | null // timer id for max digits
}

export const INITIAL_STATE: AppState = {
  currVal: '0',
  formula: '',
  intFormula: '',
  prevAns: '',
  isCalcDone: false,
  isMaxDigits: false,
  maxDigitTimerId: null,
}
