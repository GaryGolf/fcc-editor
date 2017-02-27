import * as Actions from '../actions/types'

const initialState: ProductCategory = {
    id: '',
    icon: '',
    color: '',
    name: '',
    lft: 0,
    rgt: 0,
    depth: 0,
    // child_menus: [], 
    child_categories: [],
    products: []
}

export default function nomenclature(state:ProductCategory = initialState, action: Action): ProductCategory{

    switch(action.type){
        case Actions.FETCH_NOMENCLATURE_PENDING :
            break
        case Actions.FETCH_NOMENCLATURE_FULFILLED :
            return action.payload
        case Actions.FETCH_NOMENCLATURE_REJECTED :
            console.error(action.payload)
    }

    return state
}