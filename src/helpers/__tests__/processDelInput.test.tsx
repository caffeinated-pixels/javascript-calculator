import { processDelInput } from '../processDelInput'
import { INITIAL_STATE } from '../../constants'

describe('processDelInput', () => {
  it('should return state if last input was an operator', () => {
    const state = {
      ...INITIAL_STATE,
      formula: '2+',
    }
    expect(processDelInput(state)).toStrictEqual(state)
  })

  it('should return state if currVal is answer', () => {
    const state = {
      ...INITIAL_STATE,
      curVal: '4',
      formula: '2+2=4',
      isCalcDone: true,
    }
    expect(processDelInput(state)).toStrictEqual(state)
  })

  it('should return 0 if currVal single digit', () => {
    const state = {
      ...INITIAL_STATE,
      currVal: '2',
      formula: '2',
      intFormula: '',
    }
    expect(processDelInput(state)).toStrictEqual({
      ...INITIAL_STATE,
      currVal: '0',
      formula: '',
      intFormula: '',
    })
  })

  it('should return 0 if currVal single negative digit', () => {
    const state = {
      ...INITIAL_STATE,
      currVal: '-2',
      formula: '-2',
      intFormula: '',
    }
    expect(processDelInput(state)).toStrictEqual({
      ...INITIAL_STATE,
      currVal: '0',
      formula: '',
      intFormula: '',
    })
  })

  it('should remove decimal point', () => {
    const state = {
      ...INITIAL_STATE,
      currVal: '2.',
      formula: '2.',
      intFormula: '',
    }
    expect(processDelInput(state)).toStrictEqual({
      ...INITIAL_STATE,
      currVal: '2',
      formula: '2',
      intFormula: '',
    })
  })

  it('should remove last digit', () => {
    const state = {
      ...INITIAL_STATE,
      currVal: '123',
      formula: '123',
      intFormula: '',
    }
    expect(processDelInput(state)).toStrictEqual({
      ...INITIAL_STATE,
      currVal: '12',
      formula: '12',
      intFormula: '',
    })
  })

  it('should remove commas', () => {
    const state = {
      ...INITIAL_STATE,
      currVal: '1,234',
      formula: '1,234',
      intFormula: '',
    }
    expect(processDelInput(state)).toStrictEqual({
      ...INITIAL_STATE,
      currVal: '123',
      formula: '123',
      intFormula: '',
    })
  })
})
