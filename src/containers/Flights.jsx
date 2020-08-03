import React, { useState, useEffect } from 'react'
import superagent from 'superagent'
import { usePromiseTracker, trackPromise } from 'react-promise-tracker'
import Loader from 'react-loader-spinner'

import flights_key from '../doNotCommit.js'

import { Table, Button, ButtonGroup, ButtonToolbar, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap'

export const Flights = () => {
    const [flights, setFlights] = useState([])
    const [searchCategory, setSearchCategory] = useState('flightNumber')
    const [sortCategory, setSortCategory] = useState('flightNumber')
    const [sortOrder, setSortOrder] = useState('asc')
    const [searchTerm, setSearchTerm] = useState('')
    const [pages, setPages] = useState([])
    const [baseURL, setBaseURL] = useState("")

    // const [searchFlights, setSearchFlights] = useState([])

    // makes a basic flight request to the AI
    const makeFlightRequest = async (URL) => {
        setFlights([])
        console.log(URL)
        console.log(pages)
        console.log(pages.length)
        try {
            const response = await superagent.get(URL).set('key', `${flights_key}`)

            // const flightsJSON = JSON.parse(JSON.stringify(response.body).replace(/null/g, ''''))
            // const flightsJSON = JSON.parse(JSON.stringify(response.body).replace(/false/g, ''No''))
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
            setFlights(flightsList)
            // setFlights(flightsList.filter(fl => !fl.status.includes('past')))

        } catch (err) {
            console.error(err)
        }
    }

    const updateSortOrder = (order) => {
        setSortOrder(order)
    }

    const updateSortCategory = (category) => {
        setSortCategory(category)
    }

    const sendSort = () => {
        pages.length = 0

        var queryObject = {}
        queryObject[sortCategory] = "[^=]*$"
        console.log(queryObject)

        var query = encodeURIComponent(JSON.stringify(queryObject))
        // var URL = 'https://airports.api.hscc.bdpa.org/v1/flights/search?regexMatch=' + query + '&sort=' + sortOrder + '&after='
        var URL = 'https://airports.api.hscc.bdpa.org/v1/flights/search?regexMatch=' + query + '&after='
        setBaseURL(URL)

        trackPromise(makeFlightRequest(URL))
    }

    const updateSearchCategory = (category) => {
        setSearchCategory(category)
    }

    // searches based on user input
    const updateSearchTerm = event => {
        setSearchTerm(event.target.value)
    }

    const sendSearch = () => {
        pages.length = 0

        var queryObject = {}
        queryObject[searchCategory] = `^${searchTerm}`

        var query = encodeURIComponent(JSON.stringify(queryObject))
        var URL = 'https://airports.api.hscc.bdpa.org/v1/flights/search?regexMatch=' + query + '&after='
        setBaseURL(URL)

        trackPromise(makeFlightRequest(URL))
    }

    // requests 100 flights (initial request)
    const allFlights = () => {
        pages.length = 0

        var URL = 'https://airports.api.hscc.bdpa.org/v1/flights/all?after='
        setBaseURL(URL)

        trackPromise(makeFlightRequest(URL))
    }

    // adds current page to array, then calls current page
    const nextPage = () => {
        // set currentPage to flight_id of last item, add item to pages array
        var currentPage = flights[flights.length - 1].flight_id
        setPages(pages.concat(currentPage))

        var URL = baseURL + currentPage

        trackPromise(makeFlightRequest(URL))
    }

    // deletes last page from array, then calls the previous page
    const prevPage = () => {
        if (pages.length > 1) {
            // delete last item in pages array, set prevPage to id of the previous item
            pages.pop()
            var prevPage = pages[pages.length - 1]

            var URL = baseURL + prevPage

            trackPromise(makeFlightRequest(URL))
        } else {
            // reset pages array
            pages.length = 0

            trackPromise(makeFlightRequest(baseURL))
        }
    }

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
                <div className='col-sm-6'>
                    <ButtonToolbar>
                        <ButtonGroup className='mr-2'>
                            <Button variant='primary' onClick={allFlights}>Request All Flights</Button>
                        </ButtonGroup>
                        <ButtonGroup className='mr-2'>
                            <Button variant='secondary' disabled>{`Page ${pages.length + 1}`}</Button>
                            <Button variant='primary' onClick={prevPage}>Prev</Button>
                            <Button variant='primary' onClick={nextPage}>Next</Button>
                        </ButtonGroup>
                        <ButtonGroup className='mr-2'>
                            <Button variant='primary' onClick={sendSort}>Sort</Button>
                            <DropdownButton as={ButtonGroup} title={sortCategory} id='bg-nested-dropdown'>
                                <Dropdown.Item onClick={() => updateSortCategory('flightNumber')}>Flight Number</Dropdown.Item>
                                <Dropdown.Item onClick={() => updateSortCategory('airline')}>Airline</Dropdown.Item>
                                <Dropdown.Item onClick={() => updateSortCategory('airport')}>Airport</Dropdown.Item>
                                <Dropdown.Item onClick={() => updateSortCategory('comingFrom')}>Coming From</Dropdown.Item>
                                <Dropdown.Item onClick={() => updateSortCategory('departingTo')}>Departing To</Dropdown.Item>
                                <Dropdown.Item onClick={() => updateSortCategory('arriveAtReceiver')}>Arrival Time</Dropdown.Item>
                                <Dropdown.Item onClick={() => updateSortCategory('departFromSender')}>Departure Time</Dropdown.Item>
                            </DropdownButton>
                            <DropdownButton as={ButtonGroup} title={sortOrder} id='bg-nested-dropdown'>
                                <Dropdown.Item onClick={() => updateSortOrder('asc')}>Ascending</Dropdown.Item>
                                <Dropdown.Item onClick={() => updateSortOrder('desc')}>Descending</Dropdown.Item>
                            </DropdownButton>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>
                <div className='col-sm-2' />
                <div className='col-sm-4'>
                    <InputGroup>
                        <DropdownButton as={InputGroup.Prepend} title={searchCategory} id='bg-nested-dropdown'>
                            <Dropdown.Item onClick={() => updateSearchCategory('flightNumber')}>Flight Number</Dropdown.Item>
                            <Dropdown.Item onClick={() => updateSearchCategory('airline')}>Airline</Dropdown.Item>
                            <Dropdown.Item onClick={() => updateSearchCategory('airport')}>Airport</Dropdown.Item>
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
                    {flights.filter(fl => !fl.status.includes('past')).map(fl => (
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
            <LoadingIndicator />
        </div>
    )
}

export default Flights