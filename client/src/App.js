import React, { Component } from 'react'
import './global.css'
import Header from './components/Header'
//import Courses from './components/Courses'

// For development purpose only!
import CourseDetail from './components/CourseDetail'

class App extends Component {
  state = {
    data: []
  }

  render() {
    return (
      <>
        <Header />
        <CourseDetail />
      </>
    );
  }
}

export default App;
