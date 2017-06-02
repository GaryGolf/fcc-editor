import * as Actions from '../constants/actions'
import * as API from '../api'

export interface Interface {
    fetchSalesReport(): Action
}

export const fetchSalesReport = () => ({ type: Actions.FETCH_SALES_REPORT, payload: API.getSalesReport()})