const express = require('express')
const router = express.Router()

const courses = [
    {id: 1, name:'hahaha'},
    {id: 2, name:'lelele'},
    {id: 3, name:'mamama'}
]

router.get('/', (req, res) => {
    res.send(courses)
})

router.get('/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course of given ID was not found')

    return res.send(course)
})

// POST
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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

module.exports = router