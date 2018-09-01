const debug = require('debug')('app:db')
const config = require('config')
const helmet = require('helmet')
const morgan = require('morgan')
const Joi = require('joi')
const logger = require('./middleware/logger')
const home = require('./routes/home')
const courses = require('./routes/courses')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())
app.use('/', home)
app.use('/api/courses', courses)

debug('This is db debugging...')

// Configuration
console.log(`Application name ${config.get('name')}`)
console.log(`Mail Server ${config.get('mail.host')}`)
console.log(`Mail Password ${config.get('mail.password')}`)

if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    console.log('Morgan enabled...')
}

// middleware
app.use(logger)

// GET


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening port ${port}....`))
