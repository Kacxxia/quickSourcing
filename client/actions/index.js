import Cookies from 'universal-cookie'
import { THROW_ERROR } from './types'
export const cookies = new Cookies()

export const API_URL = 'http://45.77.131.76:80/api'
export const CLIENT_ROOT_URL = 'http://45.77.131.76:80'


export function throwError(error) {
    return ({
        type: THROW_ERROR,
        error
    })
}

