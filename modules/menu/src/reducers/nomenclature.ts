import * as Actions from '../actions/types/nomenclature'

const initialState: ProductCategory = {
    id: '',
    icon: '',
    color: '',
    name: '',
    lft: 0,
    rgt: 0,
    depth: 0,
    child_menus: [],
    products: []
}

export default function nomenclature(state:ProductCategory = initialState, action: SimpleAction): ProductCategory{

    switch(action.type){
        case Actions.FETCH_NOMENCLATURE_PENDING :
            break
        case Actions.FETCH_NOMENCLATURE_FULFILLED :
            return action.payload
    }

    return state
}