import * as Actions from '../constants/actions'
import * as API from '../api'

export interface Interface {
    doNothing(): Action
    fetchSalesPlan(id: string): Action
    updateSalesPlan(plan:SalesPlan): Action
    registerSalesPlan(plan:SalesPlan): Action
    unregisterSalesPlan(plan:SalesPlan): Action
}

export const doNothing = () => ({ type: Actions.DO_NOTHING })
export const fetchSalesPlan = (id:string) => ({ type: Actions.FETCH_SALES_PLAN, payload: API.getDocumentView(id)})
export const updateSalesPlan = (plan:SalesPlan) => ({ type: Actions.UPDATE_SALES_PLAN, payload: API.updateDocumentView(plan)})
export const registerSalesPlan = (plan:SalesPlan) => ({ type: Actions.REGISTER_SALES_PLAN, payload: API.registerDocumentView(plan)})
export const unregisterSalesPlan = (plan:SalesPlan) => ({ type: Actions.UNREGISTER_SALES_PLAN, payload: API.unregisterDocumentView(plan)})