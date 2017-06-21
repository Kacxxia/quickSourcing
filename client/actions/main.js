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
    BREAD_GO,
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
    UPDATE_TAG_SEARCH_CREATE_ENTITY
} from './types'

import {
    API_URL,
    throwError
} from './index'

function getTags() {
    return fetch(`${API_URL}/tags`)
}
function getEntities() {
    return fetch(`${API_URL}/entities`)
}

export function getTagsAndEntities() {
    return dispatch => {
        Promise.all([getEntities(), getTags()])
        .then((responses) => {
            let jsons = []
            for (let i=0; i<responses.length; i++) {
                if (responses[i]){
                    jsons.push(responses[i].json())
                }
            }
            return Promise.all(jsons)
        })
        .then((datas) => {
            dispatch(getEntitiesDone(datas[0]))        
            dispatch(getTagsDone(datas[1]))        
        })
        .catch((error) => {
            dispatch(throwError(error))
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

export function cardClick(entity) {
    return ({type: BREAD_GO, payload: entity})
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
    return (dispatch) => {
        dispatch(startPostEntity())
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
        return fetch(`${API_URL}/thunktest`, request)
            .then((response) => {
                if (response.ok) {
                    dispatch(postEntitySuccess())
                    dispatch(getTagsAndEntities())
                    setTimeout(() => {
                        dispatch(clearInfo(payload.tags))
                    }, 2000)
                } else {
                    dispatch(throwError('网络错误'))
                }
            })
            .catch((error) => {
                dispatch(throwError(error))
            })

    }
}