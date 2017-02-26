import * as Actions from './types'
import { createAction } from 'redux-actions'

export interface Interface {
    fetch(): Action<null>
    removeMenuItem(payload: MenuItem): Action<MenuItem> 
    dropProduct(payload: MenuItem): Action<MenuItem>
    dropCategory(payload: MenuItem): Action<MenuItem>
    dropAdditionalProduct(payload: MenuItem): Action<MenuItem>
    dropAdditionalCategory(payload: MenuItem): Action<MenuItem>
}

export const fetch = () => ({ type: Actions.FETCH_MENU})
export const removeMenuItem = payload => ({ type: Actions.REMOVE_MENU_ITEM, payload })
export const dropProduct = payload => ({ type: Actions.DROP_PRODUCT, payload })
export const dropCategory = payload => ({ type: Actions.DROP_CATEGORY, payload })
export const dropAdditionalProduct = payload => ({ type: Actions.DROP_ADDITIONAL_PRODUCT, payload })
export const dropAdditionalCategory = payload => ({ type: Actions.DROP_ADDITIONAL_CATEGORY, payload })

