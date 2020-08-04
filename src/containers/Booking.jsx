import React, { useState } from "react"
import InputGroup from 'react-bootstrap/InputGroup'
import { FormControl } from "react-bootstrap"
import { Form, Button, Col } from 'react-bootstrap'

const Bookings = (flights) => {
    const [isValid, setValid] = useState("")
    const formGroup = (label, size, isRequired) => {
        return (
            <Form.Group as={Col} md={size} controlId={label.toLowerCase().replace(" ", "_")}>
                <Form.Label>{label}</Form.Label>
                {isRequired ? <Form.Control required type="text" placeholder={label} /> : <Form.Control type="text" placeholder={label} />}
                {isRequired && <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>}
            </Form.Group>
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setValid(true)
    }
    if (flights === true) { //if there coming from the flights section it'll skip asking them where and when they wanna go
        return (
            <div>this is an empty div</div>
        )
    } else {
        return (
            <div>
                <div className="row">
                    <div className='col-sm-4'>
                        <h2>Bookings</h2>
                        <Form noValidate validated={isValid} onSubmit={handleSubmit}>
                            <Form.Row>
                                {formGroup("First Name", 6, true)}
                                {formGroup("Last Name", 6, true)}
                            </Form.Row>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required type="password" aria-describedby="passwordHelpBlock" />
                                <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
                            </Form.Group>
                            <Button type="submit" >Register</Button>
                        </Form>
                    </div>
                </div>
            </div>
            // Card info and what not: exp date, zip code, type of card
            // If logged in ask to save info to not type it later
            // Select seat number
            // How many bags
            // first is free second carry on is $30 second checked is $50 and more is $100
            // max 2 carry-on and 5 checked
            // must book 24 hours before flight
        )
    }
}

export default Bookings