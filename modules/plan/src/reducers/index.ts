import { combineReducers, Reducer } from 'redux'
import { routerReducer as routing, RouteActions } from 'react-router-redux'

import salesplan from './salesplan'
import planitems from './planitems'
import products from './products'
import salesreport from './salesreport'


export interface RootState {
    saleplan: SalesPlan
    planitems: Array<PlanItem>
    products: Array<Product>
    salesreport: Array<SalesReport>
}

export default combineReducers<RootState>({
    salesplan,
    planitems,
    products,
    salesreport
})