import { appendOperator } from '../'

const MOCK_INITIAL_STATE = {
  currVal: '0',
  formula: '',
  intFormula: '',
  prevAns: '',
  isCalcDone: false,
  isMaxDigits: false,
  maxDigitTimerId: null,
}

const MOCK_STATE_42 = {
  ...MOCK_INITIAL_STATE,
  currVal: '42',
  formula: '42',
}

describe('appendOperator function', () => {
  it('should append the multiply operator to the formula', () => {
    const result = appendOperator(MOCK_STATE_42, '*')

    expect(result.formula).toBe('42*')
  })

  it('should append the division operator to the formula', () => {
    const result = appendOperator(MOCK_STATE_42, '/')

    expect(result.formula).toBe('42/')
  })

  it('should append the plus operator to the formula', () => {
    const result = appendOperator(MOCK_STATE_42, '+')

    expect(result.formula).toBe('42+')
  })

  it('should append the minus operator to the formula', () => {
    const result = appendOperator(MOCK_STATE_42, '-')

    expect(result.formula).toBe('42-')
  })

  it('should handle incomplete decimals', () => {
    const result = appendOperator(
      { ...MOCK_INITIAL_STATE, currVal: '42.', formula: '42.' },
      '+'
    )

    expect(result.formula).toBe('42+')
  })

  it('should not return a double operator', () => {
    const result = appendOperator(
      { ...MOCK_INITIAL_STATE, currVal: '*', formula: '42*' },
      '+'
    )

    expect(result.formula).toBe('42+')
  })

  it('should handle double negatives', () => {
    const result = appendOperator(
      { ...MOCK_INITIAL_STATE, currVal: '*', formula: '42*' },
      '+'
    )

    expect(result.formula).toBe('42+')
  })

  it('should be able to use previous answer for next calculation', () => {
    const result = appendOperator(
      {
        ...MOCK_INITIAL_STATE,
        prevAns: '2',
        isCalcDone: true,
      },
      '+'
    )

    expect(result.formula).toBe('2+')
    expect(result.currVal).toBe('+')
  })
})
