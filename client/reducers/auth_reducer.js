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
    UNAUTH_USER,
    NEED_AUTH_POPOVER_CLOSE,
    NEED_AUTH_POPOVER_OPEN,
    RESET_PASSWORD_EMAIL_BLUR,
    RESET_PASSWORD_EMAIL_FOCUS,    
    RESET_PASSWORD_CHANGE_EMAIL,
    RESET_PASSWORD_SEND_EMAIL,
    RESET_PASSWORD_EDIT_TARGET_EMAIL,
    RESET_PASSWORD_CHANGE_CAPTCHA,
    RESET_PASSWORD_RESEND_EMAIL,
    RESET_PASSWORD_GO_RESET_PASSWORD,
    RESET_PASSWORD_CHANGE_PASSWORD,
    RESET_PASSWORD_CHANGE_CONFIRM_PASSWORD,
    RESET_PASSWORD_DONE,
    RESET_PASSWORD_PASSWORD_BLUR,
    RESET_PASSWORD_PASSWORD_FOCUS,
    RESET_PASSWORD_CONFIRM_PASSWORD_BLUR,
    RESET_PASSWORD_CONFIRM_PASSWORD_FOCUS,
    RESET_PASSWORD_CAPTCHA_DECREASE,
    RESET_PASSWORD_OPEN,
    RESET_PASSWORD_CLOSE
} from '../actions/types'

const INITIAL_STATE = {
    isSigning: false,
    authenticated: false,
    needAuthPopover: {
        status: false,
        target: null,
        header: ''
    },
    sign: {
        isSignIn: true,
        email: '',
        password: '',
        confirmPassword: '',
        emailFocusStatus: 0,
        passwordFocusStatus: 0,
        confirmPasswordFocusStatus: 0
    },
    resetPassword: {
        isOpen: false,
        status: 0,
        email: '',
        emailFocusStatus: 0,
        captcha: '',
        remainSeconds: 0,
        password: '',
        confirmPassword: '',
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
        case NEED_AUTH_POPOVER_CLOSE:
        case NEED_AUTH_POPOVER_OPEN:
            return Object.assign({}, state, { needAuthPopover: handleNeedAuthPopover(state.needAuthPopover, action)})
        case RESET_PASSWORD_OPEN:
        case RESET_PASSWORD_CLOSE:
        case RESET_PASSWORD_EMAIL_BLUR:
        case RESET_PASSWORD_EMAIL_FOCUS:
        case RESET_PASSWORD_CHANGE_EMAIL:
        case RESET_PASSWORD_SEND_EMAIL:
        case RESET_PASSWORD_EDIT_TARGET_EMAIL:
        case RESET_PASSWORD_CHANGE_CAPTCHA:
        case RESET_PASSWORD_RESEND_EMAIL:
        case RESET_PASSWORD_CAPTCHA_DECREASE:
        case RESET_PASSWORD_GO_RESET_PASSWORD:
        case RESET_PASSWORD_CHANGE_PASSWORD:
        case RESET_PASSWORD_CHANGE_CONFIRM_PASSWORD:
        case RESET_PASSWORD_PASSWORD_BLUR:
        case RESET_PASSWORD_PASSWORD_FOCUS:
        case RESET_PASSWORD_CONFIRM_PASSWORD_BLUR:
        case RESET_PASSWORD_CONFIRM_PASSWORD_FOCUS:
        case RESET_PASSWORD_DONE:
            return Object.assign({}, state, { resetPassword: handleResetPassword(state.resetPassword, action)})
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

function handleNeedAuthPopover(state, action) {
    switch (action.type) {
        case NEED_AUTH_POPOVER_CLOSE:
            return Object.assign({}, state, 
                {
                    status: false,
                    target: null,
                    header: ''
                })
        case NEED_AUTH_POPOVER_OPEN:
            return Object.assign({}, state, 
                {
                    status: true,
                    target: action.target,
                    header: action.header
                })
        default:
            return state
    }
}

function handleResetPassword(state, action) {
    switch (action.type) {
        case RESET_PASSWORD_OPEN:
            return Object.assign({}, state, { isOpen: true })
        case RESET_PASSWORD_CLOSE:
            return Object.assign({}, INITIAL_STATE.resetPassword )
        case RESET_PASSWORD_EMAIL_BLUR:
            return Object.assign({}, state, { emailFocusStatus: 1 })
        case RESET_PASSWORD_EMAIL_FOCUS:
            return Object.assign({}, state, { emailFocusStatus: 2 })
        case RESET_PASSWORD_CHANGE_EMAIL:
            return Object.assign({}, state, { email: action.value })
        case RESET_PASSWORD_SEND_EMAIL:
            return Object.assign({}, state, { status: 1 })
        case RESET_PASSWORD_EDIT_TARGET_EMAIL:
            return Object.assign({}, state, { status: 0 })
        case RESET_PASSWORD_CHANGE_CAPTCHA:
            return Object.assign({}, state, { captcha: action.value })
        case RESET_PASSWORD_RESEND_EMAIL:
            return Object.assign({}, state, { remainSeconds: 60 })
        case RESET_PASSWORD_CAPTCHA_DECREASE:
            return Object.assign({}, state, { remainSeconds: state.remainSeconds - 1})
        case RESET_PASSWORD_GO_RESET_PASSWORD:
            return Object.assign({}, state, { status: 2 })
        case RESET_PASSWORD_CHANGE_PASSWORD:
            return Object.assign({}, state, { password: action.value })
        case RESET_PASSWORD_CHANGE_CONFIRM_PASSWORD:
            return Object.assign({}, state, { confirmPassword: action.value })
        case RESET_PASSWORD_PASSWORD_BLUR:
            return Object.assign({}, state, { passwordFocusStatus: 1 })
        case RESET_PASSWORD_PASSWORD_FOCUS:
            return Object.assign({}, state, { passwordFocusStatus: 2 })
        case RESET_PASSWORD_CONFIRM_PASSWORD_BLUR:
            return Object.assign({}, state, { confirmPasswordFocusStatus: 1 })
        case RESET_PASSWORD_CONFIRM_PASSWORD_FOCUS:
            return Object.assign({}, state, { confirmPasswordFocusStatus: 2 })
        case RESET_PASSWORD_DONE:
            return Object.assign({}, state, { status: 3 })
        default:
            return state
    }
}