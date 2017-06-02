import * as Actions from '../constants/actions'

const initialState: Array<Product> = []

export default function products (state = initialState, action: Action): Array<Product>{

    switch(action.type){
        case Actions.FETCH_PRODUCTS :
            return action.payload.child_categories
                .map(item => item.products)
                .reduce((acc, item) => [...acc, ...item]) as Array<Product>
    }
    return state
}