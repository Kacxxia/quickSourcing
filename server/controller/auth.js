import User from '../models/user'
import { generateToken, filterUserInfo } from '../utils'
export function signUp(req, res, next) {
    const { email, password } = req.body
    User.findOne({ email: email}).exec()
    .then(result => {
        if (result) {
            return Promise.reject('邮箱已存在')
        }
        else {
            return Promise.resolve(null)
            
        }
    })
    .then(() => {
        const newUser = new User({
                email: email,
                username: email,
                password: password,
                createTime: new Date
            })
            return newUser.save((err, product) => {
                if (err) {
                    return next(err)
                }
                return Promise.resolve(product)
            })
    }) 
    .then(product => {
        console.log(product)
        res.status(201).json({
            token: `JWT ${generateToken(filterUserInfo(product))}`
        })
    })
    .catch(err => {
            return next(err)
    })
}

export function signIn(req, res, next) {
    const { email, password } = req.body
    let product    
    User.findOne({ email: email}).exec()
    .then(result => {
        product = result
        if (!result) {
            return Promise.reject('账号不存在')
        }
        else {
            return User.comparePassword(password, result.password)
        }
    })
    .then(isMatch => {
        if (isMatch) {
            return Promise.resolve(null)
        }
        if (!isMatch) {
            return Promise.reject('密码错误')
        }
    })
    .then(() => {
        console.log(filterUserInfo(product))
        res.status(201).json({
            token: `JWT ${generateToken(filterUserInfo(product))}`
        })
    })
    .catch(err => {
        return next(err)
    })

}

export function updateToken(req, res) {
    const { email, avatar, _id } = req.user
    const token = generateToken({
        email: email,
        avatar: avatar,
        _id: _id
    })
    res.status(200).json({
        token: `JWT ${token}`
    })
}