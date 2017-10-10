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
    POST_VOTE_SUCCESS,
    DETAIL_ADD_RESOURCE,
    DETAIL_ADD_RESOURCE_CHANGE,
    DETAIL_ADD_RESOURCE_CANCEL,
    DETAIL_ADD_RESOURCE_POST,
    DETAIL_ADD_RESOURCE_SUCCESS,
    DETAIL_ADD_RESOURCE_FAILED,
    DETAIL_SUPERIOR_SHOW,
    DETAIL_SUBORDINATE_CLICK,
    DETAIL_SUPERIOR_FETCHING,
    DETAIL_SUBORDINATE_FETCHING,
    DETAIL_SUPERIOR_SUCCESS,
    DETAIL_SUBORDINATE_SUCCESS,
    DETAIL_SUPERIOR_FAILED,
    DETAIL_SUBORDINATE_FAILED,
    CLEAR_DETAIL,
    RECOVER_USER_CLICK_BACK_STATUS,
    SHOW_MORE_RESOURCE,
    HIDE_MORE_RESOURCE,
    EDIT_ENTITY_INTRO,
    EDIT_ENTITY_NAME,
    EDIT_RESOURCE_CATEGORY,
    EDIT_RESOURCE_HREF,
    EDIT_RESOURCE_NAME,
    EDIT_RESOURCE_PRIORITY,
    EDIT_TAG_ADD,
    EDIT_TAG_REMOVE,
    EDIT_STOP,
    EDIT_CANCEL,
    EDIT_START,
    EDIT_CANCEL_QUIT,
    EDIT_TAG_ADD_CANCEL,
    EDIT_TAG_ADD_START,
    EDIT_TAG_REMOVE_CANCEL,
    EDIT_TAG_REMOVE_START,
    EDIT_TAG_ADD_CHANGE,
    EDIT_TAG_ADD_FILTER_CHANGE,
    EDIT_DONE,
    GET_USER_VOTE_INFO_SUCCESS
} from '../actions/types'

const INITIAL_STATE = {
    showResource: true,
    entity: {},
    breads: [],
    getStatus: 2,
    resourceDetail: {
        isOpen: false,
        visited: {},
        _id: ''
    },
    editStatus: 0, //0不修改， 1正在修改， 2退出修改确认， 3删除标签确认，4添加标签,
    tagEdit: {
        tagAddingNames: [],
        tagRemovingIndex: -1,
        addTagNameFilterValue: ''
    },
    prevEntity: {},
    add: {
        isOpen: false,
        status: 1,        
        name: '',
        href: '',
        category: ''
    },
    superior: {
        show: false,
        isFetching: false,
        payload: []
    },
    subordinate: {
        show: false,
        isFetching: false,
        payload: []
    },
    canUserClickBackButton: true,
    moreResource: {
        status: ''
    }
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case RECOVER_USER_CLICK_BACK_STATUS:
            return Object.assign({}, state, {canUserClickBackButton: true})
        case CLEAR_DETAIL: 
            return Object.assign({}, INITIAL_STATE, {breads: state.breads, canUserClickBackButton: state.canUserClickBackButton})
        case CHANGE_SHOW_RESOURCE: 
            return Object.assign({}, state, { showResource: !state.showResource })
        case GET_DETAIL_DONE:
            return Object.assign({}, state, { entity: action.payload, getStatus: 1 })
        case GET_DETAIL_FAILED:
            return Object.assign({}, state, { getStatus: 0 })
        case BREAD_GO:
            return Object.assign({}, state, {breads: addBread(state.breads, action.name)})
        case BREAD_BACK:
            return Object.assign({}, state, {breads: removeBread(state.breads, action.index + 1), canUserClickBackButton: false})
        case ENTITY_GO:
            return Object.assign({}, state, {breads: []})
        case BREAD_BACKONE:
            return Object.assign({}, state, {breads: removeBread(state.breads, state.breads.length-1)})
        case SHOW_DETAIL_RESOURCE:
        case HIDE_DETAIL_RESOURCE:
        case RESOURCE_UP_VOTE:
        case RESOURCE_OUTDATED_VOTE:
        case RESOURCE_DOWN_VOTE:
        case GET_USER_VOTE_INFO_SUCCESS:
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
        case DETAIL_ADD_RESOURCE:
        case DETAIL_ADD_RESOURCE_CANCEL:
        case DETAIL_ADD_RESOURCE_CHANGE:
        case DETAIL_ADD_RESOURCE_POST:
        case DETAIL_ADD_RESOURCE_FAILED:
            return Object.assign({}, state, 
            { add: handleAddResource( state.add, action)})
        case DETAIL_ADD_RESOURCE_SUCCESS:
            return Object.assign({}, state, 
            { entity: Object.assign({}, state.entity, 
                { resource: action.payload} 
            ), add: handleAddResource( state.add, action)})
        case DETAIL_SUBORDINATE_CLICK:
        case DETAIL_SUBORDINATE_FAILED:
        case DETAIL_SUBORDINATE_FETCHING:
        case DETAIL_SUBORDINATE_SUCCESS:
            return Object.assign({}, state, { subordinate: handleLevel(state.subordinate, action) } )
        case DETAIL_SUPERIOR_SHOW:
        case DETAIL_SUPERIOR_FAILED:
        case DETAIL_SUPERIOR_FETCHING:
        case DETAIL_SUPERIOR_SUCCESS:
            return Object.assign({}, state, { superior: handleLevel(state.superior, action)})
        case SHOW_MORE_RESOURCE:
        case HIDE_MORE_RESOURCE:
            return Object.assign({}, state, 
                { moreResource: handleMoreResource(state.moreResource, action)})
        case EDIT_DONE: 
            return Object.assign({}, state, { editStatus: 0, prevEntity: {} })
        case EDIT_STOP:
            return Object.assign({}, state, { editStatus: 0, entity: state.prevEntity })
        case EDIT_CANCEL:
            return Object.assign({}, state, { editStatus: 2 })
        case EDIT_START:
            return Object.assign({}, state, { editStatus: 1, prevEntity: state.entity })     
        case EDIT_CANCEL_QUIT:
            return Object.assign({}, state, { editStatus: 1})
        
        case EDIT_TAG_ADD_START:
            return Object.assign({}, state, { editStatus: 4})
        case EDIT_TAG_REMOVE_START:
            return Object.assign({}, state, { 
                editStatus: 3, 
                tagEdit: { 
                    tagAddingNames: [], 
                    tagRemovingIndex: action.index
                }})
        case EDIT_TAG_ADD_CANCEL:
        case EDIT_TAG_REMOVE_CANCEL:
            return Object.assign({}, state, { editStatus: 1})
        case EDIT_ENTITY_INTRO:
        case EDIT_ENTITY_NAME:
        case EDIT_RESOURCE_CATEGORY:
        case EDIT_RESOURCE_HREF:
        case EDIT_RESOURCE_NAME:
        case EDIT_RESOURCE_PRIORITY:
        case EDIT_TAG_ADD:
        case EDIT_TAG_REMOVE:
            return Object.assign({}, state, { entity: handleEdit(state.entity, action)})
        case EDIT_TAG_ADD_CHANGE:
            return Object.assign({}, state, { 
                tagEdit: { 
                    tagAddingNames: action.values, 
                    tagRemovingIndex: -1,
                    addTagNameFilterValue: state.tagEdit.addTagNameFilterValue
                }})
        case EDIT_TAG_ADD_FILTER_CHANGE:
            return Object.assign({}, state, { 
                tagEdit: {
                    addTagNameFilterValue: action.text,
                    tagAddingNames: state.tagEdit.tagAddingNames, 
                    tagRemovingIndex: -1
                }})

        default: 
            return state
    }
}

function addBread(origin, target) {
    return origin.concat([target])
}

function removeBread(orgin, targetIndex) {
    return orgin.slice(0, targetIndex-1)
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
        case GET_USER_VOTE_INFO_SUCCESS:
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
        case GET_USER_VOTE_INFO_SUCCESS:
            return handleGetUserVote(state, action)
        default: 
            return state
    }
}

function handleGetUserVote(state, action) {
    let update = Object.assign({}, state)
    for (var p in action.payload) {
        update[p] = action.payload[p]
    }
    return update
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

function handleAddResource(state, action) {
    switch (action.type) {
        case DETAIL_ADD_RESOURCE:
            return Object.assign({}, state, {isOpen: true})
        case DETAIL_ADD_RESOURCE_CHANGE:
            return Object.assign({}, state, { [action.prop]: action.text})
        case DETAIL_ADD_RESOURCE_CANCEL:
            return INITIAL_STATE.add
        case DETAIL_ADD_RESOURCE_POST:
            return Object.assign({}, state, { status: 2 })
        case DETAIL_ADD_RESOURCE_SUCCESS:
            return Object.assign({}, state, { status: 1, isOpen: false })
        case DETAIL_ADD_RESOURCE_FAILED:
            return Object.assign({}, state, { status: 0 })  
        default:
            return state  
    }
}

function handleLevel(state, action) {
    switch (action.type) {
        case DETAIL_SUPERIOR_SHOW:
        case DETAIL_SUBORDINATE_CLICK:
            return Object.assign({}, state, { show: !state.show })
        case DETAIL_SUPERIOR_FETCHING:
        case DETAIL_SUBORDINATE_FETCHING:
            return Object.assign({}, state, { isFetching: true } )
        case DETAIL_SUPERIOR_SUCCESS:
        case DETAIL_SUBORDINATE_SUCCESS:
            return Object.assign({}, state, { isFetching: false, payload: action.payload})
        case DETAIL_SUBORDINATE_FAILED:
        case DETAIL_SUPERIOR_FAILED:
        default:
            return state
    }
}

function handleMoreResource(state, action) {
    switch (action.type) {
        case HIDE_MORE_RESOURCE:
            return Object.assign({}, state, { status: ''})
        case SHOW_MORE_RESOURCE:
            return Object.assign({}, state, { status: action.category })
        default:
            return state
    }
}

function handleEdit(state, action) {
    switch (action.type) {
        case EDIT_ENTITY_INTRO:
            return Object.assign({}, state, { introduction: action.text})
        case EDIT_ENTITY_NAME:
            return Object.assign({}, state, { name: action.text})
        case EDIT_TAG_ADD:
            return Object.assign({}, state, { tags: addTag(state.tags,action.tag)})
        case EDIT_TAG_REMOVE:
            return Object.assign({}, state, { tags: removeTag(state.tags, action.index)})
        case EDIT_RESOURCE_CATEGORY:
        case EDIT_RESOURCE_HREF:
        case EDIT_RESOURCE_NAME:
        case EDIT_RESOURCE_PRIORITY:
            return Object.assign({}, state, { resource: Object.assign({}, state.resource, { [action.id]: handleEditResource(state.resource[action.id], action)})})  
        default: return state
    }
}
function addTag(current, tags) {
    return tags.reduce((acc, tag) => {
        if (acc.indexOf(tag) === -1) {
            acc.push(tag)
        }
        return acc
    }, current)
}
function removeTag(tags, index) {
    return tags.slice(0, index).concat(tags.slice(index + 1, tags.length))
}

function handleEditResource(state, action) {
    switch (action.type) {
        case EDIT_RESOURCE_CATEGORY:
            return Object.assign({}, state, { category: action.category})
        case EDIT_RESOURCE_HREF:
            return Object.assign({}, state, { href: action.href})
        case EDIT_RESOURCE_NAME:
            return Object.assign({}, state, { name: action.name})
        case EDIT_RESOURCE_PRIORITY:
            return Object.assign({}, state, { priority: action.priority})
        default:
            return state
    }
}