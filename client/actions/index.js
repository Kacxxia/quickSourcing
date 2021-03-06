import Cookies from 'universal-cookie'
import { THROW_ERROR } from './types'
import { getCurrentIp } from '../utils'
export const cookies = new Cookies()

export const API_URL = process.env.NODE_ENV === 'production' ?`https://quicksourcing.info:443/api` :  'http://localhost:3000/api'
export const CLIENT_ROOT_URL = process.env.NODE_ENV === 'production' ?`https://quicksourcing.info:443`: 'http://localhost:8080/api'


export function throwError(error) {
    return ({
        type: THROW_ERROR,
        error
    })
}

