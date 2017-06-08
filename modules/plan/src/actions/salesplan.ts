import * as Actions from '../constants/actions'
import * as API from '../api'

export interface Interface {
    doNothing(): Action
    fetchSalesPlan(id: string): Action
    updateSalesPlan(id:string, plan:SalesPlan): Action
}

export const doNothing = () => ({ type: Actions.DO_NOTHING })
export const fetchSalesPlan = (id:string) => ({ type: Actions.FETCH_SALES_PLAN, payload: API.getDocumentView(id)})
export const updateSalesPlan = (id: string, plan:SalesPlan) => ({ type: Actions.UPDATE_SALES_PLAN, payload: API.updateDocumentView(id, plan)})