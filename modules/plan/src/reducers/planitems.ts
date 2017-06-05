import * as Actions from '../constants/actions'

const initialState: Array<PlanItem> = []

export default function planitems (state = initialState, action: Action): Array<PlanItem>{

    
    switch(action.type){
        case Actions.FETCH_PLAN_ITEMS :
        console.log(action.payload)
            return action.payload as PlanItem[]
        case Actions.CREATE_PLAN_ITEM :
            return [...state, action.payload]
    }
    return state
}