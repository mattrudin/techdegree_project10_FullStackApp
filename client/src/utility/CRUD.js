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
