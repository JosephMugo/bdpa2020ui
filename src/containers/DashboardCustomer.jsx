import React, { useState, useEffect } from "react"
import { Table, Button, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap'
import superagent from 'superagent'
import Cookies from "universal-cookie"
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { object, string, date } from 'yup'
import { format } from "date-fns"
import { requestUserInfo, updateUserInfo } from '../services/userService'
import { requestUserTickets } from '../services/ticketService'
import flights_key from '../doNotCommit.js'

const cookies = new Cookies()
const DashboardCustomer = () => {
    const [userInfo, setUserInfo] = useState(false), [updateResponse, setUpdateResponse] = useState(2)
    const [lastLoginDate, setLastLoginDate] = useState(false), [lastLoginIp, setLastLoginIp] = useState(false)
    const [userTickets, setUserTickets] = useState(false), [airports, setAirports] = useState(false), [flights, setFlights] = useState(false), [callFlights, setCallFlights] = useState(true)

    const getUserInfo = async () => {
        setUserInfo(true)
        const requestedUserInfo = await requestUserInfo(cookies.get("email"))
        console.log("userInfo", requestedUserInfo)
        if (requestedUserInfo) {
            requestedUserInfo.birthdate = format(new Date(requestedUserInfo.birthdate), "yyyy-MM-dd")
            setUserInfo(requestedUserInfo)
            setLastLoginDate(requestedUserInfo.lastLoginDate)
            setLastLoginIp(requestedUserInfo.lastLoginIp)
        } else window.open("/login", "_top")
    }
    const getUserTickets = async () => {
        setUserTickets(true)
        const requestedUserTickets = await requestUserTickets(cookies.get("email"))
        console.log("userTickets", requestedUserTickets)
        if (requestedUserTickets) setUserTickets(requestedUserTickets.map(ticket => ticket.flight_id))
    }
    const requestFlights = async () => {
        setCallFlights(false)

        var queryObject = {}
        queryObject["flight_id"] = `${userTickets}`
        console.log(queryObject)
        var query = encodeURIComponent(JSON.stringify(queryObject))

        const myURL = "https://airports.api.hscc.bdpa.org/v2/flights?regexMatch=" + query

        try {
            const response = await superagent.get(myURL).set('key', `${flights_key}`)
            setFlights(response.body.flights)
        } catch (err) { if (err.status === 555) requestFlights() }
        setTimeout(requestFlights, 10000)
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
            else if (err.status === 555) requestAirports()
        }
    }
    useEffect(() => { if (!userInfo) getUserInfo() })
    useEffect(() => { if (!userTickets) getUserTickets() })
    useEffect(() => { if (!airports) requestAirports() })
    useEffect(() => { if (airports && airports !== true && userTickets && userTickets !== true && callFlights) requestFlights() })
    const handleSubmit = async info => {
        setUpdateResponse(3)
        const { _id, ...userInfo } = info
        const response = await updateUserInfo(userInfo)
        setUserInfo(response)
        setUpdateResponse(response ? 1 : 0)
    }
    const required = string().required('Required')
    const getAirportCity = shortName => airports.find(airport => airport.shortName === shortName).city
    return (
        <>
            {userInfo && userInfo !== true && <h4>Welcome {userInfo.firstName}!</h4>}
            {userInfo && lastLoginIp && <p>Last Login IP: {lastLoginIp}</p>}
            {userInfo && lastLoginDate && <p> Last Login Date: {"" + format(new Date(lastLoginDate), "PPpp")}</p>}

            <div className='row'>
                {airports && airports !== true && flights && flights !== true && <div className='col-sm-6'>
                    <h3>Upcoming Flights</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Flight</th>
                                <th>Departure Time</th>
                                <th>Arrival Time</th>
                                <th>View Ticket</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flights.filter(fl => fl.type !== "past" && fl.type !== "cancelled").map(fl =>
                                <tr key={fl.flight_id + fl.seat}>
                                    <td>{getAirportCity(fl.comingFrom) + " to " + getAirportCity(fl.landingAt)}</td>
                                    <td>{format(fl.departFromSender, "PPpp")}</td>
                                    <td>{format(fl.arriveAtReceiver, "PPpp")}</td>
                                    <td><Button href={`/tickets/${fl.flight_id}`}>View</Button></td>
                                </tr>)}
                        </tbody>
                    </Table>
                    <h3>Past Flights</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Upcoming Flights</th>
                                <th>Departure Date, Time, Location</th>
                                <th>Arrival Date, Time, Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flights.filter(fl => fl.type === "past" || fl.type === "cancelled").map(fl =>
                                <tr key={fl.flight_id}>
                                    <td>{getAirportCity(fl.comingFrom) + " to " + getAirportCity(fl.landingAt)}</td>
                                    <td>{format(fl.departFromSender, "PPpp")}</td>
                                    <td>{format(fl.arriveAtReceiver, "PPpp")}</td>
                                </tr>)}
                        </tbody>
                    </Table>
                </div>}
                <div className='col-sm-6'>
                    <h3>Personal Information</h3>
                    {userInfo && userInfo !== true && <Formik
                        initialValues={userInfo}
                        validationSchema={object().shape({
                            firstName: required, lastName: required,
                            birthdate: date().required("Required").max(new Date(), "Invalid Date of Birth"), sex: required,
                            city: required, state: required, zip: required, country: required,
                            email: required.email('Email is invalid'),
                            card: string().matches(/^[0-9]+$/, "Can only cantain numbers")
                        })}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-row">
                                    <div className="form-group col-2">
                                        <label htmlFor="title">Title</label>
                                        <Field name="title" type="text" className="form-control" />
                                    </div>
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
                                    <div className="form-group col-1">
                                        <label htmlFor="suffix">Suffix</label>
                                        <Field name="suffix" type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col">
                                        <label htmlFor="birthdate">Date of Birth</label>
                                        <Field name="birthdate" type="date" max={format(Date.now(), "yyyy-MM-dd")} className={'form-control' + (errors.birthdate && touched.birthdate ? ' is-invalid' : '')} />
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
                                        <label htmlFor="city">City</label>
                                        <Field name="city" type="text" className={'form-control' + (errors.city && touched.city ? ' is-invalid' : '')} />
                                        <ErrorMessage name="city" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col">
                                        <label htmlFor="state">State</label>
                                        <Field name="state" type="text" className={'form-control' + (errors.state && touched.state ? ' is-invalid' : '')} />
                                        <ErrorMessage name="state" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col">
                                        <label htmlFor="zip">Zip</label>
                                        <Field name="zip" type="text" className={'form-control' + (errors.zip && touched.zip ? ' is-invalid' : '')} />
                                        <ErrorMessage name="zip" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col">
                                        <label htmlFor="country">Country</label>
                                        <Field name="country" type="text" className={'form-control' + (errors.country && touched.country ? ' is-invalid' : '')} />
                                        <ErrorMessage name="country" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col">
                                        <label htmlFor="phone">Phone Number</label>
                                        <Field name="phone" type="text" className={'form-control'} />
                                    </div>
                                    <div className="form-group col">
                                        <label htmlFor="email">Email Address</label>
                                        <Field name="email" type="email" disabled={true} className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="card">Credit Card</label>
                                    <Field name="card" type="text" className={'form-control' + (errors.card ? ' is-invalid' : '')} />
                                    <ErrorMessage name="card" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary mr-2">Update Personal Information</button>
                                </div>
                                <h5>{["Personal Information Not Updated", "Personal Information Updated!", "", "Loading..."][updateResponse]}</h5>
                            </Form>
                        )}
                    </Formik>}
                </div>
                {/* 
    Change the default sorting order of flights in the flight view
    Save or remove credit/debit cards
    Choose the default automatic logout time: either 15 minutes, 5 minutes, or 1 hour.
    Manually add flights booked previously as a guest to the customer’s list of past and upcoming flights
        When a guest account books a flight, they get an confirmation number. Customers will be able to enter that confirmation number and, if the last name on the ticket matches the last name of the customer, that flight will become associated with their account as if they had purchased it while logged in */}
            </div>
            <div><Button variant='primary'>Change default sorting order of flights</Button></div>
            <br />
            <div><Button variant='primary'>Choose the default automatic logout time</Button></div>
            <br />
            <div>
                <DropdownButton as={ButtonGroup} title="Change default automatic logout time" id='bg-nested-dropdown'>
                    <Dropdown.Item>5 minutes</Dropdown.Item>
                    <Dropdown.Item>15 minutes</Dropdown.Item>
                    <Dropdown.Item>1 hour</Dropdown.Item>
                </DropdownButton>
            </div>
        </>
    )
}

export default DashboardCustomer
