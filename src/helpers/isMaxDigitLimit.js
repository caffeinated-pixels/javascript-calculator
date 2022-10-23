export const isMaxDigitLimit = (currVal) =>
  currVal.replace(/-|\.|,/g, '').length >= 21
