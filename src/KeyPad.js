const KeyPad = props => {
  return (
    <div className="keypad">
      {/* FIRST ROW */}
      <button id="seven" onClick={() => props.handleNum('7')}>
        7
      </button>
      <button id="eight" onClick={() => props.handleNum('8')}>
        8
      </button>
      <button id="nine" onClick={() => props.handleNum('9')}>
        9
      </button>
      <button id="del" className="red-btn" onClick={props.handleDel}>
        DEL
      </button>
      <button id="clear" className="red-btn" onClick={props.handleClear}>
        AC
      </button>

      {/* SECOND ROW */}
      <button id="four" onClick={() => props.handleNum('4')}>
        4
      </button>
      <button id="five" onClick={() => props.handleNum('5')}>
        5
      </button>
      <button id="six" onClick={() => props.handleNum('6')}>
        6
      </button>
      <button
        id="multiply"
        className="operator"
        onClick={() => props.handleOperator('*')}
      >
        ×
      </button>
      <button
        id="divide"
        className="operator"
        onClick={() => props.handleOperator('/')}
      >
        ÷
      </button>

      {/* THIRD ROW */}
      <button id="one" onClick={() => props.handleNum('1')}>
        1
      </button>
      <button id="two" onClick={() => props.handleNum('2')}>
        2
      </button>
      <button id="three" onClick={() => props.handleNum('3')}>
        3
      </button>
      <button
        id="add"
        className="operator"
        onClick={() => props.handleOperator('+')}
      >
        +
      </button>
      <button
        id="subtract"
        className="operator"
        onClick={() => props.handleOperator('-')}
      >
        -
      </button>

      {/* FOURTH ROW */}
      <button id="zero" onClick={() => props.handleNum('0')}>
        0
      </button>
      <button id="pos-neg" onClick={props.handlePosNeg}>
        +/-
      </button>
      <button id="decimal" onClick={props.handleDecimal}>
        .
      </button>

      <button
        id="equals"
        className="equals green-btn"
        onClick={props.handleEquals}
      >
        =
      </button>
    </div>
  )
}

export default KeyPad
