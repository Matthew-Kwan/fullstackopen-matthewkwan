import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Exercise 1.1 refactor code so that it consists of 3 new components (Header, Content, and Total)

// The {name,age} represent the destructuring of the props entered into Hello 
const Hello = ({name, age}) => {

    /* const bornYear = () => {
      const yearNow = new Date().getFullYear()
      return yearNow - props.age
    } */
    const bornYear = () => new Date().getFullYear() - age
  
    return (
      <div>
        <p>
          Hello {name}, you are {age} years old
        </p>
        <p>So you were probably born in {bornYear()}</p>
      </div>
    )
  }
  
const Display = ({counter}) => <div>{counter}</div>

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
  )

const History = (props) => {
    if (props.allClicks.length === 0) {
      return (
        <div>
          the app is used by pressing the buttons
        </div>
      )
    }
  
    return (
      <div>
        button press history: {props.allClicks.join(' ')}
      </div>
    )
  }

  
const App = (props) => {
const [value, setValue] = useState(10)

return (
    <div>
    {value}
    <button>reset to zero</button>
    </div>
)
}

ReactDOM.render(
<App />, 
document.getElementById('root')
)