
export const getDataUtil = async (queryParam, clickedPageNumber = 1) => {
    const basicUrl = 'http://www.omdbapi.com/'
    const apiKey = '&apikey=3755d9aa'
    const pageNumber = `&page=${clickedPageNumber}`
    const endpoint = basicUrl + queryParam + pageNumber + apiKey;
    const fetchedData = await fetch(endpoint)
        .then(res => res.json())
        .then(parsedJSON => parsedJSON)
        .catch(err => console.log('error is ', err))
    console.log('fetchedData', fetchedData)
    return fetchedData
}
