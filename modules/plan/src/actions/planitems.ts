import * as Actions from '../constants/actions'
import * as API from '../api'

export interface Interface {
    fetchPlanItems(id: string, type: string): Action
}

export const fetchPlanItems = (id:string, type: string) => ({ type: Actions.FETCH_SALES_PLAN, payload: API.getDocumentItems(id, type)})