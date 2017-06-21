const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    resourceSchema = require('./resource'),
    shareSchema = require('./share'),
    commentSchema = require('./comment')

mongoose.Promise = global.Promise

const entitySchema = new Schema({
    names: [{
        lang: {
            type:String,
            required: true
        },
        content: {
            type:String,
            index:true,
            required: true
        }
    }],
    tags: [String],
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'Entity'
    }],
    introduction: [{
        lang: String,
        content: String
    }],
    resource: [resourceSchema],
    good: {type: Number, default: 0},
    bad: {type: Number, default: 0},
    outdated: {type: Number, default: 0},
    contributors: [{
        type: String,
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
        return this.distinct('names.content')
    }
    static getBriefEntities () {
        return this.find({}, { _id: 1, names: 1, tags: 1, introduction: 1})
    }
}
entitySchema.loadClass(entity)


export default mongoose.model("Entity", entitySchema)