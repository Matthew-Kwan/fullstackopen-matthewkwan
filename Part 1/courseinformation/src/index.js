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
      <Part part={props.parts[0].name} ex={props.parts[0].exercises} />
      <Part part={props.parts[1].name} ex={props.parts[1].exercises} />
      <Part part={props.parts[2].name} ex={props.parts[2].exercises} />
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

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))