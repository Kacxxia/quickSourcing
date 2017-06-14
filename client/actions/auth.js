import {
    AUTH_USER
} from './types'

import { API_URL } from './index'

import { cookies } from './index'
export function autoLogIn(dispatch) {
    const token = cookies.get('token')
    if (token) {
        const request = {
            method: "POST",
            headers: {
                "Content-Type": "text/plain",
                "Authorization": token
            }
        }
        fetch(`${API_URL}/token`, request)
        .then((response) => {
            if(response.ok) {
                dispatch({type: AUTH_USER})
            }
        })
    }
}