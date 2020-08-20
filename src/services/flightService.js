import superagent from 'superagent'
import flights_key from '../doNotCommit.js'
export const requestFlights = async (userTickets) => {
    if (userTickets.length) {
        var queryObject = {}
        queryObject["flight_id"] = `${userTickets}`
        console.log(queryObject)
        var query = encodeURIComponent(JSON.stringify(queryObject))
        const myURL = "https://airports.api.hscc.bdpa.org/v2/flights?regexMatch=" + query
        try {
            const response = await superagent.get(myURL).set('key', `${flights_key}`)
            return (response.body.flights)
        } catch (err) { if (err.status === 555) requestFlights() }
        setTimeout(requestFlights, 10000)
    }
    else return []
}
export const requestAirports = async () => {
    const URL = 'https://airports.api.hscc.bdpa.org/v2/info/airports'
    try {
        const response = await superagent.get(URL).set('key', `${flights_key}`)
        const airports = response.body.airports
        console.log("airports", airports)
        return airports
    } catch (err) { if (err.status === 555) setTimeout(requestAirports, 5000) }
}