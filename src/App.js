import React, { Component } from 'react'

export default class App extends Component {
  state = { formulaDisplay: 'formula display', mainDisplay: 0 }

  render() {
    return (
      <main className="calculator-body">
        <FormulaDisplay formulaDisplay={this.state.formulaDisplay} />
        <MainDisplay mainDisplay={this.state.mainDisplay} />
        <KeyPad />
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
      <button id="seven">7</button>
      <button id="eight">8</button>
      <button id="nine">9</button>
      <button id="four">4</button>
      <button id="five">5</button>
      <button id="six">6</button>
      <button id="one">1</button>
      <button id="two">2</button>
      <button id="three">3</button>
      <button id="pos-neg">+/-</button>
      <button id="zero">0</button>
      <button id="decimal">.</button>
      <button id="add">+</button>
      <button id="subtract">-</button>
      <button id="multiply">X</button>
      <button id="divide">/</button>
      <button id="clear">AC</button>
      <button id="equals">=</button>
    </div>
  )
}
