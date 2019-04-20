import React, { Component } from 'react'
import { Form, Field } from 'react-final-form'
import { Link } from 'react-router-dom'
import { signIn } from '../utility/auth'
import { Consumer } from './Context'

// Original state
import { stateOrigin } from './state/stateOrigin'

export default class UserSignIn extends Component {
    state = {
        ...stateOrigin,
        correctAuth: true,
    }

    render() {
        return (
            <Consumer>
                { context => {
                    const { correctAuth, isLoggedIn } = this.state

                    const onSubmit = async (values) => {
                        const { emailAddress, password } = values
                        const authObject = await signIn(emailAddress, password)
                        if(authObject.isLoggedIn) {
                            const { isLoggedIn } = authObject
                            this.setState({
                                isLoggedIn,
                                correctAuth: true,
                            })
                            context.actions.updateUser(authObject)
                        } else {
                            this.setState({
                                correctAuth: false,
                            })
                        }
                    }

                    const LoggedInView = () => (
                        <div className="grid-66 centered signin">
                            <h1>Successfully logged in!</h1>
                            <Link className="button" to="/" >To course list</Link>
                        </div>
                    )

                    const ValidationView = () => (
                        <div className="validation-errors">
                            <ul>
                                <li>Email or password is incorrect.</li>
                            </ul>
                        </div>
                    )

                    const NotLoggedInView = () => (
                        <div className="grid-33 centered signin">
                            <h1>Sign In</h1>
                            {
                                !correctAuth &&
                                <ValidationView />
                            }
                            <Form
                                onSubmit={onSubmit}
                                render={ ({ handleSubmit, values }) => (
                                    <form onSubmit={handleSubmit}>
                                        <Field name="emailAddress" component="input" placeholder="Email Address" />
                                        <Field name="password" component="input" type="password" placeholder="Password" autoComplete="password" />
                                        <div className="grid-100 pad-bottom">
                                            <Link className="button" onClick={handleSubmit} to="" >Sign In</Link>
                                            <Link className="button button-secondary" to="/" >Cancel</Link>
                                        </div>
                                    </form>
                                )}
                            />
                            <p>&nbsp;</p>
                            <p>Don't have a user account? <Link to="signup">Click here</Link> to sign up!</p>
                        </div>
                    )
                    
                    return (
                        <div className="bounds">
                            {
                                isLoggedIn ?
                                <LoggedInView /> :
                                <NotLoggedInView />
                            }
                        </div>
                    )}
                }
            </Consumer>
        )
    }
}
