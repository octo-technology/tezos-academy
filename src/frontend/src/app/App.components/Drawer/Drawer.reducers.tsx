import { HIDE_DRAWER, SHOW_DRAWER } from './Drawer.actions'

export interface DrawerState {
  showing: boolean
}

const drawerState: DrawerState = {
  showing: false,
}

export function drawer(state = drawerState, action: any): DrawerState {
  switch (action.type) {
    case SHOW_DRAWER:
      return {
        ...state,
        showing: true,
      }
    case HIDE_DRAWER:
      return {
        ...state,
        showing: false,
      }
    default:
      return state
  }
}
