import * as Actions from './types'

export interface Interface {
    fetch(): Action
}

export const fetch = () => ({type: Actions.FETCH_NOMENCLATURE})