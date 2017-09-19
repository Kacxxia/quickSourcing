import {
    ERROR_MIND,
    ERROR_CLOSE
 } from '../actions/types'

const INITIAL_STATE = {
    status: false, 
    stack: '',
    message: '' 
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ERROR_MIND: 
            return Object.assign({}, state, { status: true, stack: action.statck ? action.stack : '', message: action.message ? action.message : '' })
        case ERROR_CLOSE:
            return Object.assign({}, INITIAL_STATE )
        default:
            return state
    }
}
