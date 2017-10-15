import {
    TAG_STORE_CHANGE_SEARCH,
    TAG_STORE_CHANGE_SELECTED
} from './types'


export function tagStoreChangeSearchValue(value) {
    return { type: TAG_STORE_CHANGE_SEARCH, value}
}

export function tagStoreChangeSelected(payload) {
    return { type: TAG_STORE_CHANGE_SELECTED, payload}
}