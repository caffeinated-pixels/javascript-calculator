import { processEqualsInput, evaluateFormula } from '../'
import { INITIAL_STATE } from '../../constants'

jest.mock('../evaluateFormula')

const mockEvaluateFormula = evaluateFormula as jest.Mock

describe('processEqualsInput', () => {
  it('should return state if isCalcDone is true', () => {
    const state = {
      ...INITIAL_STATE,
      isCalcDone: true,
      currVal: '4',
      formula: '2+2=4',
    }

    const expectedResult = {
      ...INITIAL_STATE,
      isCalcDone: true,
      currVal: '4',
      formula: '4',
    }

    expect(processEqualsInput(state)).toStrictEqual(expectedResult)
    expect(processEqualsInput(expectedResult)).toStrictEqual(expectedResult)
  })

  it('should return state if intFormula is falsy', () => {
    const state = {
      ...INITIAL_STATE,
      isCalcDone: false,
      intFormula: '',
      currVal: '2',
      formula: '2',
    }

    const result = processEqualsInput(state)

    expect(result).toEqual(state)
  })

  it('should call evaluate formula with cleaned up formula', () => {
    const state = {
      ...INITIAL_STATE,
      isCalcDone: false,
      intFormula: '2+',
      currVal: '2',
      formula: '2+1,234.1',
    }

    processEqualsInput(state)

    expect(mockEvaluateFormula).toHaveBeenCalledWith('2+1234.1')
  })

  it('should convert double minus to plus', () => {
    const state = {
      ...INITIAL_STATE,
      isCalcDone: false,
      intFormula: '2-',
      currVal: '-2',
      formula: '2--2',
    }

    processEqualsInput(state)

    expect(mockEvaluateFormula).toHaveBeenCalledWith('2+2')
  })

  it('should return state with update values', () => {
    const state = {
      ...INITIAL_STATE,
      isCalcDone: false,
      intFormula: '2+',
      currVal: '2',
      formula: '2+2',
      prevAns: '',
    }

    mockEvaluateFormula.mockReturnValue('4')

    const result = processEqualsInput(state)

    expect(result).toStrictEqual({
      ...state,
      currVal: '4',
      prevAns: '4',
      formula: '2+2=4',
      isCalcDone: true,
    })
  })

  it('should be able to return Infinity', () => {
    const state = {
      ...INITIAL_STATE,
      isCalcDone: false,
      intFormula: '50/',
      currVal: '0',
      formula: '50/0',
      prevAns: '',
    }

    mockEvaluateFormula.mockReturnValue('Infinity')

    const result = processEqualsInput(state)

    expect(result).toStrictEqual({
      ...state,
      currVal: 'Infinity',
      formula: '50/0=Infinity',
      intFormula: '50/',
      prevAns: 'Infinity',
      isCalcDone: true,
    })
  })
})
