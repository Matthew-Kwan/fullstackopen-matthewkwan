import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// React component for button
const Button = (props) => {
  
  // destructure the props to get variables
  const {onClick, text} = props

  // return the JSX html injection
  return (
    <button onClick={onClick}> {text} </button>
  )
}

// React component for the average statistic to handle conditions for when the array is initially empty 
const Average = (props) => {
  
  // destructure props 
  const {all} = props 

  // Conditional Rendering (now that it's handled in Stats, shouldn't be necessary, but good to include in case)
  if(all.length===0) {
    return (<p>average *No Values Found*</p>)
  } else {
  return (<p> average {all.reduce((a,b) => (a+b))/all.length} </p>)
  }
  
}

const Statistics = (props) => {
  const {good,neutral,bad,all} = props;

  if(all.length>0) {
    return (
    <>
      <h1> Statistics </h1>
      <table>
        <tr> <Statistic text='good' value={good}/> </tr>
        <tr> <Statistic text='neutral' value={neutral}/> </tr>
        <tr> <Statistic text='bad' value={bad}/> </tr>
        <tr> <Statistic text='all' value={all.length}/> </tr>
        <tr> <Average all={all} /> </tr>
        <tr> <Statistic text='% Positive' value={all.filter(x => x==1).length/all.length}/> </tr>
      </table>
    </>
    )
  } else {
    
    return (
      <>
        <p> Enter feedback to see statistics! </p>
      </>
    )
  }
}

const Statistic = (props) => {
  const {text,value} = props
  
  return (
    <p>{text} {value}</p>  
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState([])

  // create seperate event handlers for each button 
  const handleGood = () => {
    setAll(all.concat(1));
    setGood(good+1);
  };

  const handleNeutral = () => {
    setAll(all.concat(0));
    setNeutral(neutral+1);
  };

  const handleBad = () => {
    setAll(all.concat(-1));
    setBad(bad+1);
  };

  return (
    <div>
      <h1> Give Feedback </h1>
      <Button onClick={handleGood} text='good'/>
      <Button onClick={handleNeutral} text='neutral'/>
      <Button onClick={handleBad} text='bad'/>
      
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
