export default function errorHandler(err, req, res, next) {
    console.log(err)
    let code 
    switch (err) {
        case '邮箱已存在':
            code = 400
            break
        case '密码错误':
            code = 401
            break
        default:
            code = 500
    }
    res.status(code).send(err)
}