import { combineReducers, Reducer } from 'redux'
import { routerReducer as routing, RouteActions } from 'react-router-redux'

import salesplan from './salesplan'
import planitems from './planitems'


export interface RootState {
    saleplan: SalesPlan
    planitems: Array<PlanItem>
}

export default combineReducers<RootState>({
    salesplan,
    planitems
})