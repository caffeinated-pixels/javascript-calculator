export const addCommasToNum = (input) => {
  const parts = input.replace(/,/g, '').toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

/* see https://stackoverflow.com/a/2901298/8958062 for explanation of the regex 
we remove the decimal places before using .replace() and stick back on after */
