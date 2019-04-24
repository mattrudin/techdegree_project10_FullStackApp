import URL from '../ressources/URL'
// Original state
import { stateOrigin } from '../components/state/stateOrigin'

/************************************************************************************
Sign In function
************************************************************************************/
export const signIn = async (emailAddress, password) => {
    const header = createAuthHeader(emailAddress, password)
    const options = {
        method: 'GET',
        headers: header,
    }

    try {
        const response = await fetch(URL.getUserAuth, options)
        return authObjectFactory(response, emailAddress, password)
    } catch (error) {
        console.log(error)
    }
}

/************************************************************************************
Header functions
************************************************************************************/
// Creates the auth header
export const createAuthHeader = (emailAddress, password) => {
    const credentials = `${emailAddress}:${password}`
    const authorization = `Basic ${btoa(credentials)}`
    return getAuthHeader(authorization)
}

// Returns the header with Basic Auth properties
export const getAuthHeader = authInformation => {
    return new Headers({
        'credentials': 'include',
        'Access-Control-Allow-Credentials': true,
        'Authorization': authInformation,
        'Content-Type': 'application/json',
    })
}

// Returns the standard header (without auth)
export const getHeader = () => {
    return new Headers({
        'credentials': 'include',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
    })
}

// Returns an authe object for the sigIn function
const authObjectFactory = async (data, emailAddress, password) => {
    let authObject = {
        ...stateOrigin,
    }

    if(data.status === 200) {
        const jsonData = await data.json()
        const { firstName, lastName, _id } = jsonData
        const header = createAuthHeader(emailAddress, password)
        const authHeader = header.get('Authorization')
        authObject = {
            id: _id,
            isLoggedIn: true,
            authHeader,
            firstName,
            lastName,
        }
    }

    return authObject
}