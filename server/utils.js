import franc from 'franc-min'
export const API_URL = 'http://localhost:3000/api'

export function detectLanguage(text) {
    return franc(text, {whitelist: ['cmn', 'eng', 'jpn']})
}
