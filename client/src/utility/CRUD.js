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

export const createCourse = (data, authHeader) => {
    const options = {
        method: 'POST',
        body: data,
        headers: authHeader,
    }

    try {
        fetch(URL.createCourse, options)
    } catch (error) {
        console.log(error)        
    }
}