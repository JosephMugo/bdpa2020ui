import superagent from 'superagent'
import flights_key from '../doNotCommit.js'
export const requestFlights = async (userTickets) => {

    var queryObject = {}
    queryObject["flight_id"] = `${userTickets}`
    console.log(queryObject)
    var query = encodeURIComponent(JSON.stringify(queryObject))

    const myURL = "https://airports.api.hscc.bdpa.org/v2/flights?regexMatch=" + query

    try {
        const response = await superagent.get(myURL).set('key', `${flights_key}`)
       return(response.body.flights)
    } catch (err) { if (err.status === 555) requestFlights() }
    setTimeout(requestFlights, 30000)
}