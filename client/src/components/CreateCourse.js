import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Field } from 'react-final-form'
import { Consumer } from './Context'
import { createCourse } from '../utility/CRUD'
import { getAuthHeader } from '../utility/auth'

export default class CreateCourse extends Component {
    state={
        isCreated: false,
        error: null,
    }
    
    render() {
        return (
            <Consumer>
                { context => {
                    const { firstName, lastName } = context.user
                    const { isCreated, error } = this.state

                    const onSubmit = async (values) => {
                        const { authHeader } = context.user
                        const header = getAuthHeader(authHeader)
                        const { data, statusCode} = await createCourse(values, header)
                        
                        if(statusCode === 201) {
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

                    const ValidationView = () => (
                        <div>
                            <h2 className="validation--errors--label">Validation errors</h2>
                            <div className="validation-errors">
                                <ul>
                                    { 
                                        error.includes("title") && 
                                        <li>Please provide a value for "Title"</li>
                                    }
                                    {
                                        error.includes("description") && 
                                        <li>Please provide a value for "Description"</li>
                                    }
                                </ul>
                            </div>
                        </div>
                    )

                    const CreateCourseView = () => (
                        <>
                            <h1>Create Course</h1>
                            {
                                error &&
                                <ValidationView />
                            }
                            <Form 
                                onSubmit={onSubmit}
                                render={ ({ handleSubmit, values }) => (
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
                                            <Link className="button" onClick={handleSubmit} to="" >Create Course</Link>
                                            <Link className="button button-secondary" to="/" >Cancel</Link>
                                        </div>
                                    </form>
                                    )
                                }
                            />
                        </>
                    )

                    const CourseCreatedView = () => (
                        <div className="grid-66 centered">
                            <h1>Course successfully created!</h1>
                            <Link className="button" to="/" >To course list</Link>
                        </div>
                    )

                    return(
                        <div className="bounds course--detail">
                            {
                                isCreated ?
                                <CourseCreatedView /> :
                                <CreateCourseView />
                            }
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}