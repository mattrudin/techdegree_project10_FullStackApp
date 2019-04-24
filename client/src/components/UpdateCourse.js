import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Field } from 'react-final-form'
import { getCourseWithID, updateCourseWithID } from '../utility/CRUD'
import { Consumer } from './Context'

export default class UpdateCourse extends Component {
  state = {
    data: [],
    user: [],
    courseID: null,
    isUpdated: false,
    error: null,
  }

  // At component mounting: Fetch all details from the course
  async componentDidMount() {
    const { match } = this.props
    const courseID = match.params.id
    try {
        const data = await getCourseWithID(courseID)
        const { user } = data
        this.setState({
          data,
          user,
          courseID,
        })
    } catch (error) {
        console.log('An error occured while fetching data: ', error)
    }
  }

  
  render() {
    const { firstName, lastName } = this.state.user
    const { courseID } = this.state
    
    return (
      <Consumer>
        {context => {
          const { isCreated } = this.state

          const onSubmit = async (values) => {
            const { authHeader } = context.user
            const { _id: courseID } = values
            const { data, statusCode } = await updateCourseWithID(values, courseID, authHeader)

            // Checks if errors from the API occured
            if(statusCode === 204) {
              this.setState({
                  isCreated: true,
              })
            } else {
                const { error } = data
                this.setState({
                    error
                })
            }
          }

          // Standard view
          const UpdateCourseView = () => (
            <>
              <h1>Update Course</h1>
              <div>
              <Form 
                onSubmit={onSubmit}
                initialValues={this.state.data}
                render={ ({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <Field name="title" component="input" className="input-title course--title--input" placeholder="Course title..." />
                                <p>By {firstName} {lastName}</p>
                            </div>
                            <div className="course--description">
                              <Field name="description" component="textarea" className="" placeholder="Course description..." />
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                      <Field name="estimatedTime" component="input" className="course--time--input" placeholder="Hours" />
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                      <Field name="materialsNeeded" component="textarea" className="" placeholder="List materials..." />
                                </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <Link className="button" onClick={handleSubmit} to="" >Update Course</Link>
                            <Link className="button button-secondary" to={`/courses/${courseID}`} >Cancel</Link>
                        </div>
                    </form>
                  )
                }
                />
              </div>
            </>
          )
          
          // View after course is successfuly updated
          const CourseUpdatedView = () => (
            <div className="grid-66 centered signin">
                <h1>Course successfully updated!</h1>
                <Link className="button" to={`/courses/${courseID}`} >Return to course</Link>
                <Link className="button button-secondary" to="/" >To course list</Link>
            </div>
          )

          return(
            <div className="bounds course--detail">
              {
                isCreated ?
                <CourseUpdatedView /> :
                <UpdateCourseView />
              }
            </div> 
          )
        }}
      </Consumer>
    )
  }
}
