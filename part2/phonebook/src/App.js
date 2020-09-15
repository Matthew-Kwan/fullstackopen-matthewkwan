import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Info = ({names,filter}) => {

  const filterLength = filter.length
  const filteredArray = names.filter((x) => {
    return filter.toLowerCase() === x.name.slice(0,filterLength).toLowerCase()
  })

  return filteredArray.map(name => <div key={name.name}><p>{name.name} {name.number}</p></div>)
}

const Filter = ({filter, onChange}) => {
  return (
    <div>
     <input value={filter} onChange={onChange}/> 
  </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setNewFilter ] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons') 
      .then(response => {
        console.log(response.data)
        setPersons(response.data)
      })
  }

  useEffect(hook, [])



  // event handler for form 
  const addInfo = (e) => {
    e.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    if(persons.map(person => person.name).includes(nameObject.name)) {
      window.alert(`${nameObject.name} already exists in the phonebook.`)
    } else {
        // set name
        setPersons(persons.concat(nameObject))
        setNewName('')
        setNewNumber('')
    }

  }

  // name input event handler
  const handleNameChange = (e) => {
    console.log(e.target.value)
    setNewName(e.target.value)
  }

  // phone number input event handler 
  const handleNumberChange = (e) => {
    console.log(e.target.value)
    setNewNumber(e.target.value)

  }

  // handle filter changes 
  const handleFilterChange = (e) => {
    setNewFilter(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={filter} onChange={handleFilterChange}/>
      <h3>Add a new entry</h3>
      <form onSubmit={addInfo}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/> <br></br>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Info names={persons} filter={filter} key={persons.name}/>
      
    </div>
  )
}

export default App