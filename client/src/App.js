import React, { Component } from 'react'
import './global.css'
import Header from './components/Header'

// For development purpose only!
// import Courses from './components/Courses'
// import CourseDetail from './components/CourseDetail'
// import UserSignIn from './components/UserSignIn'
// import UserSignUp from './components/UserSignUp'
// import CreateCourse from './components/CreateCourse'
import UpdateCourse from './components/UpdateCourse'

class App extends Component {
  state = {
    data: []
  }

  render() {
    return (
      <>
        <Header />
        <UpdateCourse />
      </>
    );
  }
}

export default App;
