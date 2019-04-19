import React, { Component } from 'react'
import { Form, Field } from 'react-final-form'
import { Link } from 'react-router-dom'
import { signIn } from '../utility/auth'
import { Consumer } from './Context'

export default class UserSignIn extends Component {
    render() {
        return (
            <Consumer>
                { context => {

                    const onSubmit = async (values) => {
                        const { emailAddress, password } = values
                        const authObject = await signIn(emailAddress, password)
                        context.actions.updateUser(authObject)
                    }
                    
                    return (
                        <div className="bounds">
                            <div className="grid-33 centered signin">
                                <h1>Sign In</h1>
                                <Form
                                    onSubmit={onSubmit}
                                    render={ ({ handleSubmit, values }) => (
                                        <form onSubmit={handleSubmit}>
                                            <Field name="emailAddress" component="input" placeholder="Email Address" />
                                            <Field name="password" component="input" type="password" placeholder="Password" />
                                            <div className="grid-100 pad-bottom">
                                                <button className="button" type="submit">Sign In</button>
                                                <Link className="button button-secondary" to="/" >Cancel</Link>
                                            </div>
                                        </form>
                                    )}
                                />
                                <p>&nbsp;</p>
                                <p>Don't have a user account? <Link to="signup">Click here</Link> to sign up!</p>
                            </div>
                        </div>
                    )}
                }
            </Consumer>
        )
    }
}
