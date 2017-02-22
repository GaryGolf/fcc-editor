import * as Actions from './types/view'
import {createAction} from 'redux-actions'

export interface Interface {
    showMenuEditModal: (menuItem: MenuItem) => void
    hideMenuEditModal: () => void
}
export const showMenuEditModal = createAction<MenuItem>(Actions.SHOW_MENU_EDIT_MODAL)
export const hideMenuEditModal = createAction<MenuItem>(Actions.HIDE_MENU_EDIT_MODAL)