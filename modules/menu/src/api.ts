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
            if(!response.ok) throw response.error()
            return response.json()})
        .then(data => data)
        .catch(error => { throw error})
}


export function loadMenu(){

    const root =    'c03cb760-1575-4858-ab41-52da066b9cd5'
    const menu_id = '647ea788-3b78-4ef3-a885-d0eb1fc18a35'
    const url = CONST.menu_view_url + menu_id
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
            if(!response.ok) throw response.error()
            return response.json()})
        .then(data => data)
        .catch(error => { throw error})        
}

export function createMenuItem(item:MenuItem): Promise<any> {
    
    const root =    'c03cb760-1575-4858-ab41-52da066b9cd5'
    const menu_id = '647ea788-3b78-4ef3-a885-d0eb1fc18a35'
    const newId = uuid()
    const url = 'http://localhost:1337/api.dev.dooglys.com/api/v1/menu/create-node/' + newId
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': 'google',
            'Access-Token': 'infinity_access_token_google'
        },
        body: JSON.stringify({
            id: menu_id,
            MenuSave: item
        })
    }

    return window['fetch'](url, options)
        .then(response => {
            if(!response.ok) throw response.error()
            return response.json()})
        .then(data => data)
        .catch(error => { throw error})      

}