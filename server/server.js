import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import passport from 'passport'
import config from './config/main'
import router from './router'
import path from 'path'
import errorHandler from './models/error-handler'
mongoose.connect(config.database)

const app = express()

app.use('/static', express.static(path.resolve(__dirname, 'static')))

app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(morgan('dev'))
app.use(passport.initialize())


app.listen(config.port, () => {
    console.log(`server is listening on port ${config.port}`)
})  

app.use((req, res, next) => {                                   
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
})

router(app)

app.use(errorHandler)