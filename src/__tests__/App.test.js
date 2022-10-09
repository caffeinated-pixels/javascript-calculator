import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from '../App'

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
  it('should work for all digits', () => {
    render(<App />)
    userEvent.type(document.body, '1234567890')

    screen.getByTestId('calculator-display')
    expect(screen.getByTestId('calculator-display')).toHaveTextContent(
      '1,234,567,8901,234,567,890'
    )
  })
})
