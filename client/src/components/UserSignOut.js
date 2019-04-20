import React from 'react'
import { Redirect } from 'react-router-dom'

// Original state
import { stateOrigin } from './state/stateOrigin'

const UserSignOut = (props) => {
  const { updateUser } = props
  updateUser(stateOrigin)

  return(
    <Redirect to="/" />
  ) 
}


export default UserSignOut
