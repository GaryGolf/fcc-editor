import * as Actions from '../constants/actions'

export interface PlanningReducer {
    current: SalesPlan
}

const initialState: PlanningReducer = {
    current: null 
}

export default function planning (state = initialState, action: Action): PlanningReducer{

    switch(action.type){
        case Actions.FETCH_SALES_PLAN :   
            return {current: action.payload} as PlanningReducer
    }
    return state
}