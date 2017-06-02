import * as Actions from '../constants/actions'
import * as API from '../api'

export interface Interface {
    fetchProducts(): Action
}

export const fetchProducts = () => ({ type: Actions.FETCH_PRODUCTS, payload: API.getNomenclature()})