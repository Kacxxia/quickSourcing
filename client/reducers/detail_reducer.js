import {
    CHANGE_SHOW_RESOURCE,
    GET_DETAIL_DONE,
    GET_DETAIL_FAILED,
    BREAD_GO,
    BREAD_BACK,
    ENTITY_GO,
    BREAD_BACKONE,
    SHOW_DETAIL_RESOURCE,
    HIDE_DETAIL_RESOURCE,
    RESOURCE_DOWN_VOTE,
    RESOURCE_OUTDATED_VOTE,
    RESOURCE_UP_VOTE,
    POST_VOTE_SUCCESS
} from '../actions/types'

const INITIAL_STATE = {
    showResource: false,
    entity: {},
    breads: [],
    getStatus: 2,
    resourceDetail: {
        isOpen: false,
        visited: {},
        _id: ''
    }
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case CHANGE_SHOW_RESOURCE: 
            return Object.assign({}, state, { showResource: !state.showResource })
        case GET_DETAIL_DONE:
            return Object.assign({}, state, { entity: action.payload, getStatus: 1 })
        case GET_DETAIL_FAILED:
            return Object.assign({}, state, { getStatus: 0 })
        case BREAD_GO:
            return Object.assign({}, state, {breads: addBread(state.breads, action.payload)})
        case BREAD_BACK:
            return Object.assign({}, state, {breads: removeBread(state.breads, action.payload)})
        case ENTITY_GO:
            return Object.assign({}, state, {breads: []})
        case BREAD_BACKONE:
            return Object.assign({}, state, {breads: removeBread(state.breads, state.breads.length-2)})
        case SHOW_DETAIL_RESOURCE:
        case HIDE_DETAIL_RESOURCE:
        case RESOURCE_UP_VOTE:
        case RESOURCE_OUTDATED_VOTE:
        case RESOURCE_DOWN_VOTE:
            return Object.assign({}, state, {resourceDetail: handleResourceDetail(state.resourceDetail, action)})
        case POST_VOTE_SUCCESS:
            return Object.assign({}, state, { 
                entity: Object.assign({}, state.entity, 
                    {resource: Object.assign({}, state.entity.resource, 
                        { [action.payload.resourceId]: Object.assign({}, 
                        state.entity.resource[action.payload.resourceId], {
                            good: action.payload.good,
                            bad: action.payload.bad,
                            outdated: action.payload.outdated
                        })
                    })
                })})
        default: 
            return state
    }
}

function addBread(origin, target) {
    return origin.concat([target])
}

function removeBread(orgin, targetIndex) {
    return orgin.slice(0, targetIndex+1)
}

function handleResourceDetail(state, action) {
    switch (action.type) {
        case SHOW_DETAIL_RESOURCE:
            return Object.assign({}, state, {
                isOpen: true,
                _id: action._id,
                visited: visit(state.visited, action)
            })
        case HIDE_DETAIL_RESOURCE:
            return Object.assign({}, state, { isOpen: false})
        case RESOURCE_UP_VOTE:
        case RESOURCE_OUTDATED_VOTE:
        case RESOURCE_DOWN_VOTE:
            return Object.assign({}, state, 
            { visited: visit(state.visited, action)})
        default: 
            return state
    }
}

function visit(state, action) {
    switch (action.type) {
        case SHOW_DETAIL_RESOURCE:
            if(state[action._id]) {
                return state
            }
            return Object.assign({}, state, 
            { [action._id]: {
                upVoted: false,
                downVoted: false,
                outdatedVoted: false
            }})
        case RESOURCE_UP_VOTE:
        case RESOURCE_DOWN_VOTE:
        case RESOURCE_OUTDATED_VOTE:
            return Object.assign({}, state, 
            { [action._id]: vote(state[action._id], action)})
        default: 
            return state
    }
}

function vote(state, action) {
    switch (action.type) {
        case RESOURCE_DOWN_VOTE:
            return Object.assign({}, state, {
                downVoted: !state.downVoted,
                upVoted: false
            })
        case RESOURCE_UP_VOTE:
            return Object.assign({}, state, {
                upVoted: !state.upVoted,
                downVoted: false
            })
        case RESOURCE_OUTDATED_VOTE:
            return Object.assign({}, state, {outdatedVoted: !state.outdatedVoted})
        default: 
            return state
    }
}