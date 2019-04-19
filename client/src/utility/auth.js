import URL from '../ressources/URL'

export const getAuthHeader = (username, password) => {
    return new Headers({
        'Credentials': 'include',
        'Access-Control-Allow-Credentials': true,
        'Authorization': `Basic ${username}:${password}`,
        'Content-Type': 'application/json',
    })
}

export const signIn = async (emailAddress, password) => {
    const header = getAuthHeader(emailAddress, password)
    const options = {
        method: 'GET',
        headers: header,
    }
    
    const response = await fetch(URL.getUserAuth, options)

    const status = response.status
    const authUserID = response.body._id
    const isLoggedIn = (status === 200 ? true : false)
    const authObject = {
        id: authUserID,
        isLoggedIn: isLoggedIn,
    }

    return authObject
}