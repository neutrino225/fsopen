/** @format */

const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3 },
  number: { type: String, required: true, minLength: 8 },
})

personSchema.set('toJSON', {
  transform: (_, returned) => {
    returned.id = returned._id.toString()

    delete returned._id
    delete returned.__v
  },
})

const personModel = mongoose.model('Person', personSchema)

module.exports = personModel
