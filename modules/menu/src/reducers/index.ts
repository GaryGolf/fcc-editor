import { combineReducers, Reducer } from 'redux'
import { routerReducer as routing, RouteActions } from 'react-router-redux'

import nomenclature from './nomenclature'
import category, {CategoryReducer} from './category'
import menu from './menu'

export interface RootState {
  routing: RouteActions
  nomenclature: ProductCategory
  category: CategoryReducer
  menu: Menu
}

export default combineReducers<RootState>({
  routing,
  nomenclature,
  category,
  menu
})