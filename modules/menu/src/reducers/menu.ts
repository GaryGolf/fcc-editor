import * as Actions from '../actions/types/menu'

const initialState: MenuState = []

export default function menu(state:MenuState=initialState, action):MenuState{

    switch(action.type){
        case Actions.DROP_CATEGORY :
            return [...state, action.payload]
        default :
            break
    }

    return state
}