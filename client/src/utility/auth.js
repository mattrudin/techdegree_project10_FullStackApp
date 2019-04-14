export const getAuthHeader = (username, password) => {
    let header = new Headers()
    header.append('Authorization', `Basic ${username}:${password}`)
    return header
}