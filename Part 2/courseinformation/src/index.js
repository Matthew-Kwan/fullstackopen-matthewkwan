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

  const {parts} = props 
  
  console.log(parts.map(part => <Part part={parts.name} ex={parts.exercises}/>))

  return parts.map(part => <Part part={parts.name} ex={parts.exercises} key={parts.id}/>)
  // return (



  //   <>
  //     <Part part={props.parts[0].name} ex={props.parts[0].exercises} />
  //     <Part part={props.parts[1].name} ex={props.parts[1].exercises} />
  //     <Part part={props.parts[2].name} ex={props.parts[2].exercises} />
  //   </>
  // )
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

const Course = (props) => {
  const {name, parts} = props
  
  return (
    <div>
      <Header course={name} />
      <Content parts={parts} key={parts.id} />
      <Total parts={parts} />
    </div>
  )


}

const App = () => {

  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course name={course.name} parts={course.parts} />
}

ReactDOM.render(<App />, document.getElementById('root'))