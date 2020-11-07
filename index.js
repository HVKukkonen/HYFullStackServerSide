// configure environment variables from dotenv
// require('dotenv').config()
const { response } = require('express')
const express = require('express')
const app = express()
// person mongoose model from models
const Person = require('./models/person')

const cors = require('cors')
app.use(cors())

app.use(express.static('build'))
app.use(express.json())  // json parser for incoming data

const morgan = require('morgan')
morgan.token('reqbody', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :reqbody"))


const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }

    if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
      }

    next(error)
}

app.use(errorHandler)

// ------------------------------------------ requests -------------------------------------------------------------
app.get('/persons/', (request, response, next) => {
    Person.find({})
        .then(notes => {
            response.json(notes)
        })
        .catch(error => next(error))
})

app.get('/info/', (req, res) => {
    res.send(
        `<h2>Phonebook has info for ${notes.length} contacts </h2>
        ${new Date()}`
    )
})

// DEPRICATED
app.get('/persons/:id', (request, response) => {
    // value for variable id in URL
    const id = Number(request.params.id)  // request id from server
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => { response.status(204).end() })
        .catch(error => next(error))
})

app.post('/persons/', (request, response, next) => {

    // save the body of the request as it is the incoming data 
    const person = new Person({
        "name": request.body.name,
        "number": request.body.number,
    })

    // if name and number exist
    if (person.name && person.number) {
        // name is not unique
        // if (notes.find(contact => contact.name === note.name)) {
        //     response.status(403).json({
        //         error: 'name must be unique'
        //       })  // 403 Forbidden
        // } else {
        //     notes = notes.concat(note)  // save note to notes
        //     response.json(note)  // display note as response
        // }

        person.save()
            .then(savedContact => {
                response.json(savedContact)  // add payload to response
            })
            .catch(error => next(error))

    } else {
        response.status(404).json({
            error: 'name not found'
        })  // 404 Not found
    }

})

app.put('/persons/:id', (request, response, next) => {
  
    const person = {
        "name": request.body.name,
        "number": request.body.number,
    }
  
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedNote => {
        response.json(updatedNote)
      })
      .catch(error => next(error))
  })


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
