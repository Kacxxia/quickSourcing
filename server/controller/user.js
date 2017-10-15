import CloudDinary from 'cloudinary'

import User from '../models/user'
import Activity from '../models/activity'
import { simplifyDate } from '../utils'
import config from '../config/main'
export function getUserProfile(req, res, next) {
    const { id } = req.params
    let obj , activityResults
    User.findById(id, 'email username createTime avatar role introduction _id ')
    .then(result => {
        if (!result) {
            res.status(404).send()
        } else {
            obj = Object.assign({}, result._doc)
            return Activity.find({user: id}, 'target type date').limit(10).sort({date: -1})
        }
    })
    .then(acResults => {
        activityResults = acResults
        return Activity.populate(acResults, {path: 'target', model: 'Entity', select: 'name'})
    })
    .then(activities => {
        obj.activities = []
        activities.forEach((activity, i) => {
            let temp = {}
            temp.targetName = activity.target.name
            temp.type = activityResults[i].type
            temp.date = simplifyDate(activityResults[i].date)
            obj.activities.push(temp)
        })
        res.status(200).json(obj)
    })
    .catch(err => {
        return next(err)
    })
}

export function updateUserProfile(req, res, next) {
    const { id } = req.params
    const { username, avatar, introduction } = req.body
    let update = { username, avatar, introduction }
    let newAvatar = avatar.length > 1000 ? true : false

    let uploadAvatar = new Promise((resolve, reject) => {
        if(newAvatar) {
            CloudDinary.v2.uploader.upload(avatar, config.cloudinary, (err, result) => {
                if (err) reject(err)
                update.avatar = result.url
                resolve(null)
            })
        } else {
            delete update.avatar
            resolve(null)
        }
    })
    uploadAvatar
    .then(() => {
        return User.findByIdAndUpdate(id, { $set: update })
    })
    .then(() => {
        res.send('ok') 
    })
    .catch(err => {
        return next(err)
    })
}

export function getUserVotes(req, res, next) {
    const { id } = req.params
    User.findById(id, 'votes')
    .then(result => {
        result = result.votes
        const re = result.reduce((acc, k) => {
            acc[k._id] = {
                upVoted: k.upVoted,
                downVoted: k.downVoted,
                outdatedVoted: k.outdatedVoted
            }
            return acc
        }, {})
        res.status(200).json(re)
    })
    .catch(err => {
        return next(err)
    })
} 