import * as Actions from './actions/types'
import * as CONST from './constants'
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
    const url = CONST.DOMAIN + 'api/v1/product-category/info'
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': getTenantDomain(),
            'Access-Token': getAccessToken()
        }
    }
    return window['fetch'](url, options)
        .then(response => {
            if(!response.ok) throw new Error(response.statusText)
            return response.json()})
        .then(data => data)
        .catch(error => { throw error})
}


export function loadMenu(){

    const menu_id = '647ea788-3b78-4ef3-a885-d0eb1fc18a35' // dev
    // const menu_id = 'de1b6a1f-805f-47bf-a6b7-4d7798c50e8d'  //release
    const url = CONST.DOMAIN + 'api/v1/menu/view/' + menu_id + '?scenario=full'
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': getTenantDomain(),
            'Access-Token': getAccessToken()
        }
    }
    return window['fetch'](url, options)
        .then(response => {
            if(!response.ok) throw new Error(response.statusText)
            return response.json()})
        .then(data => data)
        .catch(error => { throw error})        
}

export function createMenuItem(menuItem:MenuItem): Promise<any> {
    
    // const menu_id = '647ea788-3b78-4ef3-a885-d0eb1fc18a35'  // TODO change menu_id to root_id, taken from <META>
    const menu_id = '647ea788-3b78-4ef3-a885-d0eb1fc18a35' // dev
    // const menu_id = 'de1b6a1f-805f-47bf-a6b7-4d7798c50e8d'  //release
    const products = menuItem.products.map(v => v.id)
    const product_categories = menuItem.product_categories.map(v => v.id)
    const url = CONST.DOMAIN + 'api/v1/menu/create-node/' + menu_id
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': getTenantDomain(),
            'Access-Token': getAccessToken()
        },
        body: JSON.stringify({...menuItem, products, product_categories})
    }

    return window['fetch'](url, options)
        .then(response => {
            if(!response.ok) throw new Error(response.statusText)
            return response.json()})
        .then(data => data)
        .catch(error => { throw error})      
}

export function updateMenuItem(menuItem:MenuItem): Promise<any> {
    
    const menu_id = '647ea788-3b78-4ef3-a885-d0eb1fc18a35'
    const products = menuItem.products.map(v => v.id)
    const product_categories = menuItem.product_categories.map(v => v.id)
    const icon = menuItem.icon_name
    const url = CONST.DOMAIN + 'api/v1/menu/update/' + menuItem.id
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': getTenantDomain(),
            'Access-Token': getAccessToken()
        },
        body: JSON.stringify({...menuItem, products, product_categories, icon })
    }
    return window['fetch'](url, options)
        .then(response => {
            if(!response.ok) throw new Error(response.statusText)
            return response.json()})
        .then(data => data)
        .catch(error => { throw error})      
}

export function deleteMenuItem(menuItem:MenuItem): Promise<any> {
 
    const url = CONST.DOMAIN + 'api/v1/menu/delete/' + menuItem.id
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': getTenantDomain(),
            'Access-Token': getAccessToken()
        }
    }
    return window['fetch'](url, options)
        .then(response => {
            if(!response.ok) throw new Error(response.statusText)
            return response.json()})
        .then(data => data)
        .catch(error => { throw error})      
}