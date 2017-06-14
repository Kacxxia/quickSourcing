const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const activitySchema = new Schema({
    user: {
        type: String,
        ref: "User"
    },
    target: {
        type: Schema.Types.ObjectId,
        ref: "Entity"
    },
    type: {
        type: String,
        enum: ["updateEntity", "addChild", "merge", "share", "comment", "createRecResource", "updateResource", "deleteResource", "createCandidateResource"],
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})
activitySchema.pre("save", (next) => {
    this.date = new Date
    next()
})

module.exports = mongoose.model("Activity", activitySchema)