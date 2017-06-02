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