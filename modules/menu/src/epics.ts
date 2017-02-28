import { combineEpics, Epic, ActionsObservable } from 'redux-observable'
import  'rxjs'  // TODO make path more specific

import * as Actions from './actions/types'
import * as CONST from './constants'
import * as API from './api'

interface Menu {
  child_menus: MenuState
}

type Store = { getState: Function, dispatch: Function }

// Nomenclature 
const fetchNomenclature: Epic<Action, null> = action$ =>
  action$.ofType(Actions.FETCH_NOMENCLATURE)
    .mergeMap(action => ActionsObservable.fromPromise(API.loadNomenclature())
      .takeUntil(action$.ofType(Actions.FETCH_NOMENCLATURE_TIMEOUT)))
    .map(payload => ({type: Actions.FETCH_NOMENCLATURE_FULFILLED, payload}))
    .catch(payload => ActionsObservable.of({ type: Actions.FETCH_NOMENCLATURE_REJECTED, payload }))
    
const fetchNomenclaturePendeing: Epic<Action, null> = action$ =>
  action$.ofType(Actions.FETCH_NOMENCLATURE)
    .map(() => ({type: Actions.FETCH_NOMENCLATURE_PENDING}))

const fetchNomenclatureTimeot: Epic<Action, null> = action$ =>
  action$.ofType(Actions.FETCH_NOMENCLATURE_PENDING)
    .delay(CONST.API_LOAD_TIMEOUT)
    .takeUntil(action$.ofType(Actions.FETCH_NOMENCLATURE_FULFILLED, Actions.FETCH_NOMENCLATURE_REJECTED))
    .map(() => ({type: Actions.FETCH_NOMENCLATURE_TIMEOUT}))
    

 // menu
const fetchMenu: Epic<Action, null> = action$ =>
  action$.ofType(Actions.FETCH_MENU)
    .mergeMap(action => ActionsObservable.fromPromise(API.loadMenu() as Promise<Menu>)
        .takeUntil(action$.ofType(Actions.FETCH_MENU_TIMEOUT)))
    .map(menu => ({type: Actions.FETCH_MENU_FULFILLED, payload: menu.child_menus }))
    .catch(payload => ActionsObservable.of({ type: Actions.FETCH_MENU_REJECTED, payload }))

const fetchMenuPendeing: Epic<Action, null> = action$ =>
  action$.ofType(Actions.FETCH_MENU)
    .map(() => ({type: Actions.FETCH_MENU_PENDING}))    

const fetchMenuTimeot: Epic<Action, null> = action$ =>
  action$.ofType(Actions.FETCH_MENU_PENDING)
    .delay(CONST.API_LOAD_TIMEOUT)
    .takeUntil(action$.ofType(Actions.FETCH_MENU_FULFILLED, Actions.FETCH_MENU_REJECTED))
    .map(() => ({type: Actions.FETCH_MENU_TIMEOUT}))    

const saveMenuItem: Epic<Action, null> = action$ =>
  action$.ofType(Actions.DROP_PRODUCT, Actions.DROP_CATEGORY)
    .mergeMap(action => ActionsObservable.fromPromise(API.createMenuItem(action.payload)))
    .map(response => ({type: Actions.CREATE_MENU_ITEM_FULFILLED}))
    .catch(error => ActionsObservable.of({ type: Actions.CREATE_MENU_ITEM_REJECTED, payload: error }))

const addItemToMenu: Epic<Action, null> = action$ =>
  action$.ofType(Actions.DROP_ADDITIONAL_PRODUCT, Actions.DROP_ADDITIONAL_CATEGORY)
    .mergeMap(action => ActionsObservable.fromPromise(API.updateMenuItem(action.payload)))
    .map(response => ({type: Actions.UPDATE_MENU_ITEM_FULFILLED}))
    .catch(error => ActionsObservable.of({ type: Actions.UPDATE_MENU_ITEM_REJECTED, payload: error }))

const updateMenuItem: Epic<Action, null> = action$ =>
  action$.ofType(Actions.UPDATE_MENU_ITEM)
    .mergeMap(action => ActionsObservable.fromPromise(API.updateMenuItem(action.payload)))
    .map(response => ({type: Actions.UPDATE_MENU_ITEM_FULFILLED}))
    .catch(error => ActionsObservable.of({ type: Actions.UPDATE_MENU_ITEM_REJECTED, payload: error }))

const removeMenuItem: Epic<Action, null> = action$ =>
  action$.ofType(Actions.REMOVE_MENU_ITEM)
    .mergeMap(action => ActionsObservable.fromPromise(API.deleteMenuItem(action.payload)))
    .map(response => ({type: Actions.REMOVE_MENU_ITEM_FULFILLED}))
    .catch(error => ActionsObservable.of({ type: Actions.REMOVE_MENU_ITEM_REJECTED, payload: error }))

export default combineEpics(
  fetchNomenclature,
  fetchNomenclaturePendeing,
  fetchNomenclatureTimeot,
  fetchMenu,
  fetchMenuPendeing,
  fetchMenuTimeot,
  saveMenuItem,
  addItemToMenu,
  updateMenuItem,
  removeMenuItem
)


