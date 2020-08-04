<<<<<<< HEAD
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
            <div className="row">
                <div className='col-sm-4'>
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
                </div>
            </div>
=======
import React from "react"
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { login } from "../services/userService";
const Login = () => {
    return (
        <>
            <h2>Login</h2>
            <Formik
                initialValues={{
                    firstName: "", lastName: "", password: ""
                }}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string().required('Required'),
                    lastName: Yup.string().required('Required'),
                    password: Yup.string().required('Required')
                })}
                onSubmit={fields => {
                    console.log(fields)
                    login(fields.firstName + fields.lastName, fields.password)
                }}
            >
                {({ errors, status, touched }) => (
                    <Form>
                        <div className="form-row">
                            <div className="form-group col">
                                <label htmlFor="firstName">First Name</label>
                                <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col">
                                <label htmlFor="lastName">Last Name</label>
                                <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">Register</button>
                            <button type="reset" className="btn btn-secondary">Reset</button>
                        </div>
                    </Form>
                )}
            </Formik>
>>>>>>> ec1a2cd1b7cc2393246469327a620247c6d68b7b
        </>
    )
}

export default Login