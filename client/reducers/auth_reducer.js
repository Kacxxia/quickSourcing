import {
    AUTH_USER
} from '../actions/types'

const INITIAL_STATE = {
    authenticated: false,
    avatar: ''
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_USER: 
            return Object.assign({}, state, { authenticated: true })
        default:
            return state
    }
}