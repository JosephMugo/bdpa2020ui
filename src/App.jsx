import React, { useState } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Cookies from "universal-cookie";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import IdleJs from "idle-js"
import Booking from "./containers/Booking"
import Flights from "./containers/Flights"
import Home from "./containers/Home"
import Tickets from "./containers/Tickets"
import DashboardCustomer from "./containers/DashboardCustomer"
import DashboardAdmin from "./containers/DashboardAdmin"
import Login from "./containers/Login"
import ForgotPassword from "./containers/ForgotPassword"
import Register from "./containers/Register"
import RegisterAdmin from "./containers/RegisterAdmin"
import AdminCreateUser from "./containers/AdminCreateUser"
import { requestUserInfo } from './services/userService'
import { requestUserTickets } from './services/ticketService'
import DashboardAttendant from "./containers/DashboardAttendant"
import Card from 'react-bootstrap/Card'

const cookies = new Cookies()
const App = () => {
    const [rememberMe] = useState(cookies.get("rememberMe"))
    const [token] = useState(cookies.get("userToken")), [role] = useState(cookies.get("role"))
    const [userInfo, setUserInfo] = useState([])
    const [nextTicket, setTicket] = useState([])
    const signOut = () => {
        console.log("signout")
        cookies.remove("email")
        cookies.remove("userToken")
        cookies.remove("role")
        cookies.remove("rememberMe")
        cookies.remove("firstName")
        cookies.remove("airline")
        cookies.remove("flightNumber")
        cookies.remove("destination")
        cookies.remove("departingtime")
        idle.stop()
        idle.reset()
    }

    // Setting login timeouts
    const loginAttempt = cookies.get("loginAttempt")
    // after 3 login attemtps, set timeout before removing counter
    if (loginAttempt === '3') {
        window.setTimeout(() => window.open("/login", "_top"), 3600000) // 3,600,000 ms = 1 hour
        window.setTimeout(() => cookies.remove('loginAttempt'), 3600000) // 3,600,000 ms = 1 hour
    }

    // Auto logout feature
    // if (token && userInfo.username === undefined){
    //     const getUserInfo = async()=>{
    //         const username = cookies.get("username")
    //         const userData = await requestUserInfo(username)
    //        // console.log("this shouldn't be empty",userData)
    //         setUserInfo(userData)
    //         const ticketData = await requestUserTickets(username)
    //         const flight_id = ticketData[1].flight_id
    //         console.log(flight_id)


    //     }
    //     getUserInfo()
    // } else{
    //     console.log("this is info",userInfo)
    //     console.log(userInfo.username)
    // }
    if (!rememberMe && token) {
        var idle = new IdleJs({
            idle: 900000, // idle time in ms; 900,000 ms = 15 minutes
            events: ['mousemove', 'keydown', 'mousedown', 'touchstart'], // events that will trigger the idle resetter
            onIdle: function () {
                window.setTimeout(signOut, 1000)
                window.setTimeout(() => window.open("/", "_top"), 1000) // 900,000 ms = 15 minutes
            }, // callback function to be executed after idle time
            onActive: function () { }, // callback function to be executed after back form idleness
            onHide: function () { }, // callback function to be executed when window become hidden
            onShow: function () { }, // callback function to be executed when window become visible
            keepTracking: true, // set it to false if you want to be notified only on the first idleness change
            startAtIdle: false // set it to true if you want to start in the idle state
        });
        idle.start();
    }

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
                        {token && role === "flightattendant" && <Nav.Link href="/dashboardattendant">Flight Attendant Dashboard</Nav.Link>}
                        {token && role === "customer" && <Nav.Link href="/dashboard_customer">Customer Dashboard</Nav.Link>}
                        {token && role === "admin" && <Nav.Link href="/dashboard_admin">Admin Dashboard</Nav.Link>}
                    </Nav>
                    <Nav>
                        {!token && <Nav.Link href="/login">Login</Nav.Link>}
                        {!token && <Nav.Link href="/register">Register</Nav.Link>}
                        {token && role === "root" && <Nav.Link href="/register_admin">Register Admin</Nav.Link>}
                        {token && role === "admin" && <Nav.Link href="/admin_create_user">Admin Create User</Nav.Link>} {/*&& role === "admin"*/}
                        {token && !rememberMe && <Nav.Link>Login Expiration: 15 minutes</Nav.Link>}
                        {token && <Nav.Link>Hello, {cookies.get("firstName")}</Nav.Link>}
                        {token && <Nav.Link>{cookies.get("email")}</Nav.Link>}
                        {token && <Nav.Link href="/" onClick={signOut}>Sign Out</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Router>
                {/* <Route exact path="/home" component={Home}/>  */}
                <div className='fade-in content'>
                    <Route exact path="/flights" component={Flights} />
                    <Route exact path="/booking" component={Booking} />
                    <Route exact path="/booking/:flight_id" component={Booking} />
                    <Route exact path="/tickets/:flight_id" component={Tickets} />
                    <Route exact path="/dashboard_customer" component={DashboardCustomer} />
                    <Route exact path="/dashboard_admin" component={DashboardAdmin} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/forgot_password" component={ForgotPassword} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/register_admin" component={RegisterAdmin} />
                    <Route exact path="/admin_create_user" component={AdminCreateUser} />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/dashboardattendant" component={DashboardAttendant} />
                </div>
            </Router>
            {token &&
            <Card id="footer" bg="dark" variant="dark" style={{ bottom: "0", color: "white" }}>
                <Card.Body>Hello, {cookies.get("firstName")} | {cookies.get("email")} | Next flight: Departing to {cookies.get("destination")} on {cookies.get("departingtime")} | Flight Number: {cookies.get("flightNumber")} | Airline: {cookies.get("airline")}</Card.Body>
            </Card>
            }
        </div>
    )
}

export default App