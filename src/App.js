import React, { Component } from 'react'

export default class App extends Component {
  // NOTE: Do we need a prevVal or prevAnswer property in state?
  state = {
    currVal: '0',
    storeVal: '', // store currVal for max digit warning
    formula: '',
    prevAns: '',
    calcDone: false, // has user clicked equals key?
    negNum: false // is currVal pos or neg?
  }

  // TODO: add keyboard event listeners through componentDidMount
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
      const isOperator = /[+\-*/]/.test(prevState.currVal)

      if (prevState.currVal === '0') {
        // for very first input when key press is 0
        return {
          currVal: input,
          formula: input
        }
      } else if (isOperator) {
        // for creating new num following operator
        return {
          currVal: input,
          formula: prevState.formula + input
        }
      } else {
        // for adding to previous digit (expand num)
        return {
          currVal: prevState.currVal + input,
          formula: prevState.formula + input
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
          calcDone: false
        }
      })
    }

    this.setState(prevState => {
      let newFormula // initialize variable

      if (input !== '-') {
        newFormula = prevState.formula.replace(
          /((?<=[^+\-*/.])$)|([+\-*/.]+$)/,
          input
          // appends last digit with curr operator (input); or, if ends in operator or decpoint, replace with input
        )
      } else {
        // ie if(input === '-')
        newFormula = prevState.formula.replace(
          /((?<=[^+\-*/.])$)|(?<=\d[+\-*/.]?$)/,
          // appends last digit with minus (input); or, appends prev operator (max of 1) with minus
          input
        )
      }

      return {
        currVal: input,
        formula: newFormula
      }
    })
  }

  handlePosNeg = () => {
    // TODO: Re-enable posNeg functionality
    // FIXME: deal with negative answer!!!
    // FIXME: requires 2 clicks if formula contains other neg num
    console.log('posNeg is temporary disabled!!!')

    // if (this.state.currVal === '0') return
    //
    // if (this.state.calcDone) {
    //   // check if currVal is ans from prev evaluation
    //   this.setState(prevState => {
    //     return {
    //       currVal: prevState.currVal,
    //       formula: '' + prevState.prevAns,
    //       calcDone: false
    //     }
    //   })
    // }
    //
    // this.setState(prevState => {
    //   let re // for storing regex
    //   let newCurrVal // for storing postive value
    //   let newFormula // for storing updated formula
    //
    //   if (!prevState.negNum) {
    //     re = new RegExp(prevState.currVal + '$')
    //     newFormula = prevState.formula.replace(re, '-' + prevState.currVal)
    //     return {
    //       ...prevState,
    //       currVal: '-' + prevState.currVal,
    //       formula: newFormula,
    //       negNum: true
    //     }
    //   } else {
    //     re = new RegExp(prevState.currVal + '$')
    //     newCurrVal = prevState.currVal.replace('-', '')
    //     newFormula = prevState.formula.replace(re, newCurrVal)
    //     return {
    //       ...prevState,
    //       currVal: newCurrVal,
    //       formula: newFormula,
    //       negNum: false
    //     }
    //   }
    // })
  }

  handleEquals = () => {
    this.setState(prevState => {
      const evaluateMe = prevState.formula
        .replace(/\D$/, '')
        .replace(/--/g, '+')

      const answer = String(eval(evaluateMe)) // need convert back to string
      const isAnsNeg = /-/.test(answer) // check if result is positive num
      const newFormula = evaluateMe + '=' + answer
      return {
        currVal: answer,
        prevAns: answer,
        formula: newFormula,
        calcDone: true,
        negNum: isAnsNeg
      }
    })
  }

  handleClear = () => {
    // console.log('AC clicked')
    this.setState({
      currVal: '0',
      formula: '',
      prevAns: '',
      calcDone: false,
      negNum: false
    })
  }

  maxDigitLimit = input => {
    /* get number of digits (remove decimal point for counting);
    JS switches to scientific notation at 22 digits (ie 1e+21), so limit set to 21 */
    const checkLength = this.state.currVal.replace('.', '').length >= 21

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

  handleKeyPress = event => {
    console.log(event.key)
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
    </div>
  )
}
