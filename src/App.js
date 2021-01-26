import React, { Component } from 'react'

export default class App extends Component {
  state = {
    formulaDisplay: 'formula display',
    currVal: '0',
    formula: '',
    returnVal: 0
  }

  handleNum = input => {
    // console.log(input)
    this.setState(prevState => {
      // check if previous input was an operator
      const isOperator = /[+\-*/]/.test(prevState.currVal)

      if (isOperator) {
        // add operator to formula, new num input becomes display
        return {
          ...prevState,
          formula: prevState.formula + prevState.currVal,
          currVal: input
        }
      } else if (prevState.currVal === '0') {
        return {
          ...prevState,
          currVal: input
        }
      } else {
        return { ...prevState, currVal: (prevState.currVal += input) }
      }
    })
  }

  handleDecimal = () => {
    // console.log('decimal clicked')
    this.setState(prevState => {
      const containsDecimal = /\./.test(prevState.currVal)

      if (!containsDecimal) {
        return { ...prevState, currVal: (prevState.currVal += '.') }
      }
    })
  }

  handleOperator = input => {
    // console.log(input)

    this.setState(prevState => {
      // deal with incomplete decimals, eg "0.", "1.", etc
      const currVal = prevState.currVal.replace(/\.$/, '')

      return {
        ...prevState,
        currVal: input,
        formula: prevState.formula + currVal
      }
    })
  }

  handleEquals = () => {
    console.log('equals clicked')
  }

  handleClear = () => {
    // console.log('AC clicked')
    this.setState({
      formulaDisplay: 'formula display',
      currVal: '0',
      formula: '',
      returnVal: 0
    })
  }

  render() {
    return (
      <main className="calculator-body">
        <FormulaDisplay formulaDisplay={this.state.formulaDisplay} />
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
