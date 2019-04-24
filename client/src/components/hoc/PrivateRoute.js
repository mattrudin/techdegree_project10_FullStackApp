import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Consumer } from '../Context'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        <Consumer>
            { context => {
                const { isLoggedIn } = context.user
                return(
                    isLoggedIn ? 
                    // If the user is logged in, show the component
                    <Component {...props} /> :
                    // Else, redirect to the signIn page
                    <Redirect to="/signin" />
                )
            }}
        </Consumer>
    )} />
)

export default PrivateRoute