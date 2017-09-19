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

export function translateCategory(category) {
    const obj = {
        'website': '网站',
        'community': '社区',
        'article': '文章',
        'book': '书籍',
        'other': '其他',
        '网站': 'website',
        '文章': 'article',
        '社区': 'community',
        '书籍': 'book',
        '其他': 'other'
    }
    return obj[category]
}

export function intersection(array) {
    let result = []

    const argsLength = arguments.length

    for (let i=0, length = array.length; i < length; i++) {
        const item = array[i]

        if (result.indexOf(item) !== -1) continue

        let j
        for (j=1; j < argsLength; j++) {
            if (arguments[j].indexOf(item) === -1) break
        }

        if (j === argsLength) result.push(item)
    }

    return result
}

export function arraySplit(arr, symbol) {
    return arr.reduce((acc, cur, index) => {
        acc += cur
        if (index < arr.length - 1) acc += symbol
        return acc
    }, '')
}
