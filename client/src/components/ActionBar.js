import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { deleteCourseWithID } from '../utility/CRUD'
import { Consumer } from './Context'

export default class ActionBar extends Component {
  state = {
    isDeleted: false,
  }
  
  render() {
    const { courseID, user } = this.props.data
    const { isDeleted } = this.state
    const { _id: courseUserId } = user
    return (
      <Consumer>
        { context => {
          const { id: authUserID, isLoggedIn, authHeader } = context.user
  
          const handleClick = async (event) => {
            event.preventDefault()
            await deleteCourseWithID(courseID, authHeader)
            this.setState({
              isDeleted: true,
            })
          }
          
          return(
            <div className="actions--bar">
                <div className="bounds">
                  <div className="grid-100">
                    { 
                      isLoggedIn && 
                      courseUserId === authUserID &&
                      <span>
                        <Link className="button" to={`/courses/${courseID}/update`}>Update Course</Link>
                        <Link className="button" onClick={handleClick} to="" >Delete Course</Link>
                      </span>
                    }
                    {
                      isDeleted &&
                      <Redirect push to="/" />
                    }
                    <Link className="button button-secondary" to="/">Return to List</Link>
                  </div>
                </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}