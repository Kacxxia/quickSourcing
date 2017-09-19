import {
    ERROR_CLOSE,
    ERROR_MIND
} from './types'


export function closeError() {
    return { type: ERROR_CLOSE}
}

export function mindError(message, stack) {
    return { type: ERROR_MIND, message, stack }
}