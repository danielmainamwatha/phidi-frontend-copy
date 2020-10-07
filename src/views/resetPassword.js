/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useFormik } from 'formik';
import { useToasts } from 'react-toast-notifications';
import { useHistory} from "react-router-dom";

import {yupResetPasswordObj} from '../helpers/validation';
import AuthHeader from './../components/authHeader';
import Footer from './../components/footer';
import AuthService from '../services/authService';

const ResetPassword = (props) => {
    const { addToast } = useToasts();
    let history = useHistory();
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let email = params.get('email');

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: yupResetPasswordObj,
        onSubmit: async values => {
            const userDetails = {email, ...values};
            const response = await AuthService.resetPassword(userDetails);
            if (response.status === 200) {
                addToast(response.data.message, {
                    appearance: 'success',
                    autoDismiss: false,
                });

                return setTimeout(
                    () => {
                        return history.push('/');
                    }, 3000);
               
            } else {
                return addToast(response.data.message, {
                    appearance: 'error',
                    autoDismiss: false,
                });
            }
        },
    });

    return(
        <>
        <div id="wrapper">
            <AuthHeader/>
            <div class="container">
                <div class="row margin-top-70 margin-bottom-100">
                <div class="col-xl-5 offset-xl-3  margin-bottom-100">
                    <div class="login-register-page">
                        {/* <!-- Welcome Text --> */}
                        <div class="welcome-text">
                            <h3>Reset Password!</h3>
                            <span>Add new password and confirm.</span>
                        </div>

                        {/* <!-- Form --> */}
                        <form method="post" id="login-form" autoComplete="off" onSubmit={formik.handleSubmit}>

                            {formik.touched.password && formik.errors.password ? 
                                <span style={{fontSize: '10px', color: 'red'}}>{formik.errors.password}</span>
                                : null}
                            <div class="input-with-icon-left">
                                <i class="fa fa-unlock-alt" aria-hidden="true"></i>
                                <input type="password" class="input-text with-border" name="password" id="password" placeholder="Password" {...formik.getFieldProps('password')}/>
                            </div>

                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? 
                                <span style={{fontSize: '10px', color: 'red'}}>{formik.errors.confirmPassword}</span>
                                : null}
                            <div class="input-with-icon-left">
                                <i class="fa fa-unlock-alt" aria-hidden="true"></i>
                                <input type="password" class="input-text with-border" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" {...formik.getFieldProps('confirmPassword')}/>
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

export default ResetPassword;