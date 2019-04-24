import React, { Component } from 'react'
import { Form, Field } from 'react-final-form'
import { Link } from 'react-router-dom'
import { createUser } from '../utility/CRUD'

export default class UserSignUp extends Component {
    state = {
        passwordError: false,
        isCreated: false,
        error: null,
    }

    onSubmit = async (values) => {
        const { password, confirmPassword } = values
        // Validates if both passwords are the same
        const isValid = this.validatePassword(password, confirmPassword)
        if(isValid) {
            this.setState({
                passwordError: false,
            })
            const { data, statusCode } = await createUser(values)

            // Checks if errors from the API occured
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

        } else {
            this.setState({
                passwordError: true,
            })
        }
    }

    // Validate-function for both passwords
    validatePassword = (password, confirmPassword) => {
        return password === confirmPassword ? true : false
    }

    render() {
        const { passwordError, error, isCreated } = this.state

        // View for validation errors
        const ValidationView = () => (
            <div>
                <h2 className="validation--errors--label">Validation errors</h2>
                <div className="validation-errors">
                    <ul>
                        {
                            error.includes("firstName") && 
                            <li>Please provide a value for "First Name"</li>
                        }
                        {
                            error.includes("lastName") && 
                            <li>Please provide a value for "Last Name"</li>
                        }
                        {
                            error.includes("emailAddress") && 
                            <li>Please provide a value for "Email Address"</li>
                        }
                        {
                            passwordError && 
                            <li>Passwords are not the same</li>
                        }
                        { 
                            error.includes("password") && 
                            <li>Please provide a value for "Password"</li>
                        }
                    </ul>
                </div>
            </div>
        )

        // Standard view
        const SignUpView = () => (
            <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                {
                    (passwordError || error) &&
                    <ValidationView />
                }
                <Form
                    onSubmit={this.onSubmit}
                    render={ ({ handleSubmit, values }) => (
                        <form onSubmit={handleSubmit}>
                            <Field name="firstName" component="input" placeholder="First Name" />
                            <Field name="lastName" component="input" placeholder="Last Name" />
                            <Field name="emailAddress" component="input" placeholder="Email Address" />
                            <Field name="password" component="input" type="password" placeholder="Password" autoComplete="password" />
                            <Field name="confirmPassword" component="input" type="password" placeholder="Confirm Password" autoComplete="password" />
                            <div className="grid-100 pad-bottom">
                                <Link className="button" onClick={handleSubmit} to="" >Sign Up</Link>
                                <Link className="button button-secondary" to="/" >Cancel</Link>
                            </div>
                        </form>
                    )}
                />
                <p>&nbsp;</p>
                <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
            </div>
        )

        // View after user is successfuly created
        const SignUpSuccessView = () => (
            <div className="grid-66 centered signin">
                <h1>Account successfully created!</h1>
                <Link className="button" to="/signin" >Sign In</Link>
                <Link className="button button-secondary" to="/" >To course list</Link>
            </div>
        )

        return (
            <div className="bounds">
                {
                    isCreated ?
                    <SignUpSuccessView /> :
                    <SignUpView />
                }
            </div>
        )
    }
}
