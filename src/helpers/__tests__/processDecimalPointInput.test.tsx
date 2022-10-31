import { processDecimalPointInput } from '../processDecimalPointInput'
import { INITIAL_STATE } from '../../constants'

describe('processDecimalPointInput', () => {
  it('should return state if num of digits >= 21', () => {
    const state = {
      ...INITIAL_STATE,
      currVal: '123456789012345678901',
      formula: '123456789012345678901',
    }
    expect(processDecimalPointInput(state)).toStrictEqual(state)
  })

  it('should return state if sequential decimal points', () => {
    const state = {
      ...INITIAL_STATE,
      currVal: '2.',
      formula: '2.',
    }
    expect(processDecimalPointInput(state)).toStrictEqual(state)
  })

  it('should append with 0. if operator followed by decimal point', () => {
    const state = {
      ...INITIAL_STATE,
      currVal: '+',
      formula: '2+',
    }
    expect(processDecimalPointInput(state)).toStrictEqual({
      ...INITIAL_STATE,
      currVal: '0.',
      formula: '2+0.',
    })
  })

  it('should return 0. if very 1st input', () => {
    const state = {
      ...INITIAL_STATE,
      currVal: '0',
      formula: '',
    }
    expect(processDecimalPointInput(state)).toStrictEqual({
      ...INITIAL_STATE,
      currVal: '0.',
      formula: '0.',
    })
  })

  it('should add decimal to currVal', () => {
    const state = {
      ...INITIAL_STATE,
      currVal: '2',
      formula: '2',
    }
    expect(processDecimalPointInput(state)).toStrictEqual({
      ...INITIAL_STATE,
      currVal: '2.',
      formula: '2.',
    })
  })
})
