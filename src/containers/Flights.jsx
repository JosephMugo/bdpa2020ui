import React, { useState, useEffect } from "react"
import superagent from "superagent"

import flights_key from '../doNotCommit.js'

import { Button, InputGroup, FormControl } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'

export const Flights = () => {
    const [flights, setFlights] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [searchFlights, setSearchFlights] = useState([])

    // done in a try catch format!
    const makeSuperAgentCall = async () => {
        try {
            const response = await superagent.get('https://airports.api.hscc.bdpa.org/v1/flights/all').set('key', `${flights_key}`)

            // const flightsJSON = JSON.parse(JSON.stringify(response.body).replace(/null/g, '""'))
            // const flightsJSON = JSON.parse(JSON.stringify(response.body).replace(/false/g, '"No"'))
            const flightsJSON = response.body
            const flightsList = flightsJSON.flights.map(fl => {
                return {
                    type: fl.type,
                    airline: fl.airline,
                    comingFrom: fl.comingFrom,
                    landingAt: fl.landingAt,
                    departingTo: fl.departingTo,
                    flightNumber: fl.flightNumber,
                    flight_id: fl.flight_id,
                    bookable: fl.bookable,
                    departFromSender: new Date(fl.departFromSender).toLocaleTimeString('en-US'),
                    arriveAtReceiver: new Date(fl.arriveAtReceiver).toLocaleTimeString('en-US'),
                    status: fl.status,
                    gate: fl.gate,
                    seatPrice: `$${fl.seatPrice}`
                }
            })

            setFlights(flightsList)
            setSearchFlights(flightsList)

        } catch (err) {
            console.error(err)
        }
    }

    const handleSearch = event => {
        setSearchTerm(event.target.value)
        setSearchFlights(flights.filter(fl => fl.flightNumber.toLowerCase().includes(event.target.value.toLowerCase()) || fl.airline.toLowerCase().includes(event.target.value.toLowerCase())))
    }

    const columns = [
        { sort: true, dataField: "type", text: "Type"},
        { sort: true, dataField: "airline", text: "Airline"},
        { sort: true, dataField: "comingFrom", text: "Coming From"},
        { sort: true, dataField: "landingAt", text: "Landing At"},
        { sort: true, dataField: "departingTo", text: "Departing To"},
        { sort: true, dataField: "flightNumber", text: "Flight No."},
        { sort: true, dataField: "bookable", text: "Bookable"},
        { sort: true, dataField: "departFromSender", text: "Depart Time"},
        { sort: true, dataField: "arriveAtReceiver", text: "Arrival Time"},
        { sort: true, dataField: "status", text: "Status"},
        { sort: true, dataField: "gate", text: "Gate"},
        { sort: true, dataField: "seatPrice", text: "Seat Price"}
    ]

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
            <BootstrapTable bootstrap4="true" striped="true" hover="true" keyField="flight_id" data={searchFlights} columns={columns} pagination={ paginationFactory() }/>
        </div>
    )
}

export default Flights