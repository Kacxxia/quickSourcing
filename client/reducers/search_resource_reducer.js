import {
    GET_TAGS_DONE,
    GET_ENTITIES_DONE,
    ADD_CHIP,
    DELETE_CHIP,
    UPDATE_TAG_ID
} from '../actions/types'

const INITIAL_STATE = {
    tags: [],
    entities: {
        1: {
            _id: 1,
            id: 1,
            tags: [{
                lang: 'zh-cn',
                content: ['`']
            }],
            names: [{
                lang: 'zh-cn',
                content: '`'
            }]
        }
    },
    inputTags: [],
    tagFilter: {
        tagsID: [],
        updateStatus: 1
    },
    nameFilter: ''
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_TAGS_DONE: 
            return Object.assign({}, state, { tags: action.payload})
        case GET_ENTITIES_DONE:
            return Object.assign({}, state, { entities: action.payload})
        case ADD_CHIP:
            return Object.assign({}, state, {
                tagFilter: Object.assign({}, state.tagFilter, { updateStatus: 1}),
                inputTags: addTagID(state.inputTags, [action.payload])
            })
        case DELETE_CHIP:
            return Object.assign({}, state, {
                tagFilter: Object.assign({}, state.tagFilter, { updateStatus: 0}),
                inputTags: deleteTagID(state.inputTags, [action.payload])
            })
        case UPDATE_TAG_ID:
            if (state.tagFilter.updateStatus) {
                return Object.assign({}, state, {
                tagFilter: { updateStatus: 1, tagsID: addTagID(state.tagFilter.tagsID, action.payload)}})
            } else {
                return Object.assign({}, state, {
                tagFilter: { updateStatus: 0, tagsID: deleteTagID(state.tagFilter.tagsID, action.payload)}})
            }
        default:
            return state
    }
}

function addTagID(origin, target) {
    return origin.concat(target)
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
