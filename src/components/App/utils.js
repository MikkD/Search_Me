
export const getDataUtil = async queryParam => {
    const basicUrl = 'http://www.omdbapi.com/'
    const apiKey = '&apikey=3755d9aa'
    const endpoint = basicUrl + queryParam + apiKey;
    const fetchedData = await fetch(endpoint)
        .then(res => res.json())
        .then(parsedJSON => parsedJSON)
        .catch(err => console.log('error is ', err))
    return fetchedData
}
