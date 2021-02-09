import React, { Component } from 'react'

// TODO: save regex to variables?
export default class App extends Component {
  state = {
    currVal: '0', // display value; appended to formula
    storeVal: '', // store currVal for displaying max digit warning
    formula: '', // display formula; intFormula + currVal
    intFormula: '', // only updated after operator or equals
    prevAns: '', // store answer for starting new calculation
    calcDone: false // has user clicked equals key?
  }

  componentDidMount = () => {
    // add event listener for keypresses
    document.addEventListener('keydown', this.handleKeyPress)
  }

  componentWillUnmount = () => {
    // clean-up/remove event listeners
    document.removeEventListener('keydown', this.handleKeyPress)
  }

  // NOTE: Combine handleNum, handleDecimal & handleOperator into single function???
  handleNum = input => {
    // check if num of digits >= 21; maxDigitLimit returns boolean
    // pass in empty string to reset formula if entering new num when currVal is answer
    if (this.maxDigitLimit('')) return

    this.setState(prevState => {
      // test whether previous input was operator
      const isOperator = /[+\-*/]$/.test(prevState.formula)

      // format number with commas
      const newCurrVal = this.commaSeparation(prevState.currVal + input)

      if (prevState.currVal === '0' && !prevState.formula) {
        // for very first input when key press is 0 and intFormula empty
        return {
          ...prevState,
          currVal: input,
          formula: input,
          intFormula: ''
        }
      } else if (isOperator) {
        // for creating new num following operator
        return {
          ...prevState,
          currVal: input,
          formula: prevState.intFormula + input
        }
      } else {
        // for adding to previous digit (expand num)
        return {
          ...prevState,
          currVal: newCurrVal,
          formula: prevState.intFormula + newCurrVal
        }
      }
    })
  }

  handleDecimal = () => {
    // check if num of digits >= 21; maxDigitLimit returns boolean
    // pass in '0' to reset formula if entering new float when currVal is answer
    if (this.maxDigitLimit('0')) return

    this.setState(prevState => {
      // check to prevent sequential decimal points, ie 2..
      const containsDecimal = /\./.test(prevState.currVal)

      // check to prevent operator followed by decimal point, eg 2+.
      const endsInOperator = /[+\-*/]$/.test(prevState.formula)

      if (endsInOperator) {
        return {
          ...prevState,
          currVal: '0.',
          formula: prevState.formula + '0.'
        }
      }

      if (!containsDecimal) {
        return {
          ...prevState,
          currVal: prevState.currVal + '.',
          formula: prevState.formula + '.'
        }
      }
    })
  }

  handleOperator = input => {
    // need to check if previous calculation has been performed
    if (this.state.calcDone) {
      this.setState(prevState => {
        return {
          currVal: '0',
          formula: '' + prevState.prevAns,
          intFormula: '' + prevState.prevAns,
          calcDone: false
        }
      })
    }

    this.setState(prevState => {
      let newFormula // initialize variable

      if (input !== '-') {
        newFormula = prevState.formula.replace(
          // /((?<=[^+\-*/.])$)|([+\-*/.]+$)/,
          /\b$|([+\-*/.]+$)/,
          input
          // appends last digit with curr operator (input); or, if ends in operator or decpoint, replace with input
        )
      } else {
        // ie if(input === '-')
        newFormula = prevState.formula.replace(
          // /((?<=[^+\-*/.])$)|(?<=\d[+\-*/.]?$)/,
          /(\d)$|([+\-*/.]?$)/,
          '$1$2' + input
          // appends last digit with minus (input); or, appends prev operator (max of 1) with minus
        )
      }

      return {
        currVal: input,
        formula: newFormula,
        intFormula: newFormula
      }
    })
  }

  handlePosNeg = () => {
    // console.log('posNeg clciked!!!')

    this.setState(prevState => {
      const isOperator = /[+\-*/]$/.test(prevState.currVal)
      const multipleOp = /[+\-*/]-$/.test(prevState.intFormula)
      let newFormula

      if (isOperator || prevState.currVal === '0') return

      const posNegVal = prevState.currVal.replace(
        /(^\b)|(^-)/,
        (match, p1, p2) => {
          if (match === p1) return '-'
          if (match === p2) return ''
        }
      )

      if (prevState.calcDone) {
        return {
          ...prevState,
          currVal: posNegVal,
          formula: posNegVal,
          intFormula: '',
          calcDone: false
        }
      } else if (multipleOp) {
        newFormula = prevState.intFormula.replace(/([+\-*/])-$/, '$1')

        return {
          ...prevState,
          intFormula: newFormula,
          formula: newFormula + prevState.currVal
        }
      } else {
        return {
          ...prevState,
          currVal: posNegVal,
          formula: prevState.intFormula + posNegVal
        }
      }
    })
  }

  handleEquals = () => {
    if (this.state.calcDone) {
      // deal with spamming equals button
      this.setState(prevState => {
        return {
          ...prevState,
          currVal: '' + prevState.currVal,
          formula: '' + prevState.currVal,
          calcDone: true
        }
      })
      return
    }

    this.setState(prevState => {
      const evaluateMe = prevState.formula.replace(
        /(\D+$)|(,)|(--)/g,
        (match, p1, p2, p3) => {
          if (p1 || p2 === match) return ''
          if (p3 === match) return '+'
        }
      )

      // tidy up incomplete formulas for displaying after evaluation
      const tidyFormulaEnd = prevState.formula.replace(/\D+$/, '')

      // TODO: stop using eval!!
      // const answer = String(eval(evaluateMe)) // need convert back to string
      const answer = this.evaluateFormula(evaluateMe)
      let answerCommas

      // toLocalString() will convert Infinity to ∞ which causes issue for new calculation
      if (isFinite(answer)) {
        answerCommas = answer.toLocaleString('en-US', {
          maximumSignificantDigits: 21
        })
      } else {
        answerCommas = 'Infinity'
      }

      const newFormula = tidyFormulaEnd + '=' + answerCommas
      return {
        currVal: answerCommas,
        prevAns: answerCommas,
        formula: newFormula,
        calcDone: true
      }
    })
  }

  handleClear = () => {
    // console.log('AC clicked')
    this.setState({
      currVal: '0',
      formula: '',
      prevAns: '',
      calcDone: false
    })
  }

  handleDel = () => {
    // console.log('del clicked')
    this.setState(prevState => {
      const endsInOperator = /[+\-*/]$/.test(prevState.formula)
      // do nothing if last input operator or currVal is answer
      if (endsInOperator || prevState.calcDone) return { ...prevState }

      const singleNegDigit = /-\d$|^\d$/.test(prevState.currVal)
      // return '0' if currVal single digit eg -2 or 2
      if (singleNegDigit)
        return {
          ...prevState,
          currVal: '0',
          formula: prevState.intFormula
        }

      const trimCurrVal = prevState.currVal.replace(/\.$|\d$/, '')
      const trimCurrValCommas = this.commaSeparation(trimCurrVal)
      return {
        ...prevState,
        currVal: trimCurrValCommas,
        formula: prevState.intFormula + trimCurrValCommas
      }
    })
  }

  handleKeyPress = event => {
    const testIfNum = /\d/.test(event.key)
    const testIfDec = /\./.test(event.key)
    const testIfOp = /[+\-*/]/.test(event.key)
    const testIfEqOrEntr = /enter|=/i.test(event.key)

    if (testIfNum) {
      return this.handleNum(event.key)
    } else if (testIfDec) {
      return this.handleDecimal()
    } else if (testIfOp) {
      return this.handleOperator(event.key)
    } else if (testIfEqOrEntr) {
      return this.handleEquals()
    }
  }

  // HELPER FUNCTIONS
  maxDigitLimit = input => {
    /* get number of digits (remove decimal point for counting);
    JS switches to scientific notation at 22 digits (ie 1e+21), so limit set to 21 */
    const checkLength = this.state.currVal.replace(/\.|,/g, '').length >= 21

    // need to reset state if creating new num after answer
    if (this.state.calcDone) {
      this.setState(prevState => {
        return {
          ...prevState,
          currVal: '0',
          formula: input,
          calcDone: false
        }
      })
      return false
    }

    // if warning alread display we can return true
    if (this.state.currVal === 'Max Digits Reached!') return true

    // if < 21 we can return false and continue adding digits
    if (!checkLength) return false

    this.setState(prevState => {
      // make a copy of currVal to be restored after limit message
      const storeMe = prevState.currVal.slice()
      return {
        ...prevState,
        currVal: 'Max Digits Reached!',
        storeVal: storeMe
      }
    })

    // restore stored value to currVal after timeout
    setTimeout(
      () =>
        this.setState(prevState => {
          const restoreMe = prevState.storeVal.slice()

          return { ...prevState, currVal: restoreMe, storeVal: '' }
        }),
      600
    )

    return true
  }

  commaSeparation = input => {
    const removeCommas = input.replace(/,/g, '')

    // we can create a comma separated number using toLocalString(); however, this method will remove any decimal zeros from the end if we don't specifiy the correct minimumFractionDigits (eg 2000.100 becomes 2,000.1), which changes as we add extra digits; so we need to test if the number contains a decimal and if so how many decimal places it uses
    // const grabDecimals = removeCommas.match(/(?<=\.)\d+/)
    const grabDecimals = removeCommas.match(/\.(\d+)/)
    let minDigits

    if (grabDecimals) {
      minDigits = grabDecimals[1].length
    } else {
      minDigits = 0
    }

    return Number(removeCommas).toLocaleString('en-US', {
      minimumFractionDigits: minDigits
    })
  }

  evaluateFormula = input => {
    // FIXME: convent infinity symbol to keyword
    // return String(eval(input))
    const regArr = ['*/', '+-'] // for building regexes below

    let output // for storing output of iterations
    for (let i = 0; i < regArr.length; i++) {
      // loop through regexes: 1st iteration = mult/div; 2nd iteration = add/sub

      const re = new RegExp(
        '(-?\\d+\\.?\\d*)([\\' + regArr[i] + '])(-?\\d+\\.?\\d*)'
      )
      // Regular Expression to look for operators between floating numbers or integers
      // Blackslashes are the escape character in strings so we need to escape them with a double blackslash (\\)!

      while (input.match(re)) {
        const match = input.match(re)
        output = calculate(Number(match[1]), match[2], Number(match[3])) // send matches to function below

        if (isNaN(output) || !isFinite(output)) return output // exit early if not a number
        input = input.replace(re, output) // replace matched operation for output result
      }
    }

    return output

    function calculate(a, op, b) {
      switch (op) {
        case '+':
          return a + b
        case '-':
          return a - b
        case '/':
          return a / b
        case '*':
          return a * b
        default:
          return
      }
    }
  }

  // RENDER TIME
  render() {
    return (
      <main className="calculator-body">
        <FormulaDisplay formulaDisplay={this.state.formula} />
        <MainDisplay currVal={this.state.currVal} />
        <KeyPad
          handleNum={this.handleNum}
          handleDecimal={this.handleDecimal}
          handleOperator={this.handleOperator}
          handlePosNeg={this.handlePosNeg}
          handleEquals={this.handleEquals}
          handleClear={this.handleClear}
          handleDel={this.handleDel}
        />
      </main>
    )
  }
}

const FormulaDisplay = props => {
  return (
    <div className="formula-display display">
      <p>{props.formulaDisplay}</p>
    </div>
  )
}

const MainDisplay = props => {
  return (
    <div id="display" className="main-display display">
      <p>{props.currVal}</p>
    </div>
  )
}

const KeyPad = props => {
  return (
    <div className="keypad">
      <button id="seven" onClick={() => props.handleNum('7')}>
        7
      </button>
      <button id="eight" onClick={() => props.handleNum('8')}>
        8
      </button>
      <button id="nine" onClick={() => props.handleNum('9')}>
        9
      </button>
      <button id="four" onClick={() => props.handleNum('4')}>
        4
      </button>
      <button id="five" onClick={() => props.handleNum('5')}>
        5
      </button>
      <button id="six" onClick={() => props.handleNum('6')}>
        6
      </button>
      <button id="one" onClick={() => props.handleNum('1')}>
        1
      </button>
      <button id="two" onClick={() => props.handleNum('2')}>
        2
      </button>
      <button id="three" onClick={() => props.handleNum('3')}>
        3
      </button>
      <button id="pos-neg" onClick={props.handlePosNeg}>
        +/-
      </button>
      <button id="zero" onClick={() => props.handleNum('0')}>
        0
      </button>
      <button id="decimal" onClick={props.handleDecimal}>
        .
      </button>
      <button id="add" onClick={() => props.handleOperator('+')}>
        +
      </button>
      <button id="subtract" onClick={() => props.handleOperator('-')}>
        -
      </button>
      <button id="multiply" onClick={() => props.handleOperator('*')}>
        ×
      </button>
      <button id="divide" onClick={() => props.handleOperator('/')}>
        ÷
      </button>
      <button id="clear" onClick={props.handleClear}>
        AC
      </button>
      <button id="equals" onClick={props.handleEquals}>
        =
      </button>
      <button id="del" onClick={props.handleDel}>
        DEL
      </button>
    </div>
  )
}
