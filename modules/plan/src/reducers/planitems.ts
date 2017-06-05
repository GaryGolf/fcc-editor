import * as Actions from '../constants/actions'

const initialState: Array<PlanItem> = []

export default function planitems (state = initialState, action: Action): Array<PlanItem>{

    
    switch(action.type){
        case Actions.FETCH_PLAN_ITEMS :
            return action.payload
        case Actions.CREATE_PLAN_ITEM :
            return [...state, action.payload]
        case Actions.REMOVE_PLAN_ITEM :
            return state.filter(item => item.id != action.payload.id)
        case Actions.UPDATE_PLAN_ITEM :
            return state.map(item => item.id != action.payload.id ? item : action.payload)
    }
    return state
}