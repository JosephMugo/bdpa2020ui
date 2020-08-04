import React, { useState } from 'react'
import superagent from 'superagent'
import { usePromiseTracker, trackPromise } from 'react-promise-tracker'
import Loader from 'react-loader-spinner'

import flights_key from '../doNotCommit.js'

import { Table, Button, ButtonGroup, ButtonToolbar, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap'

export const Flights = () => {
    const [flights, setFlights] = useState([])
    const [shownFlights, setShownFlights] = useState('arrival')
    const [err, setErr] = useState(false)

    const [searchCategory, setSearchCategory] = useState('flightNumber')
    const [searchTerm, setSearchTerm] = useState('')

    const [sortOrder, setSortOrder] = useState('')

    const [pages, setPages] = useState([])

    /*
    Handles basic API requests, used by every other API request function
    */

    const makeFlightRequest = async (after, sort, search, resetPages) => {
        if (resetPages) {
            pages.length = 0
        }

        var queryObject = {}
        queryObject[searchCategory] = `^${search}`

        var query = encodeURIComponent(JSON.stringify(queryObject))
        var URL = `https://airports.api.hscc.bdpa.org/v1/flights/search?regexMatch=${query}&after=${after}&sort=${sort}`

        // resets the flights table and shown network errors
        setFlights([])
        setErr(false)

        // URL for debugging purposes
        console.log(URL)

        try {
            const response = await superagent.get(URL).set('key', `${flights_key}`)

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

            setFlights(flightsList)

        } catch (err) {
            console.error(err)
            setErr(true)
        }
    }

    /*
    Update functions
    */

    const updateShownFlights = (type) => {
        setShownFlights(type)
    }

    const updateSearchCategory = (category) => {
        setSearchCategory(category)
    }

    const updateSearchTerm = event => {
        setSearchTerm(event.target.value)
    }

    /*
    Handles API requests
    */

    // sends a basic API request (usually done after new info is added to parameters)
    const sendRequest = (after = '', sort = sortOrder, search = searchTerm, resetPages = true) => {
        trackPromise(makeFlightRequest(after, sort, search, resetPages))
    }

    // clears current searchTerm and sends a blank request
    const sendAllFlights = () => {
        setSearchTerm('')
        sendRequest(undefined, undefined, '')
    }

    // sends a search
    const sendSearch = () => {
        sendRequest()
    }

    // adds current page to array, then calls current page
    const sendNextPage = () => {
        // set currentPage to flight_id of last item, add item to pages array
        var currentPage = flights[flights.length - 1].flight_id
        setPages(pages.concat(currentPage))

        sendRequest(currentPage, undefined, undefined, false)
    }

    // deletes last page from array, then calls the previous page
    const sendPrevPage = () => {
        if (pages.length > 1) {
            // delete last item in pages array, set prevPage to id of the previous item
            pages.pop()
            var prevPage = pages[pages.length - 1]

            sendRequest(prevPage, undefined, undefined, false)
        } else {
            sendRequest()
        }
    }

    // sets the sortOrder and sends a request adding the order
    const sendSortOrder = (order) => {
        setSortOrder(order)
        sendRequest(undefined, order)
    }

    /*
    Functions for React components
    */

    const LoadingIndicator = props => {
        const { promiseInProgress } = usePromiseTracker();
        return (
            promiseInProgress &&
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Loader type='ThreeDots' color='lightgray' height='100' width='100' />
            </div>
        );
    }

    return (
        <div>
            <div className='row'>
                <div className='col-sm-8'>
                    <ButtonToolbar>
                        <ButtonGroup className='mr-2'>
                            <Button variant='primary' onClick={sendAllFlights}>Request All Flights</Button>
                        </ButtonGroup>
                        <ButtonGroup className='mr-2'>
                            <Button variant='secondary' disabled>{`Page ${pages.length + 1}`}</Button>
                            {pages.length === 0 && <Button variant='primary' disabled>Prev</Button>}
                            {pages.length !== 0 && <Button variant='primary' onClick={sendPrevPage}>Prev</Button>}
                            {flights.length === 0 && <Button variant='primary' disabled>Next</Button>}
                            {flights.length !== 0 && <Button variant='primary' onClick={sendNextPage}>Next</Button>}
                        </ButtonGroup>
                        <ButtonGroup className='mr-2'>
                            <DropdownButton as={ButtonGroup} title={`Show ${shownFlights}`} id='bg-nested-dropdown'>
                                <Dropdown.Item onClick={() => updateShownFlights('arrival')}>Arrivals</Dropdown.Item>
                                <Dropdown.Item onClick={() => updateShownFlights('departure')}>Departures</Dropdown.Item>
                            </DropdownButton>
                            <DropdownButton as={ButtonGroup} title={`Sort time by ${sortOrder}`} id='bg-nested-dropdown'>
                                <Dropdown.Item onClick={() => sendSortOrder('asc')}>Ascending</Dropdown.Item>
                                <Dropdown.Item onClick={() => sendSortOrder('desc')}>Descending</Dropdown.Item>
                                <Dropdown.Item onClick={() => sendSortOrder('')}>None</Dropdown.Item>
                            </DropdownButton>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>
                <div className='col-sm-4'>
                    <InputGroup>
                        <DropdownButton as={InputGroup.Prepend} title={searchCategory} id='bg-nested-dropdown'>
                            <Dropdown.Item onClick={() => updateSearchCategory('flightNumber')}>Flight Number</Dropdown.Item>
                            <Dropdown.Item onClick={() => updateSearchCategory('airline')}>Airline</Dropdown.Item>
                            <Dropdown.Item onClick={() => updateSearchCategory('comingFrom')}>Coming From</Dropdown.Item>
                            <Dropdown.Item onClick={() => updateSearchCategory('departingTo')}>Departing To</Dropdown.Item>
                            <Dropdown.Item onClick={() => updateSearchCategory('arriveAtReceiver')}>Arrival Time</Dropdown.Item>
                            <Dropdown.Item onClick={() => updateSearchCategory('departFromSender')}>Departure Time</Dropdown.Item>
                        </DropdownButton>
                        <FormControl value={searchTerm} onChange={updateSearchTerm} placeholder={`Search with ${searchCategory}`} />
                        <InputGroup.Append>
                            <Button variant='primary' onClick={sendSearch}>Search</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
            </div>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {/* <th>Type</th> */}
                        <th>Airline</th>
                        <th>Coming From</th>
                        <th>Landing At</th>
                        {shownFlights === 'departure' && <th>Departing To</th>}
                        <th>Flight Number</th>
                        <th>Bookable</th>
                        <th>Depart From Sender</th>
                        <th>Arrive At Receiver</th>
                        <th>Status</th>
                        {shownFlights === 'departure' && <th>Gate</th>}
                        {/* <th>Seat Price</th> */}
                    </tr>
                </thead>
                <tbody>
                    {flights.filter(fl => !fl.status.includes('past') && fl.type.includes(`${shownFlights}`)).map(fl => (
                        <tr key={fl.flight_id}>
                            {/* <td>{fl.type}</td> */}
                            <td>{fl.airline}</td>
                            <td>{fl.comingFrom}</td>
                            <td>{fl.landingAt}</td>
                            {shownFlights === 'departure' && <td>{fl.departingTo}</td>}
                            <td>{fl.flightNumber}</td>
                            <td>{fl.bookable}</td>
                            <td>{fl.departFromSender}</td>
                            <td>{fl.arriveAtReceiver}</td>
                            <td>{fl.status}</td>
                            {shownFlights === 'departure' && <td>{fl.gate}</td>}
                            {/* <td>{fl.seatPrice}</td> */}
                        </tr>
                    ))}
                </tbody>
            </Table>
            <LoadingIndicator />
            {err && <p>A network error has occurred. Please reload the page or press <b>Request All Flights</b>.</p>}
        </div>
    )
}

export default Flights