import { combineReducers, Reducer } from 'redux'
import { routerReducer as routing, RouteActions } from 'react-router-redux'

import planning, {PlanningReducer} from './planning'


export interface RootState {
    planning: PlanningReducer
 
}

export default combineReducers<RootState>({planning})