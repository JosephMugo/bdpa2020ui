import superagent from 'superagent'
import flights_key from '../doNotCommit.js'
export const requestFlights = async (flightIds) => {
    if (flightIds && flightIds.length) {
        var queryObject = {}
        queryObject["flight_id"] = flightIds.join('|')
        console.log(queryObject)
        var query = encodeURIComponent(JSON.stringify(queryObject))
        const myURL = "https://airports.api.hscc.bdpa.org/v2/flights?regexMatch=" + query
        try {
            const response = await superagent.get(myURL).set('key', `${flights_key}`)
            return (response.body.flights)
        } catch (err) {
            if (err.status === 555) requestFlights()
            else if (err.status === 400) return []
        }
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