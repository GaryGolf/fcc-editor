import * as Actions from '../constants/actions'

const initialState: Array<PlanItem> = []

export default function planitems (state = initialState, action: Action): Array<PlanItem>{


    
    switch(action.type){
        case Actions.CREATE_PLAN_ITEM : 
            return [...state,action.payload]
        case Actions.UPDATE_PLAN_ITEM :
            return state.map(item => item.id != action.payload.id ? item : action.payload)


        case Actions.FETCH_PLAN_ITEMS :
            return action.payload
        case Actions.FETCH_TURNOVER_ITEM :
            return Array.isArray(action.payload)?[...state,...action.payload]:[...state,action.payload]
        case Actions.REMOVE_PLAN_ITEM :
            return state.filter(item => item.id != action.payload.id)
        case Actions.UPDATE_PLAN_ITEM :
            return state.map(item => item.id != action.payload.id ? item : action.payload)
        case Actions.LOAD_PLAN_ITEMS_FROM_REPORT :
        case Actions.LOAD_PLAN_ITEMS_FROM_DOCUMENT :
            return [...state, ...action.payload
                .filter(item=>!item.error_description)
                .map(item=>item.content)]
        case Actions.CLEAN_PLAN_ITEMS :
            return []
    }
    return state
}