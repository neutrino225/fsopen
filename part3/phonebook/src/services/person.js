/** @format */

const Person = require('../models/person')

const getAll = async () => {
  return await Person.find({})
}

const deletePerson = async (id) => {
  return await Person.findByIdAndDelete(id)
}

const findPersonById = async (id) => {
  return await Person.findById(id)
}

const findPersonByName = async (name) => {
  return await Person.findOne({ name })
}

const addPerson = async (name, number) => {
  const person = new Person({
    name,
    number,
  })

  await person.save()
  return person
}

module.exports = {
  getAll,
  deletePerson,
  findPersonById,
  findPersonByName,
  addPerson,
}
