import React from 'react'
import { Link } from 'react-router-dom'
import { deleteCourseWithID } from '../utility/CRUD'

const ActionBar = ({courseID}) => {
  return (
    <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100">
            <span>
              <Link className="button" to={`/courses/${courseID}/update`}>Update Course</Link>
              <Link className="button" onClick={() => deleteCourseWithID(courseID)} to="/" >Delete Course</Link>
            </span>
            <Link className="button button-secondary" to="/">Return to List</Link>
          </div>
        </div>
    </div>
  )
}

export default ActionBar
