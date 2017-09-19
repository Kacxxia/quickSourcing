const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const activitySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    target: {
        type: Schema.Types.ObjectId,
        ref: "Entity"
    },
    content: {
        type: String
    },
    type: {
        type: String,
        enum: ["updateEntity", "createEntity", "merge", "share", "comment", "addResource", "updateResource", "removeResource"],
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})


module.exports = mongoose.model("Activity", activitySchema)