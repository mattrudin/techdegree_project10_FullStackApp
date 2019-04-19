import URL from '../ressources/URL'

export const signIn = async (emailAddress, password) => {
    const header = getAuthHeader(emailAddress, password)
    const options = {
        method: 'GET',
        headers: header,
    }

    try {
        const response = await fetch(URL.getUserAuth, options)
        return authObjectFactory(response)
    } catch (error) {
        console.log(error)
    }
}

export const getAuthHeader = (emailAddress, password) => {
    const credentials = `${emailAddress}:${password}`
    return new Headers({
        'credentials': 'include',
        'Access-Control-Allow-Credentials': true,
        'Authorization': `Basic ${btoa(credentials)}`,
        'Content-Type': 'application/json',
    })
}

const authObjectFactory = async (data) => {
    let authObject = {
        id: null,
        isLoggedIn: false,
    }

    if(data.status === 200) {
        const jsonData = await data.json()
        authObject = {
            id: jsonData._id,
            isLoggedIn: true,
        }
    }

    return authObject
}