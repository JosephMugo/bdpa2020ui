import React, { useState } from "react"
import { Form, Button, Col } from "react-bootstrap"

const security_questions = [
    "What was the house number and street name you lived in as a child?",
    "What primary school did you attend?",
    "What is your favorite food?"
]
const SignUp = () => {
    // const [user, setUser] = useState({
    //     title: "", firstName: "", middleName: "", lastName: "", suffix: "",
    //     birthdate: "", sex: "", city: "", state: "", zip: "", country: "",
    //     email: "", phone: "", password: "", security_questions_1: "", security_questions_2: "", security_questions_3: ""
    // })
    const [isValid, setValid] = useState("")

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value)
        // setUser(user => ({ ...user, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setValid(true)
    }
    const formGroup = (label, size, isRequired) => {
        return (
            <Form.Group as={Col} md={size} controlId={label.toLowerCase().replace(" ", "_")}>
                <Form.Label>{label}</Form.Label>
                {isRequired ? <Form.Control required type="text" placeholder={label} /> : <Form.Control type="text" placeholder={label} />}
                {isRequired && <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>}
            </Form.Group>
        )
    }
    return (
        <>
            <h2>Register New Account</h2>
            <Form noValidate validated={isValid} onSubmit={handleSubmit}>
                <Form.Row>
                    {formGroup("Title", 2, false)}
                    {formGroup("First Name", 3, true)}
                    {formGroup("Middle Name", 3, false)}
                    {formGroup("Last Name", 3, true)}
                    {formGroup("Suffix", 1, false)}
                </Form.Row>
                <Form.Row>
                    {formGroup("Date of Birth", 6, true)}
                    {formGroup("Sex", 6, true)}
                </Form.Row>
                <Form.Row>
                    {formGroup("City", 3, true)}
                    {formGroup("State", 3, true)}
                    {formGroup("Zip", 3, true)}
                    {formGroup("Country", 3, true)}
                </Form.Row>
                <Form.Row>
                    {formGroup("Email", 6, true)}
                    {formGroup("Phone", 6, true)}
                </Form.Row>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" aria-describedby="passwordHelpBlock" />
                    <Form.Text id="passwordHelpBlock" muted>
                        Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces or special characters.
                </Form.Text>
                    <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Security Questions</Form.Label>
                    <Form.Group controlId="security_questions_1">
                        <Form.Label>{security_questions[0]}</Form.Label>
                        <Form.Control required type="text" />
                        <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="security_questions_2">
                        <Form.Label>{security_questions[1]}</Form.Label>
                        <Form.Control required type="text" />
                        <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="security_questions_3">
                        <Form.Label>{security_questions[2]}</Form.Label>
                        <Form.Control required type="text" />
                        <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
                    </Form.Group>
                </Form.Group>
                <Form.Group>
                    <Form.Label>CAPTCHA</Form.Label>
                    <Form.Group controlId="captcha">
                        <Form.Label>"what is 9+10"</Form.Label>
                        <Form.Control required type="text" />
                        <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
                    </Form.Group>
                </Form.Group>
                <Button type="submit" >Register</Button>
            </Form>
        </>
    )
}

export default SignUp