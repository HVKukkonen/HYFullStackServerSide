const { response } = require('express')
const express = require('express')
const app = express()

notes = [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    }
]

const cors = require('cors')
app.use(cors())

app.use(express.static('build'))

const morgan = require('morgan')
morgan.token('reqbody', function(req, res) {return JSON.stringify(req.body)})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :reqbody"))

app.get('/persons/', (req, res) => {
    res.json(notes)
})

app.get('/info/', (req, res) => {
    res.send(
        `<h2>Phonebook has info for ${notes.length} contacts </h2>
        ${new Date()}`
    )
}
)

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

app.delete('/persons/:id', (request, response) => {
    const id = Number(request.params.id)  // request id from server
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

app.use(express.json())  // json parser for incoming data

app.post('/persons/', (request, response) => {

    const rng = Math.random(10, 10**8)  // generate random id

    // save the body of the request as it is the incoming data 
    const note = {
        "name": request.body.name,
        "number": request.body.number,
        "id": rng
    }

    // if name and number exist
    if (note.name && note.number) {
        // name is not unique
        if (notes.find(contact => contact.name === note.name)) {
            response.status(403).json({
                error: 'name must be unique'
              })  // 403 Forbidden
        } else {
            notes = notes.concat(note)  // save note to notes
            response.json(note)  // display note as response
        }
    } else {
        response.status(404).json({
            error: 'name not found'
          })  // 404 Not found
    }


})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
