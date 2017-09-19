const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    resourceSchema = require('./resource'),
    shareSchema = require('./share'),
    commentSchema = require('./comment')

mongoose.Promise = global.Promise

const entitySchema = new Schema({
    name: String,
    tags: {
        type: [String],
        index: true
    },
    introduction: String,
    resource: [resourceSchema],
    good: {type: Number, default: 0},
    bad: {type: Number, default: 0},
    outdated: {type: Number, default: 0},
    contributors: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    shares: [shareSchema],
    comments: [commentSchema]
})

class entity {
    static getAllTags() {
        return this.distinct('tags')
    }
    static getAllNames() {
        return this.distinct('name')
    }
    static getBriefEntities () {
        return this.find({}, { _id: 1, name: 1, tags: 1, introduction: 1})
    }
}
entitySchema.loadClass(entity)


export default mongoose.model("Entity", entitySchema)