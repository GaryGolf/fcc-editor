import * as Actions from '../constants/actions'



const initialState: SalesPlan = null

export default function salesplan (state = initialState, action: Action): SalesPlan{

    switch(action.type){
        case Actions.FETCH_SALES_PLAN :   
            return action.payload as SalesPlan
    }
    return state
}