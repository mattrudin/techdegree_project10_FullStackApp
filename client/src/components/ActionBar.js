import React from 'react'

const ActionBar = () => {
  return (
    <div className="actions--bar">
        <div className="bounds">
        <div className="grid-100"><span><a className="button" href="update-course.html">Update Course</a><a className="button" href="delete-course.html">Delete Course</a></span><a
            className="button button-secondary" href="index.html">Return to List</a></div>
        </div>
    </div>
  )
}

export default ActionBar
