import User from '../models/user'
import { generateToken, filterUserInfo, mailTransporter, generateFiexedLengthDigitsString, generateHtmlMail } from '../utils'
import { mailAddress } from '../config/main'
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
        res.status(201).json({
            token: `JWT ${generateToken(filterUserInfo(product))}`
        })
    })
    .catch(err => {
        return next(err)
    })

}

export function cookieSignInGetInfo(req, res, next) {
    const { _id } = req.user
    User.findById(_id, "_id email avatar")
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => next(err))
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

export function sendResetPasswordCaptcha(req, res, next) {
    const { email } = req.params
    const captcha = generateFiexedLengthDigitsString(6)

    setTimeout(() => {
        User.findOneAndUpdate({email: email}, {$unset: {captcha: ''}})
    }, 1800000)

    User.findOneAndUpdate({email: email}, {$set: {captcha: captcha}})
    .then((result) => {
        if (result === null) return Promise.resolve(null)
        mailTransporter.sendMail({
            from: {
                name: 'quickSourcing',
                address: '296741334@qq.com'
            },
            to: email,
            subject: `你此次重置密码的验证码是${captcha}`,
            html: generateHtmlMail(captcha)
        })
    })
    .then(() => res.send('ok'))
    .catch((err) => next(err))

    res.send('ok')
}

export function test(req, res, next) {
    const email = req.body
    console.log(email)
    User.findOne({email: email}, 'asdasdas')
    .then((t) => {
        if (!t) console.log(1111111111111111)
        console.log(t)
        res.send(t)
    })
    .catch(err => next(err))
}

export function resetPassword(req, res, next) {
    const  password  = req.body
    const { email } = req.params
    User.findOne({ email: email }, 'password')
    .then((result) => {
        result.password = password
        return result.save()
    })
    .then(() => res.status(200).send('ok'))
    .catch(err => next(err))
}

export function validateCaptcha(req, res, next) {
    const { email } = req.params
    const captcha = req.body
    User.findOne({ email: email })
    .then((result) => {
        if (result.captcha === captcha) return Promise.resolve(null)
            return Promise.reject('验证码错误或过期')
    })
    .then(() => res.status(200).send('ok'))
    .catch(err => next(err))

}