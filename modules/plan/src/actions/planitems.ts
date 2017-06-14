import * as Actions from '../constants/actions'
import * as API from '../api'
import * as CONST from '../constants'

export interface Interface {
    fetchPlanItems(id: string): Action
    fetchTurnoverItem(id:string): Action
    // savePlanItems(items:PlanItem[]): Action
    savePlanItems(planItems:PlanItem[]): Action
    createPlanItem(item: PlanItem): Action
    updatePlanItem(item: PlanItem): Action
    removePlanItem(item: PlanItem): Action
    loadFromReport(items:Array<PlanItem>): Action
    loadFromDocument(id:string, type?:string): Action
    cleanPlanItems(ids: Array<string>): Action
}

export const fetchPlanItems = id => ({ type: Actions.FETCH_PLAN_ITEMS, payload: API.getDocumentItems(id, 'product')})
export const fetchTurnoverItem = id => ({ type: Actions.FETCH_TURNOVER_ITEM, payload: API.getDocumentItems(id, 'sale-point')})
// export const savePlanItem = items => ({type: Actions.CREATE_PLAN_ITEM, payload: API.createDocumentItem(items)}) 
export const createPlanItem = item => ({type: Actions.CREATE_PLAN_ITEM, payload: item }) //API.createDocumentItem(item)}) 
export const updatePlanItem = item => ({type: Actions.UPDATE_PLAN_ITEM, payload: item })//API.updateDocumentItem(item)})
export const removePlanItem = item => ({type: Actions.REMOVE_PLAN_ITEM, payload: item }) //API.removeDocumentItem(item)})
export const loadFromReport = items => ({type: Actions.LOAD_PLAN_ITEMS_FROM_REPORT, payload: items }) //API.loadReportItems(items)})
export const loadFromDocument = id => ({type: Actions.LOAD_PLAN_ITEMS_FROM_DOCUMENT, payload: API.loadDocumenttItems(id)})
export const cleanPlanItems = ids => ({type: Actions.CLEAN_PLAN_ITEMS, payload: API.cleanDocumenttItems(ids)})