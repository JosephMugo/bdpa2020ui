import React from "react"
import { Table, Button, ButtonGroup, ButtonToolbar, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap'
import Cookies from "universal-cookie"
const DashboardCustomer = () => {
    const signOut = () => {
        console.log("signout")
        const cookies = new Cookies()
        cookies.remove("userToken")
        cookies.remove("role")
    }
    return (
        <>
            <p>Welcome USERNAME to your private dashboard!</p>
            <p>Last Login IP: LAST_IP</p>
            <p>Last Login Date: LAST_DATE</p>

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
                </div>
                <div className='col-sm-6'>
                    <h3>Personal Information</h3>
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
                    <Button variant='primary'>Update Personal Information</Button>
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
            <div><Button variant='primary'>Choose the default automatic logout time</Button></div>
            <div>
                <DropdownButton as={ButtonGroup} title="Change default automatic logout time" id='bg-nested-dropdown'>
                    <Dropdown.Item>5 minutes</Dropdown.Item>
                    <Dropdown.Item>15 minutes</Dropdown.Item>
                    <Dropdown.Item>1 hour</Dropdown.Item>
                </DropdownButton>
            </div>
            <Button variant='secondary' href="/" onClick={signOut}>Sign out</Button>
        </>
    )
}

export default DashboardCustomer
