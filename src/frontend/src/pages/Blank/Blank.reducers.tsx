import { GET_BLANK_COMMIT, GET_BLANK_REQUEST, GET_BLANK_ROLLBACK } from './Blank.actions'

export interface BlankState {
  loading?: boolean
}

const blankState: BlankState = {
  loading: false,
}

export function blank(state = blankState, action: any): BlankState {
  switch (action.type) {
    case GET_BLANK_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_BLANK_COMMIT: {
      return {
        ...state,
        loading: false,
      }
    }
    case GET_BLANK_ROLLBACK: {
      return {
        ...state,
        loading: false,
      }
    }
    default:
      return state
  }
}
