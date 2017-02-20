import * as Actions from './types/menu'



export function load(){
    // load menu
}

interface ProductCategoryAction {
    type: string
    payload: MenuItem
}

export function dropCategory(category: MenuItem):ProductCategoryAction {
    return {
        type: Actions.DROP_CATEGORY,
        payload: category
    }
}