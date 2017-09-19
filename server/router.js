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
import { signUp, signIn, updateToken } from './controller/auth'
import { getUserProfile, updateUserProfile } from './controller/user'

import passportInit from './config/passport'
const jwtAuth = passport.authenticate('jwt', { session: false})

module.exports = (app) => {
    const apiRoutes = express.Router()
    
    apiRoutes.get('/test', (req, res) => {
        Entity
        .findById('59474a2d6f5c67b8d46e1b1d')
        .sort({
            "resource.level": -1,
            "resoource.good": -1,
            "resource.bad": 1,
            "resource.outdated": 1 
        })  
        .then(result => {
            res.send(result)
        })
    })

    apiRoutes.post('/token', jwtAuth, (req, res) => {
        res.send('ok')
    })

    apiRoutes.get('/tags', getTags)
    apiRoutes.post('/entities/:id/vote', postVote)
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
    apiRoutes.post('/users/:id/profiles', updateUserProfile)

    
    app.use('/api', apiRoutes)

    app.get('*', (req, res, next) => {
        res.sendFile('index.html', {root: __dirname + '/static/'})
    })
}