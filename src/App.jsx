import React from "react"
import {
    BrowserRouter as Router,
    //Switch,
    Route,
    // Link
} from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import Booking from "./containers/Booking"
import Flights from "./containers/Flights"
import Home from "./containers/Home"
import Tickets from "./containers/Tickets"
import Login from "./containers/Login"
import Register from "./containers/Register"

const App = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Plane Stuff</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/flights">Flights</Nav.Link>
                        <Nav.Link href="/booking">Booking</Nav.Link>
                        <Nav.Link href="/tickets">Ticket</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Router>
                {/* <Route exact path="/home" component={Home}/>  */}
                <div className='content'>
                <Route exact path="/flights" component={Flights} />
                <Route exact path="/booking" component={Booking} />
                <Route exact path="/tickets" component={Tickets} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/" component={Home} />
                </div>
            </Router>
        </div>
    )
}

export default App