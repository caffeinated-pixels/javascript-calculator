import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from '../App'

describe('Calculator app', () => {
  it('should render the app', () => {
    render(<App />)

    const header = screen.getByText('Mercenary Instruments')
    expect(header).toBeInTheDocument()
  })
})
