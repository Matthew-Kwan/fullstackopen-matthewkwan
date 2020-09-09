import React, { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  // new state for storing user submitted input 
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // add HTML form
  const addNote = (event) => {
    console.log(event.target.value)
    event.preventDefault() 
    const noteObject = {
      content:newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1 
    }

    setNotes(notes.concat(noteObject))
    setNewNote('') // reset the state to blank
  }

  // event handler for syncing change to input with component state 
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important ===true) 

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App