import React, { useState } from "react"
// import { Form, Button, Col } from "react-bootstrap"
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { createUser } from "../services/userService";
const securityQuestions = [
    "What was the house number and street name you lived in as a child?",
    "What primary school did you attend?",
    "What is your favorite food?"
]
const Register = () => {
    const [validEmail, setEmailValidity] = useState(2)
    const handleSubmit = async (fields) => {
        const { captcha, ...info } = fields
        setEmailValidity(3)
        const response = await createUser(info)
        setEmailValidity(0 + response)
        if (response) window.setTimeout(() => window.open("/login", "_top"), 1000)
    }
    const required = Yup.string().required('Required')
    return (
        <>
            <div className='row'>
                <div className='col-sm-3'>
                </div>
                <div className='col-sm-6'>
                    <hr />
                    <h2 align='center'>Register Admin Account</h2>
                    <hr />
                    <p>As an admin, you now have access to a number of administration features! Join today.</p>
                    <hr />
                    <Formik
                        initialValues={{
                            title: "", firstName: "", middleName: "", lastName: "", suffix: "",
                            birthdate: "", sex: "", city: "", state: "", zip: "", country: "",
                            email: "", phone: "", password: "",
                            securityQuestion1: "", securityQuestion2: "", securityQuestion3: "", captcha: ""
                        }}
                        validationSchema={Yup.object().shape({
                            firstName: required, lastName: required,
                            birthdate: required, sex: required,
                            city: required, state: required, zip: required, country: required,
                            email: required.email('Email is invalid'),
                            password: required
                                .min(10, 'Must be at least 10 characters')
                                .max(30, "Must be less than 30 characters")
                                .matches(
                                    /^[a-zA-Z0-9!@#$%^&*?_~]+$/,
                                    "Cannot contain special characters or spaces"
                                ),
                            securityQuestion1: required, securityQuestion2: required, securityQuestion3: required,
                            captcha: required.matches("78", 'Invalid Captcha')
                        })}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-row">
                                    <div className="form-group col-2">
                                        <label htmlFor="title">Title</label>
                                        <Field name="title" type="text" className="form-control" />
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="firstName">First Name</label>
                                        <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                        <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="middleName">Middle Name</label>
                                        <Field name="middleName" type="text" className="form-control" />
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="lastName">Last Name</label>
                                        <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                        <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col-1">
                                        <label htmlFor="suffix">Suffix</label>
                                        <Field name="suffix" type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <Field name="email" type="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                </div>
                                <h4>Security Questions</h4>
                                <div className="form-group">
                                    <label htmlFor="securityQuestion1">{securityQuestions[0]}</label>
                                    <Field name="securityQuestion1" type="text" className={'form-control' + (errors.securityQuestion1 && touched.securityQuestion1 ? ' is-invalid' : '')} />
                                    <ErrorMessage name="securityQuestion1" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="securityQuestion2">{securityQuestions[1]}</label>
                                    <Field name="securityQuestion2" type="text" className={'form-control' + (errors.securityQuestion2 && touched.securityQuestion2 ? ' is-invalid' : '')} />
                                    <ErrorMessage name="securityQuestion2" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="securityQuestion3">{securityQuestions[2]}</label>
                                    <Field name="securityQuestion3" type="text" className={'form-control' + (errors.securityQuestion3 && touched.securityQuestion3 ? ' is-invalid' : '')} />
                                    <ErrorMessage name="securityQuestion3" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="captcha">What's 47+31?</label>
                                    <Field name="captcha" type="text" className={'form-control' + (errors.captcha && touched.captcha ? ' is-invalid' : '')} />
                                    <ErrorMessage name="captcha" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary mr-2">Register</button>
                                    <button type="reset" className="btn btn-secondary">Reset</button>
                                </div>
                                <h5>{["Email Already Taken", "User Registered!", "", "Loading..."][validEmail]}</h5>
                            </Form>
                        )}
                    </Formik>

                </div>
                <div className='col-sm-3' />
            </div>
        </>
    )
}
export default Register
