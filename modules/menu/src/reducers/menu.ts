import * as Actions from '../actions/types/menu'

const initialState: MenuState = []

export default function menu(state:MenuState=initialState, action):MenuState{

    switch(action.type){

        case Actions.DROP_CATEGORY :
            return [...state, action.payload]

        case Actions.DROP_PRODUCT :
            return [...state, action.payload]

        case Actions.DROP_ADDITIONAL_CATEGORY : 
            return state.map(item => {
                if(action.payload.id == item.id) return action.payload
                return item
            })
        case Actions.DROP_ADDITIONAL_PRODUCT :
            return state.map(item => {
                if(action.payload.id == item.id) return action.payload
                return item
            })

        default :
            break
    }

    return state
}