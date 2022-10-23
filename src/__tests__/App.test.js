import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from '../App'
import { MAX_DIGIT_WARNING } from '../constants'

/* things to test:
    - keyboard input
    - mouse input
    - component rendering
    - variety of inputs/calculations
*/

describe('Calculator app', () => {
  it('should render the main container', () => {
    render(<App />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('should render the header', () => {
    render(<App />)
    expect(screen.getByText('Mercenary Instruments')).toBeInTheDocument()
  })

  it('should render the display', () => {
    render(<App />)
    expect(screen.getByTestId('calculator-display')).toBeInTheDocument()
  })

  it('should render the keypad container', () => {
    render(<App />)
    expect(screen.getByTestId('keypad')).toBeInTheDocument()
  })

  it('should render the footer', () => {
    render(<App />)
    expect(screen.getByText(/coded by ;/i)).toBeInTheDocument()
  })
})

describe('Calculator keyboard input', () => {
  it('should work for all digits', async () => {
    render(<App />)
    await userEvent.keyboard('1234567890')
    expect(screen.getByTestId('main-display')).toHaveTextContent(
      '1,234,567,890'
    )
  })

  // backspace key === DEL button, del key === AC button
  it('Backspace should remove least significant digit', async () => {
    render(<App />)

    await userEvent.keyboard('1234{backspace}{backspace}')
    expect(screen.getByTestId('main-display')).toHaveTextContent('12')
    expect(screen.getByTestId('formula-display')).toHaveTextContent('12')
  })

  it('AC should clear the display', async () => {
    render(<App />)

    await userEvent.keyboard('1234567890')
    // have to use fireEvent because userEvent doesn't support DEL
    fireEvent.keyDown(document.body, { key: 'Delete' })

    expect(screen.getByTestId('main-display')).toHaveTextContent('0')
    expect(screen.getByTestId('formula-display')).toHaveTextContent('')
  })

  it('period should add decimal point', async () => {
    render(<App />)

    await userEvent.keyboard('3.14159')

    expect(screen.getByTestId('main-display')).toHaveTextContent('3.14159')
    expect(screen.getByTestId('formula-display')).toHaveTextContent('3.14159')
  })
  // TODO: fix multiple decimal point bug
  it.skip('should not allow multiple decimal points', async () => {
    render(<App />)

    await userEvent.keyboard('3.14.15.9')

    expect(screen.getByTestId('main-display')).toHaveTextContent('3.14159')
    expect(screen.getByTestId('formula-display')).toHaveTextContent('3.14159')
  })

  it('operator keys should work', async () => {
    render(<App />)
    const mainDisplay = screen.getByTestId('main-display')
    const formulaDisplay = screen.getByTestId('formula-display')

    await userEvent.keyboard('10')

    await userEvent.keyboard('+')
    expect(mainDisplay).toHaveTextContent('+')
    expect(formulaDisplay).toHaveTextContent('10+')

    await userEvent.keyboard('-')
    expect(mainDisplay).toHaveTextContent('-')
    expect(formulaDisplay).toHaveTextContent('10-')

    await userEvent.keyboard('*')
    expect(mainDisplay).toHaveTextContent('*')
    expect(formulaDisplay).toHaveTextContent('10*')

    await userEvent.keyboard('/')
    expect(mainDisplay).toHaveTextContent('/')
    expect(formulaDisplay).toHaveTextContent('10/')
  })
})

describe('Calculations and display behaviour', () => {
  it('should be able to perform follow-up calculation', async () => {
    render(<App />)
    const mainDisplay = screen.getByTestId('main-display')
    const formulaDisplay = screen.getByTestId('formula-display')

    await userEvent.keyboard('2+2=+')
    expect(mainDisplay).toHaveTextContent('+')
    expect(formulaDisplay).toHaveTextContent('4+')

    await userEvent.keyboard('=')
    expect(mainDisplay).toHaveTextContent('4')
    expect(formulaDisplay).toHaveTextContent('4=4')

    await userEvent.keyboard('+2')
    expect(mainDisplay).toHaveTextContent('2')
    expect(formulaDisplay).toHaveTextContent('4+2')

    await userEvent.keyboard('=')
    expect(mainDisplay).toHaveTextContent('6')
    expect(formulaDisplay).toHaveTextContent('4+2=6')
  })

  it('should display warning if input > 21 digits', async () => {
    render(<App />)
    const mainDisplay = screen.getByTestId('main-display')
    const formulaDisplay = screen.getByTestId('formula-display')

    await userEvent.keyboard('5'.repeat(25))

    expect(mainDisplay).toHaveTextContent(MAX_DIGIT_WARNING)
    expect(formulaDisplay).toHaveTextContent('555,555,555,555,555,555,555')

    // number should reappear after 600ms
    await waitFor(() =>
      expect(mainDisplay).toHaveTextContent('555,555,555,555,555,555,555')
    )
  })

  it('should switch to scientific notation when result exceeds 21 digits', async () => {
    render(<App />)
    const mainDisplay = screen.getByTestId('main-display')
    const formulaDisplay = screen.getByTestId('formula-display')

    await userEvent.keyboard(`${'9'.repeat(21)}*10=`)

    expect(mainDisplay).toHaveTextContent('9.99999999999999999999e+21')
    expect(formulaDisplay).toHaveTextContent(
      '999,999,999,999,999,999,999*10=9.99999999999999999999e+21'
    )

    await userEvent.keyboard('/1000000=')
    expect(mainDisplay).toHaveTextContent('9,999,999,999,999,999.99999')
    expect(formulaDisplay).toHaveTextContent(
      '9.99999999999999999999e+21/1,000,000=9,999,999,999,999,999.99999'
    )
  })

  it('should not allow a number to begin with multiple zeros', async () => {
    render(<App />)
    const mainDisplay = screen.getByTestId('main-display')
    const formulaDisplay = screen.getByTestId('formula-display')

    await userEvent.keyboard('00001')

    expect(mainDisplay).toHaveTextContent('1')
    expect(formulaDisplay).toHaveTextContent('1')
  })

  it('should be able to perform any operation on numbers containing decimal points', async () => {
    render(<App />)
    const mainDisplay = screen.getByTestId('main-display')
    const formulaDisplay = screen.getByTestId('formula-display')

    await userEvent.keyboard('1.5+2.5=')
    expect(mainDisplay).toHaveTextContent('4')
    expect(formulaDisplay).toHaveTextContent('1.5+2.5=4')
  })

  // TODO: If 2 or more operators are entered consecutively, the operation performed should be the last operator entered (excluding the negative (-) sign.await userEvent.keyboard('00001')

  // TODO: Pressing an operator immediately following "=" should start a new calculation that operates on the result of the previous evaluation
})
