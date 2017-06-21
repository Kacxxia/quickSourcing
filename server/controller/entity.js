import Entity from '../models/entity'
import Resource from '../models/resource'
import { detectLanguage } from '../utils'
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
        console.log(result)
        res.send(result)
    })
}

export function getDetail(req, res, next){
    console.log('getDetail')
    Entity.findById(req.params.id)
    .then((result) => {
        const resourceList = result.resource
        let re = Object.assign({}, result._doc, { resource: {}})
        resourceList.forEach((r) => {
            re.resource[r._id] = r
        })
        res.send(re)
    })
    .catch((error) => {
        next(error)
    })
}

export function postEntity(req, res, next) {
    const { resource, entityName, tags } = req.body
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
    console.log(resourceList)

    let nameLang = detectLanguage(entityName)
    const newEntity = new Entity({
        names: [{
            lang: nameLang === 'und' ? 'cmn' : nameLang,
            content: entityName
        }],
        tags,
        resource: resourceList
    })

    newEntity.save((err) => {
        if (err) return next(err)
        res.send(201)
    })

}

export function postVote(req, res, next) {
    const {  id } = req.params
    const { upVote, downVote, outdatedVote, resourceId } = req.body
    console.log(upVote)
    console.log(downVote)
    console.log(outdatedVote)
    console.log(resourceId)
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
        const result = {
            good: target.good,
            bad: target.bad,
            outdated: target.outdated,
            resourceId
        }
        res.status(200).json(result)

    })
    .catch(err => {
        next(err)
    })
}