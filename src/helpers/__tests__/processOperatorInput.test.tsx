import { processOperatorInput, appendOperator } from '../'
import { INITIAL_STATE } from '../../constants'

jest.mock('../appendOperator')

const mockAppendOperator = appendOperator

describe('processOperatorInput', () => {
  it('should call appendOperator if formula is truthy', () => {
    const state = {
      ...INITIAL_STATE,
      currVal: '4',
      formula: '2+2=4',
      intFormula: '2+',
      prevAns: '4',
    }

    processOperatorInput(state, '+')

    expect(mockAppendOperator).toHaveBeenCalledWith(state, '+')
  })

  it('should return state is formula is falsy', () => {
    const state = {
      ...INITIAL_STATE,
      currVal: '0',
      formula: '',
      intFormula: '',
      prevAns: '',
    }

    const expectedResult = {
      ...state,
      currVal: '0',
      formula: '0',
    }

    const result = processOperatorInput(state, '+')

    expect(mockAppendOperator).not.toHaveBeenCalled()
    expect(result).toStrictEqual(expectedResult)
  })
})
