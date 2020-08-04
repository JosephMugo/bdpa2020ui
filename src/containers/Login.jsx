import React, { useState } from "react"
import { Form, Button, Col } from 'react-bootstrap'


const SignIn = () => {
    const [first_name, setFirstName] = useState(""), [last_name, setLastName] = useState(""), [password, setPassword] = useState(""), [isValid, setValid] = useState("")
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
    
    return (
        <>
            <h2>Login</h2>
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
        </>
    )
}

export default SignIn