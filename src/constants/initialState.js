export const INITIAL_STATE = {
  currVal: '0', // display value; appended to formula
  formula: '', // display formula; intFormula + currVal
  intFormula: '', // only updated after operator or equals
  prevAns: '', // store answer for starting new calculation
  calcDone: false, // was last input equals key?
  isMaxDigits: false, // is currVal at max digits?
  maxDigitTimerId: null, // timer id for max digit warning
}
