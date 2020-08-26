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
    <>
      <Part part={props.part1} ex={props.exercise1} />
      <Part part={props.part2} ex={props.exercise2} />
      <Part part={props.part3} ex={props.exercise3} />
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.ex}
      </p>
    </>
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1.name} part2={part2.name} part3={part3.name} exercise1={part1.exercises} exercise2={part2.exercises} exercise3={part3.exercises} />
      <Total ex1={part1.exercises} ex2={part2.exercises} ex3={part3.exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))