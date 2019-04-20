import React from 'react'
import { Link } from 'react-router-dom'
import { Consumer } from './Context'

const Header = () => (
    <Consumer>
        { context => {
            const { isLoggedIn, firstName, lastName } = context.user

            const LoggedInNav = () => (
                <nav>
                    <span>Welcome {firstName} {lastName}</span>
                    <Link to="/signout" className="signout">Sign Out</Link>
                </nav>
            )

            const NotLoggedInNav = () => (
                <nav>
                    <Link to="/signup" className="signup">Sign Up</Link>
                    <Link to="/signin" className="signin">Sign In</Link>
                </nav>
            )

            return(
                <header className="header">
                    <div className="bounds">
                        <Link to="/">
                            <h1 className="header--logo">Courses</h1>
                        </Link>
                        {
                            isLoggedIn ?
                            <LoggedInNav /> :
                            <NotLoggedInNav />
                        }
                    </div>
                </header>
            )
        }}
    </Consumer>
)

export default Header
