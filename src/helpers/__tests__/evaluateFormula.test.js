import '@testing-library/jest-dom'
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
})
