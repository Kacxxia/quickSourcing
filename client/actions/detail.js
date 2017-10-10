import jwtDecode from 'jwt-decode'
import {
    BREAD_GO,
    BREAD_BACK,
    ENTITY_GO,
    BREAD_BACKONE,
    GET_DETAIL_DONE,
    CHANGE_SHOW_RESOURCE,
    GET_DETAIL_FAILED,
    SHOW_DETAIL_RESOURCE,
    HIDE_DETAIL_RESOURCE,
    RESOURCE_DOWN_VOTE,
    RESOURCE_OUTDATED_VOTE,
    RESOURCE_UP_VOTE,
    POST_VOTE_SUCCESS,
    DETAIL_ADD_RESOURCE,
    DETAIL_ADD_RESOURCE_CHANGE,
    DETAIL_ADD_RESOURCE_POST,
    DETAIL_ADD_RESOURCE_FAILED,
    DETAIL_ADD_RESOURCE_SUCCESS,
    DETAIL_ADD_RESOURCE_CANCEL,
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
    EDIT_START,
    EDIT_STOP,
    EDIT_CANCEL,
    EDIT_ENTITY_INTRO,
    EDIT_ENTITY_NAME,
    EDIT_RESOURCE_CATEGORY,
    EDIT_RESOURCE_HREF,
    EDIT_RESOURCE_NAME,
    EDIT_RESOURCE_PRIORITY,
    EDIT_TAG_ADD,
    EDIT_TAG_REMOVE,
    EDIT_CANCEL_QUIT,
    EDIT_TAG_ADD_START,
    EDIT_TAG_REMOVE_START,
    EDIT_TAG_ADD_CANCEL,
    EDIT_TAG_REMOVE_CANCEL,
    EDIT_TAG_ADD_CHANGE,
    EDIT_TAG_ADD_FILTER_CHANGE,
    EDIT_DONE,
    GET_USER_VOTE_INFO_SUCCESS
} from './types'

import { API_URL, cookies } from './index'
import { needAuthPopoverOpen } from './auth'
import { mindError } from './error'


export function breadGoEntity() {
    return {type: ENTITY_GO}
}

export function breadGoBack(index) {   
    return dispatch => {
        return new Promise((resolve) => {
            dispatch({type: BREAD_BACK, index})
            setTimeout(() => resolve(1), 0)
        })
    }
}

export function breadGo(name) {
    return ({type: BREAD_GO, name})
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
                })
            }
        })
        .catch((error) => {
            dispatch(mindError(error))
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

export function upVote(_id, upVoteStatus, downVoteStatus, entityId, target) {
    return (dispatch, getState) => {
        const authenticated = getState().auth.authenticated
        if(!authenticated) return dispatch(needAuthPopoverOpen(target, '喜欢这个资源？'))
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
        .catch(postVoteErrorHandler(dispatch))
    }
}

export function downVote(_id, downVoteStatus, upVoteStatus, entityId, target) {
    return (dispatch, getState) => {
        const authenticated = getState().auth.authenticated
        if(!authenticated) return dispatch(needAuthPopoverOpen(target, '不喜欢这个资源？'))
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

export function outdatedVote(_id, status, entityId, target) {
    return (dispatch, getState) => {
        const authenticated = getState().auth.authenticated
        if(!authenticated) return dispatch(needAuthPopoverOpen(target, '觉得这个资源已经过时了？'))
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

function postVoteErrorHandler(dispatch) {
    return (error) => {
        dispatch(mindError(error))
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
    const token = cookies.get('token')
    const request = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(body)
    }
    return request
}

export function addResource() {
    return {
        type: DETAIL_ADD_RESOURCE
    }
}

export function addResourceChange(prop, text) {
    return {
        type: DETAIL_ADD_RESOURCE_CHANGE,
        prop,
        text
    }
}

export function addResourceCancel() {
    return {
        type: DETAIL_ADD_RESOURCE_CANCEL
    }
}

export function addResourcePost(id) {
    return (dispatch, getState) => {
        const state = getState()
        const { add } = state.detail
        const { name, category, href } = add

        const { authenticated } = state.auth
        const token = authenticated ? cookies.get('token').slice(4) : undefined
        
        if (name !=='' && category !=='' && href !==''){
            dispatch({type: DETAIL_ADD_RESOURCE_POST})
            const resource = { name, category, href}
            const res = {resource: resource}
            res.token = token
            res.authenticated = authenticated
            const request = {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(res)
            }
            fetch(`${API_URL}/entities/${id}/resource`, request)
            .then(response => {
                if (response.ok) {
                    response.json().then(payload => dispatch(addResourcePostSuccess(payload)))
                    
                } else {
                    dispatch(addResourcePostFailed(''))
                }
            })
            .catch(err => {
                dispatch(addResourcePostFailed(err))
            })
        }
    }
}

function addResourcePostSuccess(payload) {
    return {
        type: DETAIL_ADD_RESOURCE_SUCCESS,
        payload
    }
}

function addResourcePostFailed(error) {
    return {
        type: DETAIL_ADD_RESOURCE_FAILED,
        error
    }
}


export function clickSuperior(id) {
    return (dispatch, getState) => {
        dispatch({type: DETAIL_SUBORDINATE_CLICK})
        const state = getState()
        if (state.detail.superior.payload.length === 0){
            dispatch({type: DETAIL_SUPERIOR_FETCHING})
            fetch(`${API_URL}/entities/${id}/superior`)
            .then(response => {
                if (response.ok) {
                    response.json().then(payload => {
                        dispatch({type: DETAIL_SUPERIOR_SUCCESS, payload})
                    })
                }
                else {
                    dispatch(mindError('fetching error'))
                    dispatch({type: DETAIL_SUPERIOR_FAILED})
                }
            })
            .catch(error => {
                dispatch(mindError(error))
                dispatch({type: DETAIL_SUPERIOR_FAILED})
            })
        }
    }
}

export function clickSubordinate(id) {
    return (dispatch, getState) => {
        dispatch({type: DETAIL_SUBORDINATE_CLICK})
        const state = getState()
        if (state.detail.subordinate.payload.length === 0){
            dispatch({type: DETAIL_SUBORDINATE_FETCHING})
            fetch(`${API_URL}/entities/${id}/subordinate`)
            .then(response => {
                if (response.ok) {
                    response.json().then(payload => {
                        dispatch({type: DETAIL_SUBORDINATE_SUCCESS, payload})
                    })
                }
                else {
                    dispatch(mindError('fetching error'))
                    dispatch({type: DETAIL_SUBORDINATE_FAILED})
                }
            })
            .catch(error => {
                dispatch(mindError(error))
                dispatch({type: DETAIL_SUBORDINATE_FAILED})
            })
        }
    }
}

export function clearDetail() {
    return {type: CLEAR_DETAIL}
}

export function recoverBackStatus() {
    return {type: RECOVER_USER_CLICK_BACK_STATUS}
}

export function showMoreResource(category) {
    return {type: SHOW_MORE_RESOURCE, category}
}

export function hideMoreResource() {
    return {type: HIDE_MORE_RESOURCE}
}

export function editEntity() {
    return {type: EDIT_START}
}


function editEntityDone() {
    return { type: EDIT_DONE}
}

export function editEntityCancel() {
    return { type: EDIT_CANCEL}
}

export function editEntitySubmit() {
    return (dispatch, getState) => {
        const state = getState()
        const authenticated =  getState().auth.authenticated
        const token = authenticated ? cookies.get('token').slice(4) : undefined

        const entity = state.detail.entity
        entity.token = token
        entity.authenticated = authenticated

        const request = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(entity)
        }
        fetch(`${API_URL}/entities/${entity._id}/editing`, request)
        .then(response => {
            if (response.ok) {
                dispatch(editEntityDone())
            }
            else {
                dispatch(mindError('edit error'))
            }
        })
        .catch(err => {
            dispatch(mindError(err))
        })
    }
}

export function editName(text) {
    return { type: EDIT_ENTITY_NAME, text}
}

export function editIntro(text) {
    return { type: EDIT_ENTITY_INTRO, text}
}

export function editTagAdd(tag) {
    return { type: EDIT_TAG_ADD, tag}
}

export function editTagRemove(index) {
    return { type: EDIT_TAG_REMOVE, index}
}

export function editResourceCategory(id, category) {
    return { type: EDIT_RESOURCE_CATEGORY, id, category}
}

export function editResourceHref(id, href) {
    return { type: EDIT_RESOURCE_HREF, id, href}
}

export function editResourceName(id, name) {
    return { type: EDIT_RESOURCE_NAME, id, name}
}

export function editResourcePriority(id, priority) {
    return { type: EDIT_RESOURCE_PRIORITY, id, priority}
}

export function editCancelConfirm() {
    return { type: EDIT_STOP }
}

export function editCancelQuit() {
    return { type: EDIT_CANCEL_QUIT }
}

export function editTagAddStart() {
    return { type: EDIT_TAG_ADD_START }
}

export function editTagRemoveStart(index) {
    return { type: EDIT_TAG_REMOVE_START, index}
}

export function editTagAddCancel() {
    return { type: EDIT_TAG_ADD_CANCEL }
}

export function editTagRemoveCancel() {
    return { type: EDIT_TAG_REMOVE_CANCEL}
}

export function editTagAddChange(values) {
    return { type: EDIT_TAG_ADD_CHANGE, values}
}

export function editTagAddFilterChange(text) {
    return { type: EDIT_TAG_ADD_FILTER_CHANGE, text}
}

export function getUserVoteInfo() {
    return dispatch => {
        const token = cookies.get('token')
        const { _id } = jwtDecode(token)
        const req = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }
        fetch(`${API_URL}/users/${_id}/votes`, req)
        .then(response => {
            if (response.ok) {
                response.json().then(payload => {
                    dispatch(getUserVoteInfoSuccess(payload)) 
                })
            } else {
                response.text().then(err => {
                    dispatch(mindError(err))
                })
            }
        })
        .catch(err => {
            dispatch(mindError(err))
        })
    }
}

export function getUserVoteInfoSuccess(payload) {
    return { type: GET_USER_VOTE_INFO_SUCCESS, payload}
}