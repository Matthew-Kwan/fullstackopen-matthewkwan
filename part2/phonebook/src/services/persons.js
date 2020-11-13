/*
This module returns an object that has three functions as its properties that deal with notes (getAll, create, update)
*/

import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

// Create function in service object to delete a person 
const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request
}

// Name of key and assigned variables are the same so shortenable to below.
export default { getAll, create, update, deletePerson }