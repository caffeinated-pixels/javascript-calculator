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

export enum Actions {
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

type ACTIONTYPES =
  | { type: Actions.NUMBER; payload: string }
  | { type: Actions.OPERATOR; payload: string }
  | { type: Actions.TIMER_ID; payload: NodeJS.Timeout }
  | { type: Actions.CLEAR_WARNING }
  | { type: Actions.DECIMAL }
  | { type: Actions.POS_NEG }
  | { type: Actions.EQUALS }
  | { type: Actions.CLEAR }
  | { type: Actions.DEL }

const reducer = (state: AppState, action: ACTIONTYPES) => {
  switch (action.type) {
    case Actions.NUMBER:
      return processNumInput(state, action.payload)
    case Actions.DECIMAL:
      return processDecimalPointInput(state)
    case Actions.OPERATOR:
      return processOperatorInput(state, action.payload)
    case Actions.POS_NEG:
      return processPosNegInput(state)
    case Actions.EQUALS:
      return processEqualsInput(state)
    case Actions.CLEAR:
      return INITIAL_STATE
    case Actions.DEL:
      return processDelInput(state)
    case Actions.TIMER_ID:
      return { ...state, maxDigitTimerId: action.payload }
    case Actions.CLEAR_WARNING:
      return { ...state, isMaxDigits: false, maxDigitTimerId: null }
    default:
      throw new Error(`Unhandled action type`)
  }
}

export const useAppState = (initialState: AppState) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return { state, dispatch }
}

// dispatch({ type: 'SET_PAGE_LENGTH', payload: pageLength })
