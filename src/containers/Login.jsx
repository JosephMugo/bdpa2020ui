import React, { useState } from "react"
import { Form, Button, Col } from 'react-bootstrap'
const SignIn = () => {
    // const [first_name, setFirstName] = useState(""), [last_name, setLastName] = useState(""), [password, setPassword] = useState(""), [isValid, setValidity] = useState("")
    return (
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="first_name">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" placeholder="First name" />
                </Form.Group>
                <Form.Group as={Col} controlId="last_name">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" placeholder="Last name" />
                </Form.Group>
            </Form.Row>
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="remember">
                <Form.Check type="checkbox" label="Remember" />
            </Form.Group>
            <Button variant="primary" type="submit">Login</Button>
        </Form>
    )
}

export default SignIn