import { combineReducers, Reducer } from 'redux'
import { routerReducer as routing, RouteActions } from 'react-router-redux'

import nomenclature from './nomenclature'
import category, {CurrentCategory} from './category'

export interface RootState {
  routing: RouteActions
  nomenclature: ProductCategory
  category: CurrentCategory
}

export default combineReducers<RootState>({
  routing,
  nomenclature,
  category
})