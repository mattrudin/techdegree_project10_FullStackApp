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
