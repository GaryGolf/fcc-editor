import * as Actions from '../constants/actions'
import * as API from '../api'

export interface Interface {
    fetchPlanItems(id: string, type: string): Action
    createPlanItem(item: PlanItem): Action
}

export const fetchPlanItems = (id:string, type: string) => ({ type: Actions.FETCH_PLAN_ITEMS, payload: API.getDocumentItems(id, type)})
export const createPlanItem = (item:PlanItem) => ({type: Actions.CREATE_PLAN_ITEM, payload : API.createDocumentItem(item)}) 