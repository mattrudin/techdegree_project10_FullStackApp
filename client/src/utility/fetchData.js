const fetchData = async (url) => {
    try {
        const rawData = await fetch(url)
        const data = await rawData.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export default fetchData