import { handleActions } from 'redux-actions'
// import * as Actions from '../constants/actions'

const initialState: CategoryState = [{
    id: '',
    icon: '',
    color: '',
    name: '',
    lft: 0,
    rgt: 0,
    depth: 0,
    child_menus: [],
    products: []
}]

export default handleActions<CategoryState, ProductCategory>({
  ['ADD_PRODUCT']: (state, action) => {
    return [{
      ...action.payload,
    }, ...state]
  }

}, initialState)