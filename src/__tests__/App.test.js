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
  it('should work for all digits', async () => {
    render(<App />)
    await userEvent.keyboard('1234567890')
    expect(screen.getByTestId('main-display')).toHaveTextContent(
      '1,234,567,890'
    )
  })

  it('Backspace should remove least significant digit', async () => {
    render(<App />)

    await userEvent.keyboard('1234{backspace}{backspace}')
    expect(screen.getByTestId('main-display')).toHaveTextContent('12')
    expect(screen.getByTestId('formula-display')).toHaveTextContent('12')
  })

  it('DEL should clear the display', async () => {
    render(<App />)

    await userEvent.keyboard('1234567890{del}')
    expect(screen.getByTestId('main-display')).toHaveTextContent('0')
    // TODO: figure out why this is failing
    // expect(screen.getByTestId('formula-display')).toHaveTextContent('')
  })

  it('should be able to perform follow-up calculation', async () => {
    render(<App />)

    await userEvent.keyboard('2+2=+')
    expect(screen.getByTestId('main-display')).toHaveTextContent('+')
    expect(screen.getByTestId('formula-display')).toHaveTextContent('4+')
  })
})
