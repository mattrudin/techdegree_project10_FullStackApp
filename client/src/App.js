import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './global.css'

// App components
import Header from './components/Header'
import Courses from './components/Courses'
import CreateCourse from './components/CreateCourse'
import UpdateCourse from './components/UpdateCourse'
import CourseDetail from './components/CourseDetail'
import UserSignUp from './components/UserSignUp'
import UserSignIn from './components/UserSignIn'
import UserSignOut from './components/UserSignOut'


class App extends Component {
  state = {
    data: []
  }

  render() {
    return (
      <BrowserRouter>
        <Header />
        <Route exact path="/" component={Courses} />
        <Route path="/courses/create" component={CreateCourse} />
        <Route path="/courses/:id/update" component={UpdateCourse} />
        <Route path="/courses/:id" component={CourseDetail} />
        <Route path="/signin" component={UserSignIn} />
        <Route path="/signup" component={UserSignUp} />
        <Route path="/signout" component={UserSignOut} />
      </BrowserRouter>
    );
  }
}

export default App;
