import React, { Component } from 'react'

export default class App extends Component {
  // NOTE: Do we need a prevVal or prevAnswer property in state?
  state = {
    currVal: '0',
    formula: '',
    prevAns: '',
    calcDone: false // ie has user clicked equals key
  }

  // NOTE: Combine handleNum, handleDecimal & handleOperator into single function???
  handleNum = input => {
    // need to check if previous calculation has been performed
    if (this.state.calcDone) {
      this.setState(prevState => {
        return {
          currVal: '0',
          formula: '',
          calcDone: false
        }
      })
    }

    this.setState(prevState => {
      // test whether previous input was operator
      const isOperator = /[+\-*/]/.test(prevState.currVal)

      if (prevState.currVal === '0') {
        return {
          currVal: input,
          formula: input
        }
      } else if (isOperator) {
        return {
          currVal: input,
          formula: prevState.formula + input
        }
      } else {
        return {
          currVal: prevState.currVal + input,
          formula: prevState.formula + input
        }
      }
    })
  }

  handleDecimal = () => {
    // console.log('decimal clicked')

    // need to check if previous calculation has been performed
    if (this.state.calcDone) {
      this.setState(prevState => {
        return {
          currVal: '0',
          formula: '0',
          calcDone: false
        }
      })
    }

    this.setState(prevState => {
      const containsDecimal = /\./.test(prevState.currVal)

      if (!containsDecimal) {
        return {
          currVal: prevState.currVal + '.',
          formula: prevState.formula + '.'
        }
      }
    })
  }

  handleOperator = input => {
    // console.log(input)

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
      // test if formula end with operator or decimal point
      const endsInOperatorOrDecimal = /[+\-*/.]$/.test(prevState.formula)

      if (endsInOperatorOrDecimal) {
        newFormula = prevState.formula.replace(/[+\-*/.]$/, input)
      } else {
        newFormula = prevState.formula + input
      }

      return {
        currVal: input,
        formula: newFormula
      }
    })
  }

  handleEquals = () => {
    this.setState(prevState => {
      const answer = eval(prevState.formula)
      const newFormula = prevState.formula + '=' + answer
      return {
        currVal: answer,
        prevAns: answer,
        formula: newFormula,
        calcDone: true
      }
    })
  }

  handleClear = () => {
    // console.log('AC clicked')
    this.setState({
      currVal: '0',
      formula: ''
    })
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
          handleEquals={this.handleEquals}
          handleClear={this.handleClear}
        />
      </main>
    )
  }
}

const FormulaDisplay = props => {
  return <div className="formula-display display">{props.formulaDisplay}</div>
}

const MainDisplay = props => {
  return (
    <div id="display" className="main-display display">
      {props.currVal}
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
      <button id="pos-neg">+/-</button>
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
        X
      </button>
      <button id="divide" onClick={() => props.handleOperator('/')}>
        /
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
