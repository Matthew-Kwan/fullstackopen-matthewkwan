import React, { useEffect, useState } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

const Info = ({person,filter,deleteInfoOf}) => {

  const filterLength = filter.length
  const matchBool = person.name.slice(0,filterLength) === filter
  
  if(matchBool) {
    return <div key={person.name}><p>{person.name} {person.number} <button onClick={deleteInfoOf}>Delete</button></p></div>
  } else {
    return
  }
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
  const [ message, setMessage ] = useState(null)
  const [ msgType, setMsgType ] = useState('success')

  // Get the current entries
  const getPeople = () => {
    personService
      .getAll()
      .then(response => {
        //console.log(` This is the GET response: ${response}`)
        setPersons(response)
      })
  }

  useEffect(getPeople, [])

  // event handler for form 
  const addInfo = (e) => {
    console.log("addInfo called!")
    e.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    // If person already exists, update the phonebook instead 
    if(persons.map(person => person.name).includes(nameObject.name)) {

      if(window.confirm(`${nameObject.name} already exists in the phonebook. Updating their number to ${nameObject.number} if OK.`)) {
        let existingPerson = persons.find(p => p.name === nameObject.name)
        personService
          .update(existingPerson.id, nameObject)
          .then(response => {
            setPersons(persons.map(person => person.name !== existingPerson.name ? person : response))
            setMsgType('success')
            setMessage(
              `The number for ${nameObject.name} was successfully updated!`
            ) 
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            
          })
          .catch(error => {
            setMsgType('error')
            setMessage(
              'The person you are trying to update in the phonebook does not exist.' 
            )
            setTimeout(() => {
              setMessage(null) 
            }, 5000)
            console.log(error)
          })
        }

    } else {
        // set name
        personService
          .create(nameObject)
          .then(response => {
            setPersons(persons.concat(response))
            setNewName('')
            setNewNumber('')
            setMsgType('success')
            setMessage (
              `${nameObject.name} was successfully added to the phonebook!` 
            ) 
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setMsgType('error')
            setMessage(error.response.data.error)
            console.log(error.response.data.error)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
        }
    }

  // Deletion event
  const deleteInfo = (id) => {

    console.log(id)

    if (window.confirm("Do you want to delete this person from your phonebook?")) {
      personService
        .deletePerson(id)
        .then(response => {
          // retrieve new list of people after deletion and reset state to re-render info component
          getPeople()
          console.log('Person deleted') 
        })
        .catch(err => {
          console.log(`Deletion failed: ${err}`)
        })
    } else {
      return
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
        <Notification message={message} type={msgType}/>
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
        {persons.map((person, i) =>
          <Info person={person} filter={filter} key={i} deleteInfoOf = {() => deleteInfo(person.id)}/>
        )}
      
      
    </div>
  )
}

export default App