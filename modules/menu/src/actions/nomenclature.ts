import * as Actions from './types/nomenclature'
import * as CONST from '../constants'

export interface Interface {
    fetch: () => Promise<any>
}

export const fetch = function(){

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

    return dispatch =>  dispatch({
        type: Actions.FETCH_NOMENCLATURE_PENDING,
        payload: window['fetch'](url,options)
        .then(response => response.json())
        .then(nomenclature => dispatch({
            type: Actions.FETCH_NOMENCLATURE_FULFILLED,
            payload: nomenclature
        }))
        .catch(error => dispatch({
            type: Actions.FETCH_NOMENCLATURE_REJECTED,
            payload: error
        }))
    })
        
}