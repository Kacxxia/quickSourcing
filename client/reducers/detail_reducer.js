import {
    SHOW_RESOURCES,
    GET_DETAIL_DONE
} from '../actions/types'

const INITIAL_STATE = {
    showResources: false,
    detail: {}
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SHOW_RESOURCES: 
            return Object.assign({}, state, {showResources: true})
        case GET_DETAIL_DONE:
            return Object.assign({}, state, {detail: action.payload})
        default: 
            return state
    }
}