import jwt from 'jsonwebtoken'
import config from './config/main'

export const API_URL = 'http://45.77.131.76:3000/api'

export function generateToken(user)  {
    return jwt.sign(user, config.secret, { expiresIn: '7d' })
}

export function filterUserInfo(user) {
    const { email, avatar, _id } = user
    return { email, avatar, _id }
}

export function simplifyDate(dateObj) {
    return `${dateObj.getFullYear()}-${dateObj.getMonth()+1}-${dateObj.getDate()} ${dateObj.getHours()}:${dateObj.getMinutes()}`
}
