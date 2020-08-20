import React, { useState } from "react"
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { Button, Form as BootstrapForm, Alert } from 'react-bootstrap'
import * as Yup from 'yup'
import Cookies from "universal-cookie";
import { login, rememberMe } from "../services/userService";
const Login = () => {
    // Dealing with login attempts
    const cookies = new Cookies()
    const loginAttempt = cookies.get("loginAttempt")

    // check if Remember Me check box is checked
    const [checked, setChecked] = useState(false)

    const [loginResponse, setLoginResponse] = useState(2)

    const handleLogin = async (fields) => {
        setLoginResponse(3)
        const response = await login(fields)
        setLoginResponse(0 + response)
        //if (response) window.setTimeout(() => window.open("/dashboard_customer", "_top"), 1000)
    }

    const handleRememberMe = async () => {
        var currentChecked = true
        if (checked === true) currentChecked = false
        setChecked(currentChecked)
        await rememberMe(currentChecked)
    }

    const forgotPassword = () => {
        window.setTimeout(() => window.open("/forgot_password", "_top"), 10)
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
                    <h2 align='center'>Login</h2>
                    <hr />
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={Yup.object().shape({
                            email: required,
                            password: required,
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
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    {loginAttempt !== '3' && <button type="submit" className="btn btn-primary mr-2">Login</button>}
                                    {loginAttempt === '3' && <button type="submit" className="btn btn-primary mr-2" disabled>Too many attempts, please wait an hour</button>}
                                    <button type="reset" className="btn btn-secondary">Reset</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <BootstrapForm.Check type='checkbox' onClick={handleRememberMe} label='Remember Me' />
                    <hr />
                    <h5>{["Incorrect Credentials", "Logged In!", "", "Loading..."][loginResponse]}</h5>
                    <Alert variant='warning'>
                        Current Login Attempt: {loginAttempt}
                        <br />
                        (3rd failed attempt will freeze login)
                    </Alert>
                    <Button variant='primary' onClick={forgotPassword}>Forgot Password</Button>
                </div>
            </div>
        </>
    )
}

export default Login