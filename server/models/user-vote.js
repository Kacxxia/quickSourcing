const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const userVoteSchema = new Schema({
    upVoted: Boolean,
    downVoted: Boolean,
    outdatedVoted: Boolean
})
module.exports = userVoteSchema