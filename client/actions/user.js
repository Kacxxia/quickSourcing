import { push } from 'react-router-redux'

import {
    OPEN_NAV_AVATAR_MENU,
    CLOSE_NAV_AVATAR_MENU,
    GET_PROFILE_DONE,
    GET_PROFILE_WAITING,
    GET_PROFILE_NOTFOUND,
    EDIT_PROFILE_START,
    EDIT_PROFILE_WAITING,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_CANCEL,
    EDIT_PROFILE_AVATAR,
    EDIT_PROFILE_USERNAME,
    EDIT_PROFILE_INTRODUCTION
} from './types'

import { cookies, API_URL} from './index'
import { mindError } from './error'
import jwtDecode from 'jwt-decode'

export function openNavAvatarMenu(event) {
    return { type: OPEN_NAV_AVATAR_MENU, target: event.target }
}

export function closeNavAvatarMenu() {
    return { type: CLOSE_NAV_AVATAR_MENU }
}

export function getUserProfileWating() {
    return { type: GET_PROFILE_WAITING } 
}
export function getUserProfileDone(payload) {
    return { type: GET_PROFILE_DONE, payload }
}
export function getUserprofileNotFound() {
    return { type: GET_PROFILE_NOTFOUND }
}
export function getUserProfile(id) {
    return dispatch => {
        dispatch(getUserProfileWating())
        const token = cookies.get('token')
        const req = {
            method: 'GET',
            headers: {
                "Authorization": token
            }
        }
        fetch(`${API_URL}/users/${id}/profiles`, req)
        .then(response => {
            if(response.ok) {
                response.json().then(payload => {
                    dispatch(getUserProfileDone(payload))
                })
            } else {
                if (response.status === 404) {
                    dispatch(getUserprofileNotFound())
                } else {
                    response.text().then(err => {
                        if(!err) return dispatch(mindError('网络错误'))
                        dispatch(mindError(err))
                    })
                }
            }
        })
        .catch(err => {
            dispatch(mindError(err))
        })
    }
}

export function goDashboard(id) {
    return dispatch => {
        dispatch(push(`/profiles/${id}`))
    }
}

export function validateURLID(urlId) {
    const token = cookies.get('token')
    const tokenDecoded = jwtDecode(token)

    return tokenDecoded._id === urlId
}

export function editProfileStart() {
    return { type: EDIT_PROFILE_START }
}

export function editProfilePost(payload, id) {
    return dispatch => {
        const token = cookies.get('token')
        const request = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(payload)
        }
        dispatch(editProfileWait())
        fetch(`${API_URL}/users/${id}/profiles`, request)
        .then(response => {
            if(response.ok) {
                dispatch(editProfileSuccess(payload))
            } else {
                response.text().then(err => {
                    if(!err) return dispatch(mindError('网络错误'))
                    dispatch(mindError(err))
                })
            }
        })
        .catch(err => {
            dispatch(mindError(err))
        })
    }
}

export function editProfileWait() {
    return { type: EDIT_PROFILE_WAITING}
}

export function editProfileSuccess(payload) {
    return { type: EDIT_PROFILE_SUCCESS, payload}
}

export function editProfileCancel() {
    return { type: EDIT_PROFILE_CANCEL }
}

export function editProfileAvatar(dataurl) {
    return { type: EDIT_PROFILE_AVATAR, payload: dataurl }
}
export function editProfileIntroduction (value) {
    return { type: EDIT_PROFILE_INTRODUCTION, payload: value }
}
export function editProfileUsername (value) {
    return { type: EDIT_PROFILE_USERNAME, payload: value}
}