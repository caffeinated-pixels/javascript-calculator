import { processNumInput } from '../'

describe('processNumInput', () => {
  it('should return partially reset state if isCalcDone is true', () => {
    const state = {
      isCalcDone: true,
      currVal: '4',
      formula: '2+2=4',
    }

    const expectedResult = {
      isCalcDone: false,
      currVal: '8',
      formula: '8',
      intFormula: '',
    }

    expect(processNumInput(state, '8')).toStrictEqual(expectedResult)
  })

  it('should return state if isMaxDigits is true', () => {
    const state = {
      isMaxDigits: true,
      currVal: '123,456,789,012,345,678,901',
      formula: '123,456,789,012,345,678,901',
    }

    const result = processNumInput(state, '2')
    expect(result).toStrictEqual(state)
  })

  it('should return state with isMaxDigits set to true if input is 21 digits', () => {
    const state = {
      isMaxDigits: false,
      currVal: '123,456,789,012,345,678,901',
      formula: '123,456,789,012,345,678,901',
    }

    const expectedResult = {
      isMaxDigits: true,
      currVal: '123,456,789,012,345,678,901',
      formula: '123,456,789,012,345,678,901',
    }

    const result = processNumInput(state, '2')
    expect(result).toStrictEqual(expectedResult)
  })

  it('should not return zero if first input is not zero', () => {
    const state = {
      isMaxDigits: false,
      currVal: '0',
      formula: '',
      intFormula: '',
    }

    const expectedResult = {
      isMaxDigits: false,
      currVal: '6',
      formula: '6',
      intFormula: '',
    }

    const result = processNumInput(state, '6')
    expect(result).toStrictEqual(expectedResult)
  })

  it('should return zero if first input is zero', () => {
    const state = {
      isMaxDigits: false,
      currVal: '0',
      formula: '',
      intFormula: '',
    }

    const expectedResult = {
      isMaxDigits: false,
      currVal: '0',
      formula: '0',
      intFormula: '',
    }

    const result = processNumInput(state, '0')
    expect(result).toStrictEqual(expectedResult)
  })

  it('should not add multiple zeros to front of number', () => {
    const state = {
      isMaxDigits: false,
      currVal: '0',
      formula: '0',
      intFormula: '',
    }

    const expectedResult = {
      isMaxDigits: false,
      currVal: '0',
      formula: '0',
      intFormula: '',
    }

    const result = processNumInput(state, '0')
    expect(result).toStrictEqual(expectedResult)
  })

  it('should create a new number if previous input was an operator', () => {
    const state = {
      isMaxDigits: false,
      currVal: '+',
      formula: '5+',
      intFormula: '5+',
    }

    const expectedResult = {
      isMaxDigits: false,
      currVal: '5',
      formula: '5+5',
      intFormula: '5+',
    }

    const result = processNumInput(state, '5')
    expect(result).toStrictEqual(expectedResult)
  })
})
