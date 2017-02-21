import { combineReducers, Reducer } from 'redux'
import { routerReducer as routing, RouteActions } from 'react-router-redux'

import nomenclature from './nomenclature'
import category, {CurrentCategory} from './category'
import menu from './menu'
import view, {ViewState} from './view'

export interface RootState {
  routing: RouteActions
  nomenclature: ProductCategory
  category: CurrentCategory
  menu: MenuState
  view: ViewState
}

export default combineReducers<RootState>({
  routing,
  nomenclature,
  category,
  menu,
  view
})