const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const shareSchema = new Schema({
    author: {
        type: String,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    content: String,
    date: Date,
    likes: {type: Number, default: 0},
    views: {type: Number, default: 0}
})
shareSchema.pre("save", (next) => {
    this.date = new Date
    next()
})

module.exports = shareSchema