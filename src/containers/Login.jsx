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
        </>
    )
}

export default Login