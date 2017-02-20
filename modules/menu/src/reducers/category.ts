import * as Actions from '../actions/types/category'


interface Action {
    type: string
    payload?: ProductCategory
}

export interface CurrentCategory {
    current: ProductCategory
}

const initialState: CurrentCategory = {
    current: null 
}

export default function category (state = initialState, action: Action): CurrentCategory{

    switch(action.type){
        case Actions.SELECT_CATEGORY :   
            return {current: action.payload} as CurrentCategory

    }
    return state
}