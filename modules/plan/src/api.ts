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
export function getDocumentItems(id: string, type: string){
    const options = {
        url: `${CONST.DOMAIN}api/v1/planning/document/${id}/document-item/${type}`,
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

export function getSalesReport(){

    const dateFrom = '2016-01-01'
    const dateTo = '2017-03-30'
    const options = {
        url: `${CONST.DOMAIN}api/v1/sales/report/sale-point?date_accepted_from=${dateFrom}&date_accepted_to=${dateTo}&sale_point_ids[]=${CONST.SALE_POINT_ID}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': tenantDomain,
            'Access-Token': accessToken
        }
    }
    return axios(options)
        .then(response => response.data[CONST.SALE_POINT_ID])
        .catch(error => { throw error})
}

export function createDocumentItem(body: PlanItem){
    console.log(body)
    const options = {
        url: `${CONST.DOMAIN}api/v1/planning/document-item/create`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': tenantDomain,
            'Access-Token': accessToken
        },
        body: JSON.stringify(body)
    }
    return axios(options)
        .then(response => response.data)
        .catch(error => { throw error})
}