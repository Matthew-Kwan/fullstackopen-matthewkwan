import React from 'react'
import ReactDOM from 'react-dom'

// Exercise 1.1 refactor code so that it consists of 3 new components (Header, Content, and Total)

const Header = (props) => {
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      
      <p>
        {props.part1} {props.exercise1}
      </p>

      <p>
        {props.part2} {props.exercise2}
      </p>

      <p>
        {props.part3} {props.exercise3}
      </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercise {props.ex1+props.ex2+props.ex3}
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} exercise1={exercises1} exercise2={exercises2} exercise3={exercises3} />
      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))