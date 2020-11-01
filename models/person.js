const mongoose = require('mongoose')

// database connection
const url = process.env.MONGODB_URI
 
console.log('connecting to', url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })


// input specification
const noteSchema = new mongoose.Schema({
    name: String,
    number: String
  })

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Persons', noteSchema)


// what to export from module
module.exports = Person
