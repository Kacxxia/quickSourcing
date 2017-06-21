import fetch from 'node-fetch'
import express from 'express'
import passport from 'passport'
import Entity from './models/entity'
import { getDetail, getEntities, getTags, postEntity, postVote} from './controller/entity'
import { handleRequest } from './controller/main'
const jwtAuth = passport.authenticate('jwt', { session: false})

module.exports = (app) => {
    const apiRoutes = express.Router()
    apiRoutes.post('/test', (req, res, next) => {
        const { entityName, tags } = req.body,
            entity = new Entity
        let i, name
        for ( i in names) {
            name = {
                lang: 'cmn',
                content: names[i].content
            }
            entity.names.push(name)
        }
        tags.forEach((tag) => {
            entity.tags.push(tag)
            console.log(entity.tags)
        })
        entity.save((err) => {
            if (err) { return next(err) }
            console.log(" success")
            res.send('ok')
        })
    })
    apiRoutes.get('/test', (req, res, next) => {
        Entity.getAllTags().
        then((tags) => {
            res.send(tags)
        })
    })

    apiRoutes.post('/token', jwtAuth, (req, res) => {
        res.send('ok')
    })

    apiRoutes.get('/tags', getTags)
    apiRoutes.post('/entities/:id/vote', postVote)
    apiRoutes.get('/entities/:id', getDetail)    
    apiRoutes.get('/entities', getEntities)
    apiRoutes.post('/thunktest', postEntity)
    // app.get('/entities/:id', handleRequest)
    // app.get('/', handleRequest)
    app.use('/api', apiRoutes)
}