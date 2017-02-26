import * as Actions from './types'
import * as CONST from '../constants'

export interface Interface {
    fetch(): Action<null>
}

export const fetch = () => ({type: Actions.FETCH_NOMENCLATURE})