import React, { useState } from "react"
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { login } from "../services/userService";
const Login = () => {
    const [validUser, setUserValidity] = useState(2)
    const handleLogin = async (fields) => {
        setUserValidity(3)
        const response = await login(fields)
        setUserValidity(0 + response)
        console.log(response)
    }
    const required = Yup.string().required('Required')
    return (
        <>
            <h2>Login</h2>
            <Formik
                initialValues={{ username: "", firstName: "", lastName: "", password: "" }}
                validationSchema={Yup.object().shape({
                    username: required,
                    firstName: required,
                    lastName: required,
                    password: required,
                })}
                onSubmit={handleLogin}
            >
                {({ errors, status, touched }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                        </div>
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
                            <button type="submit" className="btn btn-primary mr-2">Login</button>
                            <button type="reset" className="btn btn-secondary">Reset</button>
                        </div>
                        <h5>{["Incorrect Credentials", "Logged In!", "", "Loading..."][validUser]}</h5>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default Login