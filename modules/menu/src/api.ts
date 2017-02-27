import * as Actions from './actions/types'
import * as CONST from './constants'
const uuid = require('uuid')

export function loadNomenclature(){
    const url = 'http://localhost:1337/api.dev.dooglys.com/api/v1/product-category/info'
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': 'google',
            'Access-Token': 'infinity_access_token_google'
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

    const menu_id = '647ea788-3b78-4ef3-a885-d0eb1fc18a35'
    const url = CONST.menu_view_url + menu_id + '?scenario=full'
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': 'google',
            'Access-Token': 'infinity_access_token_google'
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
    
    const menu_id = '647ea788-3b78-4ef3-a885-d0eb1fc18a35'  // TODO change menu_id to root_id, taken from <META>
    const products = menuItem.products.map(v => v.id)
    const product_categories = menuItem.product_categories.map(v => v.id)
    const url = 'http://localhost:1337/api.dev.dooglys.com/api/v1/menu/create-node/' + menu_id 
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': 'google',
            'Access-Token': 'infinity_access_token_google'
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
    const url = 'http://localhost:1337/api.dev.dooglys.com/api/v1/menu/update/' + menuItem.id
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': 'google',
            'Access-Token': 'infinity_access_token_google'
        },
        body: JSON.stringify({...menuItem, products, product_categories })
    }
    return window['fetch'](url, options)
        .then(response => {
            if(!response.ok) throw new Error(response.statusText)
            return response.json()})
        .then(data => data)
        .catch(error => { throw error})      
}


export function deleteMenuItem(menuItem:MenuItem): Promise<any> {
 
    const url = 'http://localhost:1337/api.dev.dooglys.com/api/v1/menu/delete/' + menuItem.id
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': 'google',
            'Access-Token': 'infinity_access_token_google'
        }
    }
    return window['fetch'](url, options)
        .then(response => {
            if(!response.ok) throw new Error(response.statusText)
            return response.json()})
        .then(data => data)
        .catch(error => { throw error})      
}