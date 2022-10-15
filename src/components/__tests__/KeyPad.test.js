import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { KeyPad } from '../'

const keyPadProps = {
  handleClear: jest.fn(),
  handleDecimal: jest.fn(),
  handleNum: jest.fn(),
  handleDel: jest.fn(),
  handleOperator: jest.fn(),
  handlePosNeg: jest.fn(),
  handleEquals: jest.fn(),
}

const renderKeyPad = () => render(<KeyPad {...keyPadProps} />)

describe('KeyPad component', () => {
  it('should render the all the keypad number buttons', () => {
    renderKeyPad()

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
    renderKeyPad()

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

  it('should call the handleNum function when a number button is clicked', async () => {
    renderKeyPad()

    await userEvent.click(screen.getByRole('button', { name: '1' }))
    expect(keyPadProps.handleNum).toHaveBeenCalledWith('1')

    await userEvent.click(screen.getByRole('button', { name: '2' }))
    expect(keyPadProps.handleNum).toHaveBeenCalledWith('2')

    await userEvent.click(screen.getByRole('button', { name: '3' }))
    expect(keyPadProps.handleNum).toHaveBeenCalledWith('3')

    await userEvent.click(screen.getByRole('button', { name: '4' }))
    expect(keyPadProps.handleNum).toHaveBeenCalledWith('4')

    await userEvent.click(screen.getByRole('button', { name: '5' }))
    expect(keyPadProps.handleNum).toHaveBeenCalledWith('5')

    await userEvent.click(screen.getByRole('button', { name: '6' }))
    expect(keyPadProps.handleNum).toHaveBeenCalledWith('6')

    await userEvent.click(screen.getByRole('button', { name: '7' }))
    expect(keyPadProps.handleNum).toHaveBeenCalledWith('7')

    await userEvent.click(screen.getByRole('button', { name: '8' }))
    expect(keyPadProps.handleNum).toHaveBeenCalledWith('8')

    await userEvent.click(screen.getByRole('button', { name: '9' }))
    expect(keyPadProps.handleNum).toHaveBeenCalledWith('9')

    await userEvent.click(screen.getByRole('button', { name: '0' }))
    expect(keyPadProps.handleNum).toHaveBeenCalledWith('0')
  })

  it('should call the handleDecimal function when the decimal button is clicked', async () => {
    renderKeyPad()

    await userEvent.click(screen.getByRole('button', { name: 'decimal point' }))
    expect(keyPadProps.handleDecimal).toHaveBeenCalled()
  })

  it('should call the handleDel function when the DEL button is clicked', async () => {
    renderKeyPad()

    await userEvent.click(screen.getByRole('button', { name: 'DEL' }))
    expect(keyPadProps.handleDel).toHaveBeenCalled()
  })

  it('should call the handleClear function when the AC button is clicked', async () => {
    renderKeyPad()

    await userEvent.click(screen.getByRole('button', { name: 'AC' }))
    expect(keyPadProps.handleClear).toHaveBeenCalled()
  })

  it('should call the handleOperator function when an operator button is clicked', async () => {
    renderKeyPad()

    await userEvent.click(screen.getByRole('button', { name: 'multiply' }))
    expect(keyPadProps.handleOperator).toHaveBeenCalledWith('*')

    await userEvent.click(screen.getByRole('button', { name: 'divide' }))
    expect(keyPadProps.handleOperator).toHaveBeenCalledWith('/')

    await userEvent.click(screen.getByRole('button', { name: 'add' }))
    expect(keyPadProps.handleOperator).toHaveBeenCalledWith('+')

    await userEvent.click(screen.getByRole('button', { name: 'subtract' }))
    expect(keyPadProps.handleOperator).toHaveBeenCalledWith('-')
  })

  it('should call the handlePosNeg function when the +/- button is clicked', async () => {
    renderKeyPad()

    await userEvent.click(
      screen.getByRole('button', { name: 'toggle postive negative' })
    )
    expect(keyPadProps.handlePosNeg).toHaveBeenCalled()
  })

  it('should call the handleEquals function when the = button is clicked', async () => {
    renderKeyPad()

    await userEvent.click(screen.getByRole('button', { name: 'equals' }))
    expect(keyPadProps.handleEquals).toHaveBeenCalled()
  })
})
