/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useFormik } from 'formik';

import {yupForgotPasswordObj} from '../helpers/validation';
import AuthHeader from './../components/authHeader';
import { useToasts } from 'react-toast-notifications';
import Footer from './../components/footer';
import AuthService from '../services/authService';

const ForgotPassword = (props) => {
    const { addToast } = useToasts();

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: yupForgotPasswordObj,
        onSubmit: async values => {
            const response = await AuthService.forgotPassword(values);
            
            if (response.status === 200) {
                return addToast(response.data.message, {
                    appearance: 'success',
                    autoDismiss: true,
                });
            } else {
                return addToast(response.data.message, {
                    appearance: 'error',
                    autoDismiss: true,
                });
            }
        },
    });

    return(
        <>
        <div id="wrapper">
            <AuthHeader/>
            <div class="container">
                <div class="row margin-top-100 margin-bottom-100">
                <div class="col-xl-5 offset-xl-3  margin-bottom-100">
                    <div class="login-register-page">
                        {/* <!-- Welcome Text --> */}
                        <div class="welcome-text">
                            <h3>Forgot your Password?</h3>
                            <span>A link will be sent to your email to help you reset your password.</span>
                        </div>

                        {/* <!-- Form --> */}
                        <form method="post" id="forgot-password-form" autoComplete="off" onSubmit={formik.handleSubmit}>
                            {formik.touched.email && formik.errors.email ? 
                                <span style={{fontSize: '10px', color: 'red'}}>{formik.errors.email}</span>
                                : null}
                            <div class="input-with-icon-left">
                                <i class="fa fa-envelope-o" aria-hidden="true"></i>
                                <input type="text" class="input-text with-border" name="email" id="emailaddress" placeholder="Email Address" {...formik.getFieldProps('email')}/>
                            </div>
                        <button class="button full-width button-sliding-icon ripple-effect margin-top-10" type="submit"> Submit <i class="fa fa-long-arrow-right" aria-hidden="true"></i></button>
                        </form>
                        {/* <!-- Button --> */}
                    </div>

                </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default ForgotPassword;