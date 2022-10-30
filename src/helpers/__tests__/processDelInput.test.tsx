import { processDelInput } from '../processDelInput'

describe('processDelInput', () => {
  it('should return state if last input was an operator', () => {
    const state = {
      formula: '2+',
    }
    expect(processDelInput(state)).toStrictEqual(state)
  })

  it('should return state if currVal is answer', () => {
    const state = {
      curVal: '4',
      formula: '2+2=4',
      isCalcDone: true,
    }
    expect(processDelInput(state)).toStrictEqual(state)
  })

  it('should return 0 if currVal single digit', () => {
    const state = {
      currVal: '2',
      formula: '2',
      intFormula: '',
    }
    expect(processDelInput(state)).toStrictEqual({
      currVal: '0',
      formula: '',
      intFormula: '',
    })
  })

  it('should return 0 if currVal single negative digit', () => {
    const state = {
      currVal: '-2',
      formula: '-2',
      intFormula: '',
    }
    expect(processDelInput(state)).toStrictEqual({
      currVal: '0',
      formula: '',
      intFormula: '',
    })
  })

  it('should remove decimal point', () => {
    const state = {
      currVal: '2.',
      formula: '2.',
      intFormula: '',
    }
    expect(processDelInput(state)).toStrictEqual({
      currVal: '2',
      formula: '2',
      intFormula: '',
    })
  })

  it('should remove last digit', () => {
    const state = {
      currVal: '123',
      formula: '123',
      intFormula: '',
    }
    expect(processDelInput(state)).toStrictEqual({
      currVal: '12',
      formula: '12',
      intFormula: '',
    })
  })

  it('should remove commas', () => {
    const state = {
      currVal: '1,234',
      formula: '1,234',
      intFormula: '',
    }
    expect(processDelInput(state)).toStrictEqual({
      currVal: '123',
      formula: '123',
      intFormula: '',
    })
  })
})
