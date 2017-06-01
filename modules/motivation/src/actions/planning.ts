import * as Actions from '../constants/actions'

export interface Interface {
    doNothing(): Action
}

export const doNothing = () => ({ type: Actions.DO_NOTHING })