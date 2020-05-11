import React from 'react'

function About() {
  return (
    //if you dont actually need an element you use a react fragment
    //it's like a "ghost" element that doesnt show in the dom, but returns something
    <React.Fragment>
      <h1>About</h1>
      <p>This is the TodoList app v1.0.0. It is part of a React crash course</p>
    </React.Fragment>
  )
}


export default About;