const mongoose = require('mongoose')

// input check
if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}


// database connection
const password = process.argv[2]

const url =
    `mongodb+srv://fullstacker:${password}@clusterohk.lzqms.mongodb.net/puhelinluetteloDB?retryWrites=true&w=majority`
  // `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })


// input specification
const noteSchema = new mongoose.Schema({
    name: String,
    number: String
  })

const Person = mongoose.model('Persons', noteSchema)

if (process.argv.length>3) {
    console.log('Person input arguments')
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    
    person.save().then(response => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
      })
} else {
    const note = Person.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
}

// wif wuf