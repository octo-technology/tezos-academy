import { ADD_PROGRESS_REQUEST, ADD_PROGRESS_COMMIT, ADD_PROGRESS_ROLLBACK } from './Chapter.actions'

export interface ProgressState {
  loading?: boolean
}

const progressState: ProgressState = {
  loading: false,
}

export function progress(state = progressState, action: any): ProgressState {
  switch (action.type) {
    case ADD_PROGRESS_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case ADD_PROGRESS_COMMIT: {
      return {
        ...state,
        loading: false,
      }
    }
    case ADD_PROGRESS_ROLLBACK: {
      return {
        ...state,
        loading: false,
      }
    }
    default:
      return state
  }
}
