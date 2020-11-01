const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

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
  }

const password = process.argv[2]

const url =
    `mongodb+srv://fullstacker:${password}@clusterohk.lzqms.mongodb.net/puhelinluetteloDB?retryWrites=true&w=majority`
  // `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

// const note = Note.find({}).then(result => {
//     result.forEach(note => {
//       console.log(note)
//     })
//     mongoose.connection.close()
//   })

// wif wuf

note.save().then(response => {
  console.log('note saved!')
  mongoose.connection.close()
})