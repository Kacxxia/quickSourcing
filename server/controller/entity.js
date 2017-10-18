import jwt from 'jsonwebtoken'

import Entity from '../models/entity'
import User from '../models/user'
import Activity from '../models/activity'

import { visitorId } from '../constants'
export function getTags(req, res){
    Entity.getAllTags()
    .then((tags) => {
        res.send(tags)
    })
}

export function getEntities(req, res){
    Entity.getBriefEntities()
    .then((list) => {
        let result = list.reduce((acc, rec) => {
            let _id = rec._id
            acc[_id] = Object.assign({}, rec._doc, {id: rec._id}) 
            return acc
        }, {})
        res.send(result)
    })
}

export function getDetail(req, res, next){
    let entityDetail
    Entity
    .findById(req.params.id)
    .sort({
        "resource.level": -1,
        "resoource.good": -1,
        "resource.bad": 1,
        "resource.outdated": 1 
    })  
    .then((result) => {
        const resourceList = result.resource
        entityDetail = Object.assign({}, result._doc, { resource: {}})
        resourceList.forEach((r) => {
            entityDetail.resource[r._id] = r
        })

        const opts = {
            path: 'contributors',
            select: 'avatar _id'
        }
        return User.populate(result, opts)
    })
    .then(cons => {
        entityDetail.contributors = cons.contributors

        res.status(200).json(entityDetail)
    })
    .catch((error) => {
        next(error)
    })
}

export function postEntity(req, res, next) {
    const { resource, entityName, tags, token, authenticated } = req.body
    const decoded = jwt.decode(token)
    const resourceList = 
        Object
        .keys(resource)
        .filter(key => !isNaN(parseInt(key, 10)))
        .map(key => {
            return {
                name: resource[key].name, 
                category: resource[key].category,
                href: resource[key].link
            }
        })
    const payload = {name: entityName, tags, resource: resourceList}
    const newEntity = new Entity(payload)

    const newActivity = new Activity({
        user: authenticated ? decoded._id : visitorId,
        target: newEntity._id,
        content: JSON.stringify(payload),
        type: "createEntity",
        date: new Date
    })
    if (authenticated) {
        newEntity.contributors.push(decoded._id)
    }
    newEntity.save((err) => {
        if (err) return next(err)

        newActivity.save(err => {
            if (err) return next(err)
        })

        res.sendStatus(201)
    })

}

export function postVote(req, res, next) {
    const { _id: userId } = req.user
    const {  id } = req.params
    const { upVote, downVote, outdatedVote, resourceId } = req.body
    let voteTotal
    Entity.findOneAndUpdate(
        {_id: id, "resource._id": resourceId},
        { $inc: {
            "resource.$.good": upVote, 
            "resource.$.bad" : downVote,
            "resource.$.outdated": outdatedVote
        }},
        {new: true}
    )
    .then(entity => {
        const resourceList = entity.resource
        const target = resourceList.filter(re => 
            re._id.toString() === resourceId
        )[0]
        voteTotal = {
            good: target.good,
            bad: target.bad,
            outdated: target.outdated,
            resourceId
        }
        return User.findOne({ _id: userId })
    }) 
    .then(result => {
        let i = 0
        for (; i < result.votes.length; i++) {
            if (result.votes[i]._id.toString() === resourceId) break;
        }
        if (i === result.votes.length) {
            const newVote = {
                _id: resourceId,
                upVoted: false,
                downVoted: false,
                outdatedVoted: false
            }
            result.votes.push(newVote)
            return result.save()
        }
        else {
            const originVotes = Object.assign({}, result.votes[i]._doc)
            const update = {
                _id: resourceId,
                upVoted: chooseVote(upVote, originVotes.upVoted),
                downVoted: chooseVote(downVote, originVotes.downVoted),
                outdatedVoted: chooseVote(outdatedVote, originVotes.outdatedVoted)
            }
            console.log(update)
            result.votes[i] = update
            return result.save()
        }
    } )
    .then(() => {
        res.status(200).json(voteTotal)        
    })
    .catch(err => {
        next(err)
    })
}

function chooseVote(status, origin) {
    if (status > 0 ) return true
    if (status < 0 ) return false
    if (status === 0) return origin
}

export function postResource(req, res, next) {
    const { id } = req.params,
        { resource, token, authenticated } = req.body
    const decoded = jwt.decode(token)
    let update = {
        $push: {
            resource: {
                name: resource.name,
                href: resource.href,
                category: resource.category
            }
        },
        $addToSet: {}
    }
    if (authenticated) {
        update.$addToSet.contributors = decoded._id
    } else {
        delete update.$addToSet
    }
    let updateResult

    Entity.findByIdAndUpdate(id, update, {
        new: true,
        select: 'resource _id'
    })
    .then((result) => {
        updateResult = result

        return new Activity({
            user: authenticated ? decoded._id : visitorId,
            target: result._id,
            content: JSON.stringify(resource),
            type: "addResource",
            date: new Date 
        })
    })
    .then(newActivity => {
        return newActivity.save(err => {
            if (err) return next(err)
            return Promise.resolve(null)
        })
    })
    .then(() => {
        const reso = updateResult.resource
        let obj = {}
        reso.forEach(re => {
            obj[re._id] = re
        })
        res.status(201).json(obj)
    })
    .catch(err => {
        return next(err)
    })
}

export function getSuperior(req, res, next) {
    const { id } = req.params
    Entity.findById(id, 'tags')
    .then(tags => {
        tags = tags.tags
        return Entity.aggregate([
            {
                $match: {
                    $and: [
                        {tags: {$size: tags.length-1}},
                        {$or: makeSuperiorTagFilter(tags)}
                    ]
                }
            },
            {
                $group: {
                    _id: {tags: '$tags'},
                    excludedTag: {$addToSet: {$setDifference: [tags, '$tags']}},
                    entities: {$push: {_id: '$_id', name: '$name'}}
                }
            },
            {
                $project: {
                    _id: 0
                }
            }
        ])
    })
    .then(result => {
        res.send(result)
    })  
    .catch(err => {
        return next(err)
    })
}

function makeSuperiorTagFilter(tags) {
    return tags.reduce((acc, tag, i) => {
        acc.push({tags: {$all: tags.slice(0, i).concat(tags.slice(i+1, tags.length))}})
        return acc
    }, [])
}

export function getSubordinate(req, res, next) {
    const { id } = req.params
    Entity.findById(id, 'tags')
    .then(tags => {
        tags = tags.tags
        return Entity.aggregate([
            {
                $match: {
                    tags: {$all: tags, $size: tags.length + 1}
                }
            },
            {
                $group: {
                    _id: { tags: '$tags'},
                    excludedTag: {$addToSet: {$setDifference: ['$tags', tags]}},
                    entities: {$push: {_id: '$_id', name: '$name'}}
                }
            },
            {
                $project: {
                    _id: 0
                }
            }
        ]).exec()
    })
    .then(results => {
        res.send(results)
    })
    .catch(error => {
        return next(error)
    })
}


export function postEdit(req, res, next) {
    const { id } = req.params

    const { name, tags, resource, introduction, token, authenticated } = req.body
    const decoded = jwt.decode(token)

    let formatResource  = []
    for (let i in resource) {
        formatResource.push(resource[i])
    }
    let update = {
        $set: {
            name: name,
            tags: tags,
            resource: formatResource,
            introduction: introduction
        },
        $addToSet: {}
    }
    if (authenticated) {
        update.$addToSet.contributors = decoded._id
    } else {
        delete update.$addToSet
    }
    Entity.findByIdAndUpdate(id, update)
    .then((entity) => {
            const newActivity = new Activity({
                user: authenticated ? decoded._id : visitorId,
                target: entity._id,
                content: JSON.stringify(update.$set),
                type: 'updateEntity',
                date: new Date()
            })
            newActivity.save(err => {
                if (err) {
                    return next(err)
                }
                res.send('ok')
            })
        }
    )
    .catch((err) => {
        return next(err)
    })

}
