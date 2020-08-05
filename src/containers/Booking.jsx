import React, { useState } from "react"
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
const Bookings = (flights) => {
    const handleLogin = async (fields) => {
    }
    const required = Yup.string().required('Required')
    return (
        <>
            <h2>Login</h2>
            <Formik
                initialValues={{ location: "", date: "" }}
                validationSchema={Yup.object().shape({
                    location: required,
                    date: required,
                })}
                onSubmit={handleLogin}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="location">Arrival Location</label>
                                <Field name="location" type="text" className={'form-control' + (errors.location && touched.location ? ' is-invalid' : '')} />
                                <ErrorMessage name="location" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">Date</label>
                                <Field name="date" type="text" className={'form-control' + (errors.date && touched.date ? ' is-invalid' : '')} />
                                <ErrorMessage name="date" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">Search</button>
                            <button type="reset" className="btn btn-secondary">Reset</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default Bookings