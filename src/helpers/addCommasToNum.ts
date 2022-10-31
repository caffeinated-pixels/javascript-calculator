export const addCommasToNum = (input: string) => {
  const parts = input.replace(/,/g, '').toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}
// TODO: could this be handled with bignumber.js toFormat method?
/**
 * see https://stackoverflow.com/a/2901298/8958062 for explanation of the regex
 * we remove the decimal places before using .replace() and stick back on after
 */
