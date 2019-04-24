import React from 'react'
import { Redirect } from 'react-router-dom'
import { stateOrigin } from './state/stateOrigin'

const UserSignOut = (props) => {
  const { updateUser } = props
  // Updates the user state with the original (empty) state
  updateUser(stateOrigin)

  return(
    <Redirect to="/" />
  ) 
}

export default UserSignOut