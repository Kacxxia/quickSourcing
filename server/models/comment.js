const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const commentSchema = new Schema({
    author: {
        type: String,
        ref: "User"
    },
    content: String,
    date: Date,
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0}
})
commentSchema.pre("save", (next) => {
    this.date = new Date
    next()
})

module.exports = commentSchema