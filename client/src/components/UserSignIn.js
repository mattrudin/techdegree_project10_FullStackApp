import React, { Component } from 'react'
import { Form, Field } from 'react-final-form'
import { Link } from 'react-router-dom'
import { signIn } from '../utility/auth'
import { Consumer } from './Context'

export default class UserSignIn extends Component {
    state = {
        isLoggedIn: false,
        correctAuth: true,
    }

    render() {
        return (
            <Consumer>
                { context => {

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

                    const { correctAuth, isLoggedIn } = this.state
                    
                    return (
                        <div className="bounds">
                            {!isLoggedIn && 
                            <div className="grid-33 centered signin">
                                <h1>Sign In</h1>
                                {!correctAuth &&
                                <div className="validation-errors">
                                    <ul>
                                        <li>Email or password is incorrect.</li>
                                    </ul>
                                </div>}
                                <Form
                                    onSubmit={onSubmit}
                                    render={ ({ handleSubmit, values }) => (
                                        <form onSubmit={handleSubmit}>
                                            <Field name="emailAddress" component="input" placeholder="Email Address" />
                                            <Field name="password" component="input" type="password" placeholder="Password" />
                                            <div className="grid-100 pad-bottom">
                                                <Link className="button" onClick={handleSubmit} >Sign In</Link>
                                                <Link className="button button-secondary" to="/" >Cancel</Link>
                                            </div>
                                        </form>
                                    )}
                                />
                                <p>&nbsp;</p>
                                <p>Don't have a user account? <Link to="signup">Click here</Link> to sign up!</p>
                            </div>}
                            {isLoggedIn &&
                            <div className="grid-33 centered signin">
                                <h1>Successfully logged in!</h1>
                                <Link className="button" to="/" >To course list</Link>
                            </div>}
                        </div>
                    )}
                }
            </Consumer>
        )
    }
}
