import {
    AUTH_USER,
    AUTH_SIGN,
    AUTH_SIGN_CANCEL,
    CHANGE_AUTH_EMAIL,
    CHANGE_AUTH_CONFIRM_PASSWORD,
    CHANGE_AUTH_PASSWORD,
    CHANGE_TO_SIGN_IN,
    CHANGE_TO_SIGN_UP,
    EMAIL_FOCUS,
    CONFIRM_PASSWORD_FOCUS,
    PASSWORD_FOCUS,
    EMAIL_BLUR,
    CONFIRM_PASSWORD_BLUR,
    PASSWORD_BLUR,
    UNAUTH_USER
} from '../actions/types'

const INITIAL_STATE = {
    isSigning: false,
    authenticated: false,
    sign: {
        isSignIn: true,
        email: '',
        password: '',
        confirmPassword: '',
        emailFocusStatus: 0,
        passwordFocusStatus: 0,
        confirmPasswordFocusStatus: 0
    }
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_USER: 
            return Object.assign({}, state, { authenticated: true })
        case UNAUTH_USER:
            return Object.assign({}, state, { authenticated: false })
        case AUTH_SIGN:
            return Object.assign({}, state, { isSigning: true })
        case AUTH_SIGN_CANCEL:
            return Object.assign({}, state, 
                { isSigning: false, sign: INITIAL_STATE.sign })
        case CHANGE_AUTH_EMAIL:
        case CHANGE_AUTH_CONFIRM_PASSWORD:
        case CHANGE_AUTH_PASSWORD:
        case CHANGE_TO_SIGN_UP:
        case CHANGE_TO_SIGN_IN:
        case EMAIL_FOCUS:
        case CONFIRM_PASSWORD_FOCUS:
        case PASSWORD_FOCUS:
        case EMAIL_BLUR:
        case CONFIRM_PASSWORD_BLUR:
        case PASSWORD_BLUR:
            return Object.assign({}, state, { sign: handleAuthIn(state.sign, action)})
        default:
            return state
    }
}

function handleAuthIn(state, action) {
    switch (action.type) {
        case CHANGE_AUTH_EMAIL:
            return Object.assign({}, state, { email: action.text })
        case CHANGE_AUTH_PASSWORD:
            return Object.assign({}, state, { password: action.text })
        case CHANGE_AUTH_CONFIRM_PASSWORD:
            return Object.assign({}, state, { confirmPassword: action.text}) 
        case CHANGE_TO_SIGN_UP:
            return Object.assign({}, state, { isSignIn: false })
        case CHANGE_TO_SIGN_IN:
            return Object.assign({}, state, { isSignIn: true })
        case EMAIL_FOCUS:
            return Object.assign({}, state, { emailFocusStatus: 2 })
        case CONFIRM_PASSWORD_FOCUS:
            return Object.assign({}, state, { confirmPasswordFocusStatus: 2 })
        case PASSWORD_FOCUS:
            return Object.assign({}, state, { passwordFocusStatus: 2 })
        case EMAIL_BLUR:
            return Object.assign({}, state, { emailFocusStatus: 1 })
        case CONFIRM_PASSWORD_BLUR:
            return Object.assign({}, state, { confirmPasswordFocusStatus: 1 })
        case PASSWORD_BLUR:
            return Object.assign({}, state, { passwordFocusStatus: 1 })
        default: 
            return state
    }

}