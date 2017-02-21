import * as Actions from '../actions/types/view'

interface ViewAction {
    type: string
    payload?: MenuItem
}

export interface ViewState {
    menuItem: MenuItem
}

const initialState: ViewState = {
    menuItem: null
}


export default function view(state: ViewState = initialState, action: ViewAction): ViewState{
    switch(action.type){
        case Actions.SHOW_MENU_EDIT_MODAL :
            return { ...state, menuItem: action.payload } 
        case Actions.HIDE_MENU_EDIT_MODAL :
            return { ...state, menuItem: null } 
        default :
    }
    return state
}