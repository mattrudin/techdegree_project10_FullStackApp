import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Field } from 'react-final-form'
import { getAuthHeader } from '../utility/auth'
import { username, password } from '../tempLogin'
import { createCourse } from '../utility/CRUD'

export default class CreateCourse extends Component {
    onSubmit = (values) => {
        const header = getAuthHeader(username, password)
        createCourse(values, header)
    }
    
    render() {
        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    <h2 className="validation--errors--label">Validation errors</h2>
                    <div className="validation-errors">
                        <ul>
                            <li>Please provide a value for "Title"</li>
                            <li>Please provide a value for "Description"</li>
                        </ul>
                    </div>
                </div>
                <Form 
                    onSubmit={this.onSubmit}
                    render={ ({ handleSubmit, values }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <Field name="title" component="input" className="input-title course--title--input" placeholder="Course title..." />
                                    <p>By PLACEHOLDER</p>
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
                                <button className="button" type="submit" >Create Course</button>
                                <Link className="button button-secondary" to="/" >Cancel</Link>
                            </div>
                            {/* For debugging only */}
                            <pre>{JSON.stringify(values, 0, 2)}</pre>
                        </form>
                        )
                    }
                />
            </div>
        )
    }
}
