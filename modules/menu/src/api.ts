import * as Actions from './actions/types'
import * as CONST from './constants'
import axios from 'axios'
const uuid = require('uuid')

function getTenantDomain() {
    const element = document.querySelector('meta[name=tenant-domain]')
    return !!element ? element['content'] : null
}

function getAccessToken() {
    const element = document.querySelector('meta[name=access-token]')
    return !!element ? element['content'] : null
}

function getMenuID() {
    const element = document.querySelector('#interactive-menu')
    return !!element ? element.getAttribute('data-id') : null
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

    const menu_id = getMenuID()
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
    
    const menu_id = getMenuID()
    const products = menuItem.products.map(v => v.id)
    const product_categories = menuItem.product_categories.map(v => v.id)
    
    const options = {
        url: CONST.DOMAIN + 'api/v1/terminal-menu/menu/create-node/' + menu_id,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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
   // const menu_id = getMenuID()
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
        .then(response => !!response.data ? menuItem : null )
        .catch(error => { throw error})      
}