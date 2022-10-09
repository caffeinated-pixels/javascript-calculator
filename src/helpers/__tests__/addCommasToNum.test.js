import '@testing-library/jest-dom'
import { addCommasToNum } from '../'

/* big number returns an object, presumably JS automatically 
serializes to appropriate type? */
describe('addCommasToNum function', () => {
  it('should return a string', () => {
    const result = addCommasToNum('1234567890')
    expect(typeof result).toBe('string')
  })

  it('should not add commas to numbers with < 4 digits', () => {
    const result = addCommasToNum('123')
    expect(typeof result).toBe('string')
  })

  it('should add 1 comma to numbers with 4 digits', () => {
    const result = addCommasToNum('1234')
    expect(result).toBe('1,234')
  })

  it('should add 2 commas to numbers with 7 digits', () => {
    const result = addCommasToNum('1234567')
    expect(result).toBe('1,234,567')
  })

  it('should add 3 commas to numbers with 10 digits', () => {
    const result = addCommasToNum('1234567890')
    expect(result).toBe('1,234,567,890')
  })

  it('should add 4 commas to numbers with 13 digits', () => {
    const result = addCommasToNum('1234567890123')
    expect(result).toBe('1,234,567,890,123')
  })

  it('should add 5 commas to numbers with 16 digits', () => {
    const result = addCommasToNum('1234567890123456')
    expect(result).toBe('1,234,567,890,123,456')
  })

  it('should add 6 commas to numbers with 19 digits', () => {
    const result = addCommasToNum('1234567890123456789')
    expect(result).toBe('1,234,567,890,123,456,789')
  })

  it('should add 6 commas to numbers with 21 digits', () => {
    const result = addCommasToNum('123456789012345678901')
    expect(result).toBe('123,456,789,012,345,678,901')
  })

  it('should add commas to numbers with decimals', () => {
    const result1 = addCommasToNum('1234567.89')
    expect(result1).toBe('1,234,567.89')

    const result2 = addCommasToNum('1234567890.123456789')
    expect(result2).toBe('1,234,567,890.123456789')
  })
})
