import React, { useState, useEffect } from "react"
import Cookies from "universal-cookie"
import { Table, Button, ButtonGroup, ButtonToolbar, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap'
import { requestUserInfo } from '../services/userService'

// import { Form, Button, Col } from "react-bootstrap"
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { createUser } from "../services/userService";

const securityQuestions = [
    "What was the house number and street name you lived in as a child?",
    "What primary school did you attend?",
    "What is your favorite food?"
]

const cookies = new Cookies()
const ForgotPassword = () => {
    const [username, setUsername] = useState("")
    const [userInfo, setUserInfo] = useState(false)

    // useEffect(() => {
    //     if (!userInfo.username) getUserInfo()
    // })

    /* ------------ */

    const [validUsername, setUsernameValidity] = useState(2)

    const getUserInfo = async (fields) => {
        console.log(fields.username)
        const requestedUserInfo = await requestUserInfo(fields.username)
        console.log("userInfo", requestedUserInfo)
        setUserInfo(requestedUserInfo)
    }

    const sendSecurityQuestionQuery = async (fields) => {
        // const question1 = fields.securityQuestion1
        // const question2 = fields.securityQuestion2
        // const question3 = fields.securityQuestion3

        // if (question1 === requestedUserInfo.securityQuestion1)

        // setUsernameValidity(3)
        // const response = await createUser(info)
        // setUsernameValidity(0 + response)
        // if (response) window.setTimeout(() => window.open("/login", "_top"), 1000)
    }

    const required = Yup.string().required('Required')

    return (
        <>
            <div className='row'>
                <div className='col-sm-3'>
                    <hr />
                    <h2 align='center'>Forgot Your Password?</h2>
                    <hr />
                </div>
                <div className='col-sm-1' />
                <div className='col-sm-4'>
                    <Formik
                        initialValues={{
                            username: ""
                        }}
                        onSubmit={getUserInfo}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <h4>Find Your User</h4>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                    <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary mr-2">Search User</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    
                    <Formik
                        initialValues={{
                            username: "", password: "",
                            securityQuestion1: "", securityQuestion2: "", securityQuestion3: "", captcha: ""
                        }}
                        validationSchema={Yup.object().shape({
                            username: required.matches(/^[a-zA-Z0-9]+$/, "Cannot contain special characters or spaces"),
                            // password: required
                            //     .min(10, 'Must be at least 10 characters')
                            //     .max(30, "Must be less than 30 characters")
                            //     .matches(
                            //         /^[a-zA-Z0-9!@#$%^&*?_~]+$/,
                            //         "Cannot contain special characters or spaces"
                            //     ),
                            securityQuestion1: required, securityQuestion2: required, securityQuestion3: required,
                            captcha: required.matches("78", 'Invalid Captcha')
                        })}
                        onSubmit={sendSecurityQuestionQuery}
                    >
                        {({ errors, touched }) => (
                            <Form>
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
                                    <button type="submit" className="btn btn-primary mr-2">Login</button>
                                    <button type="reset" className="btn btn-secondary">Reset</button>
                                </div>
                                <h5>{["Username Already Taken", "User Registered!", "", "Loading..."][validUsername]}</h5>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className='col-sm-3' />
            </div>
        </>
    )
}

export default ForgotPassword