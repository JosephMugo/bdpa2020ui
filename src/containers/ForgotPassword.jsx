import React, { useState } from "react"
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { Button, Form as BootstrapForm, Alert } from 'react-bootstrap'
import * as Yup from 'yup'
import Cookies from "universal-cookie";
import { forgotPassword } from "../services/userService";

const securityQuestions = [
    "What was the house number and street name you lived in as a child?",
    "What primary school did you attend?",
    "What is your favorite food?"
]

const cookies = new Cookies()
const ForgotPassword = () => {
    const cookies = new Cookies()
    const [loginResponse, setLoginResponse] = useState(2)
    const loginAttempt = cookies.get("loginAttempt")

    const handleLogin = async (fields) => {
        setLoginResponse(3)
        console.log(fields)
        const response = await forgotPassword(fields)
        setLoginResponse(0 + response)
        if (response) window.setTimeout(() => window.open("/dashboard_customer", "_top"), 1000)
    }


    const sendSecurityQuestionQuery = async (fields) => {
        // const question1 = fields.securityQuestion1
        // const question2 = fields.securityQuestion2
        // const question3 = fields.securityQuestion3

        // if (question1 === requestedUserInfo.securityQuestion1)

        // setEmailValidity(3)
        // const response = await createUser(info)
        // setEmailValidity(0 + response)
        // if (response) window.setTimeout(() => window.open("/login", "_top"), 1000)
    }

    const required = Yup.string().required('Required')

    return (
        <>
            <div className='row'>
                <div className='col-sm-3'>
                </div>
                <div className='col-sm-1' />
                <div className='col-sm-4'>
                    <hr />
                    <h2 align='center'>Forgot Password</h2>
                    <hr />
                    <Formik
                        initialValues={{ email: "", securityQuestion1: "", securityQuestion2: "", securityQuestion3: "" }}
                        validationSchema={Yup.object().shape({
                            email: required,
                            securityQuestion1: required,
                            securityQuestion2: required,
                            securityQuestion3: required,
                        })}
                        onSubmit={handleLogin}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field name="email" type="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col">
                                        <label htmlFor="securityQuestion1">{securityQuestions[0]}</label>
                                        <Field name="securityQuestion1" type="text" className={'form-control' + (errors.securityQuestion1 && touched.securityQuestion1 ? ' is-invalid' : '')} />
                                        <ErrorMessage name="securityQuestion1" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col">
                                        <label htmlFor="securityQuestion2">{securityQuestions[1]}</label>
                                        <Field name="securityQuestion2" type="text" className={'form-control' + (errors.securityQuestion2 && touched.securityQuestion2 ? ' is-invalid' : '')} />
                                        <ErrorMessage name="securityQuestion2" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="securityQuestion3">{securityQuestions[2]}</label>
                                    <Field name="securityQuestion3" type="securityQuestion3" className={'form-control' + (errors.securityQuestion3 && touched.securityQuestion3 ? ' is-invalid' : '')} />
                                    <ErrorMessage name="securityQuestion3" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    {/* {loginAttempt !== '3' && <button type="submit" className="btn btn-primary mr-2">Login</button>}
                                    {loginAttempt === '3' && <button type="submit" className="btn btn-primary mr-2" disabled>Too many attempts, please wait an hour</button>} */}
                                    <button type="submit" className="btn btn-primary mr-2">Login</button>
                                    <button type="reset" className="btn btn-secondary">Reset</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <h5>{["Incorrect Credentials", "Logged In!", "", "Loading..."][loginResponse]}</h5>
                </div>
                <div className='col-sm-3' />
            </div>
        </>
    )
}

export default ForgotPassword