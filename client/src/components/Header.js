import React from 'react'

const Header = (props) => {
    // const { isLoggedId } = props
    return (
        <header className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav><a className="signup" href="sign-up.html">Sign Up</a><a className="signin" href="sign-in.html">Sign In</a></nav>
            </div>
        </header>
    )
}

export default Header
