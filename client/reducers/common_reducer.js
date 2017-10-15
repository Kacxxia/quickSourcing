import  {
    GET_TAGS_DONE,
    TAG_STORE_CHANGE_SEARCH,
    TAG_STORE_CHANGE_SELECTED,
    EDIT_TAG_ADD_CANCEL,
    EDIT_TAG_ADD_START,
    ADD_ENTITY_OPEN_TAG_STORE,
    ADD_ENTITY_ADD_TAG_FROM_STORE_CANCEL,
    ADD_ENTITY_ADD_TAG_FROM_STORE_SUBMIT,
    EDIT_TAG_ADD
} from '../actions/types'
const INITIAL_STATE = {
    tagStore: {
        tags: [],
        isOpen: false,
        searchValue: '',
        selectedTags: []
    }
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case GET_TAGS_DONE: 
        case TAG_STORE_CHANGE_SEARCH:
        case TAG_STORE_CHANGE_SELECTED:
        case EDIT_TAG_ADD_CANCEL:
        case EDIT_TAG_ADD_START:
        case EDIT_TAG_ADD:
        case ADD_ENTITY_OPEN_TAG_STORE:
        case ADD_ENTITY_ADD_TAG_FROM_STORE_CANCEL:
        case ADD_ENTITY_ADD_TAG_FROM_STORE_SUBMIT:
            return Object.assign({}, state, { tagStore: handleTagStore(state.tagStore, action) })
        default:
            return state
    }
}

function handleTagStore(state, action) {
    switch(action.type) {
        case GET_TAGS_DONE:
            return Object.assign({}, state, { tags: action.payload })
        case TAG_STORE_CHANGE_SEARCH:
            return Object.assign({}, state, { searchValue: action.value })
        case TAG_STORE_CHANGE_SELECTED:
            return Object.assign({}, state, { selectedTags: action.payload })
        case EDIT_TAG_ADD_CANCEL:
        case EDIT_TAG_ADD:
        case ADD_ENTITY_ADD_TAG_FROM_STORE_CANCEL:
        case ADD_ENTITY_ADD_TAG_FROM_STORE_SUBMIT:
            return Object.assign({}, INITIAL_STATE.tagStore, { tags: state.tags })
        case EDIT_TAG_ADD_START:
        case ADD_ENTITY_OPEN_TAG_STORE:
            return Object.assign({}, state, { isOpen: true })
        default:
            return state
    }
}