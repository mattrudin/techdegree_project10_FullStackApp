import React from 'react'
import { Link } from 'react-router-dom'
import { deleteCourseWithID } from '../utility/CRUD'
import { Consumer } from './Context'

const ActionBar = (props) => {
  const { courseID, user } = props.data
  const { _id: courseUserId } = user

  return (
    <Consumer>
      { context => {
        const { id: authUserID, isLoggedIn } = context.user
        
        return(
          <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100">
                  { isLoggedIn && 
                    courseUserId === authUserID &&
                    <span>
                      <Link className="button" to={`/courses/${courseID}/update`}>Update Course</Link>
                      <Link className="button" onClick={() => deleteCourseWithID(courseID)} to="/" >Delete Course</Link>
                    </span>}
                  <Link className="button button-secondary" to="/">Return to List</Link>
                </div>
              </div>
          </div>
        )
      }}
    </Consumer>
  )
}

export default ActionBar
