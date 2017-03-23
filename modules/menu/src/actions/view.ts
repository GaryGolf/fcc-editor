import * as Actions from './types'

export interface Interface {
    showMenuEditModal(menuItem: MenuItem): Action
    hideMenuEditModal(): Action
}
export const showMenuEditModal = payload => ({ type: Actions.SHOW_MENU_EDIT_MODAL, payload})
export const hideMenuEditModal = () => ({ type: Actions.HIDE_MENU_EDIT_MODAL})