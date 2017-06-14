import { createSelector } from 'reselect'


export const colorList = [
        ' red ',
        ' pink ',
        ' purple ',
        ' deep-purple ',
        ' indigo ',
        ' blue ',
        ' light-blue ',
        ' cyan ',
        ' teal ',
        ' green ',
        ' lime '
    ]

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

export function getRandomColor(seed) {
    if (seed) { 
        return colorList[seed%colorList.length]
    }
    return colorList[getRandomInt(0, colorList.length)]
}

const getAllTags = state => state.searchResource.tags
export const tagSelector = createSelector(
    getAllTags,
    (tags) => tags.reduce((acc, tag) => {
            acc[tag] = null
            return acc
        },{})

)

