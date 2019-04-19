import URL from '../ressources/URL'

export const getAuthHeader = (username, password) => {
    return new Headers({
        'credentials': 'include',
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
    let response

    try {
        response = await fetch(URL.getUserAuth, options)
        if(response.status !== 200) {
            throw new Error()
        }
    } catch (error) {
        console.log(`${response.status}: ${response.statusText}`)
    }
    
    const status = response.status
    const authUserID = response.body._id
    const isLoggedIn = (status === 200 ? true : false)
    const authObject = {
        id: authUserID,
        isLoggedIn: isLoggedIn,
    }
    
    return authObject
}