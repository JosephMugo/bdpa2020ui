import React, { useState } from "react"
import {
    BrowserRouter as Router,
    //Switch,
    Route,
    // Link
} from "react-router-dom"
import Cookies from "universal-cookie";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Booking from "./containers/Booking"
import Flights from "./containers/Flights"
import Home from "./containers/Home"
import Tickets from "./containers/Tickets"
import DashboardCustomer from "./containers/DashboardCustomer"
import DashboardAdmin from "./containers/DashboardAdmin"
import Login from "./containers/Login"
import Register from "./containers/Register"

const App = () => {
    const cookies = new Cookies()
    const [token, setToken] = useState(cookies.get("userToken")), [role, setRole] = useState(cookies.get("role"))
    console.log("cookies", cookies.getAll())
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">BDPA Airlines</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/flights">Flights</Nav.Link>
                        <Nav.Link href="/booking">Booking</Nav.Link>
                        <Nav.Link href="/tickets">Ticket</Nav.Link>
                        {token && <Nav.Link href="/dashboard_customer">Customer Dashboard</Nav.Link>}
                        {token && role === "admin" && <Nav.Link href="/dashboard_admin">Admin Dashboard</Nav.Link>}
                        {!token && <Nav.Link href="/login">Login</Nav.Link>}
                        {!token && <Nav.Link href="/register">Register</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Router>
                {/* <Route exact path="/home" component={Home}/>  */}
                <div className='content'>
                    <Route exact path="/flights" component={Flights} />
                    <Route exact path="/booking" component={Booking} />
                    <Route exact path="/tickets" component={Tickets} />
                    <Route exact path="/dashboard_customer" component={DashboardCustomer} />
                    <Route exact path="/dashboard_admin" component={DashboardAdmin} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/" component={Home} />
                </div>
            </Router>
        </div >
    )
}

export default App