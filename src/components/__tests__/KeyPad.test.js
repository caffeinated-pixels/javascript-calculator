import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { KeyPad } from '../'

describe('KeyPad component', () => {
  it('should render the all the keypad number buttons', () => {
    render(<KeyPad />)

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
    render(<KeyPad />)

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
})
