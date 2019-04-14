export const getAuthHeader = (username, password) => {
    return new Headers({
        'Credentials': 'include',
        'Access-Control-Allow-Credentials': true,
        'Authorization': `Basic ${username}:${password}`,
        'Content-Type': 'application/json',
    })
}