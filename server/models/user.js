const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs'),
    roles = require('../constants'),
    defaultAvatar = require('../config/main').defaultAvatar,
    userVoteSchema = require('./user-vote')

const { ROLE_USER, ROLE_ADMIN, ROLE_SUPER } = roles

mongoose.Promise = global.Promise

const userSchema = new Schema({
    username: String,
    password: String,
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    avatar: {
        type: String,
        default: defaultAvatar
    },
    role: {
        type: String,
        enum: [ ROLE_ADMIN, ROLE_SUPER, ROLE_USER ],
        default: ROLE_USER
    },
    introduction: {
        type: String,
        default: '请用一句话简单地介绍自己'
    },
    createTime: Date,
    votes: [userVoteSchema],
    captcha: String
})
userSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next()
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err)
            
            this.password = hash
            next()
        })
    })
})

userSchema.statics.comparePassword = (reqPassword, password) => {
    return bcrypt.compare(reqPassword, password)
}

export default mongoose.model("User", userSchema)