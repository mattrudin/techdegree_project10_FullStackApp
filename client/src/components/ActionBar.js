import React from 'react'
import { Link } from 'react-router-dom'
import { deleteCourseWithID } from '../utility/CRUD'

const ActionBar = ({courseId}) => {
  return (
    <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100">
            <span>
              <Link className="button" to={`/courses/${courseId}/update`}>Update Course</Link>
              <Link className="button" onClick={() => deleteCourseWithID(courseId)} to="/" >Delete Course</Link>
            </span>
            <Link className="button button-secondary" to="/">Return to List</Link>
          </div>
        </div>
    </div>
  )
}

export default ActionBar
