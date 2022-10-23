import { evaluateFormula } from '../'

/* big number returns an object, presumably JS automatically 
serializes to appropriate type? */
describe('evaluateFormula function', () => {
  it('should return a string number', () => {
    const result = evaluateFormula('2+2').toJSON()

    expect(result).toBe('4')
    expect(typeof result).toBe('string')
  })

  it('should perform 0.3-0.2 accurately', () => {
    const result = evaluateFormula('0.3-0.2').toJSON()

    expect(result).toStrictEqual('0.1')
  })

  it('should perform 2/7 accurately', () => {
    expect(evaluateFormula('2/7').toJSON()).toStrictEqual(
      '0.28571428571428571429'
    )
  })

  it('should follow BODMAS order for calculations', () => {
    expect(evaluateFormula('6+2*7').toJSON()).toStrictEqual('20') // not 50!
    expect(evaluateFormula('6+2*7/2').toJSON()).toStrictEqual('13') // not 28!
    expect(evaluateFormula('5-2+6/3').toJSON()).toStrictEqual('5') // not 3 or 1!
  })
})
