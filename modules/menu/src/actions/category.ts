import * as Actions from './types/category'
import {createAction} from 'redux-actions'

export interface Interface {
    select: (category: ProductCategory) => SimpleAction
}

export const select = createAction<ProductCategory>(Actions.SELECT_CATEGORY)