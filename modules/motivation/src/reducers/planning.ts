import * as Actions from '../constants/actions'

export interface PlanningReducer {
    current: number
}

const initialState: PlanningReducer = {
    current: null 
}

export default function planning (state = initialState, action: Action): PlanningReducer{

    switch(action.type){
        case Actions.DO_NOTHING :   
            return {current: 1} as PlanningReducer
    }
    return state
}