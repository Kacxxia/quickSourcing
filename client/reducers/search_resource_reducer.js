import {
    GET_TAGS_DONE,
    GET_ENTITIES_DONE,
    DELETE_CHIP,
    UPDATE_NAME_FILTER,
    UPDATE_TAG_INPUT,
    UPDATE_TAG_SEARCH,
    SEARCH_RECEIVE_RESULT,
    MODAL_CLEAR_INFO
} from '../actions/types'

const INITIAL_STATE = {
    tags: [],
    entities: {
        1: {
            _id: 13729471,
            id: 13729471,
            tags: ['initial'],
            name: ''
        }
    },
    inputTags: [],
    tagSearchText: '',
    tagFilter: [],
    nameFilter: ''
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_TAGS_DONE: 
            return Object.assign({}, state, { tags: action.payload})
        case GET_ENTITIES_DONE:
            return Object.assign({}, state, { entities: getEntities(state.entities, action.payload)})
        case DELETE_CHIP:
            return Object.assign({}, state, {
                inputTags: state.inputTags.filter((tag) => { 
                    return tag !== action.name})
                ,tagFilter: state.tagFilter.filter(tagID => tagID.tag !== action.name)} )
        case UPDATE_TAG_SEARCH:
            return Object.assign({}, state, { tagSearchText: action.text })
        case UPDATE_TAG_INPUT:
            return Object.assign({}, state, 
            { inputTags: state.inputTags.concat(action.text), tagSearchText: ''})
        case SEARCH_RECEIVE_RESULT:
            return Object.assign({}, state, 
            { tagFilter: addTagID(state.tagFilter, action, state.inputTags[state.inputTags.length-1])})
        case UPDATE_NAME_FILTER:
            return Object.assign({}, state, { nameFilter: action.payload})
        case MODAL_CLEAR_INFO:
            return Object.assign({}, state, { inputTags: action.inputTags})
        default:
            return state
    }
}

function addTagID(state, action, tag) {
    if(tag){
        const id = action.payload.result
        return state.concat({tag, id})
    }
    return state
}

function filterTagID(origin, target) {
    return origin.filter((o) => {
        return target.indexOf(o) === -1 ? false : true
    })
}

function deleteTagID(origin, target) {
    let result = origin
    target.forEach((char) =>{
        let index = result.indexOf(char)
        if(index != -1){
            result = [
            ...result.slice(0, index),
            ...result.slice(index + 1)
            ]
        }
    })
    return result
}

function getEntities(state, payload) {
    const obj = Object.assign({}, state)
    if (obj[1]) {
        delete obj[1]
    }
    for (let i in payload) {
        obj[i] = payload[i]
    }
    return obj
}