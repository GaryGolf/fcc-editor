import * as Actions from './types'
import {createAction} from 'redux-actions'

export interface Interface {
    select: (category: ProductCategory) => Action<ProductCategory>
}

export const select = createAction<ProductCategory>(Actions.SELECT_CATEGORY)