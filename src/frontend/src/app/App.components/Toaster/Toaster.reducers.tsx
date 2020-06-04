import { HIDE_TOASTER, SHOW_TOASTER } from './Toaster.actions'
import { ERROR } from './Toaster.constants'

export interface ToasterState {
  showing: boolean
  status?: string
  title?: string
  message?: string
}

const toasterState: ToasterState = {
  showing: false,
  status: ERROR,
  title: undefined,
  message: undefined,
}

export function toaster(state = toasterState, action: any): ToasterState {
  switch (action.type) {
    case SHOW_TOASTER:
      return {
        ...state,
        showing: true,
        status: action.status,
        title: action.title,
        message: action.message,
      }
    case HIDE_TOASTER:
      return {
        ...state,
        showing: false,
      }
    default:
      return state
  }
}
