import * as Actions from '../constants/actions'

const initialState: Array<Product> = []

export default function products (state = initialState, action: Action): Array<Product>{

    switch(action.type){
        case Actions.FETCH_PRODUCTS :
            const tags = action.payload.child_categories
                .map(({id,name})=>({id,name, type: 'product-tag'})) as Array<Product>
            const products = action.payload.child_categories
                .map(item => item.products)
                .reduce((acc, item) => [...acc, ...item]) 
                .map(({id,name})=>({id, name, type:'product'})) as Array<Product>
            return [...tags, ...products]
    }
    return state
}