import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Consumer } from '../Context'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        <Consumer>
            { context => {
                const { isLoggedIn } = context.user
                return(
                    isLoggedIn
                        ? <Component {...props} />
                        : <Redirect to={{
                            pathname: "/signin",
                            state: { from: props.location }
                          }} />
                )
            }}
        </Consumer>
    )} />
)

export default PrivateRoute