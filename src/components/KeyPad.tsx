type KeyPadProps = {
  handleNum: (input: string) => void
  handleDecimal: () => void
  handleOperator: (input: string) => void
  handlePosNeg: () => void
  handleEquals: () => void
  handleClear: () => void
  handleDel: () => void
}

export const KeyPad = ({
  handleClear,
  handleDecimal,
  handleNum,
  handleDel,
  handleOperator,
  handlePosNeg,
  handleEquals,
}: KeyPadProps) => {
  return (
    <div className="keypad" data-testid="keypad">
      {/* FIRST ROW */}
      <button id="seven" onClick={() => handleNum('7')}>
        7
      </button>
      <button id="eight" onClick={() => handleNum('8')}>
        8
      </button>
      <button id="nine" onClick={() => handleNum('9')}>
        9
      </button>
      <button id="del" className="red-btn" onClick={handleDel}>
        DEL
      </button>
      <button id="clear" className="red-btn" onClick={handleClear}>
        AC
      </button>

      {/* SECOND ROW */}
      <button id="four" onClick={() => handleNum('4')}>
        4
      </button>
      <button id="five" onClick={() => handleNum('5')}>
        5
      </button>
      <button id="six" onClick={() => handleNum('6')}>
        6
      </button>
      <button
        id="multiply"
        className="operator"
        onClick={() => handleOperator('*')}
        aria-label="multiply"
      >
        ×
      </button>
      <button
        id="divide"
        className="operator"
        onClick={() => handleOperator('/')}
        aria-label="divide"
      >
        ÷
      </button>

      {/* THIRD ROW */}
      <button id="one" onClick={() => handleNum('1')}>
        1
      </button>
      <button id="two" onClick={() => handleNum('2')}>
        2
      </button>
      <button id="three" onClick={() => handleNum('3')}>
        3
      </button>
      <button
        id="add"
        className="operator"
        onClick={() => handleOperator('+')}
        aria-label="add"
      >
        +
      </button>
      <button
        id="subtract"
        className="operator"
        onClick={() => handleOperator('-')}
        aria-label="subtract"
      >
        -
      </button>

      {/* FOURTH ROW */}
      <button id="zero" onClick={() => handleNum('0')}>
        0
      </button>
      <button
        id="pos-neg"
        onClick={handlePosNeg}
        aria-label="toggle postive negative"
      >
        +/-
      </button>
      <button id="decimal" onClick={handleDecimal} aria-label="decimal point">
        .
      </button>

      <button
        id="equals"
        className="equals green-btn"
        onClick={handleEquals}
        aria-label="equals"
      >
        =
      </button>
    </div>
  )
}
