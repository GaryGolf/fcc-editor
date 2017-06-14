import * as Actions from '../constants/actions'
import * as API from '../api'

export interface Interface {
    fetchSalesPlan(id: string): Action
    saveSalesPlan(plan:SalesPlan): Action
    
    updateSalesPlan(plan:SalesPlan): Action
    registerSalesPlan(plan:SalesPlan): Action
    unregisterSalesPlan(plan:SalesPlan): Action
}

export const fetchSalesPlan = (id:string) => ({ type: Actions.FETCH_SALES_PLAN, payload: API.getDocumentView(id)})
export const saveSalesPlan = plan => ({ type: Actions.SAVE_SALES_PLAN, payload: API.updateDocumentView(plan)})
export const updateSalesPlan = plan => ({ type: Actions.UPDATE_SALES_PLAN, payload: plan }) //API.updateDocumentView(plan)})
export const registerSalesPlan = (plan:SalesPlan) => ({ type: Actions.REGISTER_SALES_PLAN, payload: API.registerDocumentView(plan)})
export const unregisterSalesPlan = (plan:SalesPlan) => ({ type: Actions.UNREGISTER_SALES_PLAN, payload: API.unregisterDocumentView(plan)})