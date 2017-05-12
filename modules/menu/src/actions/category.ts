import * as Actions from './types'

export interface Interface {
    select(category: ProductCategory): Action
}

export const select = payload => ({ type: Actions.SELECT_CATEGORY, payload })