import {
    NEXT_PAGE,
    PREV_PAGE,
    JUMP_PAGE,
    CREATE_ENTITY_ADD_RESOURCE,
    CREATE_ENTITY_CHANGE_RESOURCE,
    MODAL_CLEAR_INFO,
    OPEN_CREATE_MODAL,
    CREATE_ENTITY_CHANGE_NAME,
    START_POST_ENTITY,
    POST_ENTITY_FAIL,
    POST_ENTITY_SUCCESS,
    CREATE_ENTITY_REMOVE_RESOURCE,
    DELETE_CHIP_CREATE_ENTITY,
    UPDATE_TAG_INPUT_CREATE_ENTITY,
    UPDATE_TAG_SEARCH_CREATE_ENTITY,
    TOGGLE_DRAWER
} from '../actions/types'

const INITIAL_STATE = {
    currentPage: 1,
    add: {
        isModalOpen: false,
        resourceCount: 0
    },
    inputTags: [],
    tagSearchText: '',
    entityName: '',
    postStatus: 1,
    drawerStatus: false
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case TOGGLE_DRAWER:
            return Object.assign({}, state, 
                { drawerStatus: !state.drawerStatus})
        case NEXT_PAGE:
            return Object.assign({}, state, { currentPage: state.currentPage+1 })
        case PREV_PAGE:
            return Object.assign({}, state, { currentPage: state.currentPage-1 })
        case JUMP_PAGE:
            return Object.assign({}, state, { currentPage: action.payload })
        case CREATE_ENTITY_ADD_RESOURCE:
            return Object.assign({}, state, { add: addResource(state.add) })
        case CREATE_ENTITY_REMOVE_RESOURCE:
            return Object.assign({}, state, { add: removeResource(state.add) })
        case CREATE_ENTITY_CHANGE_RESOURCE:
            return Object.assign({}, state, 
            { add: updateResourceById(state.add, action)})
        case MODAL_CLEAR_INFO:
            return Object.assign({}, state, {add: INITIAL_STATE.add})
        case OPEN_CREATE_MODAL:
            return Object.assign({}, state, 
            { add: openModal(state.add), inputTags: action.initialTags})
        case CREATE_ENTITY_CHANGE_NAME:
            return Object.assign({}, state, {entityName: action.text})
        case POST_ENTITY_SUCCESS: 
            return Object.assign({}, state, 
            {postStatus: 1, add: INITIAL_STATE.add})
        case POST_ENTITY_FAIL: 
            return Object.assign({}, state, {postStatus: 0})
        case START_POST_ENTITY: 
            return Object.assign({}, state, {postStatus: 2})
        case DELETE_CHIP_CREATE_ENTITY:
            return Object.assign({}, state, {
                inputTags: state.inputTags.filter((tag) => { 
                    return tag !== action.name})
                } )
        case UPDATE_TAG_SEARCH_CREATE_ENTITY:
            return Object.assign({}, state, { tagSearchText: action.text })
        case UPDATE_TAG_INPUT_CREATE_ENTITY:
            return Object.assign({}, state, 
            { inputTags: state.inputTags.concat(action.text), tagSearchText: ''})
        default: 
            return state
    }
}

function addResource(state) {
    return Object.assign({}, state, { resourceCount: state.resourceCount + 1 })
}

function removeResource(state) {
    let obj = Object.assign({}, state)
    obj.resourceCount--
    delete obj[obj.resourceCount]
    return obj
}

function updateResourceById(state, action) {
    return Object.assign({}, state, 
    { [action.id]: updateResourceField(state[action.id], action) })
}
    
function updateResourceField(state ={
    name: '',
    category: '',
    link: ''
}, action) {
    return Object.assign({}, state, {[action.prop]: action.value})
}

function openModal(state) {
    return Object.assign({}, state, { isModalOpen: true })
}
