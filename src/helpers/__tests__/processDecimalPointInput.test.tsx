import { processDecimalPointInput } from '../processDecimalPointInput'

describe('processDecimalPointInput', () => {
  it('should return state if num of digits >= 21', () => {
    const state = {
      currVal: '123456789012345678901',
      formula: '123456789012345678901',
    }
    expect(processDecimalPointInput(state)).toStrictEqual(state)
  })

  it('should return state if sequential decimal points', () => {
    const state = {
      currVal: '2.',
      formula: '2.',
    }
    expect(processDecimalPointInput(state)).toStrictEqual(state)
  })

  it('should append with 0. if operator followed by decimal point', () => {
    const state = {
      currVal: '+',
      formula: '2+',
    }
    expect(processDecimalPointInput(state)).toStrictEqual({
      currVal: '0.',
      formula: '2+0.',
    })
  })

  it('should return 0. if very 1st input', () => {
    const state = {
      currVal: '0',
      formula: '',
    }
    expect(processDecimalPointInput(state)).toStrictEqual({
      currVal: '0.',
      formula: '0.',
    })
  })

  it('should add decimal to currVal', () => {
    const state = {
      currVal: '2',
      formula: '2',
    }
    expect(processDecimalPointInput(state)).toStrictEqual({
      currVal: '2.',
      formula: '2.',
    })
  })
})
