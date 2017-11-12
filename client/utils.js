import dns from 'dns'
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

export function isSubset(origin, bigger) {
    for (let value of origin) {
        if (bigger.indexOf(value) === -1) return false
    }
        return true
}

export function coolDown(handler, time) {
    const i = setInterval(handler, 1000)
    setTimeout(() => clearInterval(i), time)
}

export function chooseAccountErrorText(status, text) {
    if (status === 1 && !text) {
        return '此处不能留空'
    }
    const reg = /^\w+(?:(.(?:\w)+)*)@(?:\w+.)+\w+$/
    if (status === 1 && !reg.test(text)) {
        return '请输入正确的邮箱'
    }
        return false
}

export function choosePasswordErrorText(status, text) {
    if (status === 1 && !text) {
        return '此处不能留空'
    }
    if (status === 1 && (text.length < 6 || text.length > 18)) {
        return '密码的长度必须在6-18之间'
    }
        return false
}

export function chooseConfirmPasswordErrorText(status, text, originPwd) {
    if (status === 1 && !text) {
        return '此处不能留空'
    } 

    if (status === 1 && originPwd !== text) {
        return '两个密码不匹配，是否重试？'
    }
        return false

}

export function resolveDns(domain) {
    return dns.resolve4(domain, (err, address) => {
        if (err) throw err
        return address
    })
}