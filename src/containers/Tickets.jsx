import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import superagent from 'superagent'
import Cookies from "universal-cookie"
import { format } from "date-fns"
import flights_key from '../doNotCommit.js'
const cookies = new Cookies()
const Tickets = () => {
    const [id] = useState(useParams().flight_id), [flight, setFlight] = useState(false), [callFlight, setCallFlight] = useState(true)
    const [airports, setAirports] = useState(false)
    const requestAirports = async () => {
        setAirports(true)
        const URL = 'https://airports.api.hscc.bdpa.org/v1/info/airports'
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
    const requestFlight = async () => {
        setCallFlight(false)
        const myQuery = encodeURIComponent(JSON.stringify([id]))
        const myURL = "https://airports.api.hscc.bdpa.org/v1/flights/with-ids?ids=" + myQuery
        try {
            const response = await superagent.get(myURL).set('key', `${flights_key}`)
            setFlight(response.body.flights[0])
        } catch (err) { if (err.status === 555) requestFlight() }
        setTimeout(requestFlight, 30000)
    }
    useEffect(() => { if (!airports) requestAirports() })
    useEffect(() => { if (airports && airports !== true && callFlight) requestFlight() })
    const getAirportCity = shortName => airports.find(airport => airport.shortName === shortName).city
    return (
        <>
            {airports && airports !== true && flight && <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Passanger Name</th>
                        <th>Flight</th>
                        <th>Airline</th>
                        <th>Flight Number</th>
                        <th>Departure Time</th>
                        <th>Arrival Time</th>
                        <th>Gate</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{cookies.get("email")}</td>
                        <td>{getAirportCity(flight.comingFrom) + " to " + getAirportCity(flight.landingAt)}</td>
                        <td>{flight.airline}</td>
                        <td>{flight.flightNumber}</td>
                        <td>{format(flight.departFromSender, "PPpp")}</td>
                        <td>{format(flight.arriveAtReceiver, "PPpp")}</td>
                        <td>{flight.gate}</td>
                        <td>{flight.status}</td>
                    </tr>
                </tbody>
            </Table>}
        </>
    )
}

export default Tickets