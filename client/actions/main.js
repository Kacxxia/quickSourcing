import { createSearchAction } from 'redux-search'
const searchByTag = createSearchAction('entities')
import {
    GET_TAGS_DONE,
    GET_ENTITIES_DONE,
    ADD_CHIP,
    DELETE_CHIP,
    UPDATE_TAG_ID
} from './types'

import {
    API_URL
} from './index'

export function getTagsAndEntities(dispatch) {
    Promise.all([getEntities(), getTags()])
    .then((responses) => {
        let jsons = []
        for (let i=0; i<responses.length; i++) {
            if (responses[i]){
                jsons.push(responses[i].json())
            }
        }
        return Promise.all(jsons)
    })
    .then((datas) => {
        dispatch({type: GET_TAGS_DONE, payload: datas[1]})        
        dispatch({type: GET_ENTITIES_DONE, payload: datas[0]})
    })
    .catch((error) => {
        console.error(error)
    })
}


function getTags() {
    return fetch(`${API_URL}/tags`)
}
function getEntities() {
    return fetch(`${API_URL}/entities`)
}

export function addChip(dispatch, chip) {
    searchByTag(chip.tag)
    dispatch({type: ADD_CHIP, payload: chip.tag})
}

export function deleteChip(dispatch, chip) {
    searchByTag(chip.tag)
    dispatch({type: DELETE_CHIP, payload: chip.tag})
}

export function updateTagID(dispatch, resultID) {
    dispatch({type: UPDATE_TAG_ID, payload: resultID})
}
