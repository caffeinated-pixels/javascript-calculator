export const isMaxDigitLimit = (currVal: string) =>
  currVal.replace(/-|\.|,/g, '').length >= 21
