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
    UNAUTH_USER,
    NEED_AUTH_POPOVER_CLOSE,
    NEED_AUTH_POPOVER_OPEN,
    RESET_PASSWORD_CLOSE,
    RESET_PASSWORD_OPEN,
    RESET_PASSWORD_CHANGE_CONFIRM_PASSWORD,
    RESET_PASSWORD_CHANGE_EMAIL,
    RESET_PASSWORD_CHANGE_PASSWORD,
    RESET_PASSWORD_DONE,
    RESET_PASSWORD_EDIT_TARGET_EMAIL,
    RESET_PASSWORD_SEND_EMAIL,
    RESET_PASSWORD_GO_RESET_PASSWORD,
    RESET_PASSWORD_PASSWORD_BLUR,
    RESET_PASSWORD_PASSWORD_FOCUS,
    RESET_PASSWORD_CONFIRM_PASSWORD_BLUR,
    RESET_PASSWORD_CONFIRM_PASSWORD_FOCUS,
    RESET_PASSWORD_EMAIL_BLUR,
    RESET_PASSWORD_EMAIL_FOCUS,
    RESET_PASSWORD_RESEND_EMAIL,
    RESET_PASSWORD_CAPTCHA_DECREASE,
    RESET_PASSWORD_CHANGE_CAPTCHA,
} from './types'

import { API_URL, cookies } from './index'
import { getUserVoteInfo } from './detail'

import jwtDecode from 'jwt-decode'

import { mindError } from './error'

export function autoLogIn() {
    return dispatch => {
        let token = cookies.get('token')
        if (token) {
            const request = {
                method: 'GET',
                headers: {"Authorization": token}
            }
            fetch(`${API_URL}/auth`, request)
            .then(response => {
                if (response.ok) {
                    response.json().then((payload) => {
                        const { email, avatar, _id } = payload
                        const user = { email, avatar, _id }
                        dispatch(getUserVoteInfo())
                        return dispatch({type: AUTH_USER, user: user})
                    })
                }
                else {
                    if (response.status === 401) {
                        dispatch(mindError('身份验证信息过期'))
                    }
                        dispatch(mindError('网络错误'))
                }
            })
            .catch(err => {
                dispatch(mindError(err.message))
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
                    dispatch(getUserVoteInfo())
                })
            } else {
                response.text().then(err => {
                    if(!err) return dispatch(mindError('网络错误'))
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
                    if(!err) return dispatch(mindError('网络错误'))
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
export function resetPasswordPasswordBlur() {
    return { type: RESET_PASSWORD_PASSWORD_BLUR }
}
export function resetPasswordPasswordFocus() {
    return { type: RESET_PASSWORD_PASSWORD_FOCUS }
}
export function resetPasswordConfirmPasswordBlur() {
    return { type: RESET_PASSWORD_CONFIRM_PASSWORD_BLUR }
}
export function resetPasswordConfirmPasswordFocus() {
    return { type: RESET_PASSWORD_CONFIRM_PASSWORD_FOCUS }
}

export function signOut() {
    cookies.remove('token', { path: '/' })
    return { type: UNAUTH_USER }
}

export function needAuthPopoverOpen(target, header) {
    return { type: NEED_AUTH_POPOVER_OPEN, target, header }
}

export function needAuthPopoverClose() {
    return { type: NEED_AUTH_POPOVER_CLOSE }
}

export function closeResetPassword() {
    return { type: RESET_PASSWORD_CLOSE }
}

export function openResetPassword() {
    return { type: RESET_PASSWORD_OPEN }
}

export function resetPasswordChangeEmail(value) {
    return { type: RESET_PASSWORD_CHANGE_EMAIL, value}
}

export function resetPasswordSendEmail() {
    return (dispatch, getState) => {
        const email = getState().auth.resetPassword.email
        const request = {
            method: 'GET',
            headers: {'Content-Type': 'text/plain'}
        }
        fetch(`${API_URL}/users/${email}/captcha`, request)
        .then(response => {
            if (response.ok) {
                dispatch({ type: RESET_PASSWORD_SEND_EMAIL })
            } else {
                response.text().then(err => {
                    if(!err) return dispatch(mindError('网络错误'))
                    dispatch(mindError(err))
                })
            }
        })
        .catch(err => {
            mindError(err.message)
        })

    }
}
export function resetPasswordChangePassword(value) {
    return { type: RESET_PASSWORD_CHANGE_PASSWORD, value}
}

export function resetPasswordChangeConfirmPassword(value) {
    return { type: RESET_PASSWORD_CHANGE_CONFIRM_PASSWORD, value}
}

export function resetPasswordCaptchaDecrease() {
    return { type: RESET_PASSWORD_CAPTCHA_DECREASE }
}
export function resetPasswordResendEmail() {
    return dispatch => {
        dispatch({type: RESET_PASSWORD_RESEND_EMAIL})
        const i = setInterval(() => dispatch(resetPasswordCaptchaDecrease()), 1000)
        setTimeout(() => clearInterval(i), 60000)
        dispatch(resetPasswordSendEmail())
    }
}

export function resetPasswordEditTargetEmail() {
    return { type: RESET_PASSWORD_EDIT_TARGET_EMAIL }
}

export function resetPasswordChangeCaptcha(value) {
    return { type: RESET_PASSWORD_CHANGE_CAPTCHA, value}
}

export function tryResetPassword() {
    return (dispatch, getState) => {
        const { captcha, email } = getState().auth.resetPassword
        const req = {
            method: 'POST',
            headers: {'Content-Type': 'text/plain'},
            body: captcha
        }
        fetch(`${API_URL}/users/${email}/captcha`, req)
        .then(response => {
            if (response.ok) {
                dispatch({ type: RESET_PASSWORD_GO_RESET_PASSWORD })
            }
            else {
                if (response.status === 401) {
                    mindError('验证码错误或过期')
                } else {
                    if(!err) return dispatch(mindError('网络错误'))
                    response.text().then(err => mindError(err))
                }
            }
        })
        .catch(err => {
            mindError(err.message)
        })
    }
}
export function doResetPassword() {
    return (dispatch, getState) => {
        const { email, password } = getState().auth.resetPassword
        const req = {
            method: 'POST',
            headers: {'Content-Type': 'text/plain'},
            body: password
        }
        fetch(`${API_URL}/users/${email}/password`, req)
        .then(response => {
            if (response.ok) {
                dispatch({ type: RESET_PASSWORD_DONE })
            }
            else {
                    response.text().then(err => {
                        if(!err) return dispatch(mindError('网络错误'))
                        dispatch(mindError(err))
                    })
            }
        })
        .catch(err => {
            dispatch(mindError(err.message))
        })
    }
}

export function resetPasswordEmailFocus() {
    return { type: RESET_PASSWORD_EMAIL_FOCUS }
}

export function resetPasswordEmailBlur() {
    return { type: RESET_PASSWORD_EMAIL_BLUR }
}
