import React, { Component } from 'react'

export default class App extends Component {
  state = {
    formulaDisplay: 'formula display',
    mainDisplay: 0,
    inputLog: [],
    returnVal: 0
  }

  handleNum = input => {
    console.log(input)
  }

  handleOperator = input => {
    console.log('operator clicked')
  }

  handleDecimal = () => {
    console.log('decimal clicked')
  }

  handleEquals = () => {
    console.log('equals clicked')
  }

  handleClear = () => {
    console.log('AC clicked')
  }

  render() {
    return (
      <main className="calculator-body">
        <FormulaDisplay formulaDisplay={this.state.formulaDisplay} />
        <MainDisplay mainDisplay={this.state.mainDisplay} />
        <KeyPad
          handleNum={this.handleNum}
          handleOperator={this.handleOperator}
          handleDecimal={this.handleDecimal}
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
      {props.mainDisplay}
    </div>
  )
}

const KeyPad = props => {
  return (
    <div className="keypad">
      <button id="seven" onClick={() => props.handleNum(7)}>
        7
      </button>
      <button id="eight" onClick={() => props.handleNum(8)}>
        8
      </button>
      <button id="nine" onClick={() => props.handleNum(9)}>
        9
      </button>
      <button id="four" onClick={() => props.handleNum(4)}>
        4
      </button>
      <button id="five" onClick={() => props.handleNum(5)}>
        5
      </button>
      <button id="six" onClick={() => props.handleNum(6)}>
        6
      </button>
      <button id="one" onClick={() => props.handleNum(1)}>
        1
      </button>
      <button id="two" onClick={() => props.handleNum(2)}>
        2
      </button>
      <button id="three" onClick={() => props.handleNum(3)}>
        3
      </button>
      <button id="pos-neg">+/-</button>
      <button id="zero" onClick={() => props.handleNum(0)}>
        0
      </button>
      <button id="decimal" onClick={props.handleDecimal}>
        .
      </button>
      <button id="add" onClick={props.handleOperator}>
        +
      </button>
      <button id="subtract" onClick={props.handleOperator}>
        -
      </button>
      <button id="multiply" onClick={props.handleOperator}>
        X
      </button>
      <button id="divide" onClick={props.handleOperator}>
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
