import { Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt'
import passport from 'passport'
import config from './main'

const jwtOptions = {
    secret: config.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeader
}

const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
    done(null, payload)
})

passport.use(jwtAuth)