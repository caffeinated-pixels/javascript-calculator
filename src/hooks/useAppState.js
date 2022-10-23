import { useReducer } from 'react'
import {
  processNumInput,
  processDecimalPointInput,
  processOperatorInput,
  processPosNegInput,
  processEqualsInput,
  processDelInput,
} from '../helpers'
import { INITIAL_STATE } from '../constants'

/* if (state.isMaxDigits && !state.maxDigitTimerId) {
    const timerId = setTimeout(
    () =>
      setState((prevState) => {
        return { ...prevState, isMaxDigits: false, maxDigitTimerId: null }
      }),
    600
  )
  setState((prevState) => {
    return { ...prevState, maxDigitTimerId: timerId }
  }
} 
*/

const reducer = (state, action) => {
  switch (action.type) {
    case 'PROCESS_NUM':
      return processNumInput(state, action.payload)
    case 'PROCESS_DECIMAL_POINT':
      return processDecimalPointInput(state)
    case 'PROCESS_OPERATOR':
      return processOperatorInput(state, action.payload)
    case 'PROCESS_POS_NEG':
      return processPosNegInput(state, action.payload)
    case 'PROCESS_EQUALS':
      return processEqualsInput(state)
    case 'PROCESS_CLEAR':
      return INITIAL_STATE
    case 'PROCESS_DEL':
      return processDelInput(state)
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const useAppState = (initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return [state, dispatch]
}

// dispatch({ type: 'SET_PAGE_LENGTH', payload: pageLength })
