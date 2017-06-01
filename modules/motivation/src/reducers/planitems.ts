import * as Actions from '../constants/actions'
import * as API from '../api'

const initialState: Array<PlanItem> = []

export default function planitems (state = initialState, action: Action): Array<PlanItem>{

    switch(action.type){
        case Actions.FETCH_PLAN_ITEMS :
            return action.payload as PlanItem[]
    }
    return state
}