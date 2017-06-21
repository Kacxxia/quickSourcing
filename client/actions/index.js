import Cookies from 'universal-cookie'
import { THROW_ERROR } from './types'
export const cookies = new Cookies()

export const API_URL = 'http://localhost:3000/api'
export const CLIENT_ROOT_URL = 'http://localhost:8080'


export function throwError(error) {
    return ({
        type: THROW_ERROR,
        error
    })
}