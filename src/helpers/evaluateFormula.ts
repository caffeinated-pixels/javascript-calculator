import BigNumber from 'bignumber.js'

type Calculate = (a: BigNumber, op: string, b: BigNumber) => any

const calculate: Calculate = (a, op, b) => {
  switch (op) {
    case '+':
      return a.plus(b).sd(21).toString()
    case '-':
      return a.minus(b).sd(21).toString()
    case '/':
      return a.dividedBy(b).sd(21).toString()
    case '*':
      return a.multipliedBy(b).sd(21).toString()
    default:
      return
  }
}

export const evaluateFormula = (input: string) => {
  const regArr = ['*/', '+-'] // for building regexes below
  let output = '' // for storing output of iterations

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

      const match = input.match(re) as RegExpMatchArray // for access to capture groups

      // send matched operations to function below
      output = calculate(BigNumber(match[1]), match[2], BigNumber(match[3]))
      const outputAsNum = Number(output)

      if (isNaN(outputAsNum) || !isFinite(outputAsNum)) return output // exit early if NaN or ∞
      input = input.replace(re, output) // replace matched operation for output result
    }
  }

  // covers incomplete formula, eg "2+" or "2+2*"
  return output ? output : input
}
