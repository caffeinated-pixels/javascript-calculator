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

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'PROCESS_NUM':
      return processNumInput(state, payload)
    case 'PROCESS_DECIMAL_POINT':
      return processDecimalPointInput(state)
    case 'PROCESS_OPERATOR':
      return processOperatorInput(state, payload)
    case 'PROCESS_POS_NEG':
      return processPosNegInput(state, payload)
    case 'PROCESS_EQUALS':
      return processEqualsInput(state)
    case 'PROCESS_CLEAR':
      return INITIAL_STATE
    case 'PROCESS_DEL':
      return processDelInput(state)
    case 'SET_MAX_DIGIT_TIMER_ID':
      return { ...state, maxDigitTimerId: payload }
    case 'CLEAR_MAX_DIGIT_WARNING':
      return { ...state, isMaxDigits: false, maxDigitTimerId: null }
    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}

export const useAppState = (initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return [state, dispatch]
}

// dispatch({ type: 'SET_PAGE_LENGTH', payload: pageLength })
