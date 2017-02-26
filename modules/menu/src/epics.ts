import { combineEpics, Epic, ActionsObservable } from 'redux-observable'
import  'rxjs'  // TODO make path more specific

import * as Actions from './actions/types'
import * as CONST from './constants'
import * as API from './api'

interface Menu {
  child_menus: MenuState
}

// Nomenclature 
const fetchNomenclature: Epic<Action<ProductCategory>, null> = action$ =>
  action$.ofType(Actions.FETCH_NOMENCLATURE)
    .mergeMap(action => ActionsObservable.fromPromise(API.loadNomenclature())
      .takeUntil(action$.ofType(Actions.FETCH_NOMENCLATURE_TIMEOUT)))
    .map(payload => ({type: Actions.FETCH_NOMENCLATURE_FULFILLED, payload}))
    .catch(payload => ActionsObservable.of({ type: Actions.FETCH_NOMENCLATURE_REJECTED, payload }))

const fetchNomenclaturePendeing: Epic<Action<null>, null> = action$ =>
  action$.ofType(Actions.FETCH_NOMENCLATURE)
    .map(() => ({type: Actions.FETCH_NOMENCLATURE_PENDING}))

const fetchNomenclatureTimeot: Epic<Action<null>, null> = action$ =>
  action$.ofType(Actions.FETCH_NOMENCLATURE_PENDING)
    .delay(CONST.API_LOAD_TIMEOUT)
    .takeUntil(action$.ofType(Actions.FETCH_NOMENCLATURE_FULFILLED))
    .takeUntil(action$.ofType(Actions.FETCH_NOMENCLATURE_REJECTED))
    .map(() => ({type: Actions.FETCH_NOMENCLATURE_TIMEOUT}))

 // menu
const fetchMenu: Epic<Action<any>, null> = action$ =>
  action$.ofType(Actions.FETCH_MENU)
    .mergeMap(action => ActionsObservable.fromPromise(API.loadMenu() as Promise<Menu>)
        .takeUntil(action$.ofType(Actions.FETCH_MENU_TIMEOUT)))
    .map(menu => ({type: Actions.FETCH_MENU_FULFILLED, payload: menu.child_menus }))
    .catch(payload => ActionsObservable.of({ type: Actions.FETCH_MENU_REJECTED, payload }))

const fetchMenuPendeing: Epic<Action<null>, null> = action$ =>
  action$.ofType(Actions.FETCH_MENU)
    .map(() => ({type: Actions.FETCH_MENU_PENDING}))    

const fetchMenuTimeot: Epic<Action<null>, null> = action$ =>
  action$.ofType(Actions.FETCH_MENU_PENDING)
    .delay(CONST.API_LOAD_TIMEOUT)
    .takeUntil(action$.ofType(Actions.FETCH_MENU_FULFILLED))
    .takeUntil(action$.ofType(Actions.FETCH_MENU_REJECTED))
    .map(() => ({type: Actions.FETCH_MENU_TIMEOUT}))    


const saveMenuItem: Epic<Action<MenuItem>, null> = action$ =>
  action$.ofType(Actions.DROP_PRODUCT)
    .mergeMap(action => ActionsObservable.fromPromise(API.createMenuItem(action.payload)))
    .map(response => { 
      console.log(response)
      return {type: 'OK'}
    })

export default combineEpics(
  fetchNomenclature,
  fetchNomenclaturePendeing,
  fetchNomenclatureTimeot,
  fetchMenu,
  fetchMenuPendeing,
  fetchMenuTimeot,
  saveMenuItem
)


