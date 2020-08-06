import React, { useState, useEffect } from "react"
import superagent from 'superagent'

import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import flights_key from '../doNotCommit.js'
const Bookings = (flight_id) => {
    const [flights, setFlights] = useState([])
    const [shownFlights, setShownFlights] = useState([])
    const makeFlightRequest = async () => {
        console.log(123)
        const URL = "https://airports.api.hscc.bdpa.org/v1/flights/search?regexMatch=%7B%22flightNumber%22%3A%22%5E%22%7D&after=&sort="
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
                    arriveAtReceiver: new Date(fl.arriveAtReceiver).toLocaleString(),
                    departFromReceiver: new Date(fl.departFromReceiver).toLocaleString(),
                    status: fl.status,
                    gate: fl.gate,
                }
            })
            console.log(flightsList)
            flightsList.filter(fl => !fl.status.includes('past') && fl.type.includes("departingTo"))
            setFlights(flightsList)

            //             // return flightsList
            //             getFlightsWithAirports(flightsList)

        } catch (err) {
            console.error(err)
        }
    }
    const searchFlights = fields => {

    }
    useEffect(() => {
        if (!flights) makeFlightRequest()
    })
    const required = Yup.string().required('Required')
    return (
        <>
            <div className='row'>
                <div className='col-sm-3' />
                <div className='col-sm-6'>
                    <hr />
                    <h2 align='center'>Book Flights</h2>
                    <hr />
                    <Formik
                        initialValues={{ location: "", search: "", date: "" }}
                        validationSchema={Yup.object().shape({
                            location: required, search: required, date: required
                        })}
                        onSubmit={searchFlights}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-row">
                                    <div className="form-group col">
                                        <label htmlFor="search">Arrival Location</label>
                                        <Field name="location" as="select" className={'form-control' + (errors.location ? ' is-invalid' : '')}>
                                            <option value="" ></option>
                                            <option value="city" >City</option>
                                            <option selected value="state">State</option>
                                            <option value="country">Country</option>
                                            <option value="airport">Airport</option>
                                        </Field>
                                        <ErrorMessage name="location" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col">
                                        <label htmlFor="search">Search</label>
                                        <Field name="search" type="text" className={'form-control' + (errors.search && touched.search ? ' is-invalid' : '')} />
                                        <ErrorMessage name="search" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col">
                                        <label htmlFor="date">Date</label>
                                        <Field name="date" type="text" className={'form-control' + (errors.date && touched.date ? ' is-invalid' : '')} />
                                        <ErrorMessage name="date" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary mr-2">Search</button>
                                    <button type="reset" className="btn btn-secondary">Reset</button>
                                </div>
                            </Form>)}
                    </Formik>
                    <Formik
                        initialValues={{
                            firstName: "", middleName: "", lastName: "",
                            birthdate: "", sex: "", email: "", phone: "",
                        }}
                        validationSchema={Yup.object().shape({
                            firstName: required, lastName: required,
                            birthdate: required, sex: required,
                            email: required.email('Email is invalid'), phone: required
                        })}
                        onSubmit={console.log("check info here")}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-row">
                                    <div className="form-group col-3">
                                        <label htmlFor="firstName">First Name</label>
                                        <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                        <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="middleName">Middle Name</label>
                                        <Field name="middleName" type="text" className="form-control" />
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="lastName">Last Name</label>
                                        <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                        <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col">
                                        <label htmlFor="birthdate">Date of Birth YYYY/MM/DD</label>
                                        <Field name="birthdate" type="text" className={'form-control' + (errors.birthdate && touched.birthdate ? ' is-invalid' : '')} />
                                        <ErrorMessage name="birthdate" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col">
                                        <label>Sex</label>
                                        <Field name="sex" as="select" className={'form-control' + (errors.sex && touched.sex ? ' is-invalid' : '')}>
                                            <option value=""></option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Genderqueer/Non-Binary</option>
                                        </Field>
                                        <ErrorMessage name="sex" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col">
                                        <label htmlFor="phone">Phone Number</label>
                                        <Field name="phone" type="text" className={'form-control'} />
                                    </div>
                                    <div className="form-group col">
                                        <label htmlFor="email">Email Adress</label>
                                        <Field name="email" type="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary mr-2">Book Flight</button>
                                    <button type="reset" className="btn btn-secondary">Reset</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default Bookings
//     const makeFlightRequest = async (after, sort, search, resetPages) => {
//         if (resetPages) {
//             pages.length = 0
//         }

//         var queryObject = {}
//         queryObject[searchCategory] = `^${search}`

//         var query = encodeURIComponent(JSON.stringify(queryObject))
//         var URL = `https://airports.api.hscc.bdpa.org/v1/flights/search?regexMatch=${query}&after=${after}&sort=${sort}`

//         // resets the flights table and shown network errors
//         setFlights([])
//         setErr(false)

//         // URL for debugging purposes
//         console.log(URL)

//         try {
//             const response = await superagent.get(URL).set('key', `${flights_key}`)

//             const flightsList = response.body.flights.map(fl => {
//                 return {
//                     type: fl.type,
//                     airline: fl.airline,
//                     comingFrom: fl.comingFrom,
//                     landingAt: fl.landingAt,
//                     departingTo: fl.departingTo,
//                     flightNumber: fl.flightNumber,
//                     flight_id: fl.flight_id,
//                     bookable: fl.bookable,
//                     arriveAtReceiver: new Date(fl.arriveAtReceiver).toLocaleString(),
//                     departFromReceiver: new Date(fl.departFromReceiver).toLocaleString(),
//                     status: fl.status,
//                     gate: fl.gate,
//                 }
//             })

//             // setFlights(flightsList)

//             // return flightsList
//             getFlightsWithAirports(flightsList)

//         } catch (err) {
//             console.error(err)
//             setErr(true)
//         }
//     }

//     const getFlightsWithAirports = async (flights) => {
//         let myAirports = airports

//         if (airports.length === 0) {
//             myAirports = await makeAirportRequest()
//         }

//         // If myAirports is still empty, abort gracefully
//         if (myAirports !== undefined) {
//             // const airports = await makeAirportRequest()

//             const newFlights = flights.map(fl => {
//                 const comingFrom = myAirports.find(air => air.shortName === fl.comingFrom).city
//                 const landingAt = myAirports.find(air => air.shortName === fl.landingAt).city

//                 let departingToCity = ''

//                 if (fl.departingTo !== null) {
//                     departingToCity = myAirports.find(air => air.shortName === fl.departingTo).city
//                     console.log(departingToCity)
//                 }

//                 return {
//                     type: fl.type,
//                     airline: fl.airline,
//                     comingFrom,
//                     landingAt,
//                     departingToCity,
//                     departingTo: fl.departingTo,
//                     flightNumber: fl.flightNumber,
//                     flight_id: fl.flight_id,
//                     bookable: fl.bookable,
//                     arriveAtReceiver: new Date(fl.arriveAtReceiver).toLocaleString(),
//                     departFromReceiver: new Date(fl.departFromReceiver).toLocaleString(),
//                     status: fl.status,
//                     gate: fl.gate,
//                 }
//             })

//             setFlights(newFlights)
//         }
//     }

//     /*
//     Update functions
//     */

//     const updateShownFlights = (type) => {
//         setShownFlights(type)
//     }

//     const updateSearchCategory = (category) => {
//         setSearchCategory(category)
//     }

//     const updateSearchTerm = event => {
//         setSearchTerm(event.target.value)
//     }

//     /*
//     Handles API requests
//     */

//     // sends a basic API request (usually done after new info is added to parameters)
//     const sendRequest = (after = '', sort = sortOrder, search = searchTerm, resetPages = true) => {
//         trackPromise(makeFlightRequest(after, sort, search, resetPages))
//     }

//     // clears current searchTerm and sends a blank request
//     const sendAllFlights = () => {
//         setSearchTerm('')
//         sendRequest(undefined, undefined, '')
//     }

//     // sends a search
//     const sendSearch = () => {
//         sendRequest()
//     }

//     // adds current page to array, then calls current page
//     const sendNextPage = () => {
//         // set currentPage to flight_id of last item, add item to pages array
//         var currentPage = flights[flights.length - 1].flight_id
//         setPages(pages.concat(currentPage))

//         sendRequest(currentPage, undefined, undefined, false)
//     }

//     // deletes last page from array, then calls the previous page
//     const sendPrevPage = () => {
//         if (pages.length > 1) {
//             // delete last item in pages array, set prevPage to id of the previous item
//             pages.pop()
//             var prevPage = pages[pages.length - 1]

//             sendRequest(prevPage, undefined, undefined, false)
//         } else {
//             sendRequest()
//         }
//     }

//     // sets the sortOrder and sends a request adding the order
//     const sendSortOrder = (order) => {
//         setSortOrder(order)
//         sendRequest(undefined, order)
//     }

//     /*
//     Functions for React components
//     */

//     const LoadingIndicator = props => {
//         const { promiseInProgress } = usePromiseTracker();
//         return (
//             promiseInProgress &&
//             <div
//                 style={{
//                     width: '100%',
//                     height: '100%',
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center'
//                 }}
//             >
//                 <Loader type='ThreeDots' color='lightgray' height='100' width='100' />
//             </div>
//         );
//     }

//     return (
//         <div>
//             <div className='row'>
//                 <div className='col-sm-8'>
//                     <ButtonToolbar>
//                         <ButtonGroup className='mr-2'>
//                             <Button variant='primary' onClick={sendAllFlights}>Request All Flights</Button>
//                         </ButtonGroup>
//                         <ButtonGroup className='mr-2'>
//                             <Button variant='secondary' disabled>{`Page ${pages.length + 1}`}</Button>
//                             {pages.length === 0 && <Button variant='primary' disabled>Prev</Button>}
//                             {pages.length !== 0 && <Button variant='primary' onClick={sendPrevPage}>Prev</Button>}
//                             {flights.length === 0 && <Button variant='primary' disabled>Next</Button>}
//                             {flights.length !== 0 && <Button variant='primary' onClick={sendNextPage}>Next</Button>}
//                         </ButtonGroup>
//                         <ButtonGroup className='mr-2'>
//                             <DropdownButton as={ButtonGroup} title={`Show ${shownFlights}`} id='bg-nested-dropdown'>
//                                 <Dropdown.Item onClick={() => updateShownFlights('arrival')}>Arrivals</Dropdown.Item>
//                                 <Dropdown.Item onClick={() => updateShownFlights('departure')}>Departures</Dropdown.Item>
//                             </DropdownButton>
//                             <DropdownButton as={ButtonGroup} title={`Sort time by ${sortOrder}`} id='bg-nested-dropdown'>
//                                 <Dropdown.Item onClick={() => sendSortOrder('asc')}>Ascending</Dropdown.Item>
//                                 <Dropdown.Item onClick={() => sendSortOrder('desc')}>Descending</Dropdown.Item>
//                                 <Dropdown.Item onClick={() => sendSortOrder('')}>None</Dropdown.Item>
//                             </DropdownButton>
//                         </ButtonGroup>
//                     </ButtonToolbar>
//                 </div>
//                 <div className='col-sm-4'>
//                     <InputGroup>
//                         <DropdownButton as={InputGroup.Prepend} title={searchCategory} id='bg-nested-dropdown'>
//                             <Dropdown.Item onClick={() => updateSearchCategory('flightNumber')}>Flight Number</Dropdown.Item>
//                             <Dropdown.Item onClick={() => updateSearchCategory('airline')}>Airline</Dropdown.Item>
//                             <Dropdown.Item onClick={() => updateSearchCategory('comingFrom')}>Coming From City</Dropdown.Item>
//                             <Dropdown.Item onClick={() => updateSearchCategory('landingAt')}>Landing At City</Dropdown.Item>
//                             <Dropdown.Item onClick={() => updateSearchCategory('departingTo')}>Departing To Airport</Dropdown.Item>
//                             <Dropdown.Item onClick={() => updateSearchCategory('departingToCity')}>Departing To City</Dropdown.Item>
//                             <Dropdown.Item onClick={() => updateSearchCategory('arriveAtReceiver')}>Arrival Time</Dropdown.Item>
//                             <Dropdown.Item onClick={() => updateSearchCategory('departFromReceiver')}>Departure Time</Dropdown.Item>
//                         </DropdownButton>
//                         <FormControl value={searchTerm} onChange={updateSearchTerm} placeholder={`Search with ${searchCategory}`} />
//                         <InputGroup.Append>
//                             <Button variant='primary' onClick={sendSearch}>Search</Button>
//                         </InputGroup.Append>
//                     </InputGroup>
//                 </div>
//             </div>
//             <br />
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         {/* <th>Type</th> */}
//                         <th>Airline</th>
//                         <th>Coming From</th>
//                         <th>Landing At</th>
//                         {shownFlights === 'departure' && <th>Airport Departing To</th>}
//                         {shownFlights === 'departure' && <th>City Departing To</th>}
//                         <th>Flight Number</th>
//                         <th>Bookable</th>
//                         <th>Arrival Time</th> {/* Arrival at receiver time */}
//                         {shownFlights === 'departure' && <th>Departure Time</th>} {/* Departure from receiver time */}
//                         <th>Status</th>
//                         {shownFlights === 'departure' && <th>Gate</th>}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {flights.filter(fl => !fl.status.includes('past') && fl.type.includes(`${shownFlights}`)).map(fl => (
//                         <tr key={fl.flight_id}>
//                             {/* <td>{fl.type}</td> */}
//                             <td>{fl.airline}</td>
//                             <td>{fl.comingFrom}</td>
//                             <td>{fl.landingAt}</td>
//                             {shownFlights === 'departure' && <td>{fl.departingTo}</td>}
//                             {shownFlights === 'departure' && <td>{fl.departingToCity}</td>}
//                             <td>{fl.flightNumber}</td>
//                             {fl.bookable === true && <td>Available</td>}
//                             {fl.bookable === false && <td>N/A</td>}
//                             <td>{fl.arriveAtReceiver}</td>
//                             {shownFlights === 'departure' && <td>{fl.departFromReceiver}</td>}
//                             <td>{fl.status}</td>
//                             {shownFlights === 'departure' && <td>{fl.gate}</td>}
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//             <LoadingIndicator />
//             {err && <p>A network error has occurred. Please reload the page or press <b>Request All Flights</b>.</p>}
//         </div>
//     )
// }