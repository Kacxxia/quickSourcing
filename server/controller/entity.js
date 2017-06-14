import Entity from '../models/entity'

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

export function getDetail(req, res){
    res.send(req.params)
}