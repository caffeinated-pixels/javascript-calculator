import { processPosNegInput } from '../processPosNegInput'

describe('processPosNegInput', () => {
  it('should return state if currVal is an operator', () => {
    const state = {
      currVal: '+',
      formula: '2+',
      intFormula: '2+',
      isCalcDone: false,
    }

    const result = processPosNegInput(state)

    expect(result).toStrictEqual(state)
  })

  it('should return state if currVal is 0', () => {
    const state = {
      currVal: '0',
      formula: '2+',
      intFormula: '2+',
    }

    const result = processPosNegInput(state)

    expect(result).toStrictEqual(state)
  })

  it('should return state with currVal prefixed with minus if currVal is not an operator or 0', () => {
    const state = {
      currVal: '2',
      formula: '2+',
      intFormula: '2+',
    }

    const expectedResult = {
      ...state,
      currVal: '-2',
      formula: '2+-2',
    }

    const result = processPosNegInput(state)

    expect(result).toStrictEqual(expectedResult)
  })

  it('should remove minus from negative number', () => {
    const state = {
      currVal: '-2',
      formula: '-2',
      intFormula: '',
    }

    const expectedResult = {
      ...state,
      currVal: '2',
      formula: '2',
    }

    const result = processPosNegInput(state)

    expect(result).toStrictEqual(expectedResult)
  })
})
