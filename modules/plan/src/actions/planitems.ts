import * as Actions from '../constants/actions'
import * as API from '../api'
import * as CONST from '../constants'

export interface Interface {
    fetchPlanItems(id: string, type: string): Action
    createPlanItem(item: PlanItem): Action
    updatePlanItem(item: PlanItem): Action
    removePlanItem(item: PlanItem): Action
    loadFromReport(items:Array<PlanItem>): Action
    loadFromDocument(id:string, type?:string): Action
    cleanPlanItems(ids: Array<string>): Action
}

export const fetchPlanItems = (id:string, type: string) => ({ type: Actions.FETCH_PLAN_ITEMS, payload: API.getDocumentItems(id, type)})
export const createPlanItem = (item:PlanItem) => ({type: Actions.CREATE_PLAN_ITEM, payload: API.createDocumentItem(item)}) 
export const updatePlanItem = (item:PlanItem) => ({type: Actions.UPDATE_PLAN_ITEM, payload: API.updateDocumentItem(item)})
export const removePlanItem = (item:PlanItem) => ({type: Actions.REMOVE_PLAN_ITEM, payload: API.removeDocumentItem(item)})
export const loadFromReport = items => ({type: Actions.LOAD_PLAN_ITEMS_FROM_REPORT, payload: API.loadReportItems(items)})
export const loadFromDocument = id => ({type: Actions.LOAD_PLAN_ITEMS_FROM_DOCUMENT, payload: API.loadDocumenttItems(id)})
export const cleanPlanItems = ids => ({type: Actions.CLEAN_PLAN_ITEMS, payload: API.cleanDocumenttItems(ids)})