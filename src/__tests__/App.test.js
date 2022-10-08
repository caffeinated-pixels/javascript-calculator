import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from '../App'
import { evaluateFormula } from '../helpers/evaluateFormula'

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

  it('should render the all the keypad number buttons', () => {
    render(<App />)

    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '6' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '7' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '8' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '9' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '0' })).toBeInTheDocument()
  })

  it('should render the all the keypad operator buttons', () => {
    render(<App />)

    expect(
      screen.getByRole('button', { name: 'decimal point' })
    ).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'DEL' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'AC' })).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'multiply' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'divide' })).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'add' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'subtract' })).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: 'toggle postive negative' })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'equals' })).toBeInTheDocument()
  })

  it('should render the footer', () => {
    render(<App />)
    expect(screen.getByText(/coded by ;/i)).toBeInTheDocument()
  })
})

/* big number returns an object, presumably JS automatically 
serializes to appropriate type? */
describe('evaluateFormula function', () => {
  it('should return a string number', () => {
    const result = evaluateFormula('2+2').toJSON()

    expect(result).toBe('4')
    expect(typeof result).toBe('string')
  })

  it('should perform 0.3-0.2 accurately', () => {
    const result = evaluateFormula('0.3-0.2').toJSON()

    expect(result).toStrictEqual('0.1')
  })
})
