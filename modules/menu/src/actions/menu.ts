import * as Actions from './types/menu'
import { createAction } from 'redux-actions'

export const dropProduct = createAction<MenuItem>(Actions.DROP_PRODUCT)
export const dropCategory = createAction<MenuItem>(Actions.DROP_CATEGORY)
export const dropAdditionalCategory = createAction<MenuItem>(Actions.DROP_ADDITIONAL_CATEGORY)