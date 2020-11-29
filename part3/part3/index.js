// This is how Node.js imports modules
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Note = require('./models/note')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

// request contains all information of the http request
// response is used to define how the request is responded to
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// HTTP GET request for getting all notes 
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

// HTTP GET request for getting a single note 
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    if (note) {
      response.json(note) 
    } else {
      response.status(404).end() 
    }
  })
  .catch(err => {
    console.log(error)
    response.status(400).send({ error: 'malformatted id' })
  })   
})


// HTTP DELETE request for deleting a single note 
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// HTTP PUT request for updating importance of notes 
app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

// HTTP POST request for adding a new note 
app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

// PORT definition
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})