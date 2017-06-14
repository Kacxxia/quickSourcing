const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs'),
    roles = require('../constants')

const { ROLE_USER, ROLE_ADMIN, ROLE_SUPER } = roles

const userSchema = new Schema({
    userName: String,
    password: String,
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    avatar: String,    
    role: {
        type: String,
        enum: [ ROLE_ADMIN, ROLE_SUPER, ROLE_USER ],
        default: ROLE_USER
    },
    introduction: String,
    createTime: Date
})
userSchema.pre('save', (next) => {
    this.createTime = new Date
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next()
        }
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash
        })
    })
})

userSchema.methods.comparePassword = (password, callback) => {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return callback(err)
        }
        callback(null, isMatch)
    })
}

module.exports = mongoose.model("User", userSchema)