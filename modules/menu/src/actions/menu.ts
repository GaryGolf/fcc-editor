import * as Actions from './types/menu'
import { createAction } from 'redux-actions'

export interface Interface {
    removeMenuItem: (menuItem: MenuItem) => void
    dropProduct: (menuItem: MenuItem) => void
    dropCategory: (menuItem: MenuItem) => void
    dropAdditionalProduct: (menuItem: MenuItem) => void
    dropAdditionalCategory: (menuItem: MenuItem) => void
}

export const removeMenuItem = createAction<MenuItem>(Actions.REMOVE_MENU_ITEM)
export const dropProduct = createAction<MenuItem>(Actions.DROP_PRODUCT)
export const dropCategory = createAction<MenuItem>(Actions.DROP_CATEGORY)
export const dropAdditionalProduct = createAction<MenuItem>(Actions.DROP_ADDITIONAL_PRODUCT)
export const dropAdditionalCategory = createAction<MenuItem>(Actions.DROP_ADDITIONAL_CATEGORY)