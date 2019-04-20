import URL from '../ressources/URL'

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

export const createAuthHeader = (emailAddress, password) => {
    const credentials = `${emailAddress}:${password}`
    const authorization = `Basic ${btoa(credentials)}`
    return getAuthHeader(authorization)
}

export const getAuthHeader = authInformation => {
    return new Headers({
        'credentials': 'include',
        'Access-Control-Allow-Credentials': true,
        'Authorization': authInformation,
        'Content-Type': 'application/json',
    })
}

const authObjectFactory = async (data, emailAddress, password) => {
    let authObject = {
        id: null,
        isLoggedIn: false,
        authHeader: null
    }

    if(data.status === 200) {
        const jsonData = await data.json()
        const header = createAuthHeader(emailAddress, password)
        const authHeader = header.get('Authorization')
        authObject = {
            id: jsonData._id,
            isLoggedIn: true,
            authHeader
    }
    }

    return authObject
}