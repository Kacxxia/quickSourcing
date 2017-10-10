import {
    AUTH_USER,
    AUTH_SIGN,
    AUTH_SIGN_CANCEL,
    CHANGE_AUTH_EMAIL,
    CHANGE_AUTH_PASSWORD,
    CHANGE_AUTH_CONFIRM_PASSWORD,
    CHANGE_TO_SIGN_UP,
    CHANGE_TO_SIGN_IN,
    EMAIL_FOCUS,
    CONFIRM_PASSWORD_FOCUS,
    PASSWORD_FOCUS,
    EMAIL_BLUR,
    CONFIRM_PASSWORD_BLUR,
    PASSWORD_BLUR,
    UNAUTH_USER
} from './types'

import { API_URL, cookies} from './index'

import jwtDecode from 'jwt-decode'

import { mindError } from './error'
export function autoLogIn() {
    return dispatch => {
        let token = cookies.get('token')
        console.log(token)
        if (token) {
            const request = {
                method: 'GET',
                headers: {"Authorization": token}
            }
            fetch(`${API_URL}/auth`, request)
            .then(response => {
                if (response.ok) {
                    response.json().then(payload => {
                        const { email, avatar, _id } = payload
                        const user = { email, avatar, _id }
                        dispatch({type: AUTH_USER, user: user})
                    })
                }
            })
            .catch(err => {
                dispatch(mindError(err))
            })
            
        }
    }
}

export function updateToken() {
    setInterval(() => {
        let token = cookies.get('token')
        if (token)  {
            const request = {
                method: "GET",
                headers: {
                    "Content-Type": "text/plain",
                    "Authorization": token
                }
            }
            fetch(`${API_URL}/token`, request)
            .then((response) => {
                if(response.ok) {
                    response.json().then(payload => {
                        cookies.remove('token')
                        cookies.set('token', payload.token, {path: '/'})
                    })
                }
            })
            .catch(err => console.log(err))
        }
        }, 3600000)   
}


export function changeAuthAccount(text) {
    return {type: CHANGE_AUTH_EMAIL, text}
}

export function changeAuthPassword(text) {
    return {type: CHANGE_AUTH_PASSWORD, text}
}

export function changeAuthConfirmPassword(text) {
    return {type: CHANGE_AUTH_CONFIRM_PASSWORD, text}
}

export function changeToSignUp() {
    return {type: CHANGE_TO_SIGN_UP}
}

export function changeToSignIn() {
    return {type: CHANGE_TO_SIGN_IN}
}


export function signIn() {
    return (dispatch, getState) => {
        const { email, password } = getState().auth.sign
        const foo = { email, password }
        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(foo)
        }
        fetch(`${API_URL}/auth`, request)
        .then(response => {
            if (response.ok) {
                response.json().then(payload => {
                    if(cookies.get('token')) {cookies.remove('token')}
                    cookies.set('token', payload.token, {path: '/'})
                    const tokenDecoded = jwtDecode(payload.token)
                    const { email, avatar, _id } = tokenDecoded
                    const user = { email, avatar, _id}
                    dispatch({type: AUTH_USER, user: user})
                    dispatch({ type: AUTH_SIGN_CANCEL })
                })
            } else {
                response.text().then(err => {
                    dispatch(mindError(err))
                })
            }
        })
        .catch(error => {
            dispatch(mindError(error.message, error.stack))
        })
    }
}

export function signUp() {
    return (dispatch, getState) => {
        const { email, password } = getState().auth.sign
        const register = { email, password }
        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(register)
        }
        fetch(`${API_URL}/users`, request)
        .then(response => {
            if (response.ok) {
                response.json().then(payload => {
                    cookies.set('token', payload.token, { path: '/' })
                    const tokenDecoded = jwtDecode(payload.token)
                    const { email, avatar, _id } = tokenDecoded
                    const user = { email, avatar, _id}
                    dispatch({type: AUTH_USER, user: user})
                    dispatch({ type: AUTH_SIGN_CANCEL })
                })
            } else {
                response.text().then(err => {
                    dispatch(mindError(err))
                })
            }
        })
        .catch(error => {
            dispatch(mindError(error.message, error.stack))
        })
    }
}

export function authSign() {
    return { type: AUTH_SIGN } 
}

export function authSignCancel() {
    return { type: AUTH_SIGN_CANCEL }
}

export function emailFocus(){
    return { type: EMAIL_FOCUS }
}
export function emailBlur(){
    return { type: EMAIL_BLUR }
}
export function passwordFocus(){
    return { type: PASSWORD_FOCUS }
}
export function passwordBlur(){
    return { type: PASSWORD_BLUR }
}
export function confirmPasswordFocus() {
    return { type: CONFIRM_PASSWORD_FOCUS }
}
export function confirmPasswordBlur() {
    return { type: CONFIRM_PASSWORD_BLUR }
}

export function signOut() {
    cookies.remove('token', { path: '/' })
    return { type: UNAUTH_USER }
}

