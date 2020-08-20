import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import superagent from 'superagent'
import { format } from "date-fns"
import flights_key from '../doNotCommit.js'
const Tickets = () => {
    const [id] = useState(useParams().flight_id), [flight, setFlight] = useState(false)
    const [airports, setAirports] = useState(false)
    const requestFlight = async () => {
        var queryObject = {}
        queryObject["flight_id"] = `${id}`
        console.log(queryObject)
        var query = encodeURIComponent(JSON.stringify(queryObject))

        const myURL = "https://airports.api.hscc.bdpa.org/v2/flights?regexMatch=" + query
        
        try {
            const response = await superagent.get(myURL).set('key', `${flights_key}`)
            setFlight(response.body.flights[0])
        } catch (err) { }
        setTimeout(requestFlight, 60000)
    }
    const requestAirports = async () => {
        setAirports(true)
        const URL = 'https://airports.api.hscc.bdpa.org/v2/info/airports'
        try {
            const response = await superagent.get(URL).set('key', `${flights_key}`)
            const airports = response.body.airports
            console.log("airports", airports)
            setAirports(airports)
        } catch (err) {
            if (err.status !== 429) setAirports(false)
            console.log(err)
        }
    }
    useEffect(() => { if (!airports) requestAirports() })
    useEffect(() => { if (airports && airports !== true && !flight) requestFlight() })
    const getAirportCity = shortName => airports.find(airport => airport.shortName === shortName).city
    return (
        <>
            <div>asdf</div>
            {airports && airports !== true && flight && flight !== true && <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Flight</th>
                        <th>Departure Time</th>
                        <th>Arrival Time</th>
                        <th>View Ticket</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{getAirportCity(flight.comingFrom) + " to " + getAirportCity(flight.landingAt)}</td>
                        <td>{format(flight.departFromSender, "PPpp")}</td>
                        <td>{format(flight.arriveAtReceiver, "PPpp")}</td>
                    </tr>)
            </tbody>
            </Table>}
        </>
    )
}

export default Tickets