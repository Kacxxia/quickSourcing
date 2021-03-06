import { createSearchAction } from 'redux-search'
export const searchEntities = createSearchAction('entities')
import { push } from 'react-router-redux'
import {
    GET_TAGS_DONE,
    GET_ENTITIES_DONE,
    DELETE_CHIP,
    UPDATE_TAG_ID,
    UPDATE_TAG_INPUT,
    UPDATE_TAG_SEARCH,
    NEXT_PAGE,
    PREV_PAGE,
    UPDATE_NAME_FILTER,
    JUMP_PAGE,
    CREATE_ENTITY_ADD_RESOURCE,
    CREATE_ENTITY_CHANGE_RESOURCE,
    CREATE_ENTITY_REMOVE_RESOURCE,
    MODAL_CLEAR_INFO,
    OPEN_CREATE_MODAL,
    CREATE_ENTITY_CHANGE_NAME,
    POST_ENTITY_FAIL,
    POST_ENTITY_SUCCESS,
    START_POST_ENTITY,
    DELETE_CHIP_CREATE_ENTITY,
    UPDATE_TAG_INPUT_CREATE_ENTITY,
    UPDATE_TAG_SEARCH_CREATE_ENTITY,
    TOGGLE_DRAWER,
    ADD_ENTITY_OPEN_TAG_STORE,
    ADD_ENTITY_ADD_TAG_FROM_STORE_CANCEL,
    ADD_ENTITY_ADD_TAG_FROM_STORE_SUBMIT,
    DELETE_SEARCH_RECORD
} from './types'

import {
    API_URL,
    throwError,
    cookies
} from './index'

import { mindError } from './error'

function getTags() {
    return fetch(`${API_URL}/tags`)
}
function getEntities() {
    return fetch(`${API_URL}/entities`)
}

export function getTagsAndEntities() {
    return dispatch => {
        return Promise.all([getTags(), getEntities()])
        .then((responses) => {
            if (responses[0].ok && responses[1].ok) {
                return Promise.all([responses[0].json(), responses[1].json()])
            } else {
                dispatch(mindError('网络错误'))
            }
        })
        .then((datas) => {
            dispatch(getTagsDone(datas[0]))
            dispatch(getEntitiesDone(datas[1]))
            return Promise.resolve(null)     
        })
        .catch((error) => {
            dispatch(mindError(error.message))
        })
    }
}
export function getTagsDone(payload) {
    return {
        type: GET_TAGS_DONE,
        payload
    }
}

export function getEntitiesDone(payload) {
    return {
        type: GET_ENTITIES_DONE,
        payload
    }
}



export function updateTagFilter(tag, id) {
    return ({type: UPDATE_TAG_ID, tag, id})
}

export function nextPage() {
    return ({type: NEXT_PAGE})
}
export function prevPage() {
    return ({type: PREV_PAGE})
}

export function updateNameFilter(payload) {
    return {type: UPDATE_NAME_FILTER, payload}
}



export function specificPage(payload) {
    return ({type: JUMP_PAGE, payload})
}

export function addResource() {
    return ({type: CREATE_ENTITY_ADD_RESOURCE})
}

export function removeResource() {
    return ({type: CREATE_ENTITY_REMOVE_RESOURCE})
}

export function changeResource(id, value, prop) {
    return {
        type: CREATE_ENTITY_CHANGE_RESOURCE,
        id,
        value,
        prop
    }
}

export function deleteChip(name) {
    return {
        name,
        type: DELETE_CHIP
    }
}

export function updateTagSearch(text) {
    return {
        text,
        type: UPDATE_TAG_SEARCH
    }
}

export function updateTagInput(text) {
    return {
        text,
        type: UPDATE_TAG_INPUT
    }
}

export function deleteChipCreateEntity(name) {
    return {
        name,
        type: DELETE_CHIP_CREATE_ENTITY
    }
}

export function updateTagSearchCreateEntity(text) {
    return {
        text,
        type: UPDATE_TAG_SEARCH_CREATE_ENTITY
    }
}

export function updateTagInputCreateEntity(text) {
    return {
        text,
        type: UPDATE_TAG_INPUT_CREATE_ENTITY
    }
}

export function clearInfo(inputTags) {
    return {
        type: MODAL_CLEAR_INFO,
        inputTags
    }
}

export function openCreateModal(initialTags) {
    return {
        type: OPEN_CREATE_MODAL,
        initialTags
    }
}

export function changeName(text) {
    return {
        type: CREATE_ENTITY_CHANGE_NAME,
        text
    }
}

export function postEntitySuccess(){
    return {
        type: POST_ENTITY_SUCCESS
    }
}

export function postEntityFail(error){
    return {
        type: POST_ENTITY_FAIL,
        error
    }
}

export function startPostEntity(){
    return {
        type: START_POST_ENTITY
    }
}


export function postEntity(payload){
    return (dispatch, getState) => {
        dispatch(startPostEntity())
        const authenticated =  getState().auth.authenticated
        const token = authenticated ? cookies.get('token').slice(4) : undefined

        payload.token = token
        payload.authenticated = authenticated
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
        return fetch(`${API_URL}/entities`, request)
            .then((response) => {
                if (response.ok) {
                    dispatch(postEntitySuccess())
                    return dispatch(getTagsAndEntities())
                } else {
                    dispatch(mindError('网络错误'))
                }
            })
            .then(() => dispatch(clearInfo(payload.tags)))
            .catch((error) => {
                dispatch(mindError(error.message))
            })

    }
}

export function toggleDrawer() {
    return { type: TOGGLE_DRAWER }
}

export function goHome() {
    return push('/')
}

export function goEntities() {
    return push('/entities')
}

export function addEntityOpenTagStore() {
    return { type: ADD_ENTITY_OPEN_TAG_STORE }
}
export function addEntityAddTagFromStoreCancel() {
    return { type: ADD_ENTITY_ADD_TAG_FROM_STORE_CANCEL }
}
export function addEntityAddTagFromStoreSubmit(payload) {
    return { type: ADD_ENTITY_ADD_TAG_FROM_STORE_SUBMIT, payload }
}


export function searchByManyTags(tags) {
    return dispatch => {
        return tags.reduce((acc, tag) => {
            acc = acc.then(() => dispatch(searchEntities(tag)))
            return acc
        }, Promise.resolve(null))
    }
}

export function deleteSearchRecord(tag) {
    return { type: DELETE_SEARCH_RECORD, tag}
}