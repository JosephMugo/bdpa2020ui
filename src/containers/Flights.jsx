import React, { useState, useEffect } from "react";
import superagent from "superagent";

import flights_key from '../doNotCommit.js'

import { Table, Button, InputGroup, FormControl } from 'react-bootstrap'

export const Flights = () => {
    const [flights, setFlights] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [searchFlights, setSearchFlights] = useState([])

    // done in a try catch format!
    const makeSuperAgentCall = async () => {
        try {
            console.log(`${flights_key}`)
            const response = await superagent.get('https://airports.api.hscc.bdpa.org/v1/flights/all').set('key', `${flights_key}`)

            // const flightsList = JSON.parse(JSON.stringify(response.body).replace(/null/g, '""'))
            // const flightsList = JSON.parse(JSON.stringify(response.body).replace(/false/g, '"No"'))
            const flightsList = response.body
            const flightsIDList = flightsList.flights.map(fl => {
                return {
                    type: fl.type,
                    airline: fl.airline,
                    comingFrom: fl.comingFrom,
                    landingAt: fl.landingAt,
                    departingTo: fl.departingTo,
                    flightNumber: fl.flightNumber,
                    flight_id: fl.flight_id,
                    bookable: fl.bookable,
                    arriveAtReceiver: fl.arriveAtReceiver,
                    departFromSender: fl.departFromSender,
                    status: fl.status,
                    gate: fl.gate,
                    seatPrice: fl.seatPrice
                }
            })

            setFlights(flightsList.flights)
            setSearchFlights(flightsList.flights)

        } catch (err) {
            console.error(err);
        }
    }

    const handleSearch = event => {
        setSearchTerm(event.target.value);
        setSearchFlights(flights.filter(fl => fl.flightNumber.toLowerCase().includes(event.target.value.toLowerCase()) || fl.airline.toLowerCase().includes(event.target.value.toLowerCase())))
    }

    return (
        <div>
            <form noValidate autoComplete="off">
                <InputGroup>
                    <InputGroup.Prepend>
                        <Button variant="primary" onClick={makeSuperAgentCall}>Request Flight Information</Button>
                    </InputGroup.Prepend>
                    <FormControl style={{ float: "right" }} value={searchTerm} onChange={handleSearch} placeholder='Search with flight number or airline' />
                </InputGroup>
            </form>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Airline</th>
                        <th>Coming From</th>
                        <th>Landing At</th>
                        <th>Departing To</th>
                        <th>Flight Number</th>
                        <th>Bookable</th>
                        <th>Arrive At Receiver</th>
                        <th>Depart From Sender</th>
                        <th>Status</th>
                        <th>Gate</th>
                        <th>Seat Price</th>
                    </tr>
                </thead>
                <tbody>
                    {searchFlights.map(fl => (
                        <tr key={fl.flight_id}>
                            <td>{fl.type}</td>
                            <td>{fl.airline}</td>
                            <td>{fl.comingFrom}</td>
                            <td>{fl.landingAt}</td>
                            <td>{fl.departingTo}</td>
                            <td>{fl.flightNumber}</td>
                            <td>{fl.bookable}</td>
                            <td>{new Date(fl.arriveAtReceiver).toDateString()}</td>
                            <td>{new Date(fl.departFromSender).toDateString()}</td>
                            <td>{fl.status}</td>
                            <td>{fl.gate}</td>
                            <td>{fl.seatPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default Flights
