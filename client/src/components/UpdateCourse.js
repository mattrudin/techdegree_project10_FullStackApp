import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Field } from 'react-final-form'
import { getCourseWithID } from '../utility/CRUD'

export default class UpdateCourse extends Component {
  state = {
    data: [],
    user: [],
    courseID: "",
  }

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

  onSubmit = () => {
    console.log('test')
  }

  render() {
    const { firstName, lastName } = this.state.user
    const { match } = this.props
    const courseId = match.params.id
    const { description} = this.state.data

    return (
        <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
        <Form 
          onSubmit={this.onSubmit}
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
                        <Field name="description" component="textarea" className="" placeholder="Course description..." defaultValue={description} />
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
                      <Link className="button" type="submit" to={`/courses/${courseId}`} >Update Course</Link>
                      <Link className="button button-secondary" to={`/courses/${courseId}`} >Cancel</Link>
                  </div>
              </form>
            )
          }
          />
        </div>
      </div>
    )
  }
}
