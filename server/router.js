import express from 'express'
import passport from 'passport'
import Entity from './models/entity'
import { 
    getDetail, 
    getEntities, 
    getTags, 
    getSuperior,
    getSubordinate,
    postEntity, 
    postVote, 
    postResource,
    postEdit
} from './controller/entity'
import { signUp, signIn, updateToken, sendResetPasswordCaptcha, test, resetPassword, validateCaptcha } from './controller/auth'
import { getUserProfile, updateUserProfile, getUserVotes } from './controller/user'

import passportInit from './config/passport'
const jwtAuth = passport.authenticate('jwt', { session: false})

module.exports = (app) => {
    const apiRoutes = express.Router()

    apiRoutes.post('/token', jwtAuth, (req, res) => {
        res.send('ok')
    })

    apiRoutes.get('/tags', getTags)
    apiRoutes.post('/entities/:id/vote', jwtAuth, postVote)
    apiRoutes.post('/entities/:id/resource', postResource)
    apiRoutes.get('/entities/:id/superior', getSuperior)
    apiRoutes.get('/entities/:id/subordinate', getSubordinate)
    apiRoutes.post('/entities/:id/editing', postEdit)
    apiRoutes.get('/entities/:id', getDetail)    
    apiRoutes.get('/entities', getEntities)
    apiRoutes.post('/entities', postEntity)

    apiRoutes.get('/token', jwtAuth, updateToken)
    apiRoutes.post('/users', signUp)
    apiRoutes.post('/auth', signIn)
    apiRoutes.get('/users/:id/profiles', getUserProfile)
    apiRoutes.get('/users/:id/votes', jwtAuth, getUserVotes)
    apiRoutes.post('/users/:id/profiles', updateUserProfile)

    apiRoutes.get('/users/:email/captcha', sendResetPasswordCaptcha)
    apiRoutes.post('/users/:email/captcha', validateCaptcha)
    apiRoutes.post('/users/:email/password', resetPassword)

    apiRoutes.post('/test', test)
    
    app.use('/api', apiRoutes)

    app.get('*', (req, res, next) => {
        res.sendFile('index.html', {root: __dirname + '/static/'})
    })
}