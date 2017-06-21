import { go, push } from 'react-router-redux'

import {
    BREAD_GO,
    BREAD_BACK,
    ENTITY_GO,
    BREAD_BACKONE,
    GET_DETAIL_DONE,
    GETTING_DETAIL,
    CHANGE_SHOW_RESOURCE,
    GET_DETAIL_FAILED,
    SHOW_DETAIL_RESOURCE,
    HIDE_DETAIL_RESOURCE,
    RESOURCE_DOWN_VOTE,
    RESOURCE_OUTDATED_VOTE,
    RESOURCE_UP_VOTE,
    POST_VOTE_SUCCESS
} from './types'

import { cardClick } from './main'
import { API_URL } from './index'


export function breadGoEntity() {
    return {type: ENTITY_GO}
}

export function breadGoBack() {   
    return {type: BREAD_BACK}
}

export function breadBackOne() {
    return {type: BREAD_BACKONE}
}

export function getDetailDone(payload) {
    return { type: GET_DETAIL_DONE, payload }
}

export function getDetailFailed(error) {
    return { type: GET_DETAIL_FAILED, error }
}
export function getDetail(id) {
    return dispatch => {
        fetch(`${API_URL}/entities/${id}`)
        .then((response) => {
            if (response.ok) {
                response.json()
                .then((payload) => {
                    dispatch(getDetailDone(payload))
                    dispatch(cardClick(payload))
                })
            }
        })
        .catch((error) => {
            alert(error)
            dispatch(getDetailFailed(error))
        })
    }
}

export function changeShowResource() {
    return ({type: CHANGE_SHOW_RESOURCE})
}

export function showDetailResource(_id) {
    return {type:  SHOW_DETAIL_RESOURCE, _id}
}

export function hideDetailResource() {
    return {type: HIDE_DETAIL_RESOURCE}
}

export function upVoteAction(_id) {
    return {
        type: RESOURCE_UP_VOTE,
        _id
    }
}

export function downVoteAction(_id) {
    return {
        type: RESOURCE_DOWN_VOTE,
        _id
    }
}

export function outdatedVoteAction(_id) {
    return {
        type: RESOURCE_OUTDATED_VOTE,
        _id
    }
}

export function postVoteSuccess(payload) {
    return {
        type: POST_VOTE_SUCCESS,
        payload
    }
}

export function upVote(_id, upVoteStatus, downVoteStatus, entityId) {
    return dispatch => {
        dispatch(upVoteAction(_id))
        let fetchPromise 
        if (!upVoteStatus && !downVoteStatus){
            fetchPromise = postUpVoteAdd(_id, entityId)
        } else if (upVoteStatus && !downVoteStatus) {
            fetchPromise = postUpVoteRemove(_id, entityId)
        } else if (!upVoteStatus && downVoteStatus) {
            fetchPromise = postUpVoteAddANDdownVoteRemove(_id, entityId)
        }
        fetchPromise
        .then(postVoteSuccessHandler(dispatch))
        .catch(postVoteErrorHandler())
    }
}

export function downVote(_id, downVoteStatus, upVoteStatus, entityId) {
    return dispatch => {
        dispatch(downVoteAction(_id))
        let fetchPromise
        if (!upVoteStatus && !downVoteStatus){
            fetchPromise = postDownVoteAdd(_id, entityId)
        } else if (!upVoteStatus && downVoteStatus) {
            fetchPromise = postDownVoteRemove(_id, entityId)
        } else if (upVoteStatus && !downVoteStatus) {
            fetchPromise = postUpVoteRemoveANDdownVoteAdd(_id, entityId)
        }
        fetchPromise
        .then(postVoteSuccessHandler(dispatch))
        .catch(postVoteErrorHandler())
    }
}

export function outdatedVote(_id, status, entityId) {
    return dispatch => {
        dispatch(outdatedVoteAction(_id))
        let fetchPromise
        if(status) {
            fetchPromise = postOutdatedVoteRemove(_id, entityId)
        } else {
            fetchPromise = postOutdatedVoteAdd(_id, entityId)
        }
        fetchPromise
        .then(postVoteSuccessHandler(dispatch))
        .catch(postVoteErrorHandler())
    }
}

function postVoteSuccessHandler(dispatch) {
    return (response) => {
                if(response.ok) {
                    response.json().then(payload =>{
                        dispatch(postVoteSuccess(payload))
                    }) 
                }
            }
}

function postVoteErrorHandler() {
    return (error) => {
                alert(error)
            }
}

function postUpVoteAdd(_id, entityId) {
    return fetch(`${API_URL}/entities/${entityId}/vote`, voteRequest('upVoteAdd', _id))
}
function postUpVoteRemove(_id, entityId) {
    return fetch(`${API_URL}/entities/${entityId}/vote`, voteRequest('upVoteRemove', _id))
}
function postDownVoteAdd(_id, entityId) {
    return fetch(`${API_URL}/entities/${entityId}/vote`, voteRequest('downVoteAdd', _id))
}
function postDownVoteRemove(_id, entityId) {
    return fetch(`${API_URL}/entities/${entityId}/vote`, voteRequest('downVoteRemove', _id))
}
function postUpVoteAddANDdownVoteRemove(_id, entityId) {
    return fetch(`${API_URL}/entities/${entityId}/vote`, voteRequest('upVoteAddANDdownVoteRemove', _id))
}
function postUpVoteRemoveANDdownVoteAdd(_id, entityId) {
    return fetch(`${API_URL}/entities/${entityId}/vote`, voteRequest('upVoteRemoveANDdownVoteAdd', _id))
}
function postOutdatedVoteAdd(_id, entityId) {
    return fetch(`${API_URL}/entities/${entityId}/vote`, voteRequest('outdatedVoteAdd', _id))
}
function postOutdatedVoteRemove(_id, entityId) {
    return fetch(`${API_URL}/entities/${entityId}/vote`, voteRequest('outdatedVoteRemove', _id))
}
function voteRequest(type, id) {
    let body = {
        upVote: 0,
        downVote: 0,
        outdatedVote:0,
        resourceId: id
    }
    switch (type) {
        case 'upVoteAdd':
            body.upVote = 1
            break;
        case 'upVoteRemove':
            body.upVote = -1
            break;
        case 'downVoteAdd':
            body.downVote = 1
            break;
        case 'downVoteRemove':
            body.downVote = -1
            break;
        case 'upVoteAddANDdownVoteRemove':
            body.upVote = 1
            body.downVote = -1
            break;
        case 'upVoteRemoveANDdownVoteAdd':
            body.upVote = -1
            body.downVote = 1
            break;
        case 'outdatedVoteAdd':
            body.outdatedVote = 1
            break;
        case 'outdatedVoteRemove':
            body.outdatedVote = -1
            break;
        default:
            break;
    }
    const request = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }
    return request
}