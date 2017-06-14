import * as Actions from './constants/actions'
import * as CONST from './constants'
import axios from 'axios'

const accessToken = document.querySelector('meta[name=access-token]').getAttribute('content')
const tenantDomain = document.querySelector('meta[name=tenant-domain]').getAttribute('content')

export function getDocumentView(id: string){
    const options = {
        url: `${CONST.DOMAIN}api/v1/planning/document/view/${id}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': tenantDomain,
            'Access-Token': accessToken
        }
    }
    return axios(options)
        .then(response => response.data)
        .catch(error => { throw error})
}

export function updateDocumentView(plan: SalesPlan){
    const id = plan.id
    const options = {
        url: `${CONST.DOMAIN}api/v1/planning/document/update/${id}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': tenantDomain,
            'Access-Token': accessToken
        }, data: JSON.stringify(plan)
    }
    return axios(options)
        .then(response => response.data)
        .catch(error => { throw error})
}

export function registerDocumentView(plan: SalesPlan){
    const id = plan.id
    const options = {
        url: `${CONST.DOMAIN}api/v1/planning/document/register/${id}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': tenantDomain,
            'Access-Token': accessToken
        }
    }
    return axios(options)
        .then(response => ({...plan, is_register: true}))
        .catch(error => { throw error})
}

export function unregisterDocumentView(plan: SalesPlan){
    const id = plan.id
    const options = {
        url: `${CONST.DOMAIN}api/v1/planning/document/un-register/${id}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': tenantDomain,
            'Access-Token': accessToken
        }
    }
    return axios(options)
        .then(response => ({...plan, is_register: false}))
        .catch(error => { throw error})
}


export function getDocumentItems(id:string, type:string){
    const options = {
        url: `${CONST.DOMAIN}api/v1/planning/document/${id}/document-item/${type}?per-page=10000`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': tenantDomain,
            'Access-Token': accessToken
        }
    }
    return axios(options)
        .then(response => response.data)
        .catch(error => { throw error})
}

export function getNomenclature(){

    const options = {
        url: `${CONST.DOMAIN}api/v1/nomenclature/category/info`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': tenantDomain,
            'Access-Token': accessToken
        }
    }
    return axios(options)
        .then(response => response.data)
        .catch(error => { throw error})
}

export function getSalesReport(sale_point_id: string){

    const today = new Date()
    const y = today.getFullYear()
    const m = today.getMonth()
    const dateFrom = new Date(y,m-6,1).toISOString().substr(0,10)
    const dateTo = new Date(y,m+1,0).toISOString().substr(0,10)
    const options = {
        url: `${CONST.DOMAIN}api/v1/sales/report/sale-point?date_accepted_from=${dateFrom}&date_accepted_to=${dateTo}&sale_point_ids[]=${sale_point_id}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': tenantDomain,
            'Access-Token': accessToken
        }
    }
    return axios(options)
        .then(response => response.data[sale_point_id])
        .catch(error => { throw error})
}

export function createDocumentItem(item: PlanItem){
    const options = {
        url: `${CONST.DOMAIN}api/v1/planning/document-item/create`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': tenantDomain,
            'Access-Token': accessToken
        },
        data: JSON.stringify(item)
    }
    return axios(options)
        .then(response => response.data)
        .catch(error => { throw error})
}

export function updateDocumentItem(item: PlanItem){
    const options = {
        url: `${CONST.DOMAIN}api/v1/planning/document-item/update/${item.id}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': tenantDomain,
            'Access-Token': accessToken
        },
        data: JSON.stringify(item)
    }
    return axios(options)
        .then(response => response.data)
        .catch(error => { throw error})
}

export function removeDocumentItem(item: PlanItem){
    const options = {
        url: `${CONST.DOMAIN}api/v1/planning/document-item/delete/${item.id}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': tenantDomain,
            'Access-Token': accessToken
        }
    }
    return axios(options)
        .then(_=>item)
        .catch(error => { throw error})
}


export function getDocumentList(){
    const options = {
        url: `${CONST.DOMAIN}api/v1/planning/document/list`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': tenantDomain,
            'Access-Token': accessToken
        }
    }
    return axios(options)
        .then(response=>response.data)
        .catch(error => { throw error})
}

export function getSalePointList(){
    const options = {
        url: `${CONST.DOMAIN}api/v1/structure/sale-point/list`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': tenantDomain,
            'Access-Token': accessToken
        }
    }
    return axios(options)
        .then(response=>response.data)
        .catch(error => { throw error})
}

export function loadReportItems(items: Array<PlanItem>){
    const method = 'POST'
    const uri = `http://pekarni.dev.dooglys.com/api/v1/planning/document-item/create` // ToDo !!
    const data = items.map(body=>({method, uri, body}))
    const options = {
        url: `${CONST.DOMAIN}api/v1/system/batch/execute`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': tenantDomain,
            'Access-Token': accessToken
        },
        data: JSON.stringify(data)
    }
    return axios(options)
        .then(response => response.data)
        .catch(error => { throw error})
}

export function loadDocumenttItems(id: string, type='product') {
    return getDocumentItems(id,type)
        .then(items=>loadReportItems(items
            .filter(item=>item.type==type)
            .map(({ item_id, plan, price, cost_price, type, percent, days })=>
            ({ item_id, planning_document_id:CONST.PLAN_ID, plan, price, cost_price, type, percent, days }))
        ))
        .catch(error => { throw error})
}

export function cleanDocumenttItems(ids: Array<string>) {
    const method = 'POST'
    const uri = `http://pekarni.dev.dooglys.com/api/v1/planning/document-item/delete/` // ToDo !!
    const data = ids.map(id=>({method, uri: uri+id}))
    const options = {
        url: `${CONST.DOMAIN}api/v1/system/batch/execute`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': tenantDomain,
            'Access-Token': accessToken
        }, data: JSON.stringify(data)
        
    }
    return axios(options)
        .then(response => [])
        .catch(error => { throw error})
}

export function clearDocumentItems(){
    const options = {
        url: `${CONST.DOMAIN}api/v1/planning/document/clear/${CONST.PLAN_ID}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': tenantDomain,
            'Access-Token': accessToken
        }
    }
    return axios(options)
        .then(response => [])
        .catch(error => { throw error})
}

export function batchCreateDocumentItem(items: PlanItem[]){
    const options = {
        url: `${CONST.DOMAIN}api/v1/planning/document-item/batch-create`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': tenantDomain,
            'Access-Token': accessToken
        },
        data: JSON.stringify({items})
    }
    return clearDocumentItems()
        .then(_=>axios(options))
        .then(response => response.data)
        .catch(error => { throw error})
}
