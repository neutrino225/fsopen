/** @format */

require('dotenv').config()

const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const personModel = require('./models/person')

const personService = require('./services/person')

const app = express()

app.use(express.static('build'))

app.use(morgan('tiny'))
app.use(cors())

app.use(express.json())

/// DATABASE

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to mongoose')
  })

/// API

app.get('/api/persons', async (req, res) => {
  const persons = await personModel.find({})

  return res.json(persons)
})

app.get('/info', async (req, res) => {
  const persons = await personModel.find({})

  res.send(
    `<div> <p>Phonebook has info for ${
      persons.length
    }</p> <p>${new Date()}</p> </div>`
  )
})

app.get('/api/persons/:id', async (req, res, next) => {
  const id = req.params.id

  try {
    const userInDb = await personService.findPersonById(id)

    if (userInDb) {
      return res.json(userInDb)
    }
    return res.status(404).json({ error: 'User does not exist' })
  } catch (error) {
    next(error)
  }
})

app.delete('/api/persons/:id', async (req, res, next) => {
  const id = req.params.id

  try {
    const personDeleted = await personService.deletePerson(id)

    return res.status(204).json(personDeleted)
  } catch (err) {
    next(err)
  }
})

app.post('/api/persons', async (req, res, next) => {
  const { name, number } = req.body

  try {
    const personInDb = await personService.findPersonByName(name)

    if (personInDb) {
      return res.status(400).json({ error: 'name must be unique' })
    }

    const newPerson = await personService.addPerson(name, number)

    return res.json(newPerson)
  } catch (error) {
    next(error)
  }
})

const unknownEndpoint = (request, response) => {
  return response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
