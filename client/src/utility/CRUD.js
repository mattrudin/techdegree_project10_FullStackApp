import URL from '../ressources/URL'
import { getAuthHeader, getHeader } from './auth'

/************************************************************************************
Create
************************************************************************************/
export const createCourse = async (rawData, authHeader) => {
    const jsonData = JSON.stringify(rawData)
    const header = getAuthHeader(authHeader)
    const options = {
        method: 'POST',
        body: jsonData,
        headers: header,
    }
    let data = {
        error: 'none',
    }

    try {
        const rawData = await fetch(URL.createCourse, options)
        const statusCode = await rawData.status
        if(statusCode !== 201) data = await rawData.json()
        
        return {
            data,
            statusCode,
        }
    } catch (error) {
        console.log(error)        
    }
}

export const createUser = async (rawData) => {
    const jsonData = JSON.stringify(rawData)
    const header = getHeader()
    const options = {
        method: 'POST',
        body: jsonData,
        headers: header,
    }
    let data = {
        error: 'none',
    }

    try {
        const rawData = await fetch(URL.createUser, options)
        const statusCode = await rawData.status
        if(statusCode !== 201) data = await rawData.json()
        
        return {
            data,
            statusCode,
        }
    } catch (error) {
        console.log(error)
    }
}

/************************************************************************************
Read
************************************************************************************/
export const getAllCourses = async () => {
    try {
        const rawData = await fetch(URL.getAllCourses)
        const data = await rawData.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getCourseWithID = async (courseID) => {
    const url = `${URL.getCourseWithID}${courseID}`
    try {
        const rawData = await fetch(url)
        const data = await rawData.json()
        return data
    } catch (error) {
        console.log(error)
    }
}


/************************************************************************************
Update
************************************************************************************/
export const updateCourseWithID = async (rawData, courseID, authHeader) => {
    const jsonData = JSON.stringify(rawData)
    const url = `${URL.updateCourseWithID}${courseID}`
    const header = getAuthHeader(authHeader)
    const options = {
        method: 'PUT',
        body: jsonData,
        headers: header,
    }
    let data = {
        error: 'none',
    }

    try {
        const rawData = await fetch(url, options)
        const statusCode = await rawData.status
        if(statusCode !== 204) data = await rawData.json()
        
        return {
            data,
            statusCode,
        }
    } catch (error) {
        console.log(error)
    }
}


/************************************************************************************
Delete
************************************************************************************/
export const deleteCourseWithID = async (courseID, authHeader) => {
    const url = `${URL.deleteCourseWithID}${courseID}`
    const header = getAuthHeader(authHeader)
    const options = {
        method: 'DELETE',
        headers: header,
    }
    
    try {
        await fetch(url, options)
    } catch (error) {
        console.log(error)
    }
}