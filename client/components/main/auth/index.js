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