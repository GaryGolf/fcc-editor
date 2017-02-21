import * as Actions from './types/menu'
import { createAction } from 'redux-actions'

export const dropProduct = createAction<MenuItem>(Actions.DROP_PRODUCT)
export const dropCategory = createAction<MenuItem>(Actions.DROP_CATEGORY)
export const dropAdditionalProduct = createAction<MenuItem>(Actions.DROP_ADDITIONAL_PRODUCT)
export const dropAdditionalCategory = createAction<MenuItem>(Actions.DROP_ADDITIONAL_CATEGORY)