import * as Actions from '../actions/types/nomenclature'

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

export default function nomenclature(state:ProductCategory = initialState, action: SimpleAction): ProductCategory{

    switch(action.type){
        case Actions.FETCH_NOMENCLATURE_PENDING :
            break
        case Actions.FETCH_NOMENCLATURE_FULFILLED :
            console.log(action.payload)
            return action.payload
        case Actions.FETCH_NOMENCLATURE_REJECTED :
            console.error(action.payload)
    }

    return state
}