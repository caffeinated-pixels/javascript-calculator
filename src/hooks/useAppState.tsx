import { useReducer } from 'react'
import {
  processNumInput,
  processDecimalPointInput,
  processOperatorInput,
  processPosNegInput,
  processEqualsInput,
  processDelInput,
} from '../helpers'

import { INITIAL_STATE, AppState } from '../constants'

export enum ActionTypes {
  NUMBER = 'PROCESS_NUM',
  DECIMAL = 'PROCESS_DECIMAL_POINT',
  OPERATOR = 'PROCESS_OPERATOR',
  POS_NEG = 'PROCESS_POS_NEG',
  EQUALS = 'PROCESS_EQUALS',
  CLEAR = 'PROCESS_CLEAR',
  DEL = 'PROCESS_DEL',
  TIMER_ID = 'SET_MAX_DIGIT_TIMER_ID',
  CLEAR_WARNING = 'CLEAR_MAX_DIGIT_WARNING',
}

const reducer = (
  state: AppState,
  { type, payload }: { type: string; payload?: any }
) => {
  switch (type) {
    case ActionTypes.NUMBER:
      return processNumInput(state, payload)
    case ActionTypes.DECIMAL:
      return processDecimalPointInput(state)
    case ActionTypes.OPERATOR:
      return processOperatorInput(state, payload)
    case ActionTypes.POS_NEG:
      return processPosNegInput(state)
    case ActionTypes.EQUALS:
      return processEqualsInput(state)
    case ActionTypes.CLEAR:
      return INITIAL_STATE
    case ActionTypes.DEL:
      return processDelInput(state)
    case ActionTypes.TIMER_ID:
      return { ...state, maxDigitTimerId: payload }
    case ActionTypes.CLEAR_WARNING:
      return { ...state, isMaxDigits: false, maxDigitTimerId: null }
    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}

export const useAppState = (initialState: AppState) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return { state, dispatch }
}

// dispatch({ type: 'SET_PAGE_LENGTH', payload: pageLength })
