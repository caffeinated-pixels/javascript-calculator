import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from '../App'
import { evaluateFormula } from '../helpers/evaluateFormula'

/* need to test evaluateForumla function as well as inputs */

describe('Calculator app', () => {
  it('should render the app', () => {
    render(<App />)

    const header = screen.getByText('Mercenary Instruments')
    expect(header).toBeInTheDocument()
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
