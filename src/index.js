import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './containers/Home'

ReactDOM.render(
  <React.StrictMode>
    <Navbar bg="light" expand="lg">
  <Navbar.Brand href="/">Plane Stuff</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/flights">Flights</Nav.Link>
      <Nav.Link href="/booking">Booking</Nav.Link>
      <Nav.Link href="/tickets">Ticket</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
<App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
