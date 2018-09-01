const helmet = require('helmet')
const morgan = require('morgan')
const Joi = require('joi')
const logger = require('./logger')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())
app.use(morgan('tiny'))

// middleware
app.use(logger)

const courses = [
    {id: 1, name:'hahaha'},
    {id: 2, name:'lelele'},
    {id: 3, name:'mamama'}
]

// GET
app.get('/', (req, res) => {
    res.send('Hello World!!')
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course of given ID was not found')

    return res.send(course)
})

// POST
app.post('/api/courses', (req, res) => {
    const {error} = validateCourse(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})


// PUT
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found')

    const {error} = validateCourse(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }

    course.name = req.body.name
    res.send(course)
})

// DELETE
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found')

    const index = courses.indexOf(course)
    courses.splice(index, 1)

    res.send(course)
})

const validateCourse = (course) => {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema)
}

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening port ${port}....`))
