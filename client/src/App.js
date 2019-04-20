import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './global.css'

// Context
import { Provider } from './components/Context'

// App components
import Header from './components/Header'
import Courses from './components/Courses'
import CreateCourse from './components/CreateCourse'
import UpdateCourse from './components/UpdateCourse'
import CourseDetail from './components/CourseDetail'
import UserSignUp from './components/UserSignUp'
import UserSignIn from './components/UserSignIn'
import UserSignOut from './components/UserSignOut'

// Original state
import { stateOrigin } from './components/state/stateOrigin'

//HOC
import PrivateRoute from './components/hoc/PrivateRoute'


class App extends Component {
  state = {
    user: {
      ...stateOrigin,
    }
  }

  updateUser = (authObject) => {
    this.setState({
      user: {
        ...authObject
      }
    })
  }

  render() {
    return (
      <Provider value={{
          user: this.state.user,
          actions: {
            updateUser: this.updateUser
          }
          }}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Courses} />
            <Route path="/courses/create" component={CreateCourse} />
            <Route path="/courses/:id/update" component={UpdateCourse} />
            <Route path="/courses/:id" component={CourseDetail} />
            <Route path="/signin" component={UserSignIn} />
            <Route path="/signup" component={UserSignUp} />
            <Route path="/signout" render={ () => <UserSignOut updateUser={this.updateUser}/>} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
