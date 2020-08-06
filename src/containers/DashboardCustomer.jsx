import React, { useState, useEffect } from "react"
import { Table, Button, ButtonGroup, ButtonToolbar, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap'
import Cookies from "universal-cookie"
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { requestUserInfo, updateUserInfo } from '../services/userService'

const cookies = new Cookies()
const DashboardCustomer = () => {
    const [userInfo, setUserInfo] = useState(false), [infoUpdated, setInfoUpdated] = useState(2)
    const [lastLoginDate, setLastLoginDate] = useState(false), [lastLoginIp, setLastLoginIp] = useState(false)
    let failedUserInfoGets = 0
    const getUserInfo = async () => {
        const requestedUserInfo = await requestUserInfo(cookies.get("username"))
        console.log("userInfo", requestedUserInfo)
        if (requestedUserInfo) setUserInfo(requestedUserInfo)
        else failedUserInfoGets++
        setLastLoginDate(requestedUserInfo.lastLoginDate)
        setLastLoginIp(requestedUserInfo.lastLoginIp)
    }
    useEffect(() => {
        if (!userInfo || failedUserInfoGets > 100) getUserInfo()
    })
    const handleSubmit = async info => {
        setInfoUpdated(3)
        const { _id, ...userInfo } = info
        const response = await updateUserInfo(userInfo)
        setUserInfo(response)
        setInfoUpdated(response ? 1 : 0)
    }
    const required = Yup.string().required('Required')
    return (
        <>
            <h4>Welcome {cookies.get("username")}!</h4>
            {userInfo && lastLoginIp && <p>Last Login IP: {lastLoginIp}</p>}
            {userInfo && lastLoginDate && <p> Last Login Date: {"" + new Date(lastLoginDate)}</p>}

            <div className='row'>
                <div className='col-sm-6'>
                    <h3>Upcoming and Past Flights</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Flights</th>
                                <th>Departure Date, Time, Location</th>
                                <th>Arrival Date, Time, Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>blah</td>
                                <td>blah</td>
                                <td>blah</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Upcoming Flights</th>
                                <th>Departure Date, Time, Location</th>
                                <th>Arrival Date, Time, Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>blah</td>
                                <td>blah</td>
                                <td>blah</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className='col-sm-6'>
                    <h3>Personal Information</h3>
                    {userInfo && <Formik
                        initialValues={userInfo}
                        validationSchema={Yup.object().shape({
                            firstName: required, lastName: required,
                            birthdate: required, sex: required,
                            city: required, state: required, zip: required, country: required,
                            email: required.email('Email is invalid'),
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
                                        <label htmlFor="birthdate">Date of Birth YYYY/MM/DD</label>
                                        <Field name="birthdate" type="text" className={'form-control' + (errors.birthdate && touched.birthdate ? ' is-invalid' : '')} />
                                        <ErrorMessage name="birthdate" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col">
                                        <label>Sex</label>
                                        <Field name="sex" as="select" className={'form-control' + (errors.sex && touched.sex ? ' is-invalid' : '')}>
                                            <option value=""></option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Genderqueer/Non-Binary</option>
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
                                        <label htmlFor="email">Email Adress</label>
                                        <Field name="email" type="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary mr-2">Update Personal Information</button>
                                </div>
                                <h5>{["Personal Information Not Updated", "Personal Information Updated!", "", "Loading..."][infoUpdated]}</h5>
                            </Form>
                        )}
                    </Formik>}
                </div>
                {/* 
    Update their stored information (email, address, etc)
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
