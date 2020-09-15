import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const indexOfMax = (arr) => {
  if (arr.length === 0) {
    return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
          maxIndex = i;
          max = arr[i];
      }
  }

  return maxIndex;
}


const Button = (props) => {
  
  const {onClick, text} = props

  return (
    <button onClick={onClick}> {text} </button>
  )
}

const HighestVotes = (props) => {
  const {points} = props
  const index = indexOfMax(points)

  return <p>{anecdotes[index]}</p>
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))

  // create event handlers
  const handleClick = () => {

    const rand_int = Math.floor(Math.random()*anecdotes.length)

    setSelected(rand_int)
  }


  const handleVote = () => {

      // creates a copy of the points object, and assigns points in the new object
      const copy = [...points]
      copy[selected] += 1
  
      setPoints(copy)
  }
  

  return (
    <div>
      <h1>Current Anecdote</h1>
      <p> {props.anecdotes[selected]} </p>
      <p> has {points[anecdotes.indexOf(props.anecdotes[selected])]} votes! </p>
      <Button onClick={handleClick} text='Click to see another quote!'/>
      <Button onClick={handleVote} text='Vote'/> <br></br>

      <h1> Anecdote with most votes</h1>
      <HighestVotes points={points}/>

    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)