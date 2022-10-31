import { evaluateFormula } from '../'

describe('evaluateFormula function', () => {
  it('should return a string number', () => {
    const result = evaluateFormula('2+2')

    expect(result).toBe('4')
    expect(typeof result).toBe('string')
  })

  it('should perform 0.3-0.2 accurately', () => {
    const result = evaluateFormula('0.3-0.2')

    expect(result).toStrictEqual('0.1')
  })

  it('should perform 2/7 accurately', () => {
    expect(evaluateFormula('2/7')).toStrictEqual('0.28571428571428571429')
  })

  it('should follow BODMAS order for calculations', () => {
    expect(evaluateFormula('6+2*7')).toStrictEqual('20') // not 50!
    expect(evaluateFormula('6+2*7/2')).toStrictEqual('13') // not 28!
    expect(evaluateFormula('5-2+6/3')).toStrictEqual('5') // not 3 or 1!
  })

  it('should return the input for incomplete formulas', () => {
    expect(evaluateFormula('2')).toStrictEqual('2')
  })

  it('should be able to return infinity', () => {
    expect(evaluateFormula('50/0')).toStrictEqual('Infinity')
  })

  it('should return inputs that include infinity', () => {
    expect(evaluateFormula('Infinity+5')).toStrictEqual('Infinity+5')
  })
})
