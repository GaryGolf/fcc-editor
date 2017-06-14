import { combineReducers, Reducer } from 'redux'
import { routerReducer as routing, RouteActions } from 'react-router-redux'

import salesplan from './salesplan'
import planitems from './planitems'
import products from './products'
import salesreport from './salesreport'
import salesplanlist from './salesplanlist'
import salepointlist from './salepointlist'


export interface RootState {
    salesplan: SalesPlan
    planitems: Array<PlanItem>
    products: Array<Product>
    salesreport: Array<SalesReport>
    salesplanlist: Array<SalesPlan>
    salepointlist: Array<SalePoint>
}

export default combineReducers<RootState>({
    salesplan,
    planitems,
    products,
    salesreport,
    salesplanlist,
    salepointlist
})