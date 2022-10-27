import { evaluateFormula, addCommasToNum } from './'

export const processEqualsInput = (state) => {
  if (state.isCalcDone) {
    // deal with spamming equals button
    return {
      ...state,
      currVal: '' + state.currVal,
      formula: '' + state.currVal,
      isCalcDone: true,
    }
  }

  if (!state.intFormula) {
    // for when formula consists of single number & no operator
    return { ...state }
  }

  const evaluateMe = state.formula.replace(
    // remove commas, convert (--) to (+)
    /(\D+$)|(,)|(--)/g,
    (match, p1, p2, p3) => {
      if (p1 || p2 === match) return ''
      if (p3 === match) return '+'
    }
  )

  // tidy up incomplete formulas for displaying after evaluation
  const tidyFormulaEnd = state.formula.replace(/\D+$/, '')

  const answer = evaluateFormula(evaluateMe)

  // deal with answer = Infinity
  const answerCommas = isFinite(answer)
    ? addCommasToNum(answer.toString())
    : 'Infinity'

  const newFormula = tidyFormulaEnd + '=' + answerCommas
  return {
    ...state,
    currVal: answerCommas,
    prevAns: answerCommas,
    formula: newFormula,
    isCalcDone: true,
  }
}
