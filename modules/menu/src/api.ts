import * as Actions from './actions/types'
import * as CONST from './constants'
import axios from 'axios'
const uuid = require('uuid')


function getTenantDomain() {
    const element = document.querySelector('meta[name=tenant-domain]')
    if(element) return element['content']
    return null
}

function getAccessToken() {
    const element = document.querySelector('meta[name=access-token]')
    if(element) return element['content']
    return null
}

export function loadNomenclature(){
    const options = {
        url: CONST.DOMAIN + 'api/v1/nomenclature/category/info',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': getTenantDomain(),
            'Access-Token': getAccessToken()
        }
    }
    return axios(options)
        .then(response => response.data)
        .catch(error => { throw error})
}

export function loadMenu(){

    const menu_id = '647ea788-3b78-4ef3-a885-d0eb1fc18a35' // dev
    // const menu_id = 'de1b6a1f-805f-47bf-a6b7-4d7798c50e8d'  //release
    const options = {
        url: CONST.DOMAIN + 'api/v1/terminal-menu/menu/view/' + menu_id + '?scenario=full',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': getTenantDomain(),
            'Access-Token': getAccessToken()
        }
    }
    return axios(options)
        .then(response => response.data)
        .catch(error => { throw error})        
}

export function createMenuItem(menuItem:MenuItem): Promise<any> {
    
    // const menu_id = '647ea788-3b78-4ef3-a885-d0eb1fc18a35'  // TODO change menu_id to root_id, taken from <META>
    const menu_id = '647ea788-3b78-4ef3-a885-d0eb1fc18a35' // dev
    // const menu_id = 'de1b6a1f-805f-47bf-a6b7-4d7798c50e8d'  //release
    const products = menuItem.products.map(v => v.id)
    const product_categories = menuItem.product_categories.map(v => v.id)
    
    const options = {
        url: CONST.DOMAIN + 'api/v1/terminal-menu/menu/create-node/' + menu_id,
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Tenant-Domain': getTenantDomain(),
            'Access-Token': getAccessToken()
        },
        data: {...menuItem, products, product_categories}
    }
    return axios(options)
        .then(response => response.data)
        .catch(error => { throw error})      
}

export function updateMenuItem(menuItem:MenuItem): Promise<any> {
    const menu_id = '647ea788-3b78-4ef3-a885-d0eb1fc18a35'
    const products = menuItem.products.map(v => v.id)
    const product_categories = menuItem.product_categories.map(v => v.id)
    const icon = menuItem.icon_name
    const options = {
        url: CONST.DOMAIN + 'api/v1/terminal-menu/menu/update/' + menuItem.id,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': getTenantDomain(),
            'Access-Token': getAccessToken()
        },
        data: {...menuItem, products, product_categories, icon }
    }
    return axios(options)
        .then(response => response.data)
        .catch(error => { throw error})      
}

export function deleteMenuItem(menuItem:MenuItem): Promise<any> {
 
    const options = {
        url: CONST.DOMAIN + 'api/v1/terminal-menu/menu/delete/' + menuItem.id,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': getTenantDomain(),
            'Access-Token': getAccessToken()
        }
    }
    return axios(options)
        .then(response => response.data)
        .catch(error => { throw error})      
}