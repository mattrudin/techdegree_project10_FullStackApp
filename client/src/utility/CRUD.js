import URL from '../ressources/URL'

export const deleteCourseWithID = (courseID) => {
    const url = `${URL.deleteCourseWithID}${courseID}`
    const options = {
        method: 'DELETE',
    }
    
    try {
        fetch(url, options)
    } catch (error) {
        console.log(error)
    }
}

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

export const createCourse = async (rawData, authHeader) => {
    const jsonData = JSON.stringify(rawData)
    const options = {
        method: 'POST',
        body: jsonData,
        headers: authHeader,
    }

    try {
        const rawData = await fetch(URL.createCourse, options)
        const data = await rawData.json()
        const statusCode = await rawData.status
        return {
            data,
            statusCode,
        }
    } catch (error) {
        console.log(error)        
    }
}