import BigNumber from 'bignumber.js'

const calculate = (a, op, b) => {
  // perform the correct operation
  switch (op) {
    case '+':
      return a.plus(b).sd(21)
    case '-':
      return a.minus(b).sd(21)
    case '/':
      return a.dividedBy(b).sd(21)
    case '*':
      return a.multipliedBy(b).sd(21)
    default:
      return
  }
}

export const evaluateFormula = (input) => {
  const regArr = ['*/', '+-'] // for building regexes below
  let output // for storing output of iterations

  for (let i = 0; i < regArr.length; i++) {
    // loop through regexes: 1st iteration = mult/div; 2nd iteration = add/sub

    const re = new RegExp(
      '(-?\\d+\\.*\\d*e\\+\\d+|-?\\d+\\.?\\d*)([\\' +
        regArr[i] +
        '])(-?\\d+\\.?\\d*)'
    )
    // regex looks for operators between floats, integers or exponentials (1e+24)
    // Blackslashes are the escape character in strings so we need to escape them with a double blackslash (\\)

    while (input.match(re)) {
      // stops when no more matching operations; so we do all the mult/div operations first, then back to the for loop above to start the add/sub operations

      const match = input.match(re) // for access to capture groups

      // send matched operations to function below
      output = calculate(BigNumber(match[1]), match[2], BigNumber(match[3]))

      if (isNaN(output) || !isFinite(output)) return output // exit early if NaN or ∞
      input = input.replace(re, output) // replace matched operation for output result
    }
  }

  // if output falsy, return the input (covers incomplete formula, eg "2+")
  return output ? output : input
}
