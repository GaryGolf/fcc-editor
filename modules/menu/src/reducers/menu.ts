import * as Actions from '../actions/types'

const initialState: Menu = null

export default function menu(state:Menu=initialState, {type, payload}): Menu {

    switch(type){
        case Actions.CREATE_MENU_ITEM:
        case Actions.DROP_CATEGORY : 
        case Actions.DROP_PRODUCT : {
            const child_menus = [...state.child_menus, payload]
                .sort((a,b) => a.cell-b.cell)
            return {...state, child_menus }
        }
        case Actions.DROP_ADDITIONAL_PRODUCT :
        case Actions.DROP_ADDITIONAL_CATEGORY : {
            const child_menus = state.child_menus
                .map(item => payload.id == item.id ? payload : item)
                .sort((a,b) => a.cell-b.cell)
            return {...state, child_menus}
        }
        case Actions.REMOVE_MENU_ITEM : {
            const child_menus = state.child_menus
                .filter(item => payload.id != item.id)
                .sort((a,b) => a.cell-b.cell)
            return {...state, child_menus }
        }
        case Actions.UPDATE_MENU_ITEM : {
            const child_menus = [...state.child_menus
                .filter(item => payload.id != item.id), payload]
                .sort((a,b) => a.cell-b.cell)

            return {... state, child_menus}
        }
        case Actions.FETCH_MENU : 
            payload.child_menus
                .sort((a,b) => a.cell-b.cell)
                .forEach(item => {
                    // excluded_products cant be null
                   item.excluded_products = !item.excluded_products ? [] : item.excluded_products
                });
            return payload
        
    }

    return state
}