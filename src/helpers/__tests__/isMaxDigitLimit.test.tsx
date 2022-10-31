import { isMaxDigitLimit } from '../isMaxDigitLimit'

describe('isMaxDigitLimit', () => {
  it('should return false if the number is less than 21 digits', () => {
    const result = isMaxDigitLimit('12345678901234567890')

    expect(result).toBe(false)
  })

  it('should return true if the number is 21 digits', () => {
    const result = isMaxDigitLimit('123456789012345678901')

    expect(result).toBe(true)
  })

  it('should return true if the number is more than 21 digits', () => {
    const result = isMaxDigitLimit('1234567890123456789012')

    expect(result).toBe(true)
  })

  it('should return false if the number is less than 21 digits but contains a decimal point', () => {
    const result = isMaxDigitLimit('12345678901234567.123')

    expect(result).toBe(false)
  })

  it('should return true if the number is 21 digits but contains a decimal point', () => {
    const result = isMaxDigitLimit('123456789012345678901.123')

    expect(result).toBe(true)
  })

  it('should return true if the number is more than 21 digits but contains a decimal point', () => {
    const result = isMaxDigitLimit('1234567890123456789012.123')

    expect(result).toBe(true)
  })
})
