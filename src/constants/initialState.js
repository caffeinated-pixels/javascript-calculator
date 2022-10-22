export const initialState = {
  currVal: '0', // display value; appended to formula
  storeVal: '', // store currVal for displaying max digit warning
  formula: '', // display formula; intFormula + currVal
  intFormula: '', // only updated after operator or equals
  prevAns: '', // store answer for starting new calculation
  calcDone: false, // was last input equals key?
}
