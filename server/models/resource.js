const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const resourceSchema = new Schema({
    name: {type: String, required: true},
    href: {type: String, required: true},
    category: {type: String, required: true},
    lang: String,
    translationHref: String,
    introduction: String,
    good: {type: Number, default: 0},
    bad: {type: Number, default: 0},
    outdated: {type: Number, default: 0}
})
module.exports = resourceSchema