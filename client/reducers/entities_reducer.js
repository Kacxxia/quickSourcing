import {
    NEXT_PAGE,
    PREV_PAGE
} from '../actions/types'

const INITIAL_STATE = {
    currentPage: 1
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case NEXT_PAGE:
            return Object.assign({}, state, { currentPage: state.currentPage++ })
        case PREV_PAGE:
            return Object.assign({}, state, { currentPage: state.currentPage-- })
        default: 
            return state
    }
}