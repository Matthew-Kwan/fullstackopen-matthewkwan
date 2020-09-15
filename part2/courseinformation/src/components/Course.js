import React from 'react'

// component for a course
const Course = (props) => {
    const {name, parts} = props
    
    return (
      <div>
        <Header course={name} />
        <Content parts={parts} />
        <Total parts={parts} />
      </div>
    )
  }

// component for header
const Header = (props) => {
    return (
      <div>
        <h1>
          {props.course}
        </h1>
      </div>
    )
  }

// component for content in course
const Content = (props) => {

    const {parts} = props 

    return parts.map(part => <Part part={part.name} ex={part.exercises}/>)

}

// component for parts
const Part = (props) => {
    return (
        <>
        <p>
            {props.part} {props.ex}
        </p>
        </>
    )
}

// component for total
const Total = (props) => {

    const {parts} = props
    const exerciseArray = parts.map(x => x.exercises)

    return (
        <div>
        <p>
            Number of exercise {exerciseArray.reduce((a,b) => a+b,0)} 
        </p>
        </div>
    )
}

export default Course