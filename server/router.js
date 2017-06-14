import fetch from 'node-fetch'
import express from 'express'
import passport from 'passport'
import Entity from './models/entity'
import { getDetail, getEntities, getTags} from './controller/entity'
import { handleRequest } from './controller/main'
const jwtAuth = passport.authenticate('jwt', { session: false})

module.exports = (app) => {
    const apiRoutes = express.Router()
    apiRoutes.post('/test', (req, res, next) => {
        const { names, tags } = req.body,
            entity = new Entity
        let i, name, tag
        for ( i in names) {
            name = {
                lang: names[i].lang,
                content: names[i].content
            }
            entity.names.push(name)
            console.log(entity.names[0])
        }
        for ( i in tags) {
            tag = { lang: tags[i].lang , content: []}
            tags[i].content.map((value) => {
                tag.content.push(value)
            })
            entity.tags.push(tag)
            console.log(entity.tags[0])
        }
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
    apiRoutes.get('/entities/:id', getDetail)    
    apiRoutes.get('/entities', getEntities)

    // app.get('/entities/:id', handleRequest)
    // app.get('/', handleRequest)
    app.use('/api', apiRoutes)
}