import * as Actions from './types'
import * as API from '../api'

export interface Interface {
    fetch(): Action
    removeMenuItem(payload: MenuItem): Action
    updateMenuItem(payload: MenuItem): Action
    dropProduct(payload: MenuItem): Action
    dropCategory(payload: MenuItem): Action
    dropAdditionalProduct(payload: MenuItem): Action
    dropAdditionalCategory(payload: MenuItem): Action
}

export const fetch = () => ({ type: Actions.FETCH_MENU, payload: API.loadMenu()})
export const removeMenuItem = payload => ({ type: Actions.REMOVE_MENU_ITEM, payload: API.deleteMenuItem(payload) })
export const updateMenuItem = payload => ({ type: Actions.UPDATE_MENU_ITEM, payload: API.updateMenuItem(payload) })
export const dropProduct = payload => ({ type: Actions.DROP_PRODUCT, payload: API.createMenuItem(payload) })
export const dropCategory = payload => ({ type: Actions.DROP_CATEGORY, payload: API.createMenuItem(payload) })
export const dropAdditionalProduct = payload => ({ type: Actions.DROP_ADDITIONAL_PRODUCT, payload: API.updateMenuItem(payload) })
export const dropAdditionalCategory = payload => ({ type: Actions.DROP_ADDITIONAL_CATEGORY, payload: API.updateMenuItem(payload) })

