import React from "react"
import * as Yup from 'yup'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { AdminCreateUser } from "../services/userService";

const Register = () => {
    return (
        <>
            <div className='row'>
                <div className='col-sm-4'>
                    <h2> Admin Create User Account</h2>
                    <Formik
                        initialValues={{
                             firstName: "", lastName: "", birthdate: "", sex: "", city: "", state: "", zip: "", country: "",
                            email: "", phone: "", password: "", captcha: ""
                        }}
                        validationSchema={Yup.object().shape({
                            firstName: Yup.string().required('Required'),
                            lastName: Yup.string().required('Required'),
                            birthdate: Yup.string().required('Required'),
                            city: Yup.string().required('Required'),
                            state: Yup.string().required('Required'),
                            zip: Yup.string().required('Required'),
                            country: Yup.string().required('Required'),
                            email: Yup.string()
                                .email('Email is invalid')
                                .required('Required'),
                            password: Yup.string()
                                .min(10, 'Must be at least 10 characters')
                                .max(30, "Must be less than 30 characters")
                                .required('Required')
                                .matches(
                                    /^[a-zA-Z0-9!@#$%^&*?_~]+$/,
                                    "Cannot contain special characters or spaces"
                                ),
                        
                            captcha: Yup.string().matches("78", 'Invalid Captcha').required('Required')
                        })}
                        onSubmit={fields => {
                            const { captcha, ...info } = fields
                            createUser(info)
                        }}
                    >
                        {({ errors, status, touched }) => (
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
                                        <label htmlFor="lastName">Last Name</label>
                                        <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                        <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                                    </div>

                                </div>
                                <div className="form-row">
                                    <div className="form-group col">
                                        <label htmlFor="birthdate">Date of Birth YYYY/MM/DD</label>
                                        <Field name="birthdate" type="text" className={'form-control' + (errors.birthdate && touched.birthdate ? ' is-invalid' : '')} />
                                        <ErrorMessage name="birthdate" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col">
                                        <label>Sex</label>
                                        <Field name="sex" as="select" className={'form-control'}>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </Field>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col">
                                        <label htmlFor="city">City</label>
                                        <Field name="city" type="text" className={'form-control' + (errors.city && touched.city ? ' is-invalid' : '')} />
                                        <ErrorMessage name="city" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col">
                                        <label htmlFor="state">State</label>
                                        <Field name="state" type="text" className={'form-control' + (errors.state && touched.state ? ' is-invalid' : '')} />
                                        <ErrorMessage name="state" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col">
                                        <label htmlFor="zip">Zip</label>
                                        <Field name="zip" type="text" className={'form-control' + (errors.zip && touched.zip ? ' is-invalid' : '')} />
                                        <ErrorMessage name="zip" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col">
                                        <label htmlFor="country">Country</label>
                                        <Field name="country" type="text" className={'form-control' + (errors.country && touched.country ? ' is-invalid' : '')} />
                                        <ErrorMessage name="country" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col">
                                        <label htmlFor="phone">Phone Number</label>
                                        <Field name="phone" type="text" className={'form-control'} />
                                    </div>
                                    <div className="form-group col">
                                        <label htmlFor="email">Email Adress</label>
                                        <Field name="email" type="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
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
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}
export default AdminCreateUser

