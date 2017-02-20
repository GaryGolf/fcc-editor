import * as Actions from './types/category'

export function select(category: ProductCategory){
    return {
        type: Actions.SELECT_CATEGORY,
        payload: category
    }
}