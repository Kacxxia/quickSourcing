import franc from 'franc-min'
import jwt from 'jsonwebtoken'
import config from './config/main'

export const API_URL = 'http://localhost:3000/api'

export function detectLanguage(text) {
    return franc(text, {whitelist: ['cmn', 'eng', 'jpn']})
}

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