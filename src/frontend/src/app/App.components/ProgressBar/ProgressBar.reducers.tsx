import { HIDE_PROGRESS_BAR, SHOW_PROGRESS_BAR } from './ProgressBar.actions'

export interface ProgressBarState {
  showing: boolean
}

const progressBarState: ProgressBarState = {
  showing: false,
}

export function progressBar(state = progressBarState, action: any): ProgressBarState {
  switch (action.type) {
    case SHOW_PROGRESS_BAR:
      return {
        ...state,
        showing: true,
      }
    case HIDE_PROGRESS_BAR:
      return {
        ...state,
        showing: false,
      }
    default:
      return state
  }
}
