import React, { useState } from "react"
import superagent from "superagent"

import flights_key from '../doNotCommit.js'

import { Table, Button, ButtonGroup, ButtonToolbar, InputGroup, FormControl } from 'react-bootstrap'

export const Flights = () => {
    const [flights, setFlights] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [pages, setPages] = useState([])
    // const [searchFlights, setSearchFlights] = useState([])

    // makes a basic flight request to the API
    const makeFlightRequest = async (URL) => {
        console.log(URL)
        console.log(pages)
        try {
            const response = await superagent.get(URL).set('key', `${flights_key}`)

            // const flightsJSON = JSON.parse(JSON.stringify(response.body).replace(/null/g, '""'))
            // const flightsJSON = JSON.parse(JSON.stringify(response.body).replace(/false/g, '"No"'))
            // const flightsJSON = response.body
            const flightsList = response.body.flights.map(fl => {
                return {
                    type: fl.type,
                    airline: fl.airline,
                    comingFrom: fl.comingFrom,
                    landingAt: fl.landingAt,
                    departingTo: fl.departingTo,
                    flightNumber: fl.flightNumber,
                    flight_id: fl.flight_id,
                    bookable: fl.bookable,
                    departFromSender: new Date(fl.departFromSender).toLocaleString(),
                    arriveAtReceiver: new Date(fl.arriveAtReceiver).toLocaleString(),
                    status: fl.status,
                    gate: fl.gate,
                    seatPrice: `$${fl.seatPrice}`
                }
            })

            // filter flights list to avoid showing past flights
            setFlights(flightsList.filter(fl => !fl.status.includes('past')))

        } catch (err) {
            console.error(err)
        }
    }

    // searches based on user input
    const updateSearch = event => {
        setSearchTerm(event.target.value)
    }

    const sendSearch = () => {
        pages.length = 0
        
        var queryObject = { "flightNumber": searchTerm }
        var query = encodeURIComponent(JSON.stringify(queryObject))
        var URL = 'https://airports.api.hscc.bdpa.org/v1/flights/search?match=' + query

        makeFlightRequest(URL)
    }
    
    // requests 100 flights (initial request)
    const allFlights = () => {
        pages.length = 0

        var URL = 'https://airports.api.hscc.bdpa.org/v1/flights/all'

        makeFlightRequest(URL)
    }

    // adds current page to array, then calls current page
    const nextPage = () => {
        // set currentPage to flight_id of last item, add item to pages array
        var currentPage = flights[flights.length - 1].flight_id
        setPages(pages.concat(currentPage))

        var URL = 'https://airports.api.hscc.bdpa.org/v1/flights/all?after=' + currentPage

        makeFlightRequest(URL)
    }

    // deletes last page from array, then calls the previous page
    const prevPage = () => {
        if (pages.length > 1) {
            // delete last item in pages array, set prevPage to id of the previous item
            pages.pop()
            var prevPage = pages[pages.length - 1]

            var URL = 'https://airports.api.hscc.bdpa.org/v1/flights/all?after=' + prevPage

            makeFlightRequest(URL)
        } else {
            // reset pages array
            pages.length = 0

            var URL = 'https://airports.api.hscc.bdpa.org/v1/flights/all'

            makeFlightRequest(URL)
        }
    }

    return (
        <div>
            <div className='row'>
                <div className='col-sm-4'>
                    <ButtonToolbar>
                        <ButtonGroup className="mr-2">
                            <Button variant="primary" onClick={allFlights}>Request All Flights</Button>
                        </ButtonGroup>
                        <ButtonGroup className="mr-2">
                            <Button variant="primary" onClick={prevPage}>Prev</Button>
                            <Button variant="primary" onClick={nextPage}>Next</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>
                <div className='col-sm-4' />
                <div className='col-sm-4'>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <Button variant="primary" onClick={sendSearch}>Search</Button>
                        </InputGroup.Prepend>
                        <FormControl value={searchTerm} onChange={updateSearch} placeholder='Search with flight number' />
                    </InputGroup>
                </div>
            </div>
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
                        <th>Depart From Sender</th>
                        <th>Arrive At Receiver</th>
                        <th>Status</th>
                        <th>Gate</th>
                        <th>Seat Price</th>
                    </tr>
                </thead>
                <tbody>
                    {flights.map(fl => (
                        <tr key={fl.flight_id}>
                            <td>{fl.type}</td>
                            <td>{fl.airline}</td>
                            <td>{fl.comingFrom}</td>
                            <td>{fl.landingAt}</td>
                            <td>{fl.departingTo}</td>
                            <td>{fl.flightNumber}</td>
                            <td>{fl.bookable}</td>
                            <td>{fl.departFromSender}</td>
                            <td>{fl.arriveAtReceiver}</td>
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