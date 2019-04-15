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
    return status === 200 ? true : false
}